import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useSpring(0, { stiffness: 500, damping: 50 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleHover = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-industrial-blue pointer-events-none z-[9999] hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        scale: isHovered ? 2 : 1,
        backgroundColor: isHovered ? 'rgba(0, 86, 164, 0.1)' : 'transparent',
      }}
    >
      <div className="absolute inset-0 m-auto w-1 h-1 bg-industrial-blue rounded-full"></div>
    </motion.div>
  );
};

export default CustomCursor;
