import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { GradientInfoDrawer } from "..";
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

describe("GradientInfoDrawer component", () => {
  const fakeGradient = ["000000", "ffffff"];

  it("GradientInfoDrawer renders", () => {
    render(
      <GradientInfoDrawer
        handleClose={jest.fn}
        gradient={fakeGradient}
        isOpen={true}
      />
    );

    expect(screen.getByText("#000000")).toBeInTheDocument();
    expect(screen.getByText("#ffffff")).toBeInTheDocument();
  });
  it("Copy button works", () => {
    const onCopy = jest.fn();
    render(
      <GradientInfoDrawer
        onCopyGradient={onCopy}
        handleClose={jest.fn()}
        gradient={fakeGradient}
        isOpen={true}
      />
    );
    const copyButton = screen.getByText("Copy");
    copyButton.click();
    expect(onCopy).toHaveBeenCalledTimes(1);
  });
  it("Component doesn't contain copy button", () => {
    render(
      <GradientInfoDrawer
        handleClose={jest.fn()}
        gradient={fakeGradient}
        isOpen={true}
      />
    );
    const copyButton = screen.queryByText("Copy");
    expect(copyButton).not.toBeInTheDocument();
  });
  it("Component contain two textField", () => {
    render(
      <GradientInfoDrawer
        handleClose={jest.fn()}
        gradient={fakeGradient}
        isOpen={true}
      />
    );
    const firstTextField = screen.getByDisplayValue("000000");
    const secondTextField = screen.getByDisplayValue("ffffff");

    expect(firstTextField).toBeInTheDocument();
    expect(secondTextField).toBeInTheDocument();
  });
  it("onSave function works", () => {
    const onSave = jest.fn();
    render(
      <GradientInfoDrawer
        onSave={onSave}
        handleClose={jest.fn()}
        gradient={fakeGradient}
        isOpen={true}
      />
    );
    const saveButton = screen.getByText("Save");
    saveButton.click();
    expect(onSave).toHaveBeenCalledTimes(1);
  });
  it("After click on save button text change", () => {
    render(
      <GradientInfoDrawer
        onSave={jest.fn()}
        handleClose={jest.fn()}
        gradient={fakeGradient}
        isOpen={true}
      />
    );
    const saveButton = screen.getByText("Save");
    saveButton.click();
    const saveButtonAfterClick = screen.getByText("Already saved");
    expect(saveButtonAfterClick).toBeInTheDocument();
  });
});
