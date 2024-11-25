import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3001/employees';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
}

const EmpOperations: React.FC = () => {
  const [employee, setEmployee] = useState<Partial<Employee>>({});
  const queryClient = useQueryClient();

  const addEmployee = useMutation(
    (newEmployee: Partial<Employee>) => {
      console.log("Adding employee:", newEmployee);
      return axios.post(API_URL, newEmployee);
    },
    {
      onSuccess: () => {
        console.log("Employee added successfully");
        queryClient.invalidateQueries('employees');
      },
      onError: (error) => {
        console.error("Error adding employee:", error);
      }
    }
  );

  const updateEmployee = useMutation(
    (updatedEmployee: Employee) => {
      console.log("Updating employee:", updatedEmployee);
      return axios.put(`${API_URL}/${updatedEmployee.id}`, updatedEmployee);
    },
    {
      onSuccess: () => {
        console.log("Employee updated successfully");
        queryClient.invalidateQueries('employees');
      },
      onError: (error) => {
        console.error("Error updating employee:", error);
      }
    }
  );

  const deleteEmployee = useMutation(
    (id: number) => {
      console.log("Deleting employee with ID:", id);
      return axios.delete(`${API_URL}/${id}`);
    },
    {
      onSuccess: () => {
        console.log("Employee deleted successfully");
        queryClient.invalidateQueries('employees');
      },
      onError: (error) => {
        console.error("Error deleting employee:", error);
      }
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (employee.name && employee.email && employee.position) {
      console.log("Triggering Add Employee");
      addEmployee.mutate(employee);
    } else {
      console.error("Missing required fields for Add Employee");
    }
  };

  const handleUpdate = () => {
    if (employee.id && employee.name && employee.email && employee.position) {
      console.log("Triggering Update Employee");
      updateEmployee.mutate(employee as Employee);
    } else {
      console.error("Missing required fields for Update Employee");
    }
  };

  const handleDelete = () => {
    if (employee.id) {
      console.log("Triggering Delete Employee");
      deleteEmployee.mutate(employee.id as number);
    } else {
      console.error("Missing ID for Delete Employee");
    }
  };

  return (
    <div className="p-4">
      <form className="bg-gray-50 rounded-lg p-6 shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Add/Update Employee</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="id"
            value={employee.id || ''}
            placeholder="ID (Required for Update/Delete)"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="name"
            value={employee.name || ''}
            placeholder="Name"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            value={employee.email || ''}
            placeholder="Email"
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="position"
            value={employee.position || ''}
            placeholder="Position"
            onChange={handleChange}
            className="col-span-2 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAdd}
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Employee
          </button>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-yellow-500 text-white px-6 py-2 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Update Employee
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-2 rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmpOperations;
