import StarsBackground from "./components/StarsBackground";
import ProposalCard from "./components/ProposalCard";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <>
      <StarsBackground />
      <ProposalCard />
      <MusicPlayer autoPlayOnInteraction={true} volume={0.18} />
    </>
  );
}

export default App;
