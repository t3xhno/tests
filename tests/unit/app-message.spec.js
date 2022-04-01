import { render } from "@testing-library/vue";
import AppMessage, { validateVariant } from "@/components/AppMessage";

describe("AppMessage", () => {
  const renderAppMessage = (prop) =>
    render(AppMessage, {
      props: {
        variant: prop,
      },
    });

  it("Renders variant correctly when passed", () => {
    const { container } = renderAppMessage("success");
    expect(container.firstChild.classList).toContain("success");
  });

  it("Validates valid prop", () => {
    ["success", "warning", "error"].forEach((variant) => {
      expect(() => validateVariant(variant)).not.toThrow();
    });
  });

  it("Throws error for invalid variant prop", () => {
    expect(() => validateVariant("invalid")).toThrow();
  });
});
