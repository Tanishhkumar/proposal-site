// src/components/galleries/StyleD.jsx
import "./gallery.css";
import { motion } from "framer-motion";
import { useState } from "react";
import LoveLetter from "../LoveLetter";

export default function StyleD({ goBack }) {
  const [showLetter, setShowLetter] = useState(false);
  const [flipped, setFlipped] = useState(null); // track flipped card index

  const images = [
    { src: "/gallery/pic1.jpg", text: "My favorite person 💖", back: "I love every moment with you ❤️" },
    { src: "/gallery/pic2.jpg", text: "Every moment with you ✨", back: "Your laughter brightens my days 🌈" },
    { src: "/gallery/pic3.jpg", text: "You make me smile 😊", back: "Your smile is my happiness 😘" },
    { src: "/gallery/pic4.jpg", text: "Forever with you ❤️", back: "I want us together forever 💞" },
    { src: "/gallery/pic5.jpg", text: "Your smile is my sunshine 🌈", back: "You light up my world ☀️" },
    { src: "/gallery/pic6.jpg", text: "You're my peace 🕊️", back: "I feel calm with you nearby 🥰" },
    { src: "/gallery/pic7.jpg", text: "My heart feels safe with you ❤️", back: "I trust you completely 💖" },
    { src: "/gallery/pic8.jpg", text: "You make life beautiful 🌸", back: "Everything feels magical with you ✨" },
    { src: "/gallery/pic9.jpg", text: "Every moment becomes special ✨", back: "Thanks for being mine 💕" },
  ];

  if (showLetter) {
    return <LoveLetter onClose={() => setShowLetter(false)} />;
  }

  return (
    <div className="polaroid-style">
      <h2 className="memories-title">🌸 Our Memories 🌸</h2>

      <div className="polaroid-grid">
        {images.map((img, i) => (
          <div
            key={i}
            className={`flip-card ${flipped === i ? "flipped" : ""}`}
            onClick={() => setFlipped(flipped === i ? null : i)}
          >
            <div className="flip-card-inner">
              {/* FRONT */}
              <div className="flip-card-front">
                <img src={img.src} className="card-img" alt={`memory-${i}`} />
                <p className="card-text">{img.text}</p>
              </div>
              {/* BACK */}
              <div className="flip-card-back">
                <p className="card-text">{img.back}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <motion.button
        className="more-btn improved-btn"
        onClick={() => setShowLetter(true)}
        whileHover={{ scale: 1.08 }}
      >
        More Memories Coming… 💞
      </motion.button>

      <motion.button
        className="footer-back-btn"
        onClick={goBack}
        whileHover={{ scale: 1.05 }}
      >
        Back
      </motion.button>
    </div>
  );
}
