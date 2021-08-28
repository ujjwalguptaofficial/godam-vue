<template>
  <div class="col content-center mt-20px">
    <h1 class="primary-text">{{ appName }}</h1>
  </div>
</template>

<script>
import { mapState } from "godam-vue";
export default {
  computed: {
    ...mapState({
      appName: "appName",
    }),
  },
};
</script>

<style></style>
