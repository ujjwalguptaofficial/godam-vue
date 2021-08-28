<template>
  <div class="col content-center mt-20px">
    <div class="row">
      <div>
        <h3 class="primary-text">first Name</h3>
        <input @input="onInputFirstName" type="text" :value="firstName" />
      </div>
      <div class="ml-10px">
        <h3 class="primary-text">last Name</h3>
        <input @input="onInputLastName" type="text" :value="lastName" />
      </div>
      <div class="row content-v-center ml-20px">
        <h1>= {{ fullName }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutation, mapExpression } from "godam-vue";
export default {
  computed: {
    ...mapState({
      firstName: "firstName",
      lastName: "lastName",
    }),
    ...mapExpression(["fullName"]),
  },
  methods: {
    ...mapMutation({
      setFirstName: "firstName",
      setLastName: "lastName",
    }),
    onInputFirstName(e) {
      this.setFirstName(e.target.value);
    },
    onInputLastName(e) {
      this.setLastName(e.target.value);
    },
  },
};
</script>

<style></style>
