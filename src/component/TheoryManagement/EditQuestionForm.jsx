// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useUpdateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi"; // আপনার এডিট মিউটেশনটি ইমপোর্ট করুন
// import { message } from "antd";
// import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";

// const EditQuesForm = ({ singleData, refetch, handleEditCancel }) => {
//   const [updateQues] = useUpdateQuesMutation();
//   const [imagePreview, setImagePreview] = useState(singleData?.question_image || null);
//   const [newImage, setNewImage] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm({
//     defaultValues: {
//       question: singleData?.question,
//       options: singleData?.options,
//       answer: singleData?.answer,
//       explanation: singleData?.explanation,
//     },
//   });

//   // ডাটা চেঞ্জ হলে ফর্ম আপডেট করা
//   useEffect(() => {
//     if (singleData) {
//       reset({
//         question: singleData?.question,
//         options: singleData?.options,
//         answer: singleData?.answer,
//         explanation: singleData?.explanation,
//       });
//       setImagePreview(singleData?.question_image);
//     }
//   }, [singleData, reset]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setNewImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const removeImage = () => {
//     setImagePreview(null);
//     setNewImage(null);
//   };

//  const onSubmit = async (data) => {
//   try {
//     const formData = new FormData();

//     if (newImage) {
//       formData.append("question_image", newImage);
//     }

//     const topicId = typeof singleData?.topic === 'object' 
//                     ? singleData?.topic?._id 
//                     : singleData?.topic;

//     const updatedData = {
//       topic: topicId, 
//       question: data.question,
//       options: data.options,
//       answer: data.answer,
//       explanation: data.explanation,
//     };

//     formData.append("data", JSON.stringify(updatedData));

//     const res = await updateQues({
//       id: singleData?._id, 
//       args: formData,
//     }).unwrap();

//     if (res?.success) {
//       message.success(res?.message || "Updated successfully");
//       refetch();
//       handleEditCancel();
//     }
//   } catch (error) {
//     message.error(error?.data?.message || "Something went wrong");
//   }
// };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2">
//       {/* Image Section */}
//       <div className="space-y-2">
//         <label className="block text-sm font-medium text-gray-700">Question Image</label>
//         {!imagePreview ? (
//           <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400">
//             <input
//               type="file"
//               accept="image/*"
//               className="absolute inset-0 opacity-0 cursor-pointer"
//               onChange={handleImageChange}
//             />
//             <FaCloudUploadAlt className="text-gray-400 text-3xl mb-1" />
//             <p className="text-xs text-gray-500 font-medium">Click to upload new image</p>
//           </div>
//         ) : (
//           <div className="relative w-full h-40 rounded-lg overflow-hidden border bg-gray-100">
//             <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
//             <button
//               type="button"
//               onClick={removeImage}
//               className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-lg"
//             >
//               <FaTimes size={12} />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Question */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Question</label>
//         <input
//           {...register("question", { required: true })}
//           className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-100"
//         />
//       </div>

//       {/* Options Grid */}
//       <div className="grid grid-cols-2 gap-3">
//         {[0, 1, 2, 3].map((idx) => (
//           <div key={idx}>
//             <label className="text-xs font-semibold text-gray-500 uppercase">Option {idx + 1}</label>
//             <input
//               {...register(`options.${idx}`, { required: true })}
//               className="w-full border rounded-md px-3 py-1.5 mt-1"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Answer */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
//         <input
//           {...register("answer", { required: true })}
//           className="w-full border rounded-md px-3 py-2 mt-1"
//         />
//       </div>

//       {/* Explanation */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700">Explanation</label>
//         <textarea
//           {...register("explanation")}
//           rows={3}
//           className="w-full border rounded-md px-3 py-2 mt-1 resize-none"
//         />
//       </div>

//       <div className="flex gap-4 pt-2">
//         <button
//           type="button"
//           onClick={handleEditCancel}
//           className="flex-1 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md transition-all"
//         >
//           Update Question
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditQuesForm;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
import { useGeneratePresignedUrlMutation } from "../../redux/feature/hazard/hazardApi"; // Presigned URL API
import { message } from "antd";
import { FaCloudUploadAlt, FaTimes, FaVideo } from "react-icons/fa";

