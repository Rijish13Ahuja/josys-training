import React from "react";
import CustomerDetails from "./components/CustomerDetails";

const App: React.FC = () => {
  return (
    <div>
      <header style={{ textAlign: "center", margin: "20px 0" }}>
        <h1>Customer Management System</h1>
      </header>
      <main>
        <CustomerDetails />
      </main>
      <footer style={{ textAlign: "center", marginTop: "20px" }}></footer>
    </div>
  );
};

export default App;
