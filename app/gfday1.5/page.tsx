'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Helper component for animated scene content
const AnimatedSceneContent = ({ children, isVisible }: { children: React.ReactNode, isVisible: boolean }) => {
  return (
    <div className={`transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

const GfDay15Page = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sceneIndex = sceneRefs.current.indexOf(entry.target as HTMLElement);
            if (sceneIndex !== -1) {
              setActiveScene(sceneIndex);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentSceneRefs = sceneRefs.current;
    if (!showOverlay) {
      currentSceneRefs.forEach(ref => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      currentSceneRefs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [showOverlay]);

  const handleStartExperience = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio play failed:", error);
      });
    }
    setShowOverlay(false);
  };

  const scenes = [
    {
      id: 1,
      text: "Hi Mel",
      images: [
        { src: '/gfday1.5/hi-1.jpg', alt: 'Hi Mel', width: 3024, height: 4032, fit: 'contain' },
      ],
    },
    {
      id: 2,
      text: "I know you're looking beautiful as always…",
      images: [
        { src: '/gfday1.5/beautiful-1.jpg', alt: 'Beautiful 1', width: 3024, height: 4032, fit: 'contain' },
        { src: '/gfday1.5/beautiful-2.jpg', alt: 'Beautiful 2', width: 3024, height: 4032, fit: 'contain' },
      ],
    },
    {
      id: 3,
      text: "Thank you for sleeping away the past 6 months with me…",
      images: [
        { src: '/gfday1.5/sleepy-1.jpg', alt: 'Sleepy 1', width: 3024, height: 4032, fit: 'contain' },
        { src: '/gfday1.5/sleepy-2.jpg', alt: 'Sleepy 2', width: 3024, height: 4032, fit: 'contain' },
      ],
    },
    {
      id: 4,
      text: "Can't wait to take care of you and my Lily bear for ever and ever",
      images: [
        { src: '/gfday1.5/lilybear-1.jpg', alt: 'Lily Bear 1', width: 3024, height: 4032, fit: 'contain' },
        { src: '/gfday1.5/lilybear-2.jpg', alt: 'Lily Bear 2', width: 3024, height: 4032, fit: 'contain' },
        { src: '/gfday1.5/lilybear-3.jpg', alt: 'Lily Bear 3', width: 3024, height: 4032, fit: 'contain' },
      ],
    },
    {
      id: 5,
      text: "Love you Mel, happy 6 months ❤️",
      images: [
        { src: '/gfday1.5/love-1.jpg', alt: 'Love 1', width: 3024, height: 4032, fit: 'contain' },
        { src: '/gfday1.5/love-2.jpg', alt: 'Love 2', width: 3024, height: 4032, fit: 'contain' },
        { src: '/gfday1.5/love-3.jpg', alt: 'Love 3', width: 3024, height: 4032, fit: 'contain' },
        { src: '/gfday1.5/love-4.jpg', alt: 'Love 4', width: 3024, height: 4032, fit: 'contain' },
      ],
    },
    {
      id: 6,
      text: "- Love, your hedgehog",
      images: [
        { src: '/gfday1.5/hedgehog-1.jpg', alt: 'Your Hedgehog', width: 3024, height: 4032, fit: 'contain' },
      ],
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll bg-black text-white font-playfair-display relative">
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center z-50">
          <h2 className="text-4xl font-playfair-display mb-8 text-white">Happy 6 Months ❤️</h2>
          <button
            onClick={handleStartExperience}
            className="bg-pink-500 hover:bg-pink-600 text-white font-geist-sans font-bold py-4 px-10 rounded-lg text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
          >
            Click to Begin
          </button>
        </div>
      )}

      <audio ref={audioRef} src="/gfday1.5/i-wanna-be-your-girlfriend.mp3" loop />

      {!showOverlay && scenes.map((scene, index) => (
        <section
          key={scene.id}
          ref={(el: HTMLElement | null) => { sceneRefs.current[index] = el; }}
          className="min-h-screen flex flex-col justify-center items-center text-center p-5 relative overflow-hidden"
        >
          <AnimatedSceneContent isVisible={activeScene === index || true}>
            <p className="text-4xl md:text-5xl lg:text-6xl mb-8 whitespace-pre-line leading-tight">
              {scene.text}
            </p>
            {scene.images.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-8">
                {scene.images.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="rounded-lg overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105 bg-gray-800/50"
                    style={{ width: 'clamp(250px, 30vw, 400px)', height: 'auto' }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      className={`w-full h-full ${img.fit === 'cover' ? 'object-cover' : 'object-contain'}`}
                      priority={index < 2}
                    />
                  </div>
                ))}
              </div>
            )}
          </AnimatedSceneContent>
        </section>
      ))}
    </div>
  );
};

export default GfDay15Page;
