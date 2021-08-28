import { Godam, Mutation, Expression, Task } from "godam";

export class State {
    students = [];
    lastStudentId = 0;
    name = "ujjwal"
}

export class RootMutation extends Mutation {
    students(value) {
        this.state.students.push(value);
    }

    lastStudentId(value) {
        this.state.lastStudentId = value;
    }

    name(value) {
        this.state.name = value;
    }
}

export class RootTask extends Task {
    addStudent(student) {
        let lastStudentId = this.get("lastStudentId");
        student.id = ++lastStudentId;

        this.set("students", student);
        this.set("lastStudentId", lastStudentId);
    }
}

export class RootExpression extends Expression {
    constructor() {
        super();
        this.markComputed(['students'], 'studentsLength');
        this.markComputed(['name'], 'nameLength');
    }
    get studentsLength() {
        return this.get('students').length;
    }

    get nameLength() {
        return this.get('name').length;
    }

}

export default new Godam({
    state: State,
    mutations: RootMutation,
    tasks: RootTask,
    expressions: RootExpression
});