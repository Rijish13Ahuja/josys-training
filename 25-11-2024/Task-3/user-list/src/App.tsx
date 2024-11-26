import React, { useState } from "react";
import UserList from "./components/UserList";
import "./App.css";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="app-container">
      <h3 className="app-header">Component Lifecycle Demonstration</h3>
      <input
        type="text"
        className="search-input"
        placeholder="Search Users"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <UserList searchTerm={searchTerm} />
    </div>
  );
};

export default App;
