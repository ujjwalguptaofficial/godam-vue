import { Godam, Mutations, Expressions, Tasks } from "godam";

export class State {
    students = [];
}

export default new Godam({
    state: State
});