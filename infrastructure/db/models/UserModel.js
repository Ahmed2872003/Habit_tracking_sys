"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Username is required"],
        validate: {
            validator: function (value) {
                const regex = /^[a-zA-Z0-9 ]+$/;
                return regex.test(value);
            },
            message: "Name must not contain special characters",
        },
        maxlength: [25, "Username length should be less than or equal to 25"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"],
    },
}, {
    timestamps: true,
});
UserSchema.index({ name: 1 }, { unique: true });
UserSchema.pre("save", function hashPass(next) {
    if (this.isModified("password")) {
        this.password = crypto_js_1.default.SHA256(this.password).toString(crypto_js_1.default.enc.Hex);
    }
    next();
});
UserSchema.methods.comparePass = function compare(password) {
    const hashedPass = crypto_js_1.default.SHA256(password).toString(crypto_js_1.default.enc.Hex);
    return this.password === hashedPass;
};
const UserModel = mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
