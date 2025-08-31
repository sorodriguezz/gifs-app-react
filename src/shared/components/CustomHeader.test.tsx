import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
  const title = "Test Title";
  const description = "Test Description";

  test("should render the title correctly", () => {
    const { container } = render(<CustomHeader title={title} />);
    expect(container.textContent).toContain(title);
    expect(screen.getByText(title)).toBeDefined();
    // screen.debug(); // para ver lo que se renderiza
  });

  test("should render the description when provided", () => {
    const { container } = render(
      <CustomHeader title={title} description={description} />
    );
    expect(container.textContent).toContain(description);
    expect(screen.getByText(description)).toBeDefined();
    expect(screen.getByRole("paragraph")).toBeDefined();
    expect(screen.getByRole("paragraph").innerHTML).toBe(description);
  });

  test("should not render description when not provided", () => {
    const { container } = render(<CustomHeader title={title} />);

    const divElement = container.querySelector(".content-center");

    const h1 = divElement?.querySelector("h1");

    const p = divElement?.querySelector("p");

    expect(p).toBeNull();
    expect(h1?.innerHTML).toBe(title);
    expect(container.textContent).not.toContain(description);
  });
});
