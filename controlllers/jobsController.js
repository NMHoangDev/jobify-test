import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../errors/index.js";
import checkPermission from "../ultils/checkPermissions.js";
import mongoose from "mongoose";

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Please provide all values!!!");
  }

  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  console.log(job);
  res.status(StatusCodes.CREATED).json({ job });
};
const getAllJobs = async (req, res) => {
  const { status, jobType, sort, search } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  let result = Job.find(queryObject);
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("-createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("-position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }
  const page = Number(req.query.page) || 2;
  const limit = Number(req.query.limit) || 5;

  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const jobs = await result;
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({ jobs, totalJob: jobs.length, numOfPages: numOfPages });
};
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position, jobLocation } = req.body;
  if (!position || !company) {
    throw new BadRequestError("Please provide all values");
  }
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  // check permissions
  checkPermission(req.user, job.createdBy);
  // Approach alternative
  // const updateJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
  //   new: true,
  //   runValidators: true,
  // });
  job.position = position;
  job.company = company;
  job.jobLocation = jobLocation;
  await job.save();

  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }
  console.log(req.user, job);
  checkPermission(req.user, job.createdBy);
  await job.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Delete Success" });
};
const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  const defaultValue = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let montlyApplications = [];
  res.status(StatusCodes.OK).json({ defaultValue, montlyApplications });
};
export { createJob, updateJob, deleteJob, showStats, getAllJobs };
