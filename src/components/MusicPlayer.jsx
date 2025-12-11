import React, { useEffect, useRef, useState } from "react";
import { FiPlay, FiPause } from "react-icons/fi";

const MusicPlayer = ({ autoPlayOnInteraction = true, volume = 0.15 }) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentVolume, setCurrentVolume] = useState(volume); // <- track volume in state

  useEffect(() => {
    audioRef.current = new Audio("/bg-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    const tryPlay = async () => {
      if (!audioRef.current) return;
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        setPlaying(false); // autoplay blocked
      }
    };

    if (!autoPlayOnInteraction) {
      tryPlay();
    } else {
      const onFirstInteract = () => {
        tryPlay();
        window.removeEventListener("pointerdown", onFirstInteract);
        window.removeEventListener("keydown", onFirstInteract);
      };
      window.addEventListener("pointerdown", onFirstInteract);
      window.addEventListener("keydown", onFirstInteract);
      return () => {
        window.removeEventListener("pointerdown", onFirstInteract);
        window.removeEventListener("keydown", onFirstInteract);
      };
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [autoPlayOnInteraction, volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (err) {
        console.log("Play blocked", err);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setCurrentVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  return (
    <div className="music-player">
      <button
        className={"music-btn " + (playing ? "playing" : "paused")}
        onClick={togglePlay}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? <FiPause size={20} /> : <FiPlay size={20} />}
      </button>

      {/* Volume Slider */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={currentVolume}         // <- use state
        onChange={handleVolumeChange} // <- updates state and audio volume
        className="volume-slider"
      />
    </div>
  );
};

export default MusicPlayer;
