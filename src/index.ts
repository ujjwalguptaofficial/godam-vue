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