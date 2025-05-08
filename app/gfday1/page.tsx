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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.error("Audio play failed - user interaction might be needed:", error));
    }

    // Log scenes data to browser console for debugging image paths
    // console.log("Scenes data for /gfday1:", JSON.stringify(scenes, null, 2)); // User added, keep for their debugging

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

    const currentSceneRefs = sceneRefs.current;
    currentSceneRefs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentSceneRefs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []); // Removed scenes from dependency array as it's stable

  // IMPORTANT: Update width and height for each image to its actual dimensions!
  const scenes = [
    {
      id: 1,
      text: "Hey Mel, you're looking beautiful \n :-)",
      images: [],
    },
    {
      id: 2,
      text: "We look pretty cute together...",
      images: [
        { src: '/gfday1/MJ0.JPG', alt: 'MJO', width: 4608, height: 3456, fit: 'contain' },
        { src: '/gfday1/MJ1.JPEG', alt: 'MJ1', width: 4608, height: 3456, fit: 'contain' },
        { src: '/gfday1/MJ2.PNG', alt: 'MJ2', width: 3840, height: 2560, fit: 'contain' },
        { src: '/gfday1/MJ3.JPEG', alt: 'MJ3', width: 1200, height: 1600, fit: 'contain' },
        { src: '/gfday1/MJ4.jpg', alt: 'MJ4', width: 3024, height: 4032, fit: 'contain' },
      ],
    },
    {
      id: 3,
      text: "I love you",
      images: [
        { src: '/gfday1/Toes.JPG', alt: 'Toes photo', width: 1242, height: 2208, fit: 'contain' },
      ],
    },
    {
      id: 4,
      text: "will you be my girlfriend?",
      images: [],
      buttons: true,
    },
  ];

  // Re-adding the log here if the user wants to see the structure with new 'fit' property
  useEffect(() => {
    console.log("Updated scenes data for /gfday1:", JSON.stringify(scenes, null, 2));
  }, [scenes]); // Log if scenes structure changes (it does initially)


  return (
    <div className="h-screen overflow-y-scroll bg-black text-white font-playfair-display">
      <audio ref={audioRef} src="/gfday1/sedona.mp3" loop />

      {scenes.map((scene, index) => (
        <section
          key={scene.id}
          ref={(el: HTMLElement | null) => { sceneRefs.current[index] = el; }}
          className="min-h-screen flex flex-col justify-center items-center text-center p-5 relative overflow-hidden"
        >
          <AnimatedSceneContent isVisible={activeScene === index || true}> {/* Always visible for continuous scroll, or activeScene === index for fade on view */} 
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