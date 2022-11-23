import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const mockData = () => {
  return {
    value: 34,
    min: 0,
    max: 200,
  };
};

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => mockData(),
    element: <App />,
    id: "app",
  },
]);

test("renders given value", () => {
  render(<RouterProvider router={router} />);
  const valueElement = screen.getByText("34");
  expect(valueElement).toBeInTheDocument();
});


const getMockDataWithCurrency = () => {
  return {
    value: 34,
    min: 0,
    max: 200,
    format: "currency",
    unit: "GBP",
  };
};

const routerWithCurrency =  createBrowserRouter([
  {
    path: "/",
    loader: () => getMockDataWithCurrency(),
    element: <App />,
    id: "app",
  },
]);

test("renders given value with currency", () => {
  render(<RouterProvider router={routerWithCurrency} />);
  const valueElement = screen.getByText("£34.00");
  expect(valueElement).toBeInTheDocument();
});


