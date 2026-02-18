// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useCreateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
// import { useParams } from "react-router-dom";
// import { message } from "antd";
// import { FaCloudUploadAlt, FaTimes } from "react-icons/fa"; 

// const AddQuesForm = ({ refetch, setIsModalOpen }) => {
//   const [createQues] = useCreateQuesMutation();
//   const { id } = useParams();
//   const [imagePreview, setImagePreview] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//     watch,
//   } = useForm();


//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImagePreview(URL.createObjectURL(file));
//       setValue("question_image", file);রা
//     }
//   };


//   const removeImage = () => {
//     setImagePreview(null);
//     setValue("question_image", null);
//   };

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();

 
//       if (data.question_image) {
//         formData.append("question_image", data.question_image);
//       }

   
//       const questionData = {
//         topic: id,
//         question: data.question,
//         options: data.options,
//         answer: data.answer,
//         explanation: data.explanation,
//       };

//       formData.append("data", JSON.stringify(questionData));

//       const res = await createQues({
//         args: formData,
//         id: id,
//       }).unwrap();

//       if (res?.success) {
//         message.success(res?.message || "Question created successfully");
//         refetch();
//         reset();
//         setImagePreview(null);
//         setIsModalOpen(false);
//       }
//     } catch (error) {
//       message.error(error?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-2xl mx-auto p-6 space-y-5 font-title bg-white rounded-lg"
//     >
//       {/* --- Image Upload Section --- */}
//       <div className="space-y-2">
//         <label className="block font-medium text-gray-700 text-sm">Question Image (Optional)</label>
        
//         {!imagePreview ? (
//           <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-400 transition-all bg-gray-50 group cursor-pointer">
//             <input
//               type="file"
//               accept="image/*"
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               onChange={handleImageChange}
//             />
//             <div className="flex flex-col items-center justify-center space-y-2">
//               <div className="p-3 bg-blue-50 rounded-full text-blue-500 group-hover:scale-110 transition-transform">
//                 <FaCloudUploadAlt size={28} />
//               </div>
//               <p className="text-sm text-gray-600">
//                 <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
//               </p>
//               <p className="text-xs text-gray-400">PNG, JPG or WEBP (Max 2MB)</p>
//             </div>
//           </div>
//         ) : (
//           <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
//             <img 
//               src={imagePreview} 
//               alt="Preview" 
//               className="w-full h-full object-contain" 
//             />
//             <button
//               type="button"
//               onClick={removeImage}
//               className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition-colors"
//             >
//               <FaTimes size={14} />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* --- Question Input --- */}
//       <div>
//         <label className="block mb-1 font-medium text-gray-700 text-sm">Question</label>
//         <input
//           {...register("question", { required: "Question is required" })}
//           placeholder="Type your question here..."
//           className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
//         />
//         {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question.message}</p>}
//       </div>

//       {/* --- Options --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {[0, 1, 2, 3].map((index) => (
//           <div key={index}>
//             <label className="block mb-1 font-medium text-gray-600 text-xs uppercase tracking-wider">Option {index + 1}</label>
//             <input
//               {...register(`options.${index}`, { required: true })}
//               placeholder={`Option ${index + 1}`}
//               className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all"
//             />
//           </div>
//         ))}
//       </div>

//       {/* --- Correct Answer & Explanation --- */}
//       <div className="grid grid-cols-1 gap-4">
//         <div>
//           <label className="block mb-1 font-medium text-gray-700 text-sm">Correct Answer</label>
//           <input
//             {...register("answer", { required: "Answer is required" })}
//             placeholder="Specify the correct answer"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium text-gray-700 text-sm">Explanation</label>
//           <textarea
//             {...register("explanation", { required: "Explanation is required" })}
//             placeholder="Why is this answer correct?"
//             rows={3}
//             className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none"
//           />
//         </div>
//       </div>

//       {/* --- Submit Button --- */}
//       <div className="pt-2">
//         <button
//           type="submit"
//           className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-[0.98]"
//         >
//           Create Question
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddQuesForm;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
import { useGeneratePresignedUrlMutation } from "../../redux/feature/hazard/hazardApi"; // Presigned URL API
import { useParams } from "react-router-dom";
import { message } from "antd";
import { FaCloudUploadAlt, FaTimes, FaVideo } from "react-icons/fa";

