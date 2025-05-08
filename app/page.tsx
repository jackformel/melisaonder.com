import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from './components/shared/Footer';
import StatsDisplay from './components/modeling/StatsDisplay';

// Centerpiece image
const centerImage = { 
  src: '/modeling/TorsoThighA.JPEG', 
  altText: 'Torso and thigh A - Centerpiece' 
};

// Petals arranged for a hexagon (6 points around center)
// The order affects how they'll map to positions in the flower
const petalImages = [
  { src: '/modeling/CloseUp.JPEG', altText: 'Close up photo' },        // Top (12 o'clock)
  { src: '/modeling/FullBody.JPEG', altText: 'Full body photo' },       // Top-Right (2 o'clock)
  { src: '/modeling/SideZoomOut.JPEG', altText: 'Side zoom out photo' }, // Bottom-Right (4 o'clock)
  { src: '/modeling/Side.JPEG', altText: 'Side profile photo' },        // Bottom (6 o'clock)
  { src: '/modeling/SideBody.JPEG', altText: 'Side body photo' },      // Bottom-Left (8 o'clock)
  { src: '/modeling/TorsoThighB.JPEG', altText: 'Torso and thigh B photo' },// Top-Left (10 o'clock)
];

// SVG Icon for the contact button (User Icon)
const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);

// Social Media Icons
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-3">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.27.058 2.15.24 2.91.556.795.326 1.45.795 2.028 1.374.577.577.997 1.182 1.327 1.938.323.766.518 1.67.548 2.963.058 1.253.07 1.628.07 4.792s-.012 3.54-.07 4.792c-.03 1.292-.225 2.2-.548 2.963-.33.755-.75 1.36-1.327 1.938-.578.577-1.233.997-2.028 1.327-.76.316-1.64.5-2.91.558-1.266.058-1.64.07-4.85.07s-3.585-.012-4.85-.07c-1.27-.058-2.15-.24-2.91-.558-.795-.326-1.45-.795-2.028-1.374-.577-.577-.997-1.182-1.327-1.938-.323-.766-.518-1.67-.548-2.963-.058-1.253-.07-1.628-.07-4.792s.012-3.54.07-4.792c.03-1.292.225-2.2.548-2.963.33-.755.75-1.36 1.327-1.938.578-.577 1.233-.997 2.028-1.327.76-.316 1.64-.5 2.91-.558C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.115 0-3.47.012-4.687.068-1.14.052-1.81.23-2.226.402-.52.21-.89.493-1.253.856-.363.363-.646.733-.856 1.253-.172.415-.35 1.087-.402 2.226-.056 1.217-.068 1.572-.068 4.687s.012 3.47.068 4.687c.052 1.14.23 1.81.402 2.226.21.52.493.89.856 1.253.363.363.733.646 1.253.856.415.172 1.087.35 2.226.402 1.217.056 1.572.068 4.687.068s3.47-.012 4.687-.068c1.14-.052 1.81-.23 2.226-.402.52-.21.89-.493 1.253-.856.363.363.646.733.856-1.253.172-.415-.35-1.087-.402-2.226.056-1.217-.068-1.572-.068-4.687s-.012-3.47-.068-4.687c-.052-1.14-.23-1.81-.402-2.226-.21-.52-.493-.89-.856-1.253-.363-.363-.733-.646-1.253-.856-.416-.172-1.087-.35-2.226-.402C15.47 3.977 15.115 3.965 12 3.965zm0 3.075c-2.67 0-4.833 2.163-4.833 4.833s2.163 4.833 4.833 4.833 4.833-2.163 4.833-4.833S14.67 7.04 12 7.04zm0 7.667c-1.563 0-2.833-1.27-2.833-2.833S10.437 9.04 12 9.04s2.833 1.27 2.833 2.833-1.27 2.834-2.833 2.834zm4.965-7.134c-.776 0-1.405.63-1.405 1.405s.63 1.405 1.405 1.405 1.405-.63 1.405-1.405-.628-1.405-1.405-1.405z"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-3">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.772 13.019H3.565V9h3.544v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
  </svg>
);
const PinterestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-3">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 4.887 3.04 9.04 7.238 10.94.03.08.03.16.03.24 0 .23-.06.46-.15.66-.24.46-.5.88-.88 1.23-.45.42-1.06.9-1.8 1.2-.3.12-.56.26-.77.41-.2.14-.33.3-.33.51 0 .16.06.3.18.42.12.12.27.18.45.18.3 0 .7-.1 1.13-.3.9-.4 1.73-.96 2.45-1.67.7-.7 1.22-1.54 1.53-2.5C10.9 23.82 11.43 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm2.88 14.16c-.5.2-1.06.3-1.68.3-1.2 0-2.02-.4-2.45-1.1-.43-.7-.65-1.6-.65-2.75 0-1.1.23-2.05.7-2.8.46-.75 1.13-1.13 2-1.13.68 0 1.28.23 1.78.7.5.45.75 1.06.75 1.8V11c0 .22-.02.4-.05.53-.03.13-.08.24-.16.33-.42.56-1.08.84-1.98.84-.63 0-1.15-.18-1.56-.53-.4-.35-.6-.8-.6-1.38V9.2c0-.6.12-1.04.38-1.3.25-.28.6-.42 1.04-.42.4 0 .74.13 1.02.4.28.26.42.6.42 1.03v.3H16.1c.03-.4.05-.76.05-1.08 0-.9-.23-1.66-.7-2.3-.46-.62-1.1-.94-1.9-.94-1 0-1.83.4-2.5 1.2-.68.8-.98 1.83-.98 3.1s.32 2.3.95 3.05c.63.75 1.48 1.13 2.55 1.13.8 0 1.48-.22 2.04-.66.18-.14.3-.22.38-.22.1 0 .16.04.2.12.03.08.05.18.05.3z"/>
  </svg>
);