const EditQuesForm = ({ singleData, refetch, handleEditCancel }) => {
  const [updateQues] = useUpdateQuesMutation();
  const [generatePresignedUrl] = useGeneratePresignedUrlMutation();

  // States for Image & Video
  const [imagePreview, setImagePreview] = useState(singleData?.question_image || null);
  const [newImage, setNewImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // 'generating', 'uploading', 'submitting'

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      question: singleData?.question,
      options: singleData?.options,
      answer: singleData?.answer,
      explanation: singleData?.explanation,
    },
  });

  const watchedVideo = watch("video");

  useEffect(() => {
    if (singleData) {
      reset({
        question: singleData?.question,
        options: singleData?.options,
        answer: singleData?.answer,
        explanation: singleData?.explanation,
      });
      setImagePreview(singleData?.question_image);
    }
  }, [singleData, reset]);

  // XHR Upload Logic for Progress Bar
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
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setNewImage(null);
  };

  const onSubmit = async (data) => {
    const videoFile = data?.video?.[0];
    let finalVideoUrl = singleData?.video_url || ""; // আগের ভিডিওটি ডিফল্ট হিসেবে রাখা হলো

    try {
      setIsUploading(true);

      // --- Step 1: Video Upload (যদি নতুন ভিডিও সিলেক্ট করা হয়) ---
      if (videoFile) {
        setUploadStatus("generating");
        const presignedRes = await generatePresignedUrl({
          fileType: videoFile.type || "video/mp4",
          fileCategory: "video"
        }).unwrap();

        const { uploadURL, fileName } = presignedRes;
        
        setUploadStatus("uploading");
        await uploadFileWithProgress(uploadURL, videoFile, videoFile.type || 'video/mp4');
        finalVideoUrl = fileName; // নতুন আপলোড করা ফাইলের নাম
      }

      // --- Step 2: Final Submission ---
      setUploadStatus("submitting");
      const formData = new FormData();

      if (newImage) {
        formData.append("question_image", newImage);
      }

      const topicId = typeof singleData?.topic === 'object' 
                      ? singleData?.topic?._id 
                      : singleData?.topic;

      const updatedData = {
        topic: topicId, 
        question: data.question,
        options: data.options,
        answer: data.answer,
        explanation: data.explanation,
        video: finalVideoUrl, 
      };

      formData.append("data", JSON.stringify(updatedData));

      const res = await updateQues({
        id: singleData?._id, 
        args: formData,
      }).unwrap();

      if (res?.success) {
        message.success(res?.message || "Updated successfully");
        refetch();
        handleEditCancel();
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Question Image</label>
          {!imagePreview ? (
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center h-32 hover:border-blue-400 cursor-pointer">
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageChange} />
              <FaCloudUploadAlt className="text-gray-400 text-2xl mb-1" />
              <p className="text-[10px] text-gray-500 uppercase font-bold">New Image</p>
            </div>
          ) : (
            <div className="relative h-32 rounded-lg overflow-hidden border bg-gray-100">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
              <button type="button" onClick={removeImage} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full"><FaTimes size={10} /></button>
            </div>
          )}
        </div>

        {/* Video Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Question Video</label>
          <div className={`relative border-2 border-dashed rounded-lg p-4 h-32 flex flex-col items-center justify-center transition-all ${watchedVideo?.[0] ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50'}`}>
            <input 
              type="file" 
              accept="video/*" 
              {...register("video")} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              disabled={isUploading}
            />
            <FaVideo size={24} className={watchedVideo?.[0] ? 'text-green-500' : (singleData?.video_url ? 'text-blue-500' : 'text-gray-400')} />
            <p className="text-[10px] text-center text-gray-500 mt-2 font-bold uppercase">
              {watchedVideo?.[0] ? watchedVideo[0].name.substring(0, 15) + "..." : (singleData?.video_url ? "Change Video" : "Upload Video")}
            </p>
            {singleData?.video_url && !watchedVideo?.[0] && (
               <span className="text-[9px] text-blue-600 font-medium">Existing video attached</span>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar UI */}
      {isUploading && (
        <div className="bg-blue-50 p-2 rounded border border-blue-100">
          <p className="text-[10px] text-blue-600 font-bold mb-1 uppercase tracking-wider">
            {uploadStatus === "uploading" ? `Uploading: ${uploadProgress}%` : uploadStatus === "submitting" ? "Finalizing..." : "Preparing..."}
          </p>
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${uploadStatus === "uploading" ? uploadProgress : uploadStatus === "submitting" ? 95 : 10}%` }}></div>
          </div>
        </div>
      )}

      {/* Question */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Question</label>
        <input
          {...register("question", { required: true })}
          className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((idx) => (
          <div key={idx}>
            <label className="text-[10px] font-semibold text-gray-500 uppercase">Option {idx + 1}</label>
            <input
              {...register(`options.${idx}`, { required: true })}
              className="w-full border rounded-md px-3 py-1.5 mt-0.5 outline-none"
            />
          </div>
        ))}
      </div>

      {/* Answer & Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
          <input
            {...register("answer", { required: true })}
            className="w-full border rounded-md px-3 py-2 mt-1 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Explanation</label>
          <textarea
            {...register("explanation")}
            rows={1}
            className="w-full border rounded-md px-3 py-2 mt-1 resize-none outline-none"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={handleEditCancel}
          disabled={isUploading}
          className="flex-1 py-2.5 border rounded-md text-gray-600 hover:bg-gray-50 transition-all font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUploading}
          className={`flex-1 py-2.5 text-white rounded-md shadow-md transition-all font-medium ${isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
        >
          {isUploading ? "Please Wait..." : "Update Question"}
        </button>
      </div>
    </form>
  );
};

export default EditQuesForm;