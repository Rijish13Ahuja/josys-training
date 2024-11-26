import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Products title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Products/i);
  expect(titleElement).toBeInTheDocument();
});
