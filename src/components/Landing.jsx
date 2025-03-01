import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import "../css/landing.css"; // Ensure SCSS is compiled

export default function Landing() {
  return (
    <div className="LandingPage">
      <Carousel />
    </div>
  );
}

function Carousel() {
  const carouselImages = [hero1, hero2, hero3];
  const [index, setIndex] = useState(0);
  const length = carouselImages.length;
  const intervalRef = useRef(null);

  const captionParagraphs = [
    "Indulge in a wide variety of exquisite dishes crafted with the finest ingredients, perfect for any occasion. Taste the richness of every bite.",
    "Our restaurant offers an unforgettable dining experience, blending delicious food with exceptional service to create the perfect atmosphere for family and friends.",
    "Whether you’re in the mood for a cozy meal or a celebratory feast, our menu offers something for everyone, tailored to satisfy all your cravings.",
  ];

  // Move to the next slide
  const nextSlide = () => {
    setIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
  };

  // Move to the previous slide
  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  // Auto-slide effect
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  // Start auto-slide
  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  // Stop auto-slide
  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div className="Carousel">
      <div
        className="CarouselImage"
        onMouseEnter={stopAutoSlide} // Stop on hover
        onMouseLeave={startAutoSlide} // Resume on leave
      >
        <div className="ImageContainer">
          {/* Image wrapper */}
          <div className="ImageWrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                className="Slide active"
                initial={{ opacity: 0.5, x: 100, scale: 1.1 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0.5, x: -100, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <motion.img
                  src={carouselImages[index]}
                  alt="carousel"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="DotsNavigation">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              className={`Dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className={`Caption caption-${index}`}>
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          FEANE
        </motion.h1>
        <motion.p
          key={`caption-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {captionParagraphs[index]}
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          Order Online
        </motion.button>
      </div>
    </div>
  );
}
