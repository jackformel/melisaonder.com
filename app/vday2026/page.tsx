'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Valentine-themed Confetti (pink/white palette)
const Confetti = () => {
  const particles = Array.from({ length: 50 }).map((_, i) => {
    const left = Math.random() * 100;
    const size = Math.random() * 0.8 + 0.4;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 0.5;
    const color = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFC0CB', '#FF007F', '#FFFFFF'][
      Math.floor(Math.random() * 6)
    ];

    return (
      <div
        key={i}
        className="absolute top-0 confetti"
        style={{
          left: `${left}%`,
          width: `${size}rem`,
          height: `${size}rem`,
          backgroundColor: color,
          animation: `confettiFall ${duration}s ease-in ${delay}s forwards`,
          transform: `rotate(${Math.random() * 360}deg)`,
          opacity: Math.random() * 0.4 + 0.6,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <style jsx global>{`
        @keyframes confettiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .confetti { position: absolute; will-change: transform; }
      `}</style>
      {particles}
    </div>
  );
};

// Floating Hearts ambient animation
const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }).map((_, i) => {
    const left = Math.random() * 100;
    const size = Math.random() * 1.2 + 0.5;
    const duration = Math.random() * 6 + 5;
    const delay = Math.random() * 4;
    const opacity = Math.random() * 0.25 + 0.08;

    return (
      <div
        key={i}
        className="absolute bottom-0 text-pink-400"
        style={{
          left: `${left}%`,
          fontSize: `${size}rem`,
          animation: `heartFloat ${duration}s ease-in ${delay}s infinite`,
          opacity,
        }}
      >
        &#9829;
      </div>
    );
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <style jsx global>{`
        @keyframes heartFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) rotate(25deg); opacity: 0; }
        }
      `}</style>
      {hearts}
    </div>
  );
};

const NO_BUTTON_LABELS = [
  'No',          // 0
  'No',          // 1
  'No',          // 2
  'Still no?',   // 3
  'Still no?',   // 4
  'Really?',     // 5
  'Really?',     // 6
  'Are you sure?', // 7
  'Are you sure?', // 8
  'Last chance...', // 9
];

const VDay2026Page = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  const [outcome, setOutcome] = useState<'none' | 'yes' | 'no'>('none');
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);
  const [noButtonVisible, setNoButtonVisible] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);

  const startAudio = useCallback(() => {
    if (!audioStarted && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setAudioStarted(true);
    }
  }, [audioStarted]);

  const calculateSafePosition = useCallback((): { x: number; y: number } => {
    const BUTTON_W = 130;
    const BUTTON_H = 54;
    const EDGE = 16;
    const BUFFER = 24;

    const excludeRects: DOMRect[] = [];
    if (questionRef.current) excludeRects.push(questionRef.current.getBoundingClientRect());
    if (yesButtonRef.current) excludeRects.push(yesButtonRef.current.getBoundingClientRect());

    const maxX = window.innerWidth - BUTTON_W - EDGE;
    const maxY = window.innerHeight - BUTTON_H - EDGE;
    const minX = EDGE;
    const minY = EDGE;

    for (let i = 0; i < 50; i++) {
      const x = minX + Math.random() * (maxX - minX);
      const y = minY + Math.random() * (maxY - minY);

      const overlaps = excludeRects.some(
        (r) =>
          !(x + BUTTON_W < r.left - BUFFER ||
            x > r.right + BUFFER ||
            y + BUTTON_H < r.top - BUFFER ||
            y > r.bottom + BUFFER)
      );

      if (!overlaps) return { x, y };
    }

    return { x: minX, y: minY };
  }, []);

  const handleNoInteraction = useCallback(() => {
    startAudio();
    const newCount = noCount + 1;
    setNoCount(newCount);

    if (newCount >= 10) {
      setOutcome('no');
      return;
    }

    // Mobile: fade out, reposition, fade in
    setNoButtonVisible(false);
    setTimeout(() => {
      setNoButtonPos(calculateSafePosition());
      setNoButtonVisible(true);
    }, 150);
  }, [noCount, calculateSafePosition, startAudio]);

  const handleNoHover = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      startAudio();
      const newCount = noCount + 1;
      setNoCount(newCount);

      if (newCount >= 10) {
        setOutcome('no');
        return;
      }

      setNoButtonPos(calculateSafePosition());
    }
  }, [noCount, calculateSafePosition, startAudio]);

  const handleYesClick = () => {
    startAudio();
    setOutcome('yes');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 6000);
  };

  const handleTryAgain = () => {
    setOutcome('none');
    setNoCount(0);
    setNoButtonPos(null);
    setNoButtonVisible(true);
  };

  // Recalculate position on resize if button is teleported
  useEffect(() => {
    const onResize = () => {
      if (noButtonPos) {
        setNoButtonPos(calculateSafePosition());
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [noButtonPos, calculateSafePosition]);

  const noLabel = NO_BUTTON_LABELS[Math.min(noCount, NO_BUTTON_LABELS.length - 1)];
  const yesScale = 1 + noCount * 0.08;

  return (
    <div className="h-screen w-screen bg-black text-white font-playfair-display relative overflow-hidden">
      <audio ref={audioRef} src="/vday2026/i-dream-of-you.mp3" loop />

      <FloatingHearts />

      {/* ============ QUESTION SCREEN ============ */}
      {outcome === 'none' && (
        <div className="fixed inset-0 flex flex-col justify-center items-center z-10 px-6">
          <div ref={questionRef} className="text-center mb-12">
            <p className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              Will you be my Valentine?
            </p>
          </div>

          <div className="flex gap-6 items-center">
            <button
              ref={yesButtonRef}
              onClick={handleYesClick}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 ease-in-out shadow-lg shadow-pink-500/40 animate-pulse"
              style={{ transform: `scale(${yesScale})` }}
            >
              Yes
            </button>

            {!noButtonPos && (
              <button
                onClick={handleNoInteraction}
                onMouseEnter={handleNoHover}
                className={`bg-red-400/70 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg text-xl shadow-lg transition-opacity duration-150 ease-in-out ${noButtonVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                {noLabel}
              </button>
            )}
          </div>

          {/* Teleported No button (fixed position) */}
          {noButtonPos && (
            <button
              onClick={handleNoInteraction}
              onMouseEnter={handleNoHover}
              className={`fixed z-30 bg-red-400/70 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-lg text-xl shadow-lg transition-opacity duration-150 ease-in-out ${noButtonVisible ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: noButtonPos.x, top: noButtonPos.y }}
            >
              {noLabel}
            </button>
          )}
        </div>
      )}

      {/* ============ YES OUTCOME ============ */}
      {outcome === 'yes' && (
        <div className="fixed inset-0 bg-black flex flex-col items-center z-40 overflow-y-auto">
          {showConfetti && <Confetti />}

          <div className="flex flex-col items-center text-center px-6 py-12 max-w-lg mx-auto min-h-screen justify-start pt-16">
            <p className="text-3xl md:text-4xl font-playfair-display text-pink-300 mb-8 animate-pulse">
              Congrats, you would love me as a worm
            </p>

            {/* Goat video with text overlay */}
            <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-2xl mb-8">
              <video
                src="/vday2026/goats.MOV"
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-xl"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="bg-black/60 backdrop-blur-sm text-white text-lg md:text-xl font-playfair-display px-4 py-2 rounded-full">
                  Love you goat &lt;3
                </span>
              </div>
            </div>

            {/* Couple photo */}
            <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-2xl mb-8">
              <Image
                src="/vday2026/couple.jpg"
                alt="Us"
                width={4032}
                height={3024}
                className="w-full object-cover rounded-xl"
                priority
              />
            </div>

            {/* Elegant IOU Card */}
            <div className="w-full max-w-sm rounded-xl border-2 border-pink-400/50 bg-gradient-to-b from-pink-950/40 to-black p-8 shadow-2xl shadow-pink-500/10 mb-12">
              <div className="border border-pink-400/30 rounded-lg p-6">
                <p className="text-sm tracking-[0.3em] text-pink-400/70 uppercase mb-4">
                  Valentine&apos;s 2026
                </p>
                <p className="text-2xl md:text-3xl font-playfair-display text-white mb-2">
                  IOU
                </p>
                <p className="text-xl md:text-2xl font-playfair-display text-pink-200 mb-6">
                  One dinner at Rodneys
                </p>
                <div className="w-16 h-px bg-pink-400/50 mx-auto mb-6" />
                <p className="text-lg font-playfair-display text-pink-300/80">
                  See you soon baby, love you
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============ NO OUTCOME ============ */}
      {outcome === 'no' && (
        <div className="fixed inset-0 bg-black flex flex-col justify-center items-center z-40 px-6 text-center">
          <p className="text-2xl md:text-3xl font-playfair-display text-gray-400 mb-3">
            Confirmed:
          </p>
          <p className="text-3xl md:text-4xl font-playfair-display text-pink-300 mb-8">
            You would not love me as a worm
          </p>
          <p className="text-6xl mb-10">&#129667;&#128148;</p>
          <button
            onClick={handleTryAgain}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg"
          >
            Try Again?
          </button>
        </div>
      )}
    </div>
  );
};

export default VDay2026Page;
