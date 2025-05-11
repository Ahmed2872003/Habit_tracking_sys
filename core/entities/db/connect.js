"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _MognoDbConnection_connection;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MognoDbConnection {
    constructor(URI) {
        this.URI = URI;
        _MognoDbConnection_connection.set(this, new mongoose_1.default.Mongoose());
    }
    static getInstance(URI) {
        return this.instance ? this.instance : new MognoDbConnection(URI);
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.URI) {
                __classPrivateFieldSet(this, _MognoDbConnection_connection, yield mongoose_1.default.connect(this.URI), "f");
            }
        });
    }
}
_MognoDbConnection_connection = new WeakMap();
MognoDbConnection.instance = null;
exports.default = MognoDbConnection;
