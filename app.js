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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_1 = __importDefault(require("./infrastructure/db/connect"));
const Auth_1 = __importDefault(require("./web/routes/Auth"));
const Habit_1 = __importDefault(require("./web/routes/Habit"));
const ErrorHandler_1 = __importDefault(require("./web/errors/ErrorHandler"));
const auth_1 = __importDefault(require("./web/middleware/auth"));
const Challenge_1 = __importDefault(require("./web/routes/Challenge"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
require("express-async-errors");
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || "") || 3000;
// middleware
const errorHandler = new ErrorHandler_1.default();
// Routers
const authRouter = new Auth_1.default().router;
const habitRouter = new Habit_1.default().router;
const challengeRouter = new Challenge_1.default().router;
// // Routes
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/auth", authRouter);
app.use(auth_1.default);
app.use("/api/v1/habit", habitRouter);
app.use("/api/v1/challenge", challengeRouter);
app.use(errorHandler.handle);
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connect_1.default.getInstance(process.env.MONGO_URI || "").connect();
            app.listen(port, "0.0.0.0", () => {
                console.log(`Server listening at port: ${port}`);
                console.log("Connected to the Database");
            });
        }
        catch (err) {
            console.log(err instanceof Error ? err.message : "An unknown error occurred");
        }
    });
}
startApp();
