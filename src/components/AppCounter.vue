<template>
  <button role="increment" @click="increment" />
  <button role="submit" @click="submit" />
</template>

<script>
export const submitValidator = (count) => {
  if (typeof count === "string" || isNaN(count))
    throw Error(`Count must be a number. Got ${count}`.trim());
  return true;
};

import { ref } from "vue";

export default {
  emits: {
    submit: submitValidator,
  },
  setup(_, { emit }) {
    const count = ref(0);

    const increment = () => count.value++;
    const submit = () => emit("submit", count.value);

    return {
      count,
      submit,
      increment,
    };
  },
};
</script>
