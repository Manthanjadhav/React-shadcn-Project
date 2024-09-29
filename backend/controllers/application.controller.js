import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }
    //check if the user has already applied for job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have Aleary Applied for the job",
        success: false,
      });
    }

    //check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }

    //create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job Applied Successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in ApplyJob", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    // Find applications for the logged-in user and populate job and company details
    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 }) // Sort applications by creation date
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } }, // Ensure 'job' matches the field name in the Application schema
        populate: {
          path: "company", // Ensure 'company' matches the field name in the Job schema
          options: { sort: { createdAt: -1 } },
        },
      });

    // Check if applications were found
    if (!applications || applications.length === 0) {
      return res.status(404).json({
        message: "No Applications Found",
        success: false,
      });
    }

    // Respond with the applications and success message
    return res.status(200).json({
      applications, // Plural form for consistency
      success: true,
    });
  } catch (error) {
    console.error("Error in getAppliedJobs:", error); // Enhanced error logging
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

//for Admin to check how many user applied
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Find the job and populate its applications and applicants
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant", // Populate the applicant field within the applications
      },
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error("Error in getApplicants:", error); // Improved error logging for debugging
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).json({
        message: "Status is required",
        success: false,
      });
    }
    //find the application by application id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
