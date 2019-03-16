"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class RecordValidatorMx extends base_1.RecordValidator {
    constructor(name, value) {
        super(name, "MX");
        this.value = value;
    }
    async validate(timeout) {
        try {
            switch (this.value.exchange) {
                case "aspmx.l.google.com": {
                    if (this.value.priority !== 1) {
                        this.addError("validate", `Incorrect Priority: ${this.value.exchange}=${this.value.priority} [Expected=1]`);
                    }
                    break;
                }
                case "alt1.aspmx.l.google.com": {
                    if (this.value.priority !== 5) {
                        this.addError("validate", `Incorrect Priority: ${this.value.exchange}=${this.value.priority} [Expected=5]`);
                    }
                    break;
                }
                case "alt2.aspmx.l.google.com": {
                    if (this.value.priority !== 5) {
                        this.addError("validate", `Incorrect Priority: ${this.value.exchange}=${this.value.priority} [Expected=5]`);
                    }
                    break;
                }
                case "aspmx2.googlemail.com": {
                    if (this.value.priority !== 10) {
                        this.addError("validate", `Incorrect Priority: ${this.value.exchange}=${this.value.priority} [Expected=10]`);
                    }
                    break;
                }
                case "aspmx3.googlemail.com": {
                    if (this.value.priority !== 10) {
                        this.addError("validate", `Incorrect Priority: ${this.value.exchange}=${this.value.priority} [Expected=10]`);
                    }
                    break;
                }
                default: {
                    this.addError("validate", `Unexpected Exchange: ${this.value.exchange}=${this.value.priority}`);
                }
            }
        }
        catch (ex) {
            this.addError("validate", ex);
        }
        return super.validate(timeout);
    }
}
exports.RecordValidatorMx = RecordValidatorMx;
//# sourceMappingURL=mx.js.map