import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";
import React from "react";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

const photos = [
  { src: "image1.jpg", caption: "test caption 1" },
  { src: "image2.jpg", caption: "test caption 2" },
  { src: "image3.jpg", caption: "test caption 3" }
];

// Smoke test
it("renders without crashing", () => {
  render(<Carousel photos={photos} title="Test Carousel" />);
});

// Snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(<Carousel photos={photos} title="Test Carousel" />);
  expect(asFragment()).toMatchSnapshot();
});


// Test for proper left arrow functionality
it("moves to the previous image when clicking the left arrow", () => {
  const { queryByText, getByLabelText } = render(<Carousel photos={photos} title="Test Carousel" />);

  // Move forward to the second image
  const rightArrow = getByLabelText("right-arrow");
  fireEvent.click(rightArrow);

  // Move back to the first image
  const leftArrow = getByLabelText("left-arrow");
  fireEvent.click(leftArrow);

  // Expect the first image to show
  expect(queryByText("Image 1 of 3.")).toBeInTheDocument();
});

// Test for hiding arrows on first and last images
it("hides the left arrow on the first image and the right arrow on the last image", () => {
  const { queryByLabelText, getByLabelText } = render(<Carousel photos={photos} title="Test Carousel" />);

  // Expect the left arrow to be hidden on the first image
  expect(queryByLabelText("left-arrow")).not.toBeInTheDocument();

  // Move forward to the last image
  const rightArrow = getByLabelText("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Expect the right arrow to be hidden on the last image
  expect(queryByLabelText("right-arrow")).not.toBeInTheDocument();
});