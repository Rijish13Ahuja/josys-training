import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import EmpList from "./components/EmpList";
import EmpOperations from "./components/EmpOperations";

const queryClient = new QueryClient(); // Step 1: Initialize QueryClient

const App: React.FC = () => {
  return (
    // Step 2: Wrap the application with QueryClientProvider
    <QueryClientProvider client={queryClient}>
     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
  <h1 className="text-4xl font-bold text-blue-600 mb-6">Employee Management</h1>
  <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-6 space-y-8">
    <EmpList />
    <EmpOperations />
  </div>
</div>

    </QueryClientProvider>
  );
};

export default App;
