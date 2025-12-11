// src/components/LoveLetter.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Fireworks from "./Fireworks";
import "./galleries/gallery.css"; // shared file (we append styles there)

export default function LoveLetter({ onClose }) {
  // The exact message you provided:
  const fullMessage =
    "My love ❤️, every single day you become a bigger part of my heart — the way you talk, laugh, and care just hits different ✨. You make my world feel lighter, my thoughts calmer, and my days brighter 🌈. I admire your strength, your softness, and the way you make even ordinary moments feel special 🌟. I’m honestly so grateful to have you, and I want you to know I’m here for you, growing with you, loving you a little more each day 💞. – Tanish 🖤";

  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (index >= fullMessage.length) {
      // after full reveal show final CTA after a short delay
      const t = setTimeout(() => setShowFinal(true), 600);
      return () => clearTimeout(t);
    }
    const timeout = setTimeout(() => {
      setDisplayed((s) => s + fullMessage[index]);
      setIndex((i) => i + 1);
    }, 26 + Math.random() * 45); // slight natural speed variance
    return () => clearTimeout(timeout);
  }, [index, fullMessage]);

  // Rose petals generator (for DOM)
  const petals = Array.from({ length: 18 });

  return (
    <div className="loveletter-screen">
      {/* falling petals */}
      <div className="petals-wrap">
        {petals.map((_, i) => (
          <span className="petal" key={i} style={{ left: `${5 + Math.random() * 90}%`, animationDelay: `${Math.random() * 3}s`, transform: `rotate(${Math.random() * 360}deg)` }}>
            🌹
          </span>
        ))}
      </div>

      <motion.div
        className="loveletter-card card-glass"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 110 }}
      >
        <h2 className="loveletter-title">A Letter From My Heart…</h2>

        <div className="letter-body">
          <p className="typed-text">{displayed}<span className="type-cursor">|</span></p>
        </div>

        <div className="love-actions">
          {showFinal ? (
            <>
              <motion.button
                className="final-btn"
                onClick={() => setShowFireworks(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                Close your eyes and click me ✨
              </motion.button>

              <motion.button
                className="back-small"
                onClick={onClose}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                Back to Memories
              </motion.button>
            </>
          ) : (
            <button className="back-small" onClick={onClose}>Back</button>
          )}
        </div>
      </motion.div>

      {/* Fireworks overlay */}
      {showFireworks && (
        <Fireworks onFinish={() => setShowFireworks(false)} />
      )}
    </div>
  );
}
