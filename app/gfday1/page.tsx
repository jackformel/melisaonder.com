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
        // === PLEASE UPDATE THESE DIMENSIONS ===
        { src: '/gfday1/MJ0.jpg', alt: 'MJ0', width: 300, height: 450, fit: 'cover' }, // Example: taller photo
        { src: '/gfday1/MJ1.jpg', alt: 'MJ1', width: 400, height: 300, fit: 'contain' }, // Example: wider photo, show all
        { src: '/gfday1/MJ2.jpg', alt: 'MJ2', width: 350, height: 500, fit: 'cover' },
        { src: '/gfday1/MJ3.jpg', alt: 'MJ3', width: 300, height: 400, fit: 'contain' },
        { src: '/gfday1/MJ4.jpg', alt: 'MJ4', width: 500, height: 350, fit: 'cover' },
        // === END OF PLACEHOLDER DIMENSIONS ===
      ],
    },
    {
      id: 3,
      text: "I love you",
      images: [
        // === PLEASE UPDATE THESE DIMENSIONS ===
        { src: '/gfday1/Toes.jpg', alt: 'Toes photo', width: 400, height: 500, fit: 'contain' },
        // === END OF PLACEHOLDER DIMENSIONS ===
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
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white font-playfair-display">
      <audio ref={audioRef} src="/gfday1/sedona.mp3" loop />

      {scenes.map((scene, index) => (
        <section
          key={scene.id}
          ref={(el: HTMLElement | null) => { sceneRefs.current[index] = el; }}
          className="h-screen flex flex-col justify-center items-center text-center snap-start p-5 relative overflow-hidden"
        >
          <AnimatedSceneContent isVisible={activeScene === index}>
            <p className="text-4xl md:text-5xl lg:text-6xl mb-8 whitespace-pre-line leading-tight">
              {scene.text}
            </p>
            {scene.images.length > 0 && (
              <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
                {scene.images.map((img, imgIndex) => (
                  <div 
                    key={imgIndex} 
                    className="rounded-lg overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105 bg-gray-800/50"
                    // Set a fixed container size based on image width for better control with object-fit
                    // You might want to adjust these container sizes based on your design
                    style={{ width: img.width, height: img.height }} >
                    <Image 
                      src={img.src} 
                      alt={img.alt}
                      width={img.width} 
                      height={img.height}
                      // Apply object-fit based on the 'fit' property or default to 'contain'
                      className={`w-full h-full ${img.fit === 'cover' ? 'object-cover' : 'object-contain'}`}
                      priority={index < 2} // Prioritize images in early scenes
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