// src/components/galleries/StyleB.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./gallery.css";

export default function StyleB({ goBack }) {
  const images = [
    "/gallery/pic1.jpg",
    "/gallery/pic2.jpg",
    "/gallery/pic3.jpg",
    "/gallery/pic4.jpg",
    "/gallery/pic5.jpg",
    "/gallery/pic6.jpg",
    "/gallery/pic7.jpg",
    "/gallery/pic8.jpg",
    "/gallery/pic9.jpg",
  ];

  const [index, setIndex] = useState(0);

  // Auto slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="slideshow-screen">
      {/* Back Button */}
      <button className="back-btn" onClick={goBack}>
        ⬅ Back
      </button>

      {/* Slideshow */}
      <div className="slideshow">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            className="fade-img"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9 }}
            alt="memory"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
