import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const Dashboard = lazy(() => import("./components/Dashboard"));
const Employees = lazy(() => import("./components/Emps"));
const Departments = lazy(() => import("./components/Departments"));
const NotFound = lazy(() => import("./components/NotFound"));

const App = () => {
  const userRole = "Admin"; 

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute role={userRole} allowedRoles={["Admin", "User"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="employees" element={<Employees />} />
          <Route path="departments" element={<Departments />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;
