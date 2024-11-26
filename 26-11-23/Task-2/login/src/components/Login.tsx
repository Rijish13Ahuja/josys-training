import React, { useState } from "react";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleLogin = () => {
    if (!userId) {
      setResult("User Id is required");
      return;
    }
    if (!password) {
      setResult("Password is required");
      return;
    }
    if (userId === "admin" && password === "admin123") {
      setResult("Welcome to Admin");
    } else {
      setResult("Invalid User Id or Password");
    }
  };

  return (
    <div>
      <input
        type="text"
        id="t1"
        placeholder="User Id"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="password"
        id="t2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button id="b1" onClick={handleLogin}>
        Login
      </button>
      <p id="result">{result}</p>
    </div>
  );
}

export default Login;
