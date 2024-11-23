### Working link ( https://routing-rijish-ahujas-projects.vercel.app/ )
Here’s how I implemented the required features step by step:

## 1. Nested Routes Implementation

Steps:
First, I defined the parent route and nested routes under it using the Route component from react-router-dom.
I used the path attribute to specify the nested paths and included a /* at the end of the parent path to accommodate child routes.
Example:
``` sh
<Route path="dashboard/*" element={<Dashboard />}>
  <Route path="employees" element={<Employees />} />
  <Route path="departments" element={<Departments />} />
</Route>
```
Inside the Dashboard component, I used <Outlet /> from react-router-dom to render the nested routes.


## 2. Authorization with Role-Based Security

Steps:
Added a ProtectedRoute component to handle role-based access.
The ProtectedRoute accepts role and allowedRoles as props. It checks if the user's role is included in allowedRoles. If not, it redirects to a "Not Authorized" page or login page.
Example for Emps (Admin only):
``` sh
<Route
  path="/Emps"
  element={
    <ProtectedRoute role={userRole} allowedRoles={['Admin']}>
      <Emps />
    </ProtectedRoute>
  }
/>
```
Example for Depts (accessible to any authenticated user):
``` sh
<Route
  path="/Depts"
  element={
    <ProtectedRoute role={userRole} allowedRoles={['Admin', 'User']}>
      <Depts />
    </ProtectedRoute>
  }
/>
```


## 3. Lazy Loading Routes

Steps:
Imported lazy and Suspense from React.
Used lazy to dynamically import components and Suspense to display a fallback while loading.
Example:
``` sh
const Dashboard = lazy(() => import('./components/Dashboard'));
const Employees = lazy(() => import('./components/Emps'));
const Departments = lazy(() => import('./components/Departments'));
```
Wrapped routes using Suspense:
``` sh
<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    {/* Your routes */}
  </Routes>
</Suspense>
```


## 4. Paging with json-server

Steps:
Installed json-server to simulate a backend server:
``` sh
npm install -g json-server
```
Created a db.json file with sample data:
json
``` sh
{
  "employees": [
    { "id": 1, "name": "John Doe" },
    { "id": 2, "name": "Jane Smith" },
    { "id": 3, "name": "Sam Wilson" },
    ...
  ]
}
```
Ran the server:
``` sh
json-server --watch db.json --port 3001
```
Added a fetchData function to call the server with pagination parameters (_page and _limit):
``` sh
const fetchData = async (page: number, limit: number) => {
  const response = await fetch(`http://localhost:3001/employees?_page=${page}&_limit=${limit}`);
  const data = await response.json();
  setEmployees(data);
};
```
Implemented pagination controls using state and buttons:
``` sh
const [page, setPage] = useState(1);
const [limit] = useState(5);

useEffect(() => {
  fetchData(page, limit);
}, [page]);

return (
  <div>
    <button onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
      Previous
    </button>
    <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
  </div>
);
```
