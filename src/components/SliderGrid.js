import React, { useState, useEffect, useRef } from "react";
import Slider from "./Slider";
import sliderData from "../data";
import "./SliderGrid.css";
import Spinner from "react-bootstrap/Spinner";

function SpinnerLoad() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Spinner
        as="span"
        animation="border"
        size="lg"
        role="status"
        aria-hidden="true"
      />
      <span style={{ fontSize: "16px", fontWeight: "bold" }}>Loading...</span>
    </div>
  );
}

export default function SliderGrid() {
  const [visibleData, setVisibleData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null); // Reference to the "Load More" div

  const loadMoreSliders = () => {
    if (loading) return; // Prevent duplicate calls
    setLoading(true);

    setTimeout(() => {
      const nextIndex = currentIndex + 5;
      setVisibleData((prevData) => [
        ...prevData,
        ...sliderData.slice(currentIndex, nextIndex),
      ]);
      setCurrentIndex(nextIndex);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    loadMoreSliders(); // Load initial sliders
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && currentIndex < sliderData.length) {
          loadMoreSliders(); // Trigger loading more sliders
        }
      },
      { threshold: 1.0 } // Trigger when the "Load More" div is fully visible
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [loading, currentIndex]); // Re-run when loading or currentIndex changes

  return (
    <div className="slider-grid-container">
      <div className="slider-grid">
        {visibleData.map((data, index) => (
          <div className="slider" key={index}>
            <Slider data={data} />
          </div>
        ))}

        {loading && <SpinnerLoad />}

        {/* Load More trigger element */}
        {!loading && currentIndex < sliderData.length && (
          <div
            ref={observerRef}
            style={{
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SpinnerLoad />
          </div>
        )}
      </div>
    </div>
  );
}
