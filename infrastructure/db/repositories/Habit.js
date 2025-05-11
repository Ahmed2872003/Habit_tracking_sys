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
const HabitModel_1 = __importDefault(require("../models/HabitModel"));
const Deserializer_1 = __importDefault(require("../../../shared/utils/Deserializer"));
class HabitRepo {
    overwriteHabits(user_id, habit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield HabitModel_1.default.deleteMany({ user_id });
            const newHabits = habit.map((habit) => {
                {
                    const plainHabit = Deserializer_1.default.deserializer(habit);
                    plainHabit.user_id = plainHabit.id;
                    delete plainHabit.id;
                    return plainHabit;
                }
            });
            yield HabitModel_1.default.insertMany(newHabits);
            return true;
        });
    }
    getHabits(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield HabitModel_1.default.find({ user_id });
        });
    }
}
exports.default = HabitRepo;
