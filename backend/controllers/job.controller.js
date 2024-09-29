import { Job } from "../models/job.model.js";

export const postjob = async (req, res) => {
  const {
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    experience,
    position,
    companyId, // Ensure this field correctly maps to the company ObjectId
  } = req.body;

  const userId = req.id; // Assuming this is being set by your authentication middleware

  try {
    // Check for all required fields
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId // Ensure companyId is correctly provided
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Create the job
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","), // Converts comma-separated string to array
      salary: Number(salary),
      location,
      jobType,
      experience: Number(experience),
      position,
      company: companyId, // Ensure this matches the _id of an existing company
      createdBy: userId,
    });

    return res.status(201).json({
      message: "Job created successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    // Destructure query parameters from the request
    const keyword = req.query.keyword || "";
    const { title, description } = req.query;

    // Construct the query object
    const query = {};
    if (title || description) {
      query = {
        $or: [
          { title: { $regex: keyword, $option: "i" } },
          { description: { $regex: description, $option: "i" } },
        ],
      };
    }

    const jobs = await Job.find(query)
      .populate({
        path: "company", // Use the correct field name 'company' as per the Job schema
      })
      .sort({ createdAt: -1 });

    // Check if any jobs were found
    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found matching the criteria",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Jobs retrieved successfully",
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("GetJobsByTitleAndDescription error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    // Extract the job ID from the request parameters
    const jobId = req.params.id;

    // Find the job by its ID
    const job = await Job.findById(jobId);

    // Check if the job was found
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Job retrieved successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.error("GetJobById error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ createdBy: adminId });
    if (!jobs) {
      return res.status(400).json({
        message: "Jobs not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("getAdminJobs error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
