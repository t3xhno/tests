<template>
  <h3>Patient Data</h3>
  <form>
    <div class="field">
      <div class="error" v-if="!validatedForm.name.valid">
        {{ validatedForm.name.message }}
      </div>
      <label for="name">Name</label>
      <input id="name" name="name" v-model="form.name" />
    </div>
    <div class="field">
      <div class="error" v-if="!validatedForm.weight.valid">
        {{ validatedForm.weight.message }}
      </div>
      <label for="weight">Weight</label>
      <input id="weight" name="weight" v-model.number="form.weight.value" />
      <select name="weightUnits" v-model="form.weight.units">
        <option value="kg">kg</option>
        <option value="lb">lb</option>
      </select>
    </div>
    <div class="field">
      <button :disabled="!valid">Submit</button>
    </div>
  </form>
  <pre>
        Patient Date
        {{ form }}
    </pre
  >
  <br />
  <pre>
        Form State
        {{ validatedForm }}
    </pre
  >
</template>

<script>
import useForm from "@/composables/useForm";
import { reactive, computed } from "vue";
export default {
  setup() {
    const { patientForm, isFormValid } = useForm();
    const form = reactive({
      name: "",
      weight: {
        value: "",
        units: "kg",
      },
    });

    const validatedForm = computed(() => patientForm(form));
    const valid = computed(() => isFormValid(validatedForm.value));

    return {
      form,
      valid,
      validatedForm,
    };
  },
};
</script>
