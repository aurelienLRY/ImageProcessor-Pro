import React from "react";
import { test, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DestinationManager from "./index";

describe("DestinationManager", () => {
  test("renders DestinationManager component", () => {
    render(<DestinationManager onDestination={() => {}} />);
    const destinationManagerElement = screen.getByTestId("destination-manager");
    expect(destinationManagerElement).toBeInTheDocument();
  });

  test("calls onDestination with the correct value when input value changes", () => {
    const mockOnDestination = vi.fn();
    render(<DestinationManager onDestination={mockOnDestination} />);
    const destinationInput = screen.getByPlaceholderText("Dossier de destination");
    fireEvent.change(destinationInput, { target: { value: "/path/to/destination" } });
    expect(mockOnDestination).toHaveBeenCalledWith("/path/to/destination/");
  });
});