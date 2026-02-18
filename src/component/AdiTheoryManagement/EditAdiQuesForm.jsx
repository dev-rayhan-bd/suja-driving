

// import { message } from "antd";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useUpdateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
// import { useParams } from "react-router-dom";
// import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

// const EditAdiQuesForm = ({ refetch, singleData, handleEditCancel }) => {
//   const { id } = useParams();
//   const [updateQues] = useUpdateQuesMutation();
//   const [imagePreview, setImagePreview] = useState(null);
//   const [newImageFile, setNewImageFile] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm();


//   useEffect(() => {
//     if (singleData) {
//       reset({
//         question: singleData.question,
//         options: singleData.options || ["", "", "", ""],
//         answer: singleData.answer,
//         explanation: singleData.explanation,
//       });
//       setImagePreview(singleData.question_image || null);
//     }
//   }, [singleData, reset]);


//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setNewImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     setNewImageFile(null);
//   };

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();

//       if (newImageFile) {
//         formData.append("question_image", newImageFile);
//       }


//       const topicId = typeof singleData?.topic === 'object' ? singleData?.topic?._id : (id || singleData?.topic);

//       const updatedFields = {
//         topic: topicId,
//         question: data.question,
//         options: data.options,
//         answer: data.answer,
//         explanation: data.explanation,
//       };


//       formData.append("data", JSON.stringify(updatedFields));

//       const res = await updateQues({
//         args: formData,
//         id: singleData?._id,
//       }).unwrap();

//       if (res?.success) {
//         message.success(res?.message || "Updated successfully");
//         refetch();
//         handleEditCancel();
//       }
//     } catch (error) {
//       message.error(error?.data?.message || "Update failed");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="max-w-2xl mx-auto p-4 space-y-5 font-title"
//       noValidate
//     >
//       {/* --- Image Section --- */}
//       <div className="space-y-2">
//         <label className="block font-medium text-gray-700 text-sm">Question Image</label>
//         {!imagePreview ? (
//           <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all group">
//             <input
//               type="file"
//               accept="image/*"
//               className="absolute inset-0 opacity-0 cursor-pointer"
//               onChange={handleImageChange}
//             />
//             <FaCloudUploadAlt size={28} className="text-gray-400 group-hover:text-blue-500" />
//             <p className="mt-1 text-xs text-gray-500">Upload new image</p>
//           </div>
//         ) : (
//           <div className="relative w-full h-40 rounded-xl overflow-hidden border bg-gray-100">
//             <img src={imagePreview} alt="Preview" className="w-full h-full object-contain p-2" />
//             <button
//               type="button"
//               onClick={removeImage}
//               className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
//             >
//               <FaTimes size={12} />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* --- Question --- */}
//       <div>
//         <label className="block mb-1 font-medium text-gray-700 text-sm">Question</label>
//         <input
//           {...register("question", { required: true })}
//           placeholder="Update question content"
//           className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
//         />
//         {errors.question && <p className="text-red-500 text-xs mt-1">Required</p>}
//       </div>

//       {/* --- Options --- */}
//       <div className="grid grid-cols-2 gap-4">
//         {[0, 1, 2, 3].map((index) => (
//           <div key={index}>
//             <label className="block mb-1 font-medium text-gray-500 text-xs uppercase">Option {index + 1}</label>
//             <input
//               {...register(`options.${index}`, { required: true })}
//               placeholder={`Option ${index + 1}`}
//               className="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:border-blue-500 outline-none"
//             />
//           </div>
//         ))}
//       </div>

//       {/* --- Answer & Explanation --- */}
//       <div className="space-y-4">
//         <div>
//           <label className="block mb-1 font-medium text-gray-700 text-sm">Correct Answer</label>
//           <input
//             {...register("answer", { required: true })}
//             placeholder="Correct answer"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium text-gray-700 text-sm">Explanation</label>
//           <textarea
//             {...register("explanation", { required: true })}
//             placeholder="Explanation content"
//             rows={3}
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 outline-none resize-none"
//           />
//         </div>
//       </div>

//       {/* --- Actions --- */}
//       <div className="flex gap-4 pt-2">
//         <button
//           type="button"
//           onClick={handleEditCancel}
//           className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-all font-medium"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md font-semibold transition-all"
//         >
//           Update Question
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditAdiQuesForm;

import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
import { useGeneratePresignedUrlMutation } from "../../redux/feature/hazard/hazardApi"; // Presigned URL API
import { useParams } from "react-router-dom";
import { FaCloudUploadAlt, FaTimes, FaVideo } from "react-icons/fa";

