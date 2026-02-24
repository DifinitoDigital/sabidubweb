import { useCallback, useEffect, useRef, useState } from 'react';
import type { SuniPreferences } from '../types/suni';
import { suniSections } from '../data/suniScript';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────
const LS_KEY = 'suni_prefs';

const DEFAULT_PREFS: SuniPreferences = {
    muted: false,
    volume: 0.9,
    rate: 0.92,
    disabled: false,
    voiceMode: 'speech',
};

// Keywords to identify female-sounding English voices (scored, highest wins)
const FEMALE_KEYWORDS = [
    'Google UK English Female',
    'Samantha',
    'Zira',
    'Tessa',
    'Karen',
    'Victoria',
    'Susan',
    'Fiona',
    'Moira',
    'Veena',
    'Nicky',
    'female',
    'woman',
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function loadPrefs(): SuniPreferences {
    if (typeof window === 'undefined') return DEFAULT_PREFS;
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return DEFAULT_PREFS;
        return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
    } catch {
        return DEFAULT_PREFS;
    }
}

function savePrefs(prefs: SuniPreferences) {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(prefs));
    } catch { }
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
    const enVoices = voices.filter((v) => v.lang.startsWith('en'));
    const pool = enVoices.length ? enVoices : voices;
    if (!pool.length) return null;

    let best: SpeechSynthesisVoice | null = null;
    let bestScore = -1;

    for (const voice of pool) {
        const name = voice.name;
        let score = 0;
        for (const kw of FEMALE_KEYWORDS) {
            if (name.toLowerCase().includes(kw.toLowerCase())) score += 2;
        }
        // Google voices have better quality
        if (name.toLowerCase().includes('google')) score += 1;
        if (score > bestScore) {
            bestScore = score;
            best = voice;
        }
    }

    return best ?? pool[0];
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────
export function useSuniNarration() {
    const [prefs, setPrefsState] = useState<SuniPreferences>(DEFAULT_PREFS);
    const [isPlaying, setIsPlaying] = useState(false);
    const [autoplayBlocked, setAutoplayBlocked] = useState(false);
    const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
    const [isSupported, setIsSupported] = useState(true);

    // Stable refs — never cause re-renders
    const prefsRef = useRef<SuniPreferences>(DEFAULT_PREFS);
    const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
    /** IDs spoken this session (prevents re-triggering on scroll up/down) */
    const spokenRef = useRef<Set<string>>(new Set());
    /** Set to true after user's first gesture unlocks audio */
    const unlockedRef = useRef(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // ── Load preferences from localStorage (client only) ──────────────────
    useEffect(() => {
        const saved = loadPrefs();
        setPrefsState(saved);
        prefsRef.current = saved;
    }, []);

    // ── Speech synthesis support + async voice loading ─────────────────────
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!window.speechSynthesis) {
            setIsSupported(false);
            return;
        }
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length) voiceRef.current = pickVoice(voices);
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    // ── Single HTMLAudioElement for optional audio-file mode ───────────────
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const audio = new Audio();
        audioRef.current = audio;
        const onEnded = () => setIsPlaying(false);
        const onError = () => setIsPlaying(false);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('error', onError);
        return () => {
            audio.pause();
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('error', onError);
        };
    }, []);

    // ── Low-level: cancel everything ──────────────────────────────────────
    const stopAll = useCallback(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
    }, []);

    // ── Low-level: speak text via speechSynthesis ─────────────────────────
    const speakText = useCallback((text: string) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) return;
        const p = prefsRef.current;

        // Cancel whatever is currently playing
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        if (voiceRef.current) utterance.voice = voiceRef.current;
        utterance.volume = p.muted ? 0 : p.volume;
        utterance.rate = p.rate;
        utterance.pitch = 1.05;

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = (e) => {
            if (e.error !== 'interrupted') setIsPlaying(false);
        };

        window.speechSynthesis.speak(utterance);
    }, []);

    // ── Play a section (speech-first, audio-file optional fallback) ────────
    const playSection = useCallback(
        (sectionId: string) => {
            const p = prefsRef.current;
            if (p.disabled) return;
            const section = suniSections.find((s) => s.id === sectionId);
            if (!section) return;

            stopAll();
            setCurrentSectionId(sectionId);

            if (p.voiceMode === 'audio' && section.audioFile) {
                const audio = audioRef.current;
                if (audio) {
                    audio.src = section.audioFile;
                    audio.volume = p.muted ? 0 : p.volume;
                    audio.muted = p.muted;
                    audio
                        .play()
                        .then(() => setIsPlaying(true))
                        .catch(() => {
                            // Audio file not available – fall back to speech
                            speakText(section.suniLine);
                        });
                }
            } else {
                speakText(section.suniLine);
            }
        },
        [stopAll, speakText]
    );

    // ── Autoplay on first mount ─────────────────────────────────────────
    //    Uses a 800 ms timeout to detect if the browser silently blocked it.
    const attemptAutoplay = useCallback(() => {
        const p = prefsRef.current;
        if (p.disabled || !isSupported) return;

        const intro = suniSections[0];
        setCurrentSectionId(intro.id);

        speakText(intro.suniLine);

        // After 800 ms, check whether speech actually started
        const timer = setTimeout(() => {
            const speaking =
                typeof window !== 'undefined' &&
                !!window.speechSynthesis &&
                window.speechSynthesis.speaking;

            if (!speaking) {
                // Blocked — cancel ghost speech and show chip
                window.speechSynthesis?.cancel();
                setAutoplayBlocked(true);
                setIsPlaying(false);
                // Do NOT mark intro as spoken — it hasn't been heard yet
            } else {
                setIsPlaying(true);
                setAutoplayBlocked(false);
                unlockedRef.current = true;
                spokenRef.current.add(intro.id);
            }
        }, 800);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSupported]);

    // ── First user gesture (tap chip, or first pointerdown) ───────────────
    const handleFirstGesture = useCallback(() => {
        setAutoplayBlocked(false);
        unlockedRef.current = true;
        const intro = suniSections[0];
        spokenRef.current.add(intro.id);      // mark as spoken so scroll-back doesn't repeat
        setCurrentSectionId(intro.id);
        speakText(intro.suniLine);
    }, [speakText]);

    // ── Called by scroll observer ─────────────────────────────────────────
    //    Fires once per section per session.
    const onSectionActive = useCallback(
        (sectionId: string) => {
            if (prefsRef.current.disabled) return;
            // On mobile where autoplay is blocked and user hasn't tapped yet,
            // don't queue narration behind the blocked intro
            if (autoplayBlocked) return;
            if (spokenRef.current.has(sectionId)) return;
            spokenRef.current.add(sectionId);
            playSection(sectionId);
        },
        // autoplayBlocked is the key dependency — changes when chip is dismissed
        [autoplayBlocked, playSection]
    );

    // ── Replay helpers ────────────────────────────────────────────────────
    const replaySection = useCallback(
        (sectionId: string) => playSection(sectionId),
        [playSection]
    );

    const replayIntro = useCallback(
        () => playSection('intro'),
        [playSection]
    );

    // ── Preferences update ────────────────────────────────────────────────
    const updatePrefs = useCallback((partial: Partial<SuniPreferences>) => {
        setPrefsState((prev) => {
            const next = { ...prev, ...partial };
            prefsRef.current = next;
            savePrefs(next);

            if (audioRef.current) {
                audioRef.current.volume = next.muted ? 0 : next.volume;
                audioRef.current.muted = next.muted;
            }

            if (next.disabled) {
                window.speechSynthesis?.cancel();
                audioRef.current?.pause();
                setIsPlaying(false);
            }

            return next;
        });
    }, []);

    return {
        prefs,
        updatePrefs,
        isPlaying,
        autoplayBlocked,
        currentSectionId,
        isSupported,
        attemptAutoplay,
        handleFirstGesture,
        onSectionActive,
        replaySection,
        replayIntro,
        stopAll,
        spokenRef,
    };
}
