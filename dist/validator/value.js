"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("./validator");
const chalk_1 = __importDefault(require("chalk"));
class ValueValidator extends validator_1.Validator {
    constructor(config, data) {
        super(config);
        this.data = data;
    }
    validate() {
        const _super = Object.create(null, {
            validate: { get: () => super.validate }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (this.config.filter) {
                switch (this.config.disposition) {
                    case 'required':
                        return this.validateRequired();
                        break;
                }
            }
            console.log(chalk_1.default.gray(`Value Check Passed: ${this.config.name || this.config.filter}:${this.data}`));
            return _super.validate.call(this);
        });
    }
    validateRequired() {
        if (this.config.filter) {
            let matchesFound = 0;
            for (const data of this.data) {
                if (this.checkValue(this.config.filter, data)) {
                    matchesFound++;
                }
            }
            if (matchesFound > 0) {
                console.log(chalk_1.default.gray(`Required Value Check Passed: ${this.config}`));
            }
            else {
                this.addError("value", `Required value missing: ${this.config}`);
                console.log(chalk_1.default.magenta(`${this.config}: ${JSON.stringify(this.data)}`));
            }
        }
        return super.validate();
    }
    checkValue(filter, data) {
        console.log(chalk_1.default.gray(`checkValue: ${JSON.stringify(filter)}:${JSON.stringify(data)}`));
        let matched = false;
        if (typeof filter === typeof data) {
            if (typeof data === "string") {
                if ((data.match(filter))) {
                    matched = true;
                }
            }
            else if (typeof data === "object") {
                for (const key of Object.keys(filter)) {
                    matched = true;
                    if (!this.checkValue(filter[key], data[key])) {
                        matched = false;
                    }
                }
            }
            else if (typeof data === "number") {
                if (data === filter) {
                    matched = true;
                }
            }
        }
        else {
            this.addError("validate", `Value type mismatch [${typeof data} should be ${typeof filter}]`);
            this.addError("validate", `Value type mismatch [${JSON.stringify(data)} should be ${JSON.stringify(filter)}]`);
        }
        console.log(chalk_1.default.gray(`checkValue: matched:${matched}`));
        return matched;
    }
}
exports.ValueValidator = ValueValidator;
//# sourceMappingURL=value.js.map