import React from "react"; // Importing useState and useEffect
import Slider from "./Slider"; // Importing the Slider component
import sliderData from "../data";
import "./SliderGrid.css"; // Importing the CSS for the grid styling
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function SpinnerLoad() {
  return (
    <>
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>
      <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </>
  );
}

export default function SliderGrid() {
  

  return (
    <div className="slider-grid-container">
      <div className="slider-grid">
        {sliderData.map((data, index) => (
          <div className="slider" key={index}>
            <Slider data={data} />
          </div>
        ))}
        <SpinnerLoad />
      </div>
    </div>
  );
}
