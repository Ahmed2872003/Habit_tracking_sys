"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ChallengeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxlength: [60, "Name must not exceed 60 characters"],
        validate: {
            validator: (value) => /^[a-zA-Z0-9 ]+$/.test(value),
            message: "Name must not contain special characters",
        },
    },
    days: {
        type: Number,
        required: [true, "Days is required"],
        validate: [
            {
                validator: Number.isInteger,
                message: "Days must be an integer",
            },
            {
                validator: (value) => value > 0,
                message: "Days must be a positive number",
            },
        ],
    },
}, { timestamps: true });
const ChallengeModel = mongoose_1.default.model("Challenge", ChallengeSchema);
exports.default = ChallengeModel;
