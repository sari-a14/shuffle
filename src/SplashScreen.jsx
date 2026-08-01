import "./SplashScreen.css";

export default function SplashScreen({ fade }) {
  return (
    <div className={`splash-screen ${fade ? "fade-out" : ""}`}>
      <img
        src="/SplashScreenIcon.png"
        alt="Shuffle"
        className="splash-logo"
      />
    </div>
  );
}