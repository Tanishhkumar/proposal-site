import React from "react";
import StarsBackground from "../components/StarsBackground";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="home">
      <StarsBackground />
      <motion.div
        className="proposal-card"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>Will you be mine forever? 💍</h1>
        <div className="buttons">
          <button className="yes">Yes 💖</button>
          <button className="no">No 😢</button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
