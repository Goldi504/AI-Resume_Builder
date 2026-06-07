import imagekit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";
import fs from 'fs';


//controller for creating a new resume ;
//POST :/api/resume/create

export const createResume = async (req, res) => {
  try {
    const userId = req.userId;

    const { title } = req.body;

    const newResume = await Resume.create({
      userId,
      title,
    });

    return res.status(201).json({
      success: true,
      resume: newResume,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

//controller for deleting a resume 
//DELETE : api/resume/delete

export const deleteResume = async (req, res) => {
    try {

        const userId = req.userId;
        const { resumeId } = req.params;

        await Resume.findOneAndDelete({ userId, _id: resumeId })
        // return success mesaage
        return res.status(200).json({
            success: true,
            message: 'Resume deleted successfully'
            // resume:newResume
        })

    } catch (error) {
        return res.status(400).json({ message: error.message })


    }
}

//get user resume by id
//GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {

        const userId = req.userId;
        const { resumeId } = req.params;

        const resume = await Resume.findOne({ userId, _id: resumeId })

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })
        }
        // return success mesaage
        resume.__v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;

        return res.status(200).json({ resume })

    }
    catch (error) {
        return res.status(400).json({ message: error.message })


    }
}

// get resume by id public
//GET: /api/resumes/public

export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId })

        if (!resume) {
            return res.status(404).json({ message: "Resume not found" })

        }
        return res.status(200).json({ resume })


    } catch (error) {
        return res.status(400).json({ message: error.message })

    }
}

//update the resume 
//PUT: //api/resumes/update
export const updateResume = async (req, res) => {
    try {

        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body
        const image = req.file;

        let resumeDataCopy;
        console.log("resumeId =", req.body.resumeId);
        console.log("body =", req.body);
        if (typeof resumeData === 'string') {
            resumeDataCopy = JSON.parse(resumeData);
        }
        else {
            resumeDataCopy = structuredClone(resumeData)
        }

        // if (image) {
        //     const imageBufferData = fs.createReadStream(image.path)

        //     const response = await imagekit.files.upload({
        //         file: imageBufferData,
        //         fileName: 'resume.png',
        //         folder: 'user-resumes',
        //         transformation: {
        //             pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
        //         }
        //     });
        //     resumeDataCopy.personal_info.image = response.url
        // }


        if (image) {
            try {
                console.log("Uploading image...");

                const response = await imagekit.files.upload({
                    file: image.buffer.toString("base64"),
                    fileName: `${Date.now()}-${image.originalname}`,
                    useUniqueFileName: true,
                    folder: "/user-resumes",
                });

                console.log("UPLOAD SUCCESS:", response);

                resumeDataCopy.personal_info.image = response.url;
            } catch (error) {
                console.error("IMAGEKIT UPLOAD ERROR:", error);
                throw error;
            }
        }


        const resume = await Resume.findOneAndUpdate(
            {
                userId,
                _id: resumeId,
            },
            {
                $set: resumeDataCopy,
            },
            {
                returnDocument: "after",
                runValidators: true,
            }
        );
        return res.status(200).json({ message: "Saved successfuly", resume })



    } catch (error) {
        return res.status(400).json({ message: error.message })


    }
}



export const getUserResume = async (req, res) => {
  try {
    console.log("GET USER RESUME CALLED");
    console.log("USER ID =", req.userId);

    const resumes = await Resume.find({ userId: req.userId });

    console.log("FOUND RESUMES =", resumes.length);

    return res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};