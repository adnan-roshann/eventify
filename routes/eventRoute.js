import express from "express";
import {renderlanding } from "../controller/eventController.js"

const router = express.Router();
router.get("/land",renderlanding);