export default class AbstractRule {
    constructor(error_label) {
        this.error_label = error_label;
    }

    test() {
        console.warn('Unimplemented test function was called. Check that your rule implements "test()."');
    }

    validate(...args) {
        return this.test(...args);
    }

    getErrorLabel(...values) {
        // TODO: Support translations and values in outputted string
        return this.error_label;
    }
}
