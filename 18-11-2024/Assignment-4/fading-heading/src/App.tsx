import React from "react";
import FadingHeading from "./components/FadingHeading";

const App: React.FC = () => {
  return (
    <div>
      <FadingHeading />
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Watch the heading fade in as you load the page.
      </p>
    </div>
  );
};

export default App;
