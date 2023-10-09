import express from "express";
const router = express.Router();
import {
  createJob,
  updateJob,
  deleteJob,
  showStats,
  getAllJobs,
} from "../controlllers/jobsController.js";

router.route("/create").post(createJob);
router.route("/get").get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").patch(updateJob);
router.route("/delete/:id").delete(deleteJob);

// remember about id

export default router;
