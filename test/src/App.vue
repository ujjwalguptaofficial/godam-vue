<template>
  <div id="app">
    {{ name }}, expression {{ nameLength }}
    <img alt="Vue logo" src="./assets/logo.png" />
    <p>Students Length: {{ studentsLength }}</p>
    <div v-for="student in students" :key="student.id">
      {{ student.name }}
    </div>
    <StudentGrid :students="students" @add="addStudent" />
  </div>
</template>

<script>
import StudentGrid from "./components/student_grid.vue";
import { mapState, mapTask, mapExpression } from "godam-vue";

export default {
  name: "app",
  components: {
    StudentGrid,
  },
  mounted() {},
  computed: {
    ...mapExpression(["studentsLength", "nameLength"]),
    ...mapState(["students", "name"]),
    // name() {
    //   const state = this.$store.__state__;
    //   debugger;
    //   return state.name;
    // },
  },
  data() {
    window["comp"] = this;
    return {
      // students: []
    };
  },
  methods: {
    ...mapTask({ save: "addStudent" }),
    addStudent(student) {
      window["student"] = student;
      const studentsAdded = this.save(student);
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
