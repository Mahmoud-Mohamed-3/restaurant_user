import "../css/our_customers_opinion.css";
import { useState } from "react";

export default function OurCustomersOpinion() {
  // Replace this with dynamic data once your backend is ready
  const opinions = [
    { name: "John Doe", opinion: "Great food, excellent service!" },
    { name: "Jane Smith", opinion: "The best dining experience ever!" },
    { name: "Mark Wilson", opinion: "Highly recommend, five stars!" },
    { name: "Lucy Brown", opinion: "Amazing atmosphere and food!" },
  ];

  return (
    <section className="OurCustomersOpinion">
      <h2 className="SectionTitle">Our Customers' Opinions</h2>
      <div className="OpinionsContainer">
        <div className="OpinionsMarquee">
          {opinions.map((opinion, index) => (
            <div key={index} className="OpinionCard">
              <div className="OpinionInfo">
                <h3>{opinion.name}</h3>
                <p className="OpinionText">{opinion.opinion}</p>
              </div>
            </div>
          ))}
          {opinions.map((opinion, index) => (
            <div key={index + opinions.length} className="OpinionCard">
              <div className="OpinionInfo">
                <h3>{opinion.name}</h3>
                <p className="OpinionText">{opinion.opinion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
