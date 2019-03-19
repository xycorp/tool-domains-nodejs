"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class RecordValidatorDmarc extends base_1.RecordValidator {
    constructor(config) {
        super({ name: config.name, type: "TXT(DMARC)" });
        this.found = [];
        this.value = config.value;
        this.missing = config.expected;
    }
    async validate(config) {
        try {
            for (let i = 1; i < this.value.length; i++) {
                const missing = this.getMissing(this.value[i]);
                const found = this.getFound(this.value[i]);
                if (missing === -1) { // not missing
                    if (found !== -1) { // found
                        this.addError("validateDmarc", `Duplicate [${this.name}]: ${this.value[i]}`);
                    }
                    else { // not found
                        this.addError("validateDmarc", `Unexpected [${this.name}]: ${this.value[i]}`);
                    }
                }
                else { // missing
                    if (found !== -1) { // found
                        this.addError("validateDmarc", `Double Expectation [${this.name}]: ${this.value[i]}`);
                    }
                    else { // not found
                        this.found.push(this.value[i]); // add to found
                        this.missing.splice(missing, 1); // remove from missing
                    }
                }
            }
        }
        catch (ex) {
            this.addError("validateDmarc.validate", `Unexpected Error[${this.name}]: ${ex}`);
        }
        return super.validate(config);
    }
    getMissing(value) {
        for (let i = 0; i < this.missing.length; i++) {
            if (value === this.missing[i]) {
                return i;
            }
        }
        return -1;
    }
    getFound(value) {
        for (let i = 0; i < this.found.length; i++) {
            if (value === this.found[i]) {
                return i;
            }
        }
        return -1;
    }
}
exports.RecordValidatorDmarc = RecordValidatorDmarc;
//# sourceMappingURL=dmarc.js.map