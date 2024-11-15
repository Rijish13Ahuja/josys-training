import React, { useState } from "react";

type Employee = {
  id: number;
  name: string;
  job: string;
  salary: number;
  deptNo: number;
};

const EmployeeCRUD: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 6589, name: "SRIRAM", job: "MANAGER", salary: 3200, deptNo: 32 },
    { id: 6369, name: "SMITH", job: "CLERK", salary: 800, deptNo: 20 },
    { id: 6499, name: "ALLEN", job: "SALESMAN", salary: 1600, deptNo: 30 },
    { id: 6521, name: "WARD", job: "ANALYST", salary: 1250, deptNo: 30 },
    { id: 6566, name: "JONES", job: "MANAGER", salary: 2975, deptNo: 20 },
    { id: 7654, name: "MARTIN", job: "SALESMAN", salary: 1250, deptNo: 30 },
    { id: 7698, name: "BLAKE", job: "MANAGER", salary: 2850, deptNo: 30 },
    { id: 7782, name: "CLARK", job: "MANAGER", salary: 2450, deptNo: 10 },
  ]);
  const [employee, setEmployee] = useState<Employee>({
    id: 0,
    name: "",
    job: "",
    salary: 0,
    deptNo: 0,
  });
  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]:
        name === "salary" || name === "deptNo" || name === "id"
          ? Number(value)
          : value,
    }));
  };

  const addEmployee = () => {
    setEmployees((prev) => [...prev, employee]);
    clearFields();
  };

  const updateEmployee = () => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === employee.id ? employee : emp))
    );
    clearFields();
    setEditMode(false);
  };

  const selectEmployee = (id: number) => {
    const selectedEmployee = employees.find((emp) => emp.id === id);
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
      setEditMode(true);
    }
  };

  const deleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  const clearFields = () => {
    setEmployee({ id: 0, name: "", job: "", salary: 0, deptNo: 0 });
    setEditMode(false);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <div>
        <input
          type="number"
          name="id"
          value={employee.id || ""}
          onChange={handleInputChange}
          placeholder="Employee No"
        />
        <input
          type="text"
          name="name"
          value={employee.name}
          onChange={handleInputChange}
          placeholder="Employee Name"
        />
        <input
          type="text"
          name="job"
          value={employee.job}
          onChange={handleInputChange}
          placeholder="Job"
        />
        <input
          type="number"
          name="salary"
          value={employee.salary || ""}
          onChange={handleInputChange}
          placeholder="Salary"
        />
        <input
          type="number"
          name="deptNo"
          value={employee.deptNo || ""}
          onChange={handleInputChange}
          placeholder="Dept No"
        />
      </div>
      <div style={{ margin: "10px 0" }}>
        <button onClick={addEmployee}>Add Employee</button>
        <button onClick={editMode ? updateEmployee : addEmployee}>
          {editMode ? "Update Employee" : "Add Employee"}
        </button>
        <button onClick={clearFields}>Clear Fields</button>
      </div>
      <table
        border={1}
        style={{ margin: "0 auto", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#a3d977" }}>
            <th>Employee No</th>
            <th>Employee Name</th>
            <th>Job</th>
            <th>Salary</th>
            <th>Dept No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.job}</td>
              <td>{emp.salary}</td>
              <td>{emp.deptNo}</td>
              <td>
                <button onClick={() => selectEmployee(emp.id)}>Select</button>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeCRUD;
