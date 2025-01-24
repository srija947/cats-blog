import React, { useState, useEffect } from "react";
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

  const loadMoreSliders = () => {
    setLoading(true);

    setTimeout(() => {
      const nextIndex = currentIndex + 5;
      setVisibleData((prevData) => [
        ...prevData,
        ...sliderData.slice(currentIndex, nextIndex),
      ]);
      setCurrentIndex(nextIndex);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadMoreSliders();
  }, []);

  return (
    <div className="slider-grid-container">
      <div className="slider-grid">
        {visibleData.map((data, index) => (
          <div className="slider" key={index}>
            <Slider data={data} />
          </div>
        ))}

        {loading && <SpinnerLoad />}

        {!loading && currentIndex < sliderData.length && (
          <div className="slider" key="load-more">
            <SpinnerLoad />

            {loadMoreSliders()}
          </div>
        )}
      </div>
    </div>
  );
}
