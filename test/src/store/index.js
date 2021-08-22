import { Godam, Mutations, Expressions, Tasks } from "godam";

export class State {
    students = [];
    lastStudentId = 0;
    name = "ujjwal"
}

export class RootMutation extends Mutations {
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

export class RootTask extends Tasks {
    addStudent(student) {
        let lastStudentId = this.get("lastStudentId");
        student.id = ++lastStudentId;

        this.set("students", student);
        this.set("lastStudentId", lastStudentId);
    }
}

export class RootExpression extends Expressions {
    studentsLength() {
        return this.get('students').length;
    }
}

export default new Godam({
    state: State,
    mutations: RootMutation,
    tasks: RootTask,
    expressions: RootExpression
});