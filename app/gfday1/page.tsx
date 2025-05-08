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

const GfDayPage = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [activeScene, setActiveScene] = useState(0); // To track visible scene for animations
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);

  // Play audio and set up Intersection Observer
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error("Audio play failed - user interaction might be needed:", error));
    }

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
      { threshold: 0.5 } // Trigger when 50% of the scene is visible
    );

    sceneRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sceneRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const scenes = [
    {
      id: 1,
      text: "Hey Mel, you're looking beautiful \\n :-)",
      images: [],
    },
    {
      id: 2,
      text: "We look pretty cute together...",
      images: [
        // TODO: Update width/height to actual image aspect ratios for optimal display
        { src: '/gfday1/MJ0.jpg', alt: 'MJ0', width: 250, height: 375 },
        { src: '/gfday1/MJ1.jpg', alt: 'MJ1', width: 250, height: 375 },
        { src: '/gfday1/MJ2.jpg', alt: 'MJ2', width: 250, height: 375 },
        { src: '/gfday1/MJ3.jpg', alt: 'MJ3', width: 250, height: 375 },
        { src: '/gfday1/MJ4.jpg', alt: 'MJ4', width: 250, height: 375 },
      ],
    },
    {
      id: 3,
      text: "I love you",
      // TODO: Update width/height to actual image aspect ratios
      images: [{ src: '/gfday1/Toes.jpg', alt: 'Toes', width: 300, height: 450 }],
    },
    {
      id: 4,
      text: "will you be my girlfriend?",
      images: [],
      buttons: true,
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white font-playfair-display">
      <audio ref={audioRef} src="/gfday1/sedona.mp3" loop />

      {scenes.map((scene, index) => (
        <section
          key={scene.id}
          ref={(el: HTMLElement | null) => { sceneRefs.current[index] = el; }}
          className="h-screen flex flex-col justify-center items-center text-center snap-start p-5 relative"
        >
          <AnimatedSceneContent isVisible={activeScene === index}>
            <p className="text-4xl md:text-5xl lg:text-6xl mb-8 whitespace-pre-line leading-tight">
              {scene.text}
            </p>
            {scene.images.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
                {scene.images.map((img, imgIndex) => (
                  <div key={imgIndex} className="rounded-lg overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105">
                    {/* 
                      NOTE: For Next.js Image component, ensure your next.config.js is configured 
                      to allow images from the source if it's an external domain.
                      For local images in /public, this is usually fine by default.
                      Update width & height props to match your images' aspect ratios for best results.
                    */}
                    <Image 
                      src={img.src} 
                      alt={img.alt} 
                      width={img.width || 200} // Default width if not specified 
                      height={img.height || 300} // Default height if not specified
                      className="object-cover"
                      priority={index === 0 || index === 1} // Prioritize images in early scenes
                    />
                  </div>
                ))}
              </div>
            )}
            {scene.buttons && (
              <div className="mt-10 space-x-6">
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white font-geist-sans font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  onClick={() => alert('She said YES!!! 🎉❤️')}
                >
                  Yes
                </button>
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white font-geist-sans font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  onClick={() => alert('Maybe next time... 😢')}
                >
                  No
                </button>
              </div>
            )}
          </AnimatedSceneContent>
        </section>
      ))}
    </div>
  );
};

export default GfDayPage; 