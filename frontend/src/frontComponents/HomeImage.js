import React from "react";
import "./HomeImage.css";

const Hero = () => {
  return (
    <div className="hero-section d-flex align-items-center slide-down-fade">
      <div className="container text-white">
        <div className="row">
          <div className="col-md-6">
            <h1 className="hero-title slide-down-fade ">DALE UN<br />HOGAR</h1>
            <a href="#" className="btn custom-btn mt-3 btn-lg slide-down-fade">Ver Nuestros Gatos</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