export default function HomePage() {
  const centerpieceScale = 1.2; // Centerpiece ~20% larger 
  const petalScale = 1.15;      // Petals ~15% larger
  const petalOrbitRadius = 55;  // Reduced radius to bring petals closer
  const petalWidth = "20%";      // Petal container width
  const centerpieceWidth = "40%"; // Centerpiece container width

  return (
    <main className="min-h-screen bg-white text-black flex flex-col">
      <StatsDisplay />
      <div className="container mx-auto p-4 flex-grow">
        <div className="fixed top-4 right-4 z-50 group">
          <button className="bg-black text-white p-3 rounded-md shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-800">
            <ContactIcon />
          </button>
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0 pointer-events-none group-hover:pointer-events-auto">
            <Link href="https://www.instagram.com/_melisaonder/" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md">
              <InstagramIcon /> Instagram
            </Link>
            <Link href="https://www.linkedin.com/in/melisa-onder-7b6ba7302/" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
              <LinkedInIcon /> LinkedIn
            </Link>
            <Link href="https://pin.it/14p0qZDEW" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 rounded-b-md">
              <PinterestIcon /> Pinterest
            </Link>
          </div>
        </div>

        <h1 className="font-sans text-3xl sm:text-4xl font-bold text-center mt-2 mb-16 pt-1 sm:pt-1">
          Melisa Onder
        </h1>
        <h2 className="font-sans text-xl sm:text-2xl font-bold text-center mt-2 mb-16 pt-1 sm:pt-1">
        </h2>

        {/* Scaled Hexagonal Flower Layout with Closer Petals - Pushed Down */}
        <div className="relative w-full max-w-4xl mx-auto mt-32 mb-12 md:mb-16" style={{ height: "600px" }}>
          {/* Container with fixed height */}
          <div className="absolute inset-0">
            {/* Centerpiece */}
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out"
              style={{ width: centerpieceWidth, transform: `translate(-50%, -50%) scale(${centerpieceScale})` }}
            >
              <div className="relative w-full pb-[100%]"> {/* 1:1 aspect ratio container */}
                <Image 
                  src={centerImage.src}
                  alt={centerImage.altText}
                  width={400} 
                  height={400}
                  className="absolute inset-0 w-full h-full object-cover hover:object-contain transition-all duration-300"
                  style={{ objectPosition: 'center 10%' }} 
                  priority={true}
                />
              </div>
            </div>
            
            {/* 6 Petals - Closer and Scaled Up */}
            {petalImages.map((image, index) => {
              const angle = (index * 60) * (Math.PI / 180);
              // Reduced radius here!
              const top = 50 - petalOrbitRadius * Math.cos(angle); 
              const left = 50 + petalOrbitRadius * Math.sin(angle);
              
              return (
                <div
                  key={image.src}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:z-20"
                  style={{
                    top: `${top}%`,
                    left: `${left}%`,
                    width: petalWidth,
                    // Apply petal scale here!
                    transform: `translate(-50%, -50%) scale(${petalScale})` 
                  }}
                >
                  <div className="relative w-full pb-[100%]"> {/* 1:1 aspect ratio container */}
                    <Image 
                      src={image.src}
                      alt={image.altText}
                      width={240} 
                      height={240}
                      className="absolute inset-0 w-full h-full object-cover hover:object-contain transition-all duration-300"
                      style={{ objectPosition: 'center 10%' }} 
                      priority={index < 3}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 