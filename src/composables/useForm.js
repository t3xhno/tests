const limits = {
  kg: { min: 30, max: 200 },
  lb: { min: 66, max: 440 },
};

export default () => {
  const required = (value) =>
    !value ? { valid: false, message: "Required" } : { valid: true };

  const isBetween = (value, { min, max }) =>
    value < min || value > max
      ? { valid: false, message: `Must be between ${min} and ${max}` }
      : { valid: true };

  const validateMeasurement = (value, constraints) =>
    !required(value).valid ? required(value) : isBetween(value, constraints);

  const isFormValid = (form) =>
    Object.keys(form)
      .map((key) => form[key].valid)
      .every((v) => v);

  const patientForm = (patient) => ({
    name: required(patient.name),
    weight: validateMeasurement(
      patient.weight.value,
      limits[patient.weight.units]
    ),
  });

  return {
    required,
    isBetween,
    isFormValid,
    patientForm,
    validateMeasurement,
  };
};
