import React from "react";
import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Banner from "./index";

describe("Banner", () => {
  test("renders Banner component with default props", () => {
    render(<Banner />);
    const bannerElement = screen.getByTestId("banner");
    const defaultImgSrc = "https://via.placeholder.com/1440x400.png";
    const defaultTitle = "Banner title";
    const defaultBody =
      "Loren ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero in dui mattis, nec aliquam odio fermentum";

    expect(bannerElement).toBeInTheDocument();
    expect(screen.getByAltText("Banner image")).toHaveAttribute(
      "src",
      defaultImgSrc
    );
    expect(screen.getByText(defaultTitle)).toBeInTheDocument();
    expect(screen.getByText(defaultBody)).toBeInTheDocument();
  });

  test("renders Banner component with custom props", () => {
    const customImgSrc = "https://example.com/banner.png";
    const customTitle = "Custom Banner";
    const customBody = "Custom banner body text";

    render(
      <Banner urlImg={customImgSrc} title={customTitle}>
        {customBody}
      </Banner>
    );

    const bannerElement = screen.getByTestId("banner");

    expect(bannerElement).toBeInTheDocument();
    expect(screen.getByAltText("Banner image")).toHaveAttribute(
      "src",
      customImgSrc
    );
    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customBody)).toBeInTheDocument();
  });
});