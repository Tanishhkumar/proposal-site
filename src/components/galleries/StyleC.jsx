import "./gallery.css";

export default function StyleC({ goBack }) {
  return (
    <div className="heart-layout">
      <button className="back-btn" onClick={goBack}>⬅ Back</button>
      <h2>Style C 💖</h2>

      <div className="heart-shape">
        {Array.from({ length: 10 }).map((_, i) => (
          <img key={i} src={`/gallery/pic${(i % 4) + 1}.jpg`} />
        ))}
      </div>
    </div>
  );
}
