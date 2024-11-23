import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Emps.css';

interface Emp {
  empno: number;
  ename: string;
  job: string;
  deptno: number;
}

export default function Emps() {
  const [empsArray, setEmpsArray] = useState<Emp[]>([]);
  const [page, setPage] = useState(1);
  const limit = 5; 

  useEffect(() => {
    fetch(`https://randomuser.me/api/?page=${page}&results=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.results.map((item: any, index: number) => ({
          empno: index + 1 + (page - 1) * limit, 
          ename: `${item.name.first} ${item.name.last}`,
          job: "Unknown", 
          deptno: Math.floor(Math.random() * 50) + 1, 
        }));
        setEmpsArray(transformedData);
      });
  }, [page]);

  const result = empsArray.map((item, index) => (
    <tr key={index} className={index % 2 === 0 ? "c2" : "c3"}>
      <td>{item.empno}</td>
      <td>{item.ename}</td>
      <td>{item.job}</td>
      <td>{item.deptno}</td>
      <td>
        <Link to={"/Details/" + item.empno}>Details</Link>
      </td>
    </tr>
  ));

  return (
    <div>
      <h3>All Employee Details</h3>
      <table border={2} cellPadding={"5"} cellSpacing="0" width="700">
        <thead>
          <tr className="c1">
            <th>Emp Number</th>
            <th>Emp Name</th>
            <th>Emp Job</th>
            <th>Emp Deptno</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{result}</tbody>
      </table>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
}
