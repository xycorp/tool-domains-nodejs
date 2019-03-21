"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dns_1 = __importDefault(require("dns"));
class Dns {
    static async lookup(name) {
        return new Promise((resolve, reject) => {
            dns_1.default.lookup(name, 4, (err, address) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(address);
                }
            });
        });
    }
    static async resolve(name, type) {
        return new Promise((resolve, reject) => {
            return dns_1.default.resolve(name, type, (err, addresses) => {
                if (err) {
                    if (err.code !== 'ENODATA' && err.code !== 'ENOTFOUND') {
                        reject(err);
                    }
                    else {
                        resolve([]);
                    }
                }
                else {
                    resolve(addresses);
                }
            });
        });
    }
    static async resolve4(name) {
        return new Promise((resolve, reject) => {
            dns_1.default.resolve4(name, (err, records) => {
                if (err) {
                    if (err.code !== 'ENODATA' && err.code !== 'ENOTFOUND') {
                        reject(err);
                    }
                    else {
                        resolve([]);
                    }
                }
                else {
                    resolve(records);
                }
            });
        });
    }
    static async resolveCname(name) {
        return new Promise((resolve, reject) => {
            dns_1.default.resolveCname(name, (err, records) => {
                if (err) {
                    if (err.code !== 'ENODATA' && err.code !== 'ENOTFOUND') {
                        reject(err);
                    }
                    else {
                        resolve([]);
                    }
                }
                else {
                    resolve(records);
                }
            });
        });
    }
    static async resolveMx(name) {
        return new Promise((resolve, reject) => {
            dns_1.default.resolveMx(name, (err, records) => {
                if (err) {
                    if (err.code !== 'ENODATA' && err.code !== 'ENOTFOUND') {
                        reject(err);
                    }
                    else {
                        resolve([]);
                    }
                }
                else {
                    resolve(records);
                }
            });
        });
    }
    static async resolveTxt(name) {
        return new Promise((resolve, reject) => {
            dns_1.default.resolveTxt(name, (err, records) => {
                if (err) {
                    if (err.code !== 'ENODATA' && err.code !== 'ENOTFOUND') {
                        reject(err);
                    }
                    else {
                        resolve([]);
                    }
                }
                else {
                    resolve(records);
                }
            });
        });
    }
    static async reverse(address) {
        return new Promise((resolve, reject) => {
            dns_1.default.reverse(address, (err, hostNames) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(hostNames);
                }
            });
        });
    }
}
exports.Dns = Dns;
//# sourceMappingURL=dns.js.map