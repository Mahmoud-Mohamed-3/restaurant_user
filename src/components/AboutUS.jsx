import "../css/about_us.css";
import resImage from "../assets/res.jpeg";

export default function AboutUS() {
  return (
    <div className="AboutUsSection">
      {/* Introduction Section */}
      <div className="AboutUsContainer">
        <h2 className="Title">Who Are We?</h2>
        <div className="AboutUsContent">
          <div className="ImageContainer">
            <img src={resImage} alt="restaurant" className="RestaurantImage" />
          </div>
          <p className="Text">
            At Feane Restaurant, we’re passionate about providing a dining
            experience that blends traditional flavors with modern innovation.
            Whether it’s a quick bite or a luxurious meal, we are committed to
            excellence in every dish.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="CoreValuesSection">
        <h2>What Makes Us Unique?</h2>
        <div className="CoreValuesList">
          <div className="CoreValue">
            <i className="icon">🌿</i>
            <h3>Fresh Ingredients</h3>
            <p>Locally sourced, organic ingredients</p>
          </div>
          <div className="CoreValue">
            <i className="icon">👨‍🍳</i>
            <h3>Passionate Chefs</h3>
            <p>Bringing decades of experience to the table</p>
          </div>
          <div className="CoreValue">
            <i className="icon">🍽️</i>
            <h3>A Warm Ambiance</h3>
            <p>A cozy yet modern atmosphere for every guest</p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="CTASection">
        <h2>Ready to Experience the Best?</h2>
        <button
          className="cta-button"
          onClick={() => {
            window.location.href = "/book_table";
          }}
        >
          Book a Table
        </button>
      </div>
    </div>
  );
}
