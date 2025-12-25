import React from 'react';
import { motion } from 'framer-motion';

const SoundWave = () => {
  const waveVariants = {
    animate: {
      scaleY: [1, 1.5, 1, 0.5, 1, 1.2, 0.8, 1],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="flex justify-center items-center space-x-2 h-24">
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="w-3 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"
          style={{ height: '100%' }}
          variants={waveVariants}
          animate="animate"
          custom={i}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
};

export default SoundWave;