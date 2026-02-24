export interface SuniSection {
    id: string;
    title: string;
    suniLine: string;
    /** Optional: path to pre-generated audio file in /public/suni/ */
    audioFile?: string;
}

export type VoiceMode = 'speech' | 'audio';

export interface SuniPreferences {
    muted: boolean;
    volume: number;
    rate: number;
    disabled: boolean;
    voiceMode: VoiceMode;
}

export interface SuniNarrationState {
    isPlaying: boolean;
    currentSectionId: string | null;
    autoplayBlocked: boolean;
    preferences: SuniPreferences;
}
