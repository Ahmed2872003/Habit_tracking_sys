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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Habit_1 = __importDefault(require("../../core/entities/Habit"));
class HabitController {
    constructor(habitService) {
        this.habitService = habitService;
        this.overwriteHabits = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { habits: habitsPlain } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const habits = habitsPlain.map((h) => new Habit_1.default(userId, h.name, h.target, h.streak, h.lastChecked, undefined));
            habits.forEach((h) => {
                h.validateName();
                h.validateTarget();
                h.validateStreak();
            });
            yield this.habitService.overwriteHabits(`${userId}`, habits);
            res.sendStatus(200);
        });
        this.getHabits = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _b;
            const habits = yield this.habitService.getHabits(`${(_b = req.user) === null || _b === void 0 ? void 0 : _b.id}`);
            res.json(habits);
        });
    }
}
exports.default = HabitController;
