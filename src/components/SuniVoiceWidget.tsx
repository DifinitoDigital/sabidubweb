'use client';
import React, { useEffect, useRef, useState } from 'react';
import type { VoiceMode } from '../types/suni';
import { suniSections } from '../data/suniScript';

interface Props {
  isPlaying: boolean;
  muted: boolean;
  volume: number;
  rate: number;
  disabled: boolean;
  voiceMode: VoiceMode;
  autoplayBlocked: boolean;
  isSupported: boolean;
  currentSectionId: string | null;
  activeSectionId: string | null;
  onMuteToggle: () => void;
  onVolumeChange: (v: number) => void;
  onRateChange: (v: number) => void;
  onDisableToggle: () => void;
  onVoiceModeToggle: () => void;
  onReplaySection: () => void;
  onReplayIntro: () => void;
  onFirstGesture: () => void;
}

export default function SuniVoiceWidget({
  isPlaying,
  muted,
  volume,
  rate,
  disabled,
  voiceMode,
  autoplayBlocked,
  isSupported,
  currentSectionId,
  activeSectionId,
  onMuteToggle,
  onVolumeChange,
  onRateChange,
  onDisableToggle,
  onVoiceModeToggle,
  onReplaySection,
  onReplayIntro,
  onFirstGesture,
}: Props) {
  // Chip stays visible until user taps × — independent of autoplay state
  const [chipDismissed, setChipDismissed] = useState(false);
  const [chipStarted, setChipStarted] = useState(false); // true once user tapped play

  // Popover + transcript state
  const [showPopover, setShowPopover] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleChipPlay = () => {
    setChipStarted(true);
    onFirstGesture();
  };

  const handleChipDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setChipDismissed(true);
  };

  // Show chip until user taps × — independent of autoplay blocking state, but only if supported
  const showChip = !chipDismissed && !disabled && isSupported;
  // After user has tapped and chip is still open, show playing state
  const chipIsPlaying = chipStarted && isPlaying;

  // Respect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Current section's line for transcript
  const activeSection = suniSections.find(
    (s) => s.id === (activeSectionId ?? currentSectionId)
  );

  // Close popover on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowPopover(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <>
      {/* ── Persistent Floating Chip ────────────────────────────────── */}
      {showChip && (
        <div
          id="suni-autoplay-chip"
          className={`suni-chip ${chipIsPlaying ? 'suni-chip--playing' : ''
            } ${prefersReducedMotion ? 'suni-chip--no-anim' : ''}`}
          role="complementary"
          aria-label="Suni voice guide"
          aria-live="polite"
        >
          {/* Dismiss × button */}
          <button
            className="suni-chip__dismiss"
            onClick={handleChipDismiss}
            aria-label="Dismiss Suni chip"
            title="Dismiss"
          >
            ✕
          </button>

          {/* Avatar + tap-to-play area */}
          <button
            className="suni-chip__play-area"
            onClick={handleChipPlay}
            disabled={chipStarted}
            aria-label={chipStarted ? 'Suni is speaking' : 'Tap to hear Suni'}
          >
            <span className="suni-chip__avatar" aria-hidden="true">
              {chipIsPlaying ? '🔊' : '🎧'}
            </span>
            <span className="suni-chip__text">
              {chipIsPlaying
                ? 'Suni is speaking…'
                : chipStarted
                  ? 'Suni is ready'
                  : 'Tap to hear Suni'}
            </span>
            {chipIsPlaying && (
              <span className="suni-chip__wave" aria-hidden="true">
                <span /><span /><span />
              </span>
            )}
          </button>
        </div>
      )}

      {/* ── Web Speech API Not Supported Notice ──────────────────────── */}
      {!isSupported && (
        <div
          id="suni-not-supported"
          className="suni-no-support"
          role="status"
          aria-label="Voice not available, showing transcript"
        >
          <span aria-hidden="true">📝</span> Voice unavailable — transcript shown below
        </div>
      )}

      {/* ── Fixed Top-Right Widget ────────────────────────────────────── */}
      <div
        ref={popoverRef}
        id="suni-voice-widget"
        className="suni-widget"
        role="region"
        aria-label="Suni voice controls"
      >
        {/* Mute / Unmute button */}
        <button
          id="suni-mute-btn"
          className={`suni-widget__btn ${muted || disabled ? 'suni-widget__btn--muted' : ''}`}
          onClick={onMuteToggle}
          aria-label={muted ? 'Unmute Suni' : 'Mute Suni'}
          aria-pressed={muted}
        >
          {disabled ? (
            <SuniOffIcon />
          ) : muted ? (
            <MuteIcon />
          ) : isPlaying ? (
            <WaveIcon animate={!prefersReducedMotion} />
          ) : (
            <SpeakerIcon />
          )}
        </button>

        {/* Settings / Volume popover toggle */}
        <button
          id="suni-settings-btn"
          className="suni-widget__settings-btn"
          onClick={() => setShowPopover((p) => !p)}
          aria-label={showPopover ? 'Close Suni settings' : 'Open Suni settings'}
          aria-expanded={showPopover}
        >
          <ChevronIcon open={showPopover} reduced={prefersReducedMotion} />
        </button>

        {/* Popover panel */}
        {showPopover && (
          <div
            className="suni-popover"
            role="dialog"
            aria-label="Suni voice settings"
          >
            {/* Header */}
            <div className="suni-popover__header">
              <span className="suni-popover__avatar" aria-hidden="true">🎙</span>
              <span className="suni-popover__title">Suni</span>
              <span
                className={`suni-popover__status ${isPlaying && !muted && !disabled ? 'suni-popover__status--active' : ''
                  }`}
                aria-live="polite"
              >
                {disabled ? 'Off' : isPlaying && !muted ? 'Speaking…' : 'Ready'}
              </span>
            </div>

            {/* Volume slider */}
            <label className="suni-popover__label" htmlFor="suni-volume-slider">
              Volume
              <input
                id="suni-volume-slider"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                disabled={disabled}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                className="suni-popover__slider"
                aria-label="Suni volume"
                aria-valuemin={0}
                aria-valuemax={1}
                aria-valuenow={muted ? 0 : volume}
              />
            </label>

            {/* Rate slider */}
            <label className="suni-popover__label" htmlFor="suni-rate-slider">
              Speed
              <input
                id="suni-rate-slider"
                type="range"
                min={0.8}
                max={1.1}
                step={0.05}
                value={rate}
                disabled={disabled}
                onChange={(e) => onRateChange(parseFloat(e.target.value))}
                className="suni-popover__slider"
                aria-label="Suni speaking rate"
                aria-valuemin={0.8}
                aria-valuemax={1.1}
                aria-valuenow={rate}
              />
              <span className="suni-popover__slider-value">
                {rate <= 0.85 ? 'Slow' : rate <= 0.95 ? 'Normal' : 'Fast'}
              </span>
            </label>

            {/* Replay actions */}
            <div className="suni-popover__actions">
              <button
                id="suni-replay-intro-btn"
                className="suni-popover__action-btn"
                onClick={() => { onReplayIntro(); setShowPopover(false); }}
                disabled={disabled}
                aria-label="Replay Suni introduction"
              >
                ↩ Replay intro
              </button>
              {activeSectionId && activeSectionId !== 'intro' && (
                <button
                  id="suni-replay-section-btn"
                  className="suni-popover__action-btn"
                  onClick={() => { onReplaySection(); setShowPopover(false); }}
                  disabled={disabled}
                  aria-label="Replay current section narration"
                >
                  ↺ Replay section
                </button>
              )}
            </div>

            {/* Mode toggle (only show if speech is supported) */}
            {isSupported && (
              <div className="suni-popover__mode">
                <span className="suni-popover__mode-label">Mode</span>
                <button
                  id="suni-mode-toggle"
                  className={`suni-popover__mode-toggle ${voiceMode === 'speech' ? 'active' : ''}`}
                  onClick={onVoiceModeToggle}
                  aria-label={`Switch to ${voiceMode === 'speech' ? 'audio' : 'speech'} mode`}
                  aria-pressed={voiceMode === 'speech'}
                >
                  {voiceMode === 'speech' ? '🗣 Speech' : '🔊 Audio'}
                </button>
              </div>
            )}

            {/* Transcript toggle */}
            <button
              id="suni-transcript-btn"
              className="suni-popover__action-btn"
              onClick={() => { setShowTranscript((p) => !p); setShowPopover(false); }}
              aria-label={showTranscript ? 'Hide transcript' : 'Show transcript'}
              aria-expanded={showTranscript}
            >
              📄 {showTranscript ? 'Hide' : 'Show'} transcript
            </button>

            {/* Disable toggle */}
            <button
              id="suni-disable-btn"
              className={`suni-popover__disable-btn ${disabled ? 'suni-popover__disable-btn--on' : ''}`}
              onClick={onDisableToggle}
              aria-label={disabled ? 'Enable Suni voice guide' : 'Disable Suni voice guide'}
              aria-pressed={disabled}
            >
              {disabled ? '✓ Enable Suni' : 'Disable Suni'}
            </button>
          </div>
        )}
      </div>

      {/* ── Inline Replay Button (bottom-right) ───────────────────────── */}
      {activeSectionId && !disabled && isSupported && (
        <button
          id="suni-replay-active-btn"
          className="suni-replay-btn"
          onClick={onReplaySection}
          aria-label="Replay Suni for this section"
        >
          <ReplayIcon /> Replay
        </button>
      )}

      {/* ── Transcript panel ─────────────────────────────────────────── */}
      {showTranscript && activeSection && (
        <div
          id="suni-transcript"
          className="suni-transcript"
          role="complementary"
          aria-label="Suni transcript"
        >
          <p className="suni-transcript__section">{activeSection.title}</p>
          <p className="suni-transcript__line">&ldquo;{activeSection.suniLine}&rdquo;</p>
        </div>
      )}

      {/* ── Styles ───────────────────────────────────────────────────────── */}
      <style jsx>{`
        /* ── Persistent floating chip ───────────────────────────────────── */
        .suni-chip {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(1, 71, 81, 0.96);
          color: #fff;
          border-radius: 999px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.08);
          backdrop-filter: blur(14px);
          white-space: nowrap;
          font-family: inherit;
          overflow: hidden;
          animation: suni-chip-in 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        /* Speaking state — slightly brighter */
        .suni-chip--playing {
          background: rgba(1, 85, 98, 0.97);
          box-shadow: 0 8px 32px rgba(1,71,81,0.45), 0 0 0 1px rgba(175,248,200,0.2);
        }
        .suni-chip--no-anim {
          animation: none;
        }
        @keyframes suni-chip-in {
          from { opacity: 0; transform: translateX(-50%) translateY(16px) scale(0.9); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        /* Bounce only when idle (not playing) */
        @media (prefers-reduced-motion: no-preference) {
          .suni-chip:not(.suni-chip--playing):not(.suni-chip--no-anim) {
            animation: suni-chip-bounce 2s ease-in-out infinite;
          }
        }
        @keyframes suni-chip-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(-5px); }
        }

        /* Dismiss × button */
        .suni-chip__dismiss {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.12);
          border: none;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          font-size: 12px;
          width: 32px;
          height: 44px;
          flex-shrink: 0;
          font-family: inherit;
          transition: background 0.15s, color 0.15s;
        }
        .suni-chip__dismiss:hover {
          background: rgba(255,255,255,0.22);
          color: #fff;
        }
        .suni-chip__dismiss:focus-visible {
          outline: 2px solid #AFF8C8;
          outline-offset: -2px;
        }

        /* Tap-to-play area (the main pill body) */
        .suni-chip__play-area {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 10px 18px 10px 14px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          transition: background 0.15s;
        }
        .suni-chip__play-area:hover:not(:disabled) {
          background: rgba(255,255,255,0.08);
        }
        .suni-chip__play-area:disabled {
          cursor: default;
        }
        .suni-chip__play-area:focus-visible {
          outline: 2px solid #AFF8C8;
          outline-offset: -2px;
        }

        .suni-chip__avatar { font-size: 17px; }
        .suni-chip__text   { letter-spacing: 0.01em; }

        /* Animated wave bars shown when speaking */
        .suni-chip__wave {
          display: flex;
          align-items: center;
          gap: 2px;
          height: 14px;
          margin-left: 2px;
        }
        .suni-chip__wave span {
          display: block;
          width: 3px;
          background: #AFF8C8;
          border-radius: 99px;
          animation: suni-bar 0.8s ease-in-out infinite;
        }
        .suni-chip__wave span:nth-child(1) { height: 6px;  animation-delay: 0s;    }
        .suni-chip__wave span:nth-child(2) { height: 12px; animation-delay: 0.15s; }
        .suni-chip__wave span:nth-child(3) { height: 8px;  animation-delay: 0.3s;  }
        @keyframes suni-bar {
          0%, 100% { transform: scaleY(1);   }
          50%       { transform: scaleY(0.4); }
        }

        /* Mobile adjustments */
        @media (max-width: 1023px) {
          .suni-chip {
            bottom: 144px;
            font-size: 13px;
          }
          .suni-chip__play-area {
            font-size: 13px;
            padding: 9px 14px 9px 12px;
          }
        }

        /* Not supported notice */
        .suni-no-support {
          position: fixed;
          top: 72px;
          right: 20px;
          z-index: 8800;
          background: #fef9c3;
          border: 1px solid #fde047;
          border-radius: 10px;
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 600;
          color: #854d0e;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }

        /* Widget container */
        .suni-widget {
          position: fixed;
          /* Desktop: top-right */
          top: 20px;
          right: 20px;
          z-index: 9000;
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(1,71,81,0.12);
          border-radius: 999px;
          padding: 5px 8px 5px 5px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06);
        }
        /* On mobile (below lg = 1024px), move to bottom-right so hamburger is free */
        @media (max-width: 1023px) {
          .suni-widget {
            top: auto;
            bottom: 80px;
            right: 16px;
          }
        }

        /* Main mute button */
        .suni-widget__btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: #014751;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          font-family: inherit;
        }
        .suni-widget__btn:hover { background: #015f6d; transform: scale(1.08); }
        .suni-widget__btn:focus-visible {
          outline: 2px solid #014751;
          outline-offset: 2px;
        }
        .suni-widget__btn--muted { background: #6b7280; }
        .suni-widget__btn--muted:hover { background: #4b5563; }

        /* Settings chevron button */
        .suni-widget__settings-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: #014751;
          padding: 4px;
          display: flex;
          align-items: center;
          opacity: 0.7;
          transition: opacity 0.2s;
          font-family: inherit;
        }
        .suni-widget__settings-btn:hover { opacity: 1; }
        .suni-widget__settings-btn:focus-visible {
          outline: 2px solid #014751;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Popover panel */
        .suni-popover {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 256px;
          background: #fff;
          border: 1px solid rgba(1,71,81,0.1);
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: suni-popover-in 0.18s ease;
        }
        /* On mobile, open upward since widget is at bottom */
        @media (max-width: 1023px) {
          .suni-popover {
            top: auto;
            bottom: calc(100% + 10px);
            max-height: 70vh;
            overflow-y: auto;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .suni-popover { animation: none; }
        }
        @keyframes suni-popover-in {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .suni-popover__header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .suni-popover__avatar { font-size: 20px; }
        .suni-popover__title {
          font-weight: 700;
          font-size: 14px;
          color: #014751;
          flex: 1;
        }
        .suni-popover__status {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          background: #f3f4f6;
          border-radius: 999px;
          padding: 2px 8px;
        }
        .suni-popover__status--active {
          color: #014751;
          background: #d1fae5;
        }
        @media (prefers-reduced-motion: no-preference) {
          .suni-popover__status--active {
            animation: suni-pulse 1.5s ease-in-out infinite;
          }
        }
        @keyframes suni-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        /* Slider label */
        .suni-popover__label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .suni-popover__slider-value {
          font-size: 10px;
          font-weight: 600;
          color: #014751;
          text-align: right;
          text-transform: none;
          letter-spacing: 0;
        }
        .suni-popover__slider {
          width: 100%;
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 999px;
          background: #e5e7eb;
          outline: none;
          cursor: pointer;
        }
        .suni-popover__slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #014751;
          border: 2px solid #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        .suni-popover__slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #014751;
          border: 2px solid #fff;
          cursor: pointer;
        }
        .suni-popover__slider:focus-visible {
          outline: 2px solid #014751;
          outline-offset: 2px;
        }
        .suni-popover__slider:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Replay actions */
        .suni-popover__actions {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .suni-popover__action-btn {
          background: #f3f4f6;
          border: none;
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s;
          font-family: inherit;
        }
        .suni-popover__action-btn:hover { background: #e5e7eb; }
        .suni-popover__action-btn:focus-visible {
          outline: 2px solid #014751;
          outline-offset: 2px;
        }
        .suni-popover__action-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        /* Mode toggle */
        .suni-popover__mode {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .suni-popover__mode-label {
          font-size: 11px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .suni-popover__mode-toggle {
          font-size: 12px;
          font-weight: 700;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 4px 10px;
          background: #fff;
          cursor: pointer;
          color: #374151;
          transition: all 0.15s;
          font-family: inherit;
        }
        .suni-popover__mode-toggle.active {
          background: #014751;
          color: #fff;
          border-color: #014751;
        }
        .suni-popover__mode-toggle:focus-visible {
          outline: 2px solid #014751;
          outline-offset: 2px;
        }

        /* Disable button */
        .suni-popover__disable-btn {
          border: none;
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          background: #fef2f2;
          color: #ef4444;
          font-family: inherit;
          text-align: left;
        }
        .suni-popover__disable-btn:hover { background: #fee2e2; }
        .suni-popover__disable-btn--on {
          background: #f0fdf4;
          color: #22c55e;
        }
        .suni-popover__disable-btn--on:hover { background: #dcfce7; }
        .suni-popover__disable-btn:focus-visible {
          outline: 2px solid #014751;
          outline-offset: 2px;
        }

        /* Inline replay button */
        .suni-replay-btn {
          position: fixed;
          bottom: 28px;
          right: 20px;
          z-index: 8990;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(1,71,81,0.92);
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 9px 18px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          transition: background 0.2s, transform 0.15s;
          font-family: inherit;
        }
        /* On mobile, the widget is at bottom-right, so hide inline replay to avoid crowding */
        @media (max-width: 1023px) {
          .suni-replay-btn {
            display: none;
          }
        }
        .suni-replay-btn:hover { background: rgba(1,91,101,0.98); transform: scale(1.04); }
        .suni-replay-btn:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: no-preference) {
          .suni-replay-btn {
            animation: suni-slide-up 0.3s ease;
          }
        }
        @keyframes suni-slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Transcript panel */
        .suni-transcript {
          position: fixed;
          bottom: 76px;
          right: 20px;
          z-index: 8980;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(1,71,81,0.12);
          border-radius: 16px;
          padding: 14px 16px;
          max-width: 280px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          animation: suni-slide-up 0.25s ease;
        }
        /* On mobile, show transcript above the bottom widget */
        @media (max-width: 1023px) {
          .suni-transcript {
            bottom: 140px;
            right: 16px;
            max-width: calc(100vw - 32px);
          }
        }
        .suni-transcript__section {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #014751;
          margin: 0 0 6px;
        }
        .suni-transcript__line {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </>
  );
}

// ── Icon Components ────────────────────────────────────────────────────────

function WaveIcon({ animate }: { animate: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="2" y="8" width="3" height="8" rx="1.5">
        {animate && (
          <>
            <animate attributeName="height" values="4;14;4" dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="y" values="10;5;10" dur="0.8s" repeatCount="indefinite" />
          </>
        )}
      </rect>
      <rect x="7" y="5" width="3" height="14" rx="1.5">
        {animate && (
          <>
            <animate attributeName="height" values="14;4;14" dur="0.8s" repeatCount="indefinite" />
            <animate attributeName="y" values="5;10;5" dur="0.8s" repeatCount="indefinite" />
          </>
        )}
      </rect>
      <rect x="12" y="3" width="3" height="18" rx="1.5">
        {animate && (
          <>
            <animate attributeName="height" values="18;8;18" dur="0.7s" repeatCount="indefinite" />
            <animate attributeName="y" values="3;8;3" dur="0.7s" repeatCount="indefinite" />
          </>
        )}
      </rect>
      <rect x="17" y="6" width="3" height="12" rx="1.5">
        {animate && (
          <>
            <animate attributeName="height" values="12;5;12" dur="0.9s" repeatCount="indefinite" />
            <animate attributeName="y" values="6;9;6" dur="0.9s" repeatCount="indefinite" />
          </>
        )}
      </rect>
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

function SuniOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v6l5 4V5L9 9zM2 9h4" />
      <path d="M2 15h4" />
    </svg>
  );
}

function ChevronIcon({ open, reduced }: { open: boolean; reduced: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? 'rotate(180deg)' : 'none',
        transition: reduced ? 'none' : 'transform 0.2s',
      }}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
    </svg>
  );
}
