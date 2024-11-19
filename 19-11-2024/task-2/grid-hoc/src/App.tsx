import React from "react";
import { withGrid } from "./hoc/withGrid";
import './App.css';


const apiUrl = "https://jsonplaceholder.typicode.com/users";
const dataColumns = ["id", "name", "email", "phone", "website"];

const EnhancedGrid = withGrid(apiUrl, dataColumns);

const App: React.FC = () => {
  return (
    <div>
      <h1>User Information</h1>
      <EnhancedGrid />
    </div>
  );
};

export default App;
