"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Habit_1 = __importDefault(require("../../infrastructure/db/repositories/Habit"));
const Habit_2 = require("../../application/services/Habit");
const Habit_3 = __importDefault(require("../controllers/Habit"));
class HabitRoutes {
    constructor() {
        this.habitRepo = new Habit_1.default();
        this.habitService = new Habit_2.HabitService(this.habitRepo);
        this.habitController = new Habit_3.default(this.habitService);
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        const { overwriteHabits, getHabits } = this.habitController;
        this.router.route("/").post(overwriteHabits).get(getHabits);
    }
}
exports.default = HabitRoutes;
