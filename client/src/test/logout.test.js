import React from "react";
import { render, screen } from "@testing-library/react";
import Logout from "../auth-pages/logout";

describe("Logout", () => {
  test("renders Logout component", () => {
    render(<Logout />);

    screen.debug();
  });
});
