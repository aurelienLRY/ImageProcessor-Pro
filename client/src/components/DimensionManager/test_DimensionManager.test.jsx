import React from "react";
import { test, expect, describe, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import DimensionManager from "./index";
import userEvent from "@testing-library/user-event";

describe("DimensionManager", () => {
  test("renders DimensionManager component", () => {
    const mockOnValuesChange = vi.fn();
    render(<DimensionManager  onDimensionManager={mockOnValuesChange} />);
    const dimensionManagerElement = screen.getByTestId("dimension-manager");
    expect(dimensionManagerElement).toBeInTheDocument();
  });

  test('adds a new dimension when "Ajouter une dimension" button is clicked', () => {
    render(<DimensionManager  onDimensionManager={() => {}} />);
    const addButton = screen.getByText("Ajouter une dimension");
    fireEvent.click(addButton);
    const dimensionInputs = screen.getAllByPlaceholderText("Largeur en pixel");
    expect(dimensionInputs.length).toBe(2);
  });

  test('removes a dimension when "Supprimer" button is clicked', () => {
    render(<DimensionManager  onDimensionManager={() => {}} />);
    const addButton = screen.getByText("Ajouter une dimension");
    fireEvent.click(addButton);
    const removeButton = screen.getByText("Supprimer");
    fireEvent.click(removeButton);
    const dimensionInputs = screen.getAllByPlaceholderText("Largeur en pixel");
    expect(dimensionInputs.length).toBe(1);
  });

  test("calls onValuesChange with sorted dimensions when dimensions change", async () => {
    const mockOnValuesChange = vi.fn();
    render(<DimensionManager  onDimensionManager={mockOnValuesChange} />);
    const addButton = screen.getByText("Ajouter une dimension");
    fireEvent.click(addButton);
    const dimensionInputs = screen.getAllByPlaceholderText("Largeur en pixel");
    await userEvent.type(dimensionInputs[0], "800");
    await userEvent.type(dimensionInputs[1], "600");

    // Déclenchez un événement blur sur chaque champ d'entrée
    fireEvent.blur(dimensionInputs[0]);
    fireEvent.blur(dimensionInputs[1]);

    // Utilisez waitFor pour attendre que mockOnValuesChange soit appelé avec les valeurs attendues
    await waitFor(() => {
      expect(mockOnValuesChange).toHaveBeenCalledWith([
        { id: expect.any(Number), dimension: "600", dimensionSuffix: "" },
        { id: expect.any(Number), dimension: "800", dimensionSuffix: "" },
      ]);
    });
  });

  test("removes one dimension and have the onValuesChange called with the right values", async () => {
    const mockOnValuesChange = vi.fn();
    render(<DimensionManager  onDimensionManager={mockOnValuesChange} />);
    const addButton = screen.getByText("Ajouter une dimension");
    fireEvent.click(addButton);
    const dimensionInputs = screen.getAllByPlaceholderText("Largeur en pixel");
    await userEvent.type(dimensionInputs[0], "1800");
    await userEvent.type(dimensionInputs[1], "600");

    // Déclenchez un événement blur sur chaque champ d'entrée
    fireEvent.blur(dimensionInputs[0]);
    fireEvent.blur(dimensionInputs[1]);

    // Utilisez waitFor pour attendre que mockOnValuesChange soit appelé avec les valeurs attendues
    await waitFor(() => {
      expect(mockOnValuesChange).toHaveBeenCalledWith([
        { id: expect.any(Number), dimension: "600", dimensionSuffix: "" },
        { id: expect.any(Number), dimension: "1800", dimensionSuffix: "" },
      ]);
    });

    // Supprimez la première dimension
    const removeButton = screen.getAllByText("Supprimer")[0];
    fireEvent.click(removeButton);

    // Utilisez waitFor pour attendre que mockOnValuesChange soit appelé avec les valeurs attendues
    await waitFor(() => {
      expect(mockOnValuesChange).toHaveBeenCalledWith([
        { id: expect.any(Number), dimension: "1800", dimensionSuffix: "" },
      ]);
    });
  });

  test("formats dimension suffix when dimension suffix input is blurred", async () => {
    const mockOnValuesChange = vi.fn();
    render(<DimensionManager  onDimensionManager={mockOnValuesChange} />);
    const dimensionInput = screen.getByPlaceholderText("Largeur en pixel");
    const suffixInput = screen.getByPlaceholderText("Entrer un suffixe");
    await userEvent.type(dimensionInput, "800");
    await userEvent.type(suffixInput, "DESktop");

    // Déclenchez un événement blur sur le champ d'entrée du suffixe
    fireEvent.blur(suffixInput);

    // Utilisez waitFor pour attendre que mockOnValuesChange soit appelé avec les valeurs attendues
    await waitFor(() => {
      expect(mockOnValuesChange).toHaveBeenCalledWith([
        {
          id: expect.any(Number),
          dimension: "800",
          dimensionSuffix: "-desktop",
        },
      ]);
    });
  });
});
