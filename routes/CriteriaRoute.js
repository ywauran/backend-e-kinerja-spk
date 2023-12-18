import {
  getCriterias,
  createCriteria,
  updateCriteria,
} from "../controllers/Criteria.js";
import express from "express";

const router = express.Router();

router.get("/criterias", getCriterias);
router.post("/criteria", createCriteria);
router.patch("/criteria/update", updateCriteria);

export default router;
