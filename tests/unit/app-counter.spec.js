import AppCounter, { submitValidator } from "@/components/AppCounter";
import { render, screen, fireEvent } from "@testing-library/vue";

describe("AppCounter", () => {
  it("Emits an event with current count", async () => {
    const assertEvent = async (expected) => {
      await fireEvent.click(screen.getByRole("increment"));
      await fireEvent.click(screen.getByRole("submit"));
      expect(emitted().submit[expected - 1]).toEqual([expected]);
    };
    const { emitted } = render(AppCounter);
    await assertEvent(1);
    await assertEvent(2);
  });

  it("Throws when count is NaN", () => {
    const actual = () => submitValidator("1");
    expect(actual).toThrow();
  });

  it("True when count is a number", () => {
    const actual = () => submitValidator(1);
    expect(actual).not.toThrow();
  });
});
