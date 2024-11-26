import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetails from "../../../../26-11-2024/Task-1/product-listing/src/components/ProductDetails";
beforeAll(() => {
  jest.spyOn(window, "alert").mockImplementation(() => {});
});
describe("ProductDetails Component", () => {
  test("renders the form elements correctly", () => {
    render(<ProductDetails />);
    expect(screen.getByLabelText(/Product Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price per Unit:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quantity:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Calculate Total/i })).toBeInTheDocument();
  });
  test("calculates total amount correctly", () => {
    render(<ProductDetails />);
    const priceInput = screen.getByPlaceholderText(/Enter price/i);
    const quantityInput = screen.getByPlaceholderText(/Enter quantity/i);
    const calculateButton = screen.getByRole("button", { name: /Calculate Total/i });
    fireEvent.change(priceInput, { target: { value: "50" } });
    fireEvent.change(quantityInput, { target: { value: "3" } });
    fireEvent.click(calculateButton);
    expect(screen.getByText(/Total Amount: \$150.00/i)).toBeInTheDocument();
  });
  test("shows alert if inputs are invalid", () => {
    render(<ProductDetails />);
    const calculateButton = screen.getByRole("button", { name: /Calculate Total/i });
    fireEvent.click(calculateButton);
    expect(window.alert).toHaveBeenCalledWith("Enter valid numbers for price and quantity.");
  });
});