import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useRef } from 'react';

const Counter = ({ value, label, duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      const numericValue = parseInt(value.match(/\d+/)[0]);
      const controls = animate(0, numericValue, {
        duration,
        onUpdate: (v) => setDisplayValue(Math.round(v))
      });
      return () => controls.stop();
    }
  }, [isInView, value, duration]);

  const suffix = value.replace(/[0-9]/g, '');

  return (
    <div ref={ref}>
      <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter mb-2">
        {displayValue}
        {suffix}
      </h3>
      <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{label}</p>
    </div>
  );
};

export default Counter;
