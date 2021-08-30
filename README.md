# godam-vue

Godam plugin for vue framework.

# Installation

```
npm i godam-vue
```

# Guide

## Create your store

```
import { Godam, Mutation, Expression, Task } from "godam";

export class State {
    name = "ujjwal"
}

export class RootMutation extends Mutation {
    name(value) {
        this.state.name = value;
    }
}

export const store = new Godam({
    state: State,
    mutation: RootMutation
});
```

## Setup plugin

```
import GodamPlugin from "godam-vue";
Vue.use(GodamPlugin, store);
```

now `store` is mounted on `$store` in component.

## Use store in your component

```
<template>
  <div id="app">
    {{ name }}
  </div>
</template>

<script>
import { mapState, mapTask, mapExpression } from "godam-vue";

export default {  
  computed: {
    ...mapState(["name"])
  },
  methods:{
      getName(){
          return this.$store.get('name')
      }
  }
};
</script>
```