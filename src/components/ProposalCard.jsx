import { motion } from "framer-motion";
import { useState } from "react";
import "./ProposalCard.css";
import GallerySelector from "./GallerySelector";
import Cat from "../assets/crying.gif";
import Cat2 from "../assets/crying2.gif";
import Cat4 from "../assets/Happy.gif";

const ProposalCard = () => {
  const [response, setResponse] = useState(null);
  const [attempts, setAttempts] = useState(0);

  const handleNoClick = () => {
    setAttempts((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setResponse("yes");
  };

  const gifs = {
    sad: [
      Cat,
      "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
      "https://media.giphy.com/media/9Y5BbDSkSTiY8/giphy.gif",
      Cat2,
    ],
    happy: [Cat4],
  };

  // 👉 Show Gallery directly after Yes
  if (response === "yes") {
    return <GallerySelector />;
  }

  return (
    <div className="proposal-container">
      {/* Floating Hearts */}
      <div className="floating-hearts">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="heart"
            initial={{ y: 400, opacity: 0 }}
            animate={{
              y: -100,
              opacity: [0, 1, 0],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            💖
          </motion.span>
        ))}
      </div>

      {/* Main Card */}
      <motion.div
        className="proposal-card"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <motion.h1
          className="main-proposal"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Will you be mine forever? 💍
        </motion.h1>

        <h2 className="proposal-text">
          {attempts === 0 && "Do you like me? 💖"}
          {attempts === 1 && "Are you sure you don’t like me? 😢"}
          {attempts === 2 && "Please think again 🥺"}
          {attempts === 3 && "Come on... say yes 😭"}
          {attempts >= 4 && "Fine... but I’ll keep asking 💞"}
        </h2>

        {/* Sad GIF after No clicks */}
        {attempts > 0 && (
          <motion.img
            key={attempts}
            src={gifs.sad[(attempts - 1) % gifs.sad.length]}
            alt="Sad reaction"
            className="reaction-gif"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}

        {/* Buttons */}
        <div className="buttons">
          <motion.button
            onClick={handleYesClick}
            className="yes-btn"
            animate={{
              scale: 1 + attempts * 0.2,
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Yes 😍
          </motion.button>

          <motion.button
            onClick={handleNoClick}
            className="no-btn"
            whileTap={{ scale: 0.9 }}
          >
            No 😅
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProposalCard;
