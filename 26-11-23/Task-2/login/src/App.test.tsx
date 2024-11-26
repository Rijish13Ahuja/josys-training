import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./components/Login";

describe("Login Component", () => {
  // Test 1: Component renders without crashing
  test("renders component without crashing", () => {
    render(<Login />);
    const userIdInput = screen.getByPlaceholderText("User Id");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    expect(userIdInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  // Test 2: error if User ID is not supplied
  test("should display error message if user ID is not supplied", () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(passwordInput, { target: { value: "admin123" } });
    fireEvent.click(loginButton);

    expect(screen.getByText("User Id is required")).toBeInTheDocument();
  });

  // Test 3: error if Password is not supplied
  test("should display error message if password is not supplied", () => {
    render(<Login />);
    const userIdInput = screen.getByPlaceholderText("User Id");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(userIdInput, { target: { value: "admin" } });
    fireEvent.click(loginButton);

    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  // Test 4:  success message for valid credentials
  test("should display valid result message for correct credentials", () => {
    render(<Login />);
    const userIdInput = screen.getByPlaceholderText("User Id");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(userIdInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });
    fireEvent.click(loginButton);

    expect(screen.getByText("Welcome to Admin")).toBeInTheDocument();
  });

  // Test 5: error message for invalid credentials
  test("should display invalid message for wrong credentials", () => {
    render(<Login />);
    const userIdInput = screen.getByPlaceholderText("User Id");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(userIdInput, { target: { value: "wrongUser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongPass" } });
    fireEvent.click(loginButton);

    expect(screen.getByText("Invalid User Id or Password")).toBeInTheDocument();
  });
});
