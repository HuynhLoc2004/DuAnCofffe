import React from "react";
import ScrollFloat from "../component/ScrollFloat";
import "../component/ScrollFloat.css";
import "../index.css";
import FloatingLines from "../component/FloatingLines";
import StaggeredMenu from "../component/StaggeredMenu";
const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Services", ariaLabel: "View our services", link: "/services" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];
const Test = () => {
  return (
    <div>
      <h1 className="text-red-500">haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=50%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
      >
        React Bits
      </ScrollFloat>
      <h1>haha</h1>
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        {/* <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={[10, 15, 20]}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        /> */}
      </div>
      <h1>haha</h1>
      <h1>haha</h1>
      <h1>haha</h1>
      <div style={{ height: "100vh", background: "#1a1a1a" }}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={["#B19EEF", "#5227FF"]}
          logoUrl="/path-to-your-logo.svg"
          accentColor="#ff6b6b"
          onMenuOpen={() => console.log("Menu opened")}
          onMenuClose={() => console.log("Menu closed")}
        />
      </div>
    </div>
  );
};

export default Test;
