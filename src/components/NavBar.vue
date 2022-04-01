<template>
  <button>{{ authenticated ? "Logout" : "Login" }}</button>
</template>

<script>
export default {
  props: {
    authenticated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
