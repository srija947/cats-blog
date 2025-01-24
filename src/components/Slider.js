import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.css"; // Importing the CSS file for custom styles

export default function Slider({ data }) {
  return (
    <div className="mt-4">
      <Carousel className="custom-carousel">
        {data.map((item, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-item-wrapper">
              <img
                className="d-block w-100 custom-carousel-img"
                src={item.url}
                alt={item.title}
              />
              <div className="custom-caption">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
