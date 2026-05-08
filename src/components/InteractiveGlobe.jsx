import React, { useEffect, useRef, useState } from 'react';
import GlobeGL from 'react-globe.gl';

const InteractiveGlobe = () => {
  const globeRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = false;
      globeRef.current.pointOfView({ lat: 20, lng: 70, altitude: 2.5 });
    }
  }, []);

  // Data for the globe matching the user's reference map
  const pointsData = [
    { lat: 51.1657, lng: 10.4515, name: 'Germany (HQ)', color: '#0056A4' },
    { lat: 20.5937, lng: 78.9629, name: 'India (Operations)', color: '#0056A4' },
    { lat: 40.7128, lng: -74.0060, name: 'USA Division', color: '#0056A4' },
    { lat: -14.2350, lng: -51.9253, name: 'Brazil Office', color: '#0056A4' },
    { lat: -25.2744, lng: 133.7751, name: 'Australia Project', color: '#0056A4' },
    { lat: 26.8206, lng: 30.8025, name: 'Egypt Site', color: '#0056A4' },
    { lat: 35.8617, lng: 104.1954, name: 'China Installation', color: '#0056A4' },
  ];
  
  // Arcs to show global connectivity
  const arcsData = [
    { startLat: 51.1657, startLng: 10.4515, endLat: 20.5937, endLng: 78.9629, color: '#0056A4' }, // Germany to India
    { startLat: 51.1657, startLng: 10.4515, endLat: 40.7128, endLng: -74.0060, color: '#0056A4' }, // Germany to USA
    { startLat: 51.1657, startLng: 10.4515, endLat: -14.2350, endLng: -51.9253, color: '#0056A4' }, // Germany to Brazil
    { startLat: 51.1657, startLng: 10.4515, endLat: -25.2744, endLng: 133.7751, color: '#0056A4' }, // Germany to Australia
  ];

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] relative cursor-grab active:cursor-grabbing">
      <GlobeGL
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={pointsData}
        pointRadius={0.8}
        pointColor={() => '#FFFFFF'}
        pointAltitude={0.05}
        pointLabel="name"
        pointsMerge={false}
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}
        atmosphereColor="#FFFFFF"
        atmosphereAltitude={0.25}
      />
    </div>
  );
};

export default InteractiveGlobe;
