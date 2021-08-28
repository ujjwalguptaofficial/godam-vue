import { Godam, Mutation, Expression, Task, Computed } from "godam";

export class State {
    firstName = "ujjwal"
    lastName = "gupta"
}

export class RootMutation extends Mutation<State> {
    firstName(value) {
        this.state.firstName = value;
    }
    lastName(value) {
        this.state.lastName = value;
    }
}
export class RootExpression extends Expression<State> {

    @Computed('firstName', 'lastName')
    get fullName() {
        return this.get('firstName') + ' ' + this.get('lastName');
    }
}

export const store = new Godam<State, RootMutation>({
    state: State,
    mutations: RootMutation,
    expressions: RootExpression
});