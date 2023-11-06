import React, { useEffect, useRef } from "react";
import "./AnimatedCard.css";


const cardData = [
  {
    img: "https://images.unsplash.com/photo-1553901771-6f23562a2993?auto=format&fit=crop&q=80&w=1450&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Canyons",
    details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
  {
    img: "https://images.unsplash.com/photo-1664087032483-1ca72bec2768?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Beaches",
    details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
  {
    img: "https://images.unsplash.com/photo-1546088774-ea7280a886b3?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Trees",
    details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
  {
    img: "https://images.unsplash.com/photo-1677683492932-e6d00491996d?auto=format&fit=crop&q=80&w=1450&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Lakes",
    details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
  },
];
const AnimatedCard = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".card-wrap");

    cards.forEach(card => {
      const cardElem = card.querySelector(".cards");
      const cardBg = card.querySelector(".card-bg");
      const cardInfo = card.querySelector(".card-info");
      const dataImage = card.getAttribute("data-image");

      let width = card.offsetWidth;
      let height = card.offsetHeight;
      let mouseX = 0;
      let mouseY = 0;
      let mouseLeaveDelay;

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      function handleMouseMove(e) {
        mouseX = e.pageX - card.offsetLeft - width / 2;
        mouseY = e.pageY - card.offsetTop - height / 2;

        const rX = (mouseX / width) * 30;
        const rY = (mouseY / height) * -30;
        cardElem.style.transform = `rotateY(${rX}deg) rotateX(${rY}deg)`;

        const tX = (mouseX / width) * -40;
        const tY = (mouseY / height) * -40;
        cardBg.style.transform = `translateX(${tX}px) translateY(${tY}px)`;
      }

      function handleMouseEnter() {
        clearTimeout(mouseLeaveDelay);
      }

      function handleMouseLeave() {
        mouseLeaveDelay = setTimeout(() => {
          mouseX = 0;
          mouseY = 0;
          cardElem.style.transform = "rotateY(0deg) rotateX(0deg)";
          cardBg.style.transform = "translateX(0px) translateY(0px)";
        }, 1000);
      }

      cardBg.style.backgroundImage = `url(${dataImage})`;
    });
  }, []); // Add an empty dependency array to run this effect once

  return (
    <div className="bg-div">
      <h1 className="card_title mt-5">Hover over the cards</h1>
      <div id="app" className="container-div">
        {cardData?.map((c, index) => (
          <div key={index} className="card-wrap" data-image={c?.img}>
            <div className="cards">
              <div className="card-bg"></div>
              <div className="card-info">
                <h1>{c.title}</h1>
                <p>{c.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCard;