const EditAdiQuesForm = ({ refetch, singleData, handleEditCancel }) => {
  const { id } = useParams();
  const [updateQues] = useUpdateQuesMutation();
  const [generatePresignedUrl] = useGeneratePresignedUrlMutation();

  // --- S3 Upload States ---
  const [uploadUrl, setUploadUrl] = useState("");
  const [resFile, setResFile] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // 'uploading', 'success', 'error'

  // --- Image States ---
  const [imagePreview, setImagePreview] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const watchedVideo = watch("video");

  // ✅ Initialize form data
  useEffect(() => {
    if (singleData) {
      reset({
        question: singleData.question,
        options: singleData.options || ["", "", "", ""],
        answer: singleData.answer,
        explanation: singleData.explanation,
      });
      setImagePreview(singleData.question_image || null);
    }
  }, [singleData, reset]);

  // ✅ Pre-generate S3 Upload URL on mount
  useEffect(() => {
    const getUploadUrl = async () => {
      try {
        const payload = { fileType: "video/mp4", fileCategory: "video" };
        const presignedRes = await generatePresignedUrl(payload).unwrap();
        setUploadUrl(presignedRes?.uploadURL);
        setResFile(presignedRes?.fileName);
      } catch (error) {
        console.error("Error generating presigned URL", error);
      }
    };
    getUploadUrl();
  }, [generatePresignedUrl]);

  // ✅ XHR Upload Logic for progress bar
  const uploadFileWithProgress = (url, file, contentType) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percentComplete);
        }
      });
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadStatus("success");
          resolve(xhr.response);
        } else {
          setUploadStatus("error");
          reject(new Error(`Upload failed: ${xhr.status}`));
        }
      });
      xhr.addEventListener('error', () => {
        setUploadStatus("error");
        reject(new Error('Upload failed'));
      });
      xhr.open('PUT', url);
      xhr.setRequestHeader('Content-Type', contentType);
      xhr.send(file);
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setNewImageFile(null);
  };

  const onSubmit = async (data) => {
    const videoFile = data?.video?.[0];
    let finalVideoUrl = singleData?.video_url || ""; // Default to old video

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // --- Step 1: Video Upload (যদি নতুন ভিডিও থাকে) ---
      if (videoFile && uploadUrl) {
        setUploadStatus("uploading");
        await uploadFileWithProgress(uploadUrl, videoFile, 'video/mp4');
        finalVideoUrl = resFile; // Update with new filename from S3
      }

      // --- Step 2: Main Data Submission ---
      const formData = new FormData();

      if (newImageFile) {
        formData.append("question_image", newImageFile);
      }

      const topicId = typeof singleData?.topic === 'object' ? singleData?.topic?._id : (id || singleData?.topic);

      const updatedFields = {
        topic: topicId,
        question: data.question,
        options: data.options,
        answer: data.answer,
        explanation: data.explanation,
        video: finalVideoUrl, // New or existing video URL
      };

      formData.append("data", JSON.stringify(updatedFields));

      const res = await updateQues({
        args: formData,
        id: singleData?._id,
      }).unwrap();

      if (res?.success) {
        message.success(res?.message || "Updated successfully");
        refetch();
        handleEditCancel();
      }
    } catch (error) {
      message.error(error?.data?.message || error?.message || "Update failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-4 space-y-5 font-title" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* --- Image Section --- */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700 text-sm">Question Image</label>
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 h-32 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all group">
            {!imagePreview ? (
              <>
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
                <FaCloudUploadAlt size={24} className="text-gray-400 group-hover:text-blue-500" />
                <p className="mt-1 text-[10px] text-gray-500 uppercase font-bold">New Image</p>
              </>
            ) : (
              <div className="relative w-full h-full">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                <button type="button" onClick={removeImage} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"><FaTimes size={10} /></button>
              </div>
            )}
          </div>
        </div>

        {/* --- Video Section --- */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700 text-sm">Question Video</label>
          <div className={`relative border-2 border-dashed rounded-xl p-4 h-32 flex flex-col items-center justify-center transition ${watchedVideo?.[0] ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
            <input type="file" accept="video/*" {...register("video")} className="absolute inset-0 opacity-0 cursor-pointer" disabled={isUploading} />
            <FaVideo size={24} className={watchedVideo?.[0] ? 'text-green-500' : 'text-gray-400'} />
            <p className="text-[10px] text-center text-gray-500 mt-2 font-bold uppercase">
              {watchedVideo?.[0] ? watchedVideo[0].name.substring(0, 15) + "..." : (singleData?.video_url ? "Change Video" : "Upload Video")}
            </p>
            {singleData?.video_url && !watchedVideo?.[0] && (
               <span className="text-[9px] text-blue-600 font-medium italic">Current video exists</span>
            )}
          </div>
        </div>
      </div>

      {/* --- Progress Bar --- */}
      {isUploading && (
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-blue-600 uppercase">
              {uploadStatus === "success" ? "Upload Complete!" : "Uploading Video..."}
            </span>
            <span className="text-xs font-bold text-blue-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${uploadStatus === "success" ? 'bg-green-500' : 'bg-blue-600'}`}
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* --- Question --- */}
      <div>
        <label className="block mb-1 font-medium text-gray-700 text-sm">Question</label>
        <input {...register("question", { required: true })} className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" />
      </div>

      {/* --- Options --- */}
      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index}>
            <label className="block mb-1 text-[10px] uppercase font-bold text-gray-400">Option {index + 1}</label>
            <input {...register(`options.${index}`, { required: true })} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 outline-none" />
          </div>
        ))}
      </div>

      {/* --- Answer & Explanation --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Correct Answer</label>
          <input {...register("answer", { required: true })} className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Explanation</label>
          <textarea {...register("explanation", { required: true })} rows={1} className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none" />
        </div>
      </div>

      {/* --- Actions --- */}
      <div className="flex gap-4 pt-4">
        <button type="button" onClick={handleEditCancel} disabled={isUploading} className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-600 font-medium">Cancel</button>
        <button type="submit" disabled={isUploading} className={`flex-1 py-2.5 text-white rounded-lg font-bold shadow-md ${isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
          {isUploading ? `Uploading ${uploadProgress}%` : "Update ADI Question"}
        </button>
      </div>
    </form>
  );
};

export default EditAdiQuesForm;