import { Room, Godam } from "godam";

export * from "./type";
export const mapState = (states: string[], room: string) => {
    var obj = {};
    states.forEach(state => {
        if (room) {
            obj[state] = {
                get() {
                    return this.$store.get(`${state}@${room}`);
                },
                set(val) {
                    this.$store.set(`${state}@${room}`, val);
                }
            }
        }
        else {
            obj[state] = {
                get() {
                    return this.$store.get(state);
                },
                set(value) {
                    this.$store.set(state, value);
                }
            }
        }
    });
    return obj;
}

export const mapExpression = (expressions: string[], room: string) => {
    var obj = {};
    expressions.forEach(state => {
        if (room) {
            obj[state] = function () {
                return this.$store.eval(`${state}@${room}`);
            }
        }
        else {
            obj[state] = function () {
                return this.$store.eval(state);
            }
        }
    });
    return obj;
}

let _vue;
function initRoom(this: Godam) {
    this['track'] = false;
    this['__state__'] = new _vue({ data: this['__state__'] });
    const expression = this['__expression__'];
    const computed = expression['__computed__'];
    if (computed) {
        const computedExpression = {};
        for (const key in computed) {
            const data = computed[key];
            data.args.forEach(arg => {
                this.watch(arg, () => {
                    expression[key] = data.fn.call(expression);
                });
            })
            computedExpression[key] = data.fn.call(expression);
        }
        const vm = new _vue({ data: computedExpression });
        for (const key in computedExpression) {
            vm.$on(key, (newValue, oldValue) => {
                this['__onChange__'].call(this, `expression.${key}`, newValue, oldValue);
            })
        }
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