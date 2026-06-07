// // controller for enchance a resume peofessional summary
// //POST :/api/ai/enhance-pro-sum

// import Resume from "../models/Resume.js";
// import ai from "../configs/ai.js"

// export const enchanceProfessionalSummary = async (req, res) => {
//     try {
//         const { userContent } = req.body;

//         if (!userContent) {
//             return res.status(400).json({ message: 'Missing required fields' })
//         }
//         const response = await ai.chat.completions.create({
//             model: process.env.OPENAI_MODEL,
//             messages: [
//                 {
//                     role: "system",
//                     content: `You are an expert in resume writing.
//     Your task is to enhance the professional summary of a resume.
//     The summary should be 1-2 sentences highlighting key skills,
//       experience, and career objectives.
//      Make it compelling and ATS-friendly.
//      Only return the improved summary text, options or anything else.`,
//                 },
//                 {
//                     role: "user",
//                     content: userContent,
//                 },
//             ],

//         })
//         const enchancedContent = response.choices[0].message.content;
//         return res.status(200).json({ enchancedContent })

//     }
//     catch (error) {
//         return res.status(400).json({ message: error.message })


//     }
// }

// // controller for enchance a resume jon description
// //POST :/api/ai/enhance-pro-desc

// export const enchanceJobDescription = async (req, res) => {
//     try {
//         const { userContent } = req.body;

//         if (!userContent) {
//             return res.status(400).json({ message: 'Missing required fields' })
//         }
//         const response = await ai.chat.completions.create({
//             model: process.env.OPENAI_MODEL,
//             messages: [
//                 {
//                     role: "system",
//                     content: `You are an expert in resume writing.
//         Your task is to enhance the job descriptionf a resume.
//         The job description should be 1-2 sentences highlighting key responsibilities and achievements.
//         Use action verbs and quamtifiable results where possible.
//         Make it compelling and ATS-friendly.
//         Only return text options or anything else..`,
//                 },
//                 {
//                     role: "user",
//                     content: userContent,
//                 },
//             ],

//         })
//         const enchancedContent = response.choices[0].message.content;
//         return res.status(200).json({ enchancedContent })

//     }
//     catch (error) {
//         return res.status(400).json({ message: error.message })


//     }
// }

// //// controller for uploadinga resumeto the database
// //POST :/api/ai/uploade-resume

// export const uploadResume = async (req, res) => {
//     try {
//         const { resumeText, title } = req.body;
//         const userId = req.userId;

//         if (!resumeText) {
//             return res.status(400).json({ message: 'Missing required fields' })
//         }

//         //       const systemPrompt ="You are an expert AI to extract data from resume."
//         //       const userPrompt = `extract data from this resume: ${resumeText} 
//         //       Provide data in the following JSON format with no additional text before or after:

//         //      {
//         //       professional_summary:{
//         //     type:String,
//         //     default:''
//         // },
//         // skills:[{
//         //     type:String
//         // }],
//         // personal_info:{
//         //     image:{
//         //         type:String,
//         //         default: ''
//         //     },
//         //     full_name:{
//         //         type:String,
//         //         default:''
//         //     },
//         //     profession:{
//         //         type:String,
//         //         default:''
//         //     },
//         //     email:{
//         //         type:String,
//         //         default:''
//         //     },
//         //     phone:{
//         //         type:String,
//         //         default:''
//         //     },
//         //     location:{
//         //         type:String,
//         //         default:''
//         //     },
//         //     linkedin:{
//         //         type:String,
//         //         default:''
//         //     },
//         //     website:{
//         //         type:String,
//         //         default:''
//         //     }
//         // },
//         // experience:[
//         //     {
//         //     company :{
//         //         type:String
//         //     },
//         //     position:{
//         //         type:String
//         //     },
//         //     start_date:{
//         //         type:String
//         //     },
//         //     end_date:{
//         //         type:String
//         //     },
//         //     description:{
//         //         type:String
//         //     },
//         //     is_current:{
//         //         type:Boolean
//         //     }

//         // }],
//         // project :[{
//         //     name:{
//         //         type:String
//         //     },
//         //     type:{
//         //         type:String
//         //     },
//         //     description:{
//         //         type:String
//         //     }
//         // }],
//         // education:[{
//         //     institution:{
//         //         type:String
//         //     },
//         //     degree:{
//         //         type:String
//         //     },
//         //     field:{
//         //         type:String
//         //     },
//         //     graduation_date:{
//         //         type:String
//         //     },
//         //     gpa:{
//         //         type:String
//         //     }
//         // }],
//         //       } `



//         const systemPrompt = "You are an expert AI to extract data from resume."

//         const userPrompt = `
// Extract data from this resume and return ONLY valid JSON.

// {
//   "professional_summary": "",
//   "skills": [],
//   "personal_info": {
//     "full_name": "",
//     "profession": "",
//     "email": "",
//     "phone": "",
//     "location": "",
//     "linkedin": "",
//     "website": ""
//   },
//   "experience": [],
//   "project": [],
//   "education": []
// }

// Resume:
// ${resumeText}
// `


