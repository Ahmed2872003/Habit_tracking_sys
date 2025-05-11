"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const HabitSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxlength: [60, "Name must not exceed 60 characters"],
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9 ]+$/.test(value);
            },
            message: "Name must not contain special characters",
        },
    },
    target: {
        type: Number,
        required: [true, "Target is required"],
        validate: [
            {
                validator: Number.isInteger,
                message: "Target must be an integer",
            },
            {
                validator: function (value) {
                    return value > 0;
                },
                message: "Target must be a positive number",
            },
        ],
    },
    streak: {
        type: Number,
        default: 0,
        validate: [
            {
                validator: Number.isInteger,
                message: "Streak must be an integer",
            },
            {
                validator: function (value) {
                    return value >= 0;
                },
                message: "Streak must not be negative",
            },
        ],
    },
    lastChecked: {
        type: Date,
        default: Date.now,
        required: [true, "LastChecked is required"],
        validate: {
            validator: function (value) {
                return !isNaN(value.getTime());
            },
            message: "Invalid date",
        },
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
const HabitModel = mongoose_1.default.model("Habit", HabitSchema);
exports.default = HabitModel;
