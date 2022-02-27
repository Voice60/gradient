import { fireEvent, render, screen } from "@testing-library/react";

import GradientCard from "./index";

import "@testing-library/jest-dom/extend-expect";
import { copyGradient, getGradientProperty } from "../../utiles/functions";
import styles from "./gradientCard.module.scss";
jest.mock("next/router", () => require("next-router-mock"));

const originalClipboard = { ...global.navigator.clipboard };

beforeEach(() => {
  let clipboardData = ""; //initalizing clipboard data so it can be used in testing
  const mockClipboard = {
    writeText: jest.fn((data) => {
      clipboardData = data;
    }),
    readText: jest.fn(() => {
      return clipboardData;
    }),
  };
  //@ts-ignore
  global.navigator.clipboard = mockClipboard;
});

afterEach(() => {
  jest.resetAllMocks();
  //@ts-ignore
  global.navigator.clipboard = originalClipboard;
});

describe("GradientCard component", () => {
  const fakeGradient = ["000000", "ffffff"];

  it("GradientCard renders", () => {
    render(<GradientCard gradient={fakeGradient} />);

    expect(screen.getByText("#000000")).toBeInTheDocument();
    expect(screen.getByText("#ffffff")).toBeInTheDocument();
  });
  it("Copy button works", () => {
    render(
      <GradientCard
        gradient={fakeGradient}
        onCopyGradient={() => copyGradient(fakeGradient)}
      />
    );

    const button = screen.getByText("Copy");
    button.click();
    expect(navigator.clipboard.readText()).toBe(
      "background: " + getGradientProperty(fakeGradient)
    );
  });
  it("Gradient card doesn't contain copy button", () => {
    render(<GradientCard gradient={fakeGradient} />);

    const button = screen.queryByText("Copy");
    expect(button).not.toBeInTheDocument();
  });
  it("Delete button works", () => {
    const fakeFunction = jest.fn();
    render(
      <GradientCard gradient={fakeGradient} onDeleteGradient={fakeFunction} />
    );

    const button = screen.getByLabelText("delete gradient");
    button.click();
    expect(fakeFunction).toHaveBeenCalledTimes(1);
  });
  it("Gradient card doesn't contain delete button", () => {
    render(<GradientCard gradient={fakeGradient} />);
    const button = screen.queryByLabelText("delete gradient");
    expect(button).not.toBeInTheDocument();
  });
  it("Gradient card contain onClick className", () => {
    render(<GradientCard onClick={jest.fn()} gradient={fakeGradient} />);

    expect(screen.getByTestId("gradientCard")).toHaveStyle("cursor: pointer");
    expect(screen.getByTestId("gradientCard").firstChild).toHaveClass(
      styles.cardTopHover
    );
  });
  it("Gradient card doesn't contain onClick className", () => {
    render(<GradientCard gradient={fakeGradient} />);
    expect(screen.getByTestId("gradientCard")).not.toHaveStyle(
      "cursor: pointer"
    );
    expect(screen.getByTestId("gradientCard").firstChild).not.toHaveClass(
      styles.cardTopHover
    );
  });
  it("Gradient contains className", () => {
    render(<GradientCard className="test" gradient={fakeGradient} />);

    expect(screen.getByTestId("gradientCard")).toHaveClass("test");
  });
});