//         const response = await ai.chat.completions.create({
//             model: process.env.OPENAI_MODEL,
//             messages: [
//                 {
//                     role: "system",
//                     content: systemPrompt,
//                 },
//                 {
//                     role: "user",
//                     content: userPrompt,
//                 },
//             ],
//             response_format: { type: "json_object"}

//         })
//         const extractedData = response.choices[0].message.content;
//         // const parsedData = JSON.parse(extractedData)

//         const parsedData = {
//    professional_summary: "Test Summary",
//    skills: ["React", "Node"],
//    personal_info: {
//       full_name: "Goldi Kumari"
//    },
//    experience: [],
//    project: [],
//    education: []
// }
//         const newResume = await Resume.create({ userId, title, ...parsedData })
//         res.json({ resumeId: newResume._id })

//     }
//     catch (error) {
//         return res.status(400).json({ message: error.message })


//     }
// }




import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";

// ======================================
// Enhance Professional Summary
// ======================================

export const enchanceProfessionalSummary = async (req, res) => {

    try {

        const { userContent } = req.body;

        if (!userContent) {

            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const response = await ai.chat.completions.create({

            model: process.env.GROQ_MODEL,
            messages: [
                {
                    role: "system",
                    content: `
You are an expert resume writer.

Improve the professional summary.

Return only improved text.
`
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        });

        const enchancedContent =
            response.choices[0].message.content;

        return res.status(200).json({
            enchancedContent
        });

    } catch (error) {

        console.log(error);

        return res.status(400).json({
            message: error.message
        });
    }
};

// ======================================
// Enhance Job Description
// ======================================

export const enchanceJobDescription = async (req, res) => {

    try {

        const { userContent } = req.body;

        if (!userContent) {

            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const response = await ai.chat.completions.create({

            model: process.env.GROQ_MODEL,

            messages: [
                {
                    role: "system",
                    content: `
You are an expert resume writer.

Improve the job description.

Return only improved text.
`
                },
                {
                    role: "user",
                    content: userContent
                }
            ]
        });

        const enchancedContent =
            response.choices[0].message.content;

        return res.status(200).json({
            enchancedContent
        });

    } catch (error) {

        console.log(error);

        return res.status(400).json({
            message: error.message
        });
    }
};

// ======================================
// Upload Resume
// ======================================

export const uploadResume = async (req, res) => {

    try {

        const { resumeText, title } = req.body;

        const userId = req.userId;

        if (!resumeText) {

            return res.status(400).json({
                message: "Resume text is required"
            });
        }

        console.log("UPLOAD STARTED");

        let parsedData;

        try {

            // ======================================
            // AI PROMPTS
            // ======================================

            const systemPrompt = `
You are an expert AI resume parser.

Extract resume information and return ONLY valid JSON.

Do not return markdown.
Do not return explanation.
Do not wrap inside \`\`\`.

Return clean JSON only.
`;

            const userPrompt = `
Extract data from this resume.

Return ONLY valid JSON in this format:

{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [],
  "project": [],
  "education": []
}

Resume:
${resumeText.slice(0, 6000)}
`;

            // ======================================
            // AI REQUEST
            // ======================================
            const response = await ai.chat.completions.create({
                model: process.env.GROQ_MODEL,
                messages: [
                    {
                        role: "system",
                        content: systemPrompt,
                    },
                    {
                        role: "user",
                        content: userPrompt,
                    },
                ],
                temperature: 0.2,
            });

            const extractedData =
                response.choices[0].message.content;
            console.log("RAW AI RESPONSE:");
            console.log(extractedData);

            // ======================================
            // CLEAN JSON
            // ======================================

            const cleanedData = extractedData
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            parsedData = JSON.parse(cleanedData);

            console.log("AI PARSED SUCCESS");

        } catch (aiError) {

            console.log("AI FAILED");
            console.log(aiError);

            // ======================================
            // FALLBACK TEST DATA
            // ======================================

            parsedData = {

                professional_summary:
                    "AI fallback summary",

                skills: [
                    "React",
                    "Node.js",
                    "MongoDB"
                ],

                personal_info: {
                    full_name: "Fallback User",
                    profession: "MERN Developer",
                    email: "fallback@gmail.com",
                    phone: "1234567890",
                    location: "India",
                    linkedin: "",
                    website: ""
                },

                experience: [],
                project: [],
                education: []

            };

            console.log("USING FALLBACK DATA");
        }

        // ======================================
        // SAVE TO DATABASE
        // ======================================

        const newResume = await Resume.create({

            userId,
            title,

            professional_summary:
                parsedData.professional_summary || "",

            skills:
                parsedData.skills || [],

            personal_info:
                parsedData.personal_info || {},

            experience:
                parsedData.experience || [],

            project:
                parsedData.project || [],

            education:
                parsedData.education || []

        });

        console.log("RESUME SAVED");

        return res.status(200).json({

            success: true,
            resumeId: newResume._id

        });

    } catch (error) {

        console.log("AI ERROR =", error);

        return res.status(error.status || 500).json({
            message:
                error?.error?.message ||
                error?.message ||
                "Unknown AI Error"
        });

    }

};