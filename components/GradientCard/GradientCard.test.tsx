import { fireEvent, render, screen } from "@testing-library/react";

import GradientCard from "./index";

import "@testing-library/jest-dom/extend-expect";
import { copyGradient, getGradientProperty } from "../../utiles/functions";

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
    it("Delete button works", () => {
        const fakeFunction = jest.fn();
        render(
            <GradientCard
                gradient={fakeGradient}
                onDeleteGradient={fakeFunction}
            />
        );

        const button = screen.getByLabelText("delete gradient");
        button.click();
        expect(fakeFunction).toHaveBeenCalledTimes(1);
    });
    it("Gradient contains className", () => {
        render(<GradientCard className="test" gradient={fakeGradient} />);

        expect(screen.getByTestId("gradientCard")).toHaveClass("test");
    });
});
