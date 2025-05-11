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
const mongoose_1 = __importDefault(require("mongoose"));
const Challenge_1 = __importDefault(require("../models/Challenge"));
class ChallengeRepo {
    constructor() {
        this.getChallenges = (user_id) => __awaiter(this, void 0, void 0, function* () {
            const challenges = yield Challenge_1.default.aggregate([
                // Step 1: Lookup the UserChallenge collection to find if the user has joined the challenge
                {
                    $lookup: {
                        from: "userchallenges", // This should be the collection name for UserChallenge
                        localField: "_id",
                        foreignField: "challenge_id",
                        as: "userChallenges",
                    },
                },
                // Step 2: Project the data, including if the user is joined or not
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        days: 1,
                        userChallenges: 1,
                    },
                },
                // Step 3: Check if the user has joined the challenge
                {
                    $addFields: {
                        joined: {
                            $in: [
                                new mongoose_1.default.Types.ObjectId(user_id),
                                "$userChallenges.user_id",
                            ],
                        },
                        users: {
                            $map: {
                                input: "$userChallenges",
                                as: "userChallenge",
                                in: {
                                    name: {
                                        $let: {
                                            vars: {
                                                user: { $toObjectId: "$$userChallenge.user_id" },
                                            },
                                            in: {
                                                $ifNull: [
                                                    {
                                                        $arrayElemAt: [
                                                            {
                                                                $filter: {
                                                                    input: "$$user",
                                                                    as: "user",
                                                                    cond: {
                                                                        $eq: [
                                                                            "$$user._id",
                                                                            "$$userChallenge.user_id",
                                                                        ],
                                                                    },
                                                                },
                                                            },
                                                            0,
                                                        ],
                                                    },
                                                    { name: "Unknown" },
                                                ],
                                            },
                                        },
                                    },
                                    streak: "$$userChallenge.streak",
                                },
                            },
                        },
                    },
                },
                // Optional Step: To format the final output and match your expected result
                {
                    $project: {
                        id: "$_id",
                        name: 1,
                        joined: 1,
                        days: 1,
                        streak: {
                            $ifNull: [{ $arrayElemAt: ["$userChallenges.streak", 0] }, 0],
                        },
                        users: 1,
                    },
                },
            ]);
            return challenges;
        });
    }
}
exports.default = ChallengeRepo;
