import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Carousel({ onMenuClick }) {
  const carouselImages = [hero1, hero2, hero3];
  const [index, setIndex] = useState(0);
  const length = carouselImages.length;
  const intervalRef = useRef(null);

  // Preload first image for quicker LCP (Largest Contentful Paint)
  useEffect(() => {
    const preloadImage = new Image();
    preloadImage.src = carouselImages[0];
  }, [carouselImages]);

  const captionParagraphs = useMemo(
    () => [
      "Indulge in a wide variety of exquisite dishes crafted with the finest ingredients, perfect for any occasion. Taste the richness of every bite.",
      "Our restaurant offers an unforgettable dining experience, blending delicious food with exceptional service to create the perfect atmosphere for family and friends.",
      "Whether you’re in the mood for a cozy meal or a celebratory feast, our menu offers something for everyone, tailored to satisfy all your cravings.",
    ],
    [],
  );

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
  }, [length]);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  }, [length]);

  // Auto-slide effect
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  // Start auto-slide
  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    intervalRef.current = setInterval(nextSlide, 5000);
  }, [nextSlide]);

  // Stop auto-slide
  const stopAutoSlide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="Carousel">
      <div
        className="CarouselImage"
        onMouseEnter={stopAutoSlide} // Stop on hover
        onMouseLeave={startAutoSlide} // Resume on leave
      >
        <div className="ImageContainer">
          <motion.div
            className="ImageWrapper"
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{
              duration: 1, // Smooth transition
              ease: "easeInOut", // Smooth easing
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                src={carouselImages[index]}
                alt="carousel"
                loading="lazy"
                width="100%"
                height="auto"
                style={{ imageRendering: "auto" }}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }} // Slightly slower fade-in effect
              />
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="DotsNavigation">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              className={`Dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              whilehover={{ scale: 1.2 }} // Increase size on hover
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
      </div>

      <div className={`Caption caption-${index}`}>
        <motion.h1
          key={`title-${index}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }} // Smooth caption entrance
        >
          FEANE
        </motion.h1>
        <motion.p
          key={`caption-${index}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }} // Smooth caption entrance
        >
          {captionParagraphs[index]}
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#f39c12" }} // Hover effect with color change
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          onClick={onMenuClick}
        >
          Order Online
        </motion.button>
      </div>
    </div>
  );
}
