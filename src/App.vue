<template>
  <app-message variant="success" />
  <app-form />
</template>

<script>
import AppForm from "@/components/AppForm.vue";
import AppMessage from "@/components/AppMessage";
export default {
  name: "App",
  components: {
    AppForm,
    AppMessage,
  },
};
</script>

<style lang="scss" src="@/assets/styles/base.scss" />
