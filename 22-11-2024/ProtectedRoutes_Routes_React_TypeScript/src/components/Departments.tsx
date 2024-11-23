import React, { useState, useEffect } from 'react';

interface Department {
  name: {
    first: string;
    last: string;
  };
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=5')
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.results.map((item: any) => ({
          name: {
            first: item.name.first,
            last: item.name.last,
          },
        }));
        setDepartments(transformedData);
      });
  }, []);

  return (
    <div>
      <h3>Department List</h3>
      {departments.map((department, index) => (
        <div key={index}>
          {department.name.first} {department.name.last}
        </div>
      ))}
    </div>
  );
}
