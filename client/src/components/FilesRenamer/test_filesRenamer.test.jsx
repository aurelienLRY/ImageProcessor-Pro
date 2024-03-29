import React from "react";
import { test, expect, describe, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilesRenamer from "./index";



describe("FilesRenamer", () => {
  global.URL.createObjectURL = vi.fn();
  
  test("renders FilesRenamer component", () => {
    const image = [new File([""], "image1.jpg"), new File([""], "image2.jpg")];
    const mockOnRename = vi.fn();
    render(<FilesRenamer image={image} onRename={mockOnRename} />);
    const filesRenamerElement = screen.getByTestId("files-renamer");
    expect(filesRenamerElement).toBeInTheDocument();
  });

  test("displays the correct number of files", () => {
    const mockOnRename = vi.fn();
    const image = [new File([""], "image1.jpg"), new File([""], "image2.jpg")];
    render(<FilesRenamer image={image} onRename={mockOnRename} />);
    const fileItems = screen.getAllByTestId("file-item");
    expect(fileItems.length).toBe(2);
  });

  test("calls onRename with the correct rename object when input value is changed", () => {
    const mockOnRename = vi.fn();
    const image = [new File([""], "image1.jpg"), new File([""], "image2.jpg")];
    render(<FilesRenamer image={image} onRename={mockOnRename} />);
    const input = screen.getAllByTestId("file-input")
    fireEvent.change(input[0], { target: { value: "new_name" } });
    fireEvent.blur(input[0]); // Ajoutez cette ligne
    expect(mockOnRename).toHaveBeenCalledWith({ 0: "new_name" });
  });
  
});