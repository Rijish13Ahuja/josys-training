import React, { useRef, useLayoutEffect } from "react";

const FadingHeading: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const element = headingRef.current;

    if (element) {
      let isFadingIn = true; 
      let opacity = 0;

      const fade = () => {
        if (isFadingIn) {
          opacity += 0.02; 
          if (opacity >= 1) {
            isFadingIn = false; 
            setTimeout(fade, 3000); 
            return;
          }
        } else {
          opacity -= 0.02; 
          if (opacity <= 0) {
            isFadingIn = true; 
            setTimeout(fade, 3000); 
            return;
          }
        }

        element.style.opacity = `${opacity}`;
        requestAnimationFrame(fade);
      };

      element.style.opacity = "0"; 
      fade();
    }
  }, []);

  return (
    <h1
      ref={headingRef}
      style={{
        opacity: 0,
        textAlign: "center",
        marginTop: "50px",
        transition: "opacity 0.5s ease-in-out", 
      }}
    >
      Fading Heading Effect
    </h1>
  );
};

export default FadingHeading;
