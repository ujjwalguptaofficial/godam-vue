export const mapState = (states: string[], room: string) => {
    var obj = {};
    states.forEach(state => {
        if (room) {
            obj[state] = function () {
                return this.$store.get(`${state}@${room}`);
            }
        }
        else {
            obj[state] = function () {
                return this.$store.get(state);
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