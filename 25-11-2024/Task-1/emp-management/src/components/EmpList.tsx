import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3001/employees';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
}

const fetchEmployees = async (): Promise<Employee[]> => {
  const { data } = await axios.get(API_URL);
  return data;
};

const EmpList: React.FC = () => {
  const { data: employees, isLoading, error } = useQuery<Employee[]>('employees', fetchEmployees);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching employees!</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Employee List</h1>
      <table className="w-full text-sm text-left text-gray-500 border-collapse border border-gray-200">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            <th scope="col" className="px-6 py-3 border-r border-gray-200">#</th>
            <th scope="col" className="px-6 py-3 border-r border-gray-200">Name</th>
            <th scope="col" className="px-6 py-3 border-r border-gray-200">Email</th>
            <th scope="col" className="px-6 py-3">Position</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee, index) => (
            <tr
              key={employee.id}
              className={`border-b hover:bg-gray-50 ${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              }`}
            >
              <td className="px-6 py-4 border-r border-gray-200">{employee.id}</td>
              <td className="px-6 py-4 border-r border-gray-200">{employee.name}</td>
              <td className="px-6 py-4 border-r border-gray-200">{employee.email}</td>
              <td className="px-6 py-4">{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmpList;
