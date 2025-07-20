import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 500);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-5 right-5 z-50 p-3 rounded-full backdrop-blur-lg bg-white/80 text-blue-950 shadow-md transition-opacity duration-300 hover:scale-110 ${
        showButton ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <AiOutlineArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
