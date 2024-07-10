import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// Smoke test
it("renders without crashing", () => {
  render(<Card caption="test caption" src="test.jpg" currNum={1} totalNum={3} />);
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(<Card caption="test caption" src="test.jpg" currNum={1} totalNum={3} />);
  expect(asFragment()).toMatchSnapshot();
});