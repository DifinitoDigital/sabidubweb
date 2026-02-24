import { useEffect, useRef, useState } from 'react';

/**
 * useSectionObserver
 *
 * Watches all elements with [data-suni-section] and reports which
 * section ID is currently most visible (requires ≥ 40% intersection).
 *
 * Re-observes on mount and after a short delay (for hydration timing).
 */
export function useSectionObserver(sectionIds: string[]): string | null {
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
    const ratiosRef = useRef<Record<string, number>>({});
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !sectionIds.length) return;

        const pick = () => {
            let maxRatio = 0;
            let bestId: string | null = null;
            for (const [id, ratio] of Object.entries(ratiosRef.current)) {
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    bestId = id;
                }
            }
            // Require at least 40% visibility before switching
            if (maxRatio >= 0.4 && bestId) {
                setActiveSectionId(bestId);
            }
        };

        // Disconnect any previous observer
        observerRef.current?.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const id = (entry.target as HTMLElement).dataset.suniSection;
                    if (id) {
                        ratiosRef.current[id] = entry.intersectionRatio;
                    }
                }
                pick();
            },
            {
                // Fine-grained thresholds so we catch any crossing of the 40% mark
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            }
        );

        const observe = () => {
            const elements = document.querySelectorAll<HTMLElement>('[data-suni-section]');
            elements.forEach((el) => observerRef.current!.observe(el));
        };

        // Observe immediately (SSR content is in DOM) and again after 500ms
        // to catch any client-only rendered sections
        observe();
        const retryTimer = setTimeout(observe, 500);

        return () => {
            clearTimeout(retryTimer);
            observerRef.current?.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionIds.join(',')]);

    return activeSectionId;
}
