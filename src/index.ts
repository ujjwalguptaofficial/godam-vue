import { Room, Godam, Observer } from "godam";

export * from "./type";
export const mapState = (states: string[] | {}, room?: string) => {
    var obj = {};
    const createState = (mappedState, state) => {
        if (room) {
            obj[mappedState] = {
                get() {
                    return this.$store.get(`${state}@${room}`);
                },
                set(val) {
                    this.$store.set(`${state}@${room}`, val);
                }
            }
        }
        else {
            obj[mappedState] = {
                get() {
                    return this.$store.get(state);
                },
                set(value) {
                    this.$store.set(state, value);
                }
            }
        }
    }
    if (Array.isArray(states)) {
        states.forEach(state => {
            createState(state, state);
        });
    }
    else {
        for (const key in states) {
            createState(key, states[key]);
        }
    }
    return obj;
}

export const mapExpression = (expressions: string[] | {}, room?: string) => {
    var obj = {};
    const createExpression = (mappedKey, expression) => {
        if (room) {
            obj[mappedKey] = {
                get() {
                    return this.$store.eval(`${expression}@${room}`);
                },
            };
        }
        else {
            obj[mappedKey] = {
                get() {
                    return this.$store.eval(expression);
                }
            }
        }
    }
    if (Array.isArray(expressions)) {
        expressions.forEach(state => {
            createExpression(state, state);
        });
    }
    else {
        for (const key in expressions) {
            createExpression(key, expressions[key]);
        }
    }
    return obj;
}

export const mapTask = (tasks: string[] | {}, room?: string) => {
    var obj = {};
    const createTask = (mappedKey, expression) => {
        if (room) {
            obj[mappedKey] = function (...payload) {
                return this.$store.do(`${expression}@${room}`, ...payload);
            };
        }
        else {
            obj[mappedKey] = function (...payload) {
                return this.$store.do(expression, ...payload);
            }
        }
    }
    if (Array.isArray(tasks)) {
        tasks.forEach(state => {
            createTask(state, state);
        });
    }
    else {
        for (const key in tasks) {
            createTask(key, tasks[key]);
        }
    }
    return obj;
}

export const mapMutation = (mutations: string[] | {}, room?: string) => {
    var obj = {};
    const createMutation = (mappedKey, mutation) => {
        if (room) {
            obj[mappedKey] = function (...payload) {
                this.$store.set(`${mutation}@${room}`, ...payload);
            };
        }
        else {
            obj[mappedKey] = function (...payload) {
                this.$store.set(mutation, ...payload);
            }
        }
    }
    if (Array.isArray(mutations)) {
        mutations.forEach(state => {
            createMutation(state, state);
        });
    }
    else {
        for (const key in mutations) {
            createMutation(key, mutations[key]);
        }
    }
    return obj;
}

let _vue;
function initRoom(this: Godam) {
    this['track'] = false;
    new _vue({ data: this['__state__'] });
    const expression = this['__expression__'];
    const computed = expression['__computed__'];
    if (computed) {
        new _vue({ data: this['__computed__'] });
    };

    for (const key in this.rooms) {
        const room = this.rooms[key];
        initRoom.call(room);
    }
}

export default {
    install(Vue, store) {
        Godam['track'] = false;
        _vue = Vue;
        initRoom.call(store);
        Vue.mixin({
            beforeCreate() {
                this.$store = store;
            }
        })
    }
}