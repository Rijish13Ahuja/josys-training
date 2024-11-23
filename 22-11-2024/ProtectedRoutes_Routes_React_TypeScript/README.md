
Here’s how I implemented the required features step by step:

## 1. Nested Routes Implementation

Steps:
First, I defined the parent route and nested routes under it using the Route component from react-router-dom.
I used the path attribute to specify the nested paths and included a /* at the end of the parent path to accommodate child routes.
Example:

<Route path="dashboard/*" element={<Dashboard />}>
  <Route path="employees" element={<Employees />} />
  <Route path="departments" element={<Departments />} />
</Route>
Inside the Dashboard component, I used <Outlet /> from react-router-dom to render the nested routes.
