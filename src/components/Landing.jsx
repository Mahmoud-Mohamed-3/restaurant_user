import "../css/landing.css";
import Carousel from "./Carousel.jsx"; // Ensure SCSS is compiled

export default function Landing({ onMenuClick }) {
  return (
    <div className="LandingPage">
      <Carousel onMenuClick={onMenuClick} />
    </div>
  );
}
