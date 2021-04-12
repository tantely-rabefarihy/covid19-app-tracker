import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../auth-pages/login";

describe("Login", () => {
  test("renders Login component", () => {
    render(<Login />);

    screen.debug();
  });
});
