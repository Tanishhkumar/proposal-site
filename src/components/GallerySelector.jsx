import { useState } from "react";
import { motion } from "framer-motion";
import StyleB from "./galleries/StyleB";
import StyleD from "./galleries/StyleD";
import "./galleries/gallery.css";

export default function GallerySelector() {
  const [style, setStyle] = useState(null);

  if (style === "B") return <StyleB goBack={() => setStyle(null)} />;
  if (style === "D") return <StyleD goBack={() => setStyle(null)} />;

  return (
    <div className="gallery-selector-screen">
      
      {/* Floating Hearts */}
      <div className="floating-hearts-gallery">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="heart-gallery"
            initial={{ y: 500, opacity: 0 }}
            animate={{
              y: -100,
              opacity: [0, 1, 0],
              x: [0, Math.random() * 150 - 75],
            }}
            transition={{
              duration: 5 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          >
            💖
          </motion.span>
        ))}
      </div>

      {/* Main Title */}
      <motion.h2
        className="gallery-title"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        Choose Your Memory Style 💞
      </motion.h2>

      {/* Buttons */}
      <motion.div
        className="style-buttons"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="choose-btn"
          onClick={() => setStyle("B")}
        >
          ❤️ Romantic Slideshow ❤️
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="choose-btn"
          onClick={() => setStyle("D")}
        >
          📸 Polaroid Memories 💖
        </motion.button>
      </motion.div>
    </div>
  );
}
