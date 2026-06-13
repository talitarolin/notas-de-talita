'use client';

import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';
import Image from 'next/image';

interface LightboxContextValue {
    open: (images: string[], index?: number) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
    const [images, setImages] = useState<string[]>([]);
    const [current, setCurrent] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const open = (imagesList: string[], index = 0) => {
        setImages(imagesList);
        setCurrent(index);
        setIsOpen(true);
    };

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
            if (event.key === 'ArrowRight') {
                setCurrent((value) => (value + 1) % images.length);
            }
            if (event.key === 'ArrowLeft') {
                setCurrent((value) => (value - 1 + images.length) % images.length);
            }
        };
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, images.length]);

    return (
        <LightboxContext.Provider value={{ open }}>
            {children}
            {isOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6" role="dialog" aria-modal="true">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="absolute right-6 top-6 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-white"
                        aria-label="Fechar visualização"
                    >
                        ✕
                    </button>
                    <button
                        type="button"
                        onClick={() => setCurrent((value) => (value - 1 + images.length) % images.length)}
                        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-white"
                        aria-label="Imagem anterior"
                    >
                        ←
                    </button>
                    <Image
                        src={images[current]}
                        alt="Visualização ampliada"
                        width={1600}
                        height={1000}
                        className="max-h-[85vh] w-auto max-w-full rounded-[14px] object-contain"
                    />
                    <button
                        type="button"
                        onClick={() => setCurrent((value) => (value + 1) % images.length)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-white"
                        aria-label="Próxima imagem"
                    >
                        →
                    </button>
                </div>
            ) : null}
        </LightboxContext.Provider>
    );
}

export function useLightbox() {
    const context = useContext(LightboxContext);
    if (!context) {
        throw new Error('useLightbox must be used within LightboxProvider');
    }
    return context;
}
