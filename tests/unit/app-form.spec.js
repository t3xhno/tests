// import AppForm from "@/components/AppForm";
import useForm from "@/composables/useForm";
// import { render, screen, fireEvent } from "@testing-library/vue";

const { required, isBetween, validateMeasurement, isFormValid, patientForm } =
  useForm();

// BUSINESS LOGIC TESTS
describe("Required", () => {
  it("Is invalid when undefined", () => {
    expect(required(undefined)).toEqual({
      valid: false,
      message: "Required",
    });
  });

  it("Is invalid when empty string", () => {
    expect(required("")).toEqual({
      valid: false,
      message: "Required",
    });
  });

  it("Returns true if value is present", () => {
    expect(required("some value")).toEqual({ valid: true });
  });
});

describe("isBetween", () => {
  const constraints = { min: 5, max: 10 };
  it("True when value is equal to min", () => {
    expect(isBetween(5, constraints)).toEqual({ valid: true });
  });

  it("True when valie is between min/max", () => {
    expect(isBetween(7, constraints)).toEqual({ valid: true });
  });

  it("True when value is equal to max", () => {
    expect(isBetween(10, constraints)).toEqual({ valid: true });
  });

  it("False when value is less than min", () => {
    expect(isBetween(3, constraints)).toEqual({
      valid: false,
      message: `Must be between ${constraints.min} and ${constraints.max}`,
    });
  });

  it("False when value is more than max", () => {
    expect(isBetween(13, constraints)).toEqual({
      valid: false,
      message: `Must be between ${constraints.min} and ${constraints.max}`,
    });
  });
});

describe("validateMeasurement", () => {
  const constraints = { min: 10, max: 30 };
  it("True if values are valid", () => {
    const actual = validateMeasurement(20, constraints);
    expect(actual).toEqual({ valid: true });
  });

  it("False when value is undefined/null", () => {
    const actual = validateMeasurement(undefined, constraints);
    expect(actual).toEqual({ valid: false, message: "Required" });
  });

  it("False when value is outside constraints", () => {
    const actual = validateMeasurement(35, constraints);
    expect(actual).toEqual({
      valid: false,
      message: `Must be between ${constraints.min} and ${constraints.max}`,
    });
  });
});

describe("isFormValid", () => {
  it("True when name and weight are valid", () => {
    const form = {
      name: { valid: true },
      weight: { valid: true },
    };
    expect(isFormValid(form)).toBe(true);
  });

  it("False when any field is invalid", () => {
    const form = {
      name: { valid: false },
      weight: { valid: true },
    };
    expect(isFormValid(form)).toBe(false);
  });
});

describe("patientForm", () => {
  const validPatient = {
    name: "test patient",
    weight: { value: 100, units: "kg" },
  };

  it("Valid for valid form", () => {
    const form = patientForm(validPatient);
    expect(form.name).toEqual({ valid: true });
    expect(form.weight).toEqual({ valid: true });
  });

  it("Invalid when name is empty", () => {
    const form = patientForm({ ...validPatient, name: "" });
    expect(form.name).toEqual({ valid: false, message: "Required" });
  });

  it("Validates weight in imperial", () => {
    const form = patientForm({
      ...validPatient,
      weight: { value: 65, units: "lb" },
    });
    expect(form.weight).toEqual({
      valid: false,
      message: "Must be between 66 and 440",
    });
  });

  it("Validates weight in metric", () => {
    const form = patientForm({
      ...validPatient,
      weight: { value: 29, units: "kg" },
    });
    expect(form.weight).toEqual({
      valid: false,
      message: "Must be between 30 and 200",
    });
  });
});

// NOT WORKING, PLEASE REVISIT!!!

// UI TESTS
// describe("AppForm", () => {
//   it("Fills out form correctly", async () => {
//     render(AppForm);

//     await fireEvent.update(screen.getByLabelText("Name"), "Marko Lazic");
//     await fireEvent.update(screen.getByDisplayValue("kg"), "lb");
//     await fireEvent.update(screen.getByLabelText("Weight"), "5");

//     expect(screen.queryByRole("error")).toBe(null);
//   });

//   it("Shows errors for invalid inputs", async () => {
//     render(AppForm);

//     await fireEvent.update(screen.getByLabelText("Name"), "");
//     await fireEvent.update(screen.getByLabelText("Weight"), "5");
//     await fireEvent.update(screen.getByDisplayValue("kg"), "lb");

//     expect(screen.getAllByRole("error")).toHaveLength(2);
//   });
// });