const AddQuesForm = ({ refetch, setIsModalOpen }) => {
  const [createQues] = useCreateQuesMutation();
  const [generatePresignedUrl] = useGeneratePresignedUrlMutation();
  const { id } = useParams();
  
  // States for Image & Video
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // 'generating', 'uploading', 'submitting'

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  const watchedVideo = watch("video");

  // XHR Upload Logic (Same as HazardForm)
  const uploadFileWithProgress = (uploadUrl, file, contentType) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
        else reject(new Error(`Upload failed: ${xhr.status}`));
      });
      xhr.addEventListener('error', () => reject(new Error('Upload failed')));
      xhr.open('PUT', uploadUrl);
      xhr.setRequestHeader('Content-Type', contentType);
      xhr.send(file);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("question_image", file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setValue("question_image", null);
  };

  const onSubmit = async (data) => {
    const videoFile = data?.video?.[0];
    let uploadedVideoFileName = "";

    try {
      setIsUploading(true);

      // --- Step 1: Video Upload (If video selected) ---
      if (videoFile) {
        setUploadStatus("generating");
        const presignedRes = await generatePresignedUrl({
          fileType: videoFile.type || "video/mp4",
          fileCategory: "video"
        }).unwrap();

        const { uploadURL, fileName } = presignedRes;
        
        setUploadStatus("uploading");
        await uploadFileWithProgress(uploadURL, videoFile, videoFile.type || 'video/mp4');
        uploadedVideoFileName = fileName;
      }

      // --- Step 2: Submit Final Data ---
      setUploadStatus("submitting");
      const formData = new FormData();

      if (data.question_image) {
        formData.append("question_image", data.question_image);
      }

      const questionData = {
        topic: id,
        question: data.question,
        options: data.options,
        answer: data.answer,
        explanation: data.explanation,
        video: uploadedVideoFileName, // S3 থেকে আসা ফাইল নেম
      };

      formData.append("data", JSON.stringify(questionData));

      const res = await createQues({
        args: formData,
        id: id,
      }).unwrap();

      if (res?.success) {
        message.success(res?.message || "Question created successfully");
        refetch();
        reset();
        setImagePreview(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      message.error(error?.data?.message || error?.message || "Something went wrong");
    } finally {
      setIsUploading(false);
      setUploadStatus("");
      setUploadProgress(0);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 space-y-5 font-title bg-white rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* --- Image Upload Section --- */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700 text-sm">Question Image (Optional)</label>
          {!imagePreview ? (
            <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-all bg-gray-50 group cursor-pointer h-32 flex flex-col items-center justify-center">
              <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleImageChange} />
              <FaCloudUploadAlt size={24} className="text-gray-400" />
              <p className="text-xs text-gray-500 mt-1">Upload Image</p>
            </div>
          ) : (
            <div className="relative h-32 rounded-xl overflow-hidden border border-gray-200">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-contain bg-gray-100" />
              <button type="button" onClick={removeImage} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"><FaTimes size={12} /></button>
            </div>
          )}
        </div>

        {/* --- Video Upload Section --- */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700 text-sm">Question Video (Optional)</label>
          <div className={`relative border-2 border-dashed rounded-xl p-4 transition-all h-32 flex flex-col items-center justify-center ${watchedVideo?.[0] ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
            <input 
              type="file" 
              accept="video/*" 
              {...register("video")} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              disabled={isUploading}
            />
            <FaVideo size={24} className={watchedVideo?.[0] ? 'text-green-500' : 'text-gray-400'} />
            <p className="text-xs text-center text-gray-500 mt-1">
              {watchedVideo?.[0] ? watchedVideo[0].name.substring(0, 20) + "..." : "Upload Video"}
            </p>
          </div>
        </div>
      </div>

      {/* --- Progress Bar --- */}
      {isUploading && (
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-blue-600 font-medium">
              {uploadStatus === "generating" && "Preparing..."}
              {uploadStatus === "uploading" && `Uploading Video: ${uploadProgress}%`}
              {uploadStatus === "submitting" && "Saving Question..."}
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-600 h-full transition-all duration-300" 
              style={{ width: `${uploadStatus === "uploading" ? uploadProgress : uploadStatus === "submitting" ? 95 : 10}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* --- Question Input --- */}
      <div>
        <label className="block mb-1 font-medium text-gray-700 text-sm">Question</label>
        <input
          {...register("question", { required: "Question is required" })}
          placeholder="Type your question here..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-100 outline-none"
        />
        {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question.message}</p>}
      </div>

      {/* --- Options --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index}>
            <label className="block mb-1 font-medium text-gray-600 text-xs uppercase">Option {index + 1}</label>
            <input
              {...register(`options.${index}`, { required: true })}
              placeholder={`Option ${index + 1}`}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>
        ))}
      </div>

      {/* --- Correct Answer & Explanation --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Correct Answer</label>
          <input
            {...register("answer", { required: "Answer is required" })}
            placeholder="Specify correct answer"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Explanation</label>
          <textarea
            {...register("explanation", { required: "Explanation is required" })}
            placeholder="Why is this correct?"
            rows={1}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
          />
        </div>
      </div>

      {/* --- Submit Button --- */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-3 text-white font-semibold rounded-lg shadow-lg transition-all ${isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
        >
          {isUploading ? "Processing..." : "Create Question"}
        </button>
      </div>
    </form>
  );
};

export default AddQuesForm;