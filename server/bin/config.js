"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 4000,
    //	DB:process.env.DB || 'dbname',
    //	MONGO_USER:process.env.DB || 'admin',
    //	MONGO_PASS:process.env.DB || '12345'
};
