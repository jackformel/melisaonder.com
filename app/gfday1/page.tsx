'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
// import ReactConfetti from 'react-confetti'; // Will add later for Yes button

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
  const [showOverlay, setShowOverlay] = useState(true);

  // State for "No" button outcome
  const [noButtonClicked, setNoButtonClicked] = useState(false);
  const [currentSnapImage, setCurrentSnapImage] = useState<'/gfday1/Snap0.PNG' | '/gfday1/Snap1.png' | null>(null);
  const [snapImageOpacity, setSnapImageOpacity] = useState(0);
  const snapTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State for "Yes" button outcome (confetti) - will implement later
  // const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Audio will be triggered by user interaction via overlay
    // console.log("Scenes data for /gfday1:", JSON.stringify(scenes, null, 2)); 

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
    if (!showOverlay) { // Only observe if overlay is hidden
      currentSceneRefs.forEach(ref => {
        if (ref) observer.observe(ref);
      });
    }

    return () => {
      currentSceneRefs.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, [showOverlay]); // Re-run effect if showOverlay changes

  const handleStartExperience = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio play failed even after interaction:", error);
        // Optionally, provide feedback to the user if audio still fails
      });
    }
    setShowOverlay(false);
  };

  const handleNoClick = () => {
    setNoButtonClicked(true);
    setCurrentSnapImage('/gfday1/Snap0.PNG');
    setSnapImageOpacity(1); // Snap0 becomes visible immediately

    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);

    snapTimeoutRef.current = setTimeout(() => {
      // Start fading out Snap0 after 1.5s (it was visible for 1.5s)
      // For a 1.5s fade, we might need to use CSS transitions or an animation library for smoother control.
      // This simple opacity change will be more abrupt for the fade itself.
      // To achieve a smooth 1.5s fade, we'd set opacity to 0 here and rely on CSS transition property.
      // For now, let's just swap the image after a delay.
      // A true cross-fade is more complex with timed opacity changes on two images.
      // This implementation will show Snap0, then Snap1 after a delay.
      
      // After Snap0 has been shown for 1.5s, switch to Snap1
      setCurrentSnapImage('/gfday1/Snap1.png');
      setSnapImageOpacity(1); // Snap1 becomes visible

      // If you want Snap0 to fade out *while* Snap1 fades in, that requires two image elements
      // and more complex opacity/timing management.
    }, 1500); // Total time Snap0 is fully visible or starting to fade
  };

  const handleYesClick = () => {
    alert('She said YES!!! 🎉❤️'); // Placeholder, will add confetti
    // setShowConfetti(true);
  };

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
        //{ src: '/gfday1/MJ3.JPEG', alt: 'MJ3', width: 1200, height: 1600, fit: 'contain' },
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
    <div className="h-screen overflow-y-scroll bg-black text-white font-playfair-display relative">
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center z-50">
          <h2 className="text-4xl font-playfair-display mb-8 text-white">A little something...</h2>
          <button 
            onClick={handleStartExperience}
            className="bg-pink-500 hover:bg-pink-600 text-white font-geist-sans font-bold py-4 px-10 rounded-lg text-2xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75"
          >
            Click to Begin
          </button>
        </div>
      )}

      {/* "No" Button Outcome Overlay */} 
      {noButtonClicked && currentSnapImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex flex-col justify-center items-center z-40 p-4">
          <Image 
            key={currentSnapImage} // Key change to force re-render/transition if src changes
            src={currentSnapImage}
            alt={currentSnapImage === '/gfday1/Snap0.PNG' ? "Snap 0 - Oh no!" : "Snap 1 - Maybe next time!"}
            width={currentSnapImage === '/gfday1/Snap0.PNG' ? 1170 : 1024}
            height={currentSnapImage === '/gfday1/Snap0.PNG' ? 2532 : 1536}
            className="object-contain max-w-full max-h-[80vh] rounded-lg shadow-xl transition-opacity duration-1500 ease-in-out"
            style={{ opacity: snapImageOpacity }}
            priority
          />
          {/* Optional: Add a message or a button to close this view eventually */}
        </div>
      )}

      <audio ref={audioRef} src="/gfday1/sedona.mp3" loop />

      {!showOverlay && !noButtonClicked && scenes.map((scene, index) => (
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
            {scene.buttons && (
              <div className="mt-10 space-x-6">
                <button 
                  className="bg-green-500 hover:bg-green-600 text-white font-geist-sans font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  onClick={handleYesClick}
                >
                  Yes
                </button>
                <button 
                  className="bg-red-500 hover:bg-red-600 text-white font-geist-sans font-bold py-3 px-8 rounded-lg text-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  onClick={handleNoClick}
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