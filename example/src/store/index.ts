import { Godam, Mutation, Expression, Task } from "godam";

export class State {
    appName = "Vue Example for Godam"
}

export class RootMutation extends Mutation<State> {
    name(value) {
        this.state.appName = value;
    }
}

export const store = new Godam<State, RootMutation>({
    state: State,
    mutations: RootMutation
});