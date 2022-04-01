<template>
  <div :class="variant">Message</div>
</template>

<script>
export const validateVariant = (variant) => {
  if (!["success", "warning", "error"].includes(variant))
    throw Error(
      `Variant must be success|warning|error. You passed: ${variant}`.trim()
    );
  return true;
};

export default {
  props: {
    variant: {
      validator: validateVariant,
    },
  },
};
</script>
