// import { Table, Modal, ConfigProvider, message, Image, Tag } from "antd";
// import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
// import { useState } from "react";
// import EditQuesForm from "./EditQuestionForm";
// import { useDeleteQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
// import { circleStyle, normalizeOptions } from "../AdiTheoryManagement/AdiQuestionTable";

// const QuestionTable = ({ question, refetch, handlePageChange, meta, page }) => {
//   const [deleteQues] = useDeleteQuesMutation();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//   const [singleData, setSingleData] = useState({});

//   const showModal = (record) => {
//     setSingleData(record);
//     setIsModalOpen(true);
//   };

//   const showEditModal = (record) => {
//     setSingleData(record);
//     setEditModalOpen(true);
//   };

//   const handleCancel = () => setIsModalOpen(false);
//   const handleEditCancel = () => setEditModalOpen(false);

//   const handleDelete = async (id) => {
//     try {
//       const res = await deleteQues(id).unwrap();
//       if (res?.success) {
//         message.success(res?.message || "Deleted successfully");
//         refetch();
//       }
//     } catch (error) {
//       message.error(error?.data?.message || "Delete failed");
//     }
//     setIsModalOpen(false);
//   };

//   const columns = [
//     {
//       title: "SL",
//       key: "sl",
//       align: "center",
//       width: 60,
//       render: (_, __, i) => (page - 1) * meta?.limit + (i + 1),
//     },
//     {
//       title: "Image",
//       dataIndex: "question_image",
//       key: "question_image",
//       align: "center",
//       width: 120,
//       render: (img) =>
//         img ? (
//           <Image
//             src={img}
//             alt="question"
//             width={80}
//             height={60}
//             className="rounded-md object-cover border border-gray-200 shadow-sm"
//             fallback="https://via.placeholder.com/80x60?text=No+Image"
//           />
//         ) : (
//           <span className="text-gray-400 italic text-xs">No Image</span>
//         ),
//     },
//     {
//       title: "Question Content",
//       dataIndex: "question",
//       key: "question",
//       align: "center",
//       width: "30%",
//       render: (q) => (
//         <div className="font-medium text-gray-800 text-sm leading-relaxed max-w-[400px] mx-auto">
//           {q}
//         </div>
//       ),
//     },
//     {
//       title: "Options & Answer",
//       key: "options_answer",
//       align: "center",
//       width: "40%",
//       render: (_, record) => {
//         const opts = normalizeOptions(record?.options);
//         return (
//           <div className="flex flex-col items-center py-2">
//             {/* Options Grid */}
//             <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-3">
//               {opts.map((o, idx) => {
//                 const isCorrect = String(o.value) === String(record.answer);
//                 return (
//                   <div key={idx} className="flex items-center space-x-2 text-xs">
//                     <span style={circleStyle(isCorrect)}>
//                       {String.fromCharCode(65 + idx)}
//                     </span>
//                     <span className={`${isCorrect ? "font-bold text-green-600" : "text-gray-600"}`}>
//                       {o.label}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
            
//             {/* Explanation Preview */}
//             {record.explanation && (
//               <div className="mt-2 p-2 bg-blue-50 rounded-md border border-blue-100 max-w-[350px]">
//                 <p className="text-[11px] text-blue-700 leading-snug">
//                   <strong>Explanation:</strong> {record.explanation}
//                 </p>
//               </div>
//             )}
//           </div>
//         );
//       },
//     },
//     {
//       title: "Action",
//       key: "action",
//       align: "center",
//       width: 100,
//       render: (_, record) => (
//         <div className="flex justify-center items-center gap-3">
//           <button
//             onClick={() => showEditModal(record)}
//             className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm"
//             title="Edit"
//           >
//             <RiEdit2Line size={18} />
//           </button>
//           <button
//             onClick={() => showModal(record)}
//             className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm"
//             title="Delete"
//           >
//             <RiDeleteBin6Line size={18} />
//           </button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Table: {
//             headerBg: "#3F5EAB",
//             headerColor: "#ffffff",
//             headerBorderRadius: 8,
//             cellPaddingInline: 16,
//             cellPaddingBlock: 12,
//           },
//         },
//       }}
//     >
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
//         <Table
//           rowKey="_id"
//           dataSource={question}
//           columns={columns}
//           pagination={{
//             current: Number(page || 1),
//             pageSize: Number(meta?.limit || 10),
//             total: Number(meta?.total || 0),
//             showSizeChanger: false,
//             position: ["bottomCenter"],
//           }}
//           onChange={(pagination) => {
//             handlePageChange(pagination.current, pagination.pageSize);
//           }}
//           scroll={{ x: 1000 }}
//           bordered={false}
//         />
//       </div>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         open={isModalOpen}
//         centered
//         onCancel={handleCancel}
//         footer={null}
//         width={400}
//       >
//         <div className="text-center py-6 px-4">
//           <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <RiDeleteBin6Line size={30} className="text-red-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">Are you sure?</h2>
//           <p className="text-gray-500 mt-2 text-sm leading-relaxed">
//             This action cannot be undone. All data associated with this question will be removed.
//           </p>
//           <div className="flex gap-4 mt-8">
//             <button
//               onClick={handleCancel}
//               className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => handleDelete(singleData?._id)}
//               className="flex-1 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors shadow-md shadow-red-100"
//             >
//               Delete Now
//             </button>
//           </div>
//         </div>
//       </Modal>

//       {/* Edit Modal */}
//       <Modal
//         open={isEditModalOpen}
//         centered
//         onCancel={handleEditCancel}
//         footer={null}
//         width={650}
//         title={<span className="text-xl font-bold text-gray-800 px-4 pt-4 block">Update Question Information</span>}
//         destroyOnClose
//       >
//         <div className="p-4">
//           <EditQuesForm 
//             refetch={refetch} 
//             singleData={singleData} 
//             handleEditCancel={handleEditCancel}
//           />
//         </div>
//       </Modal>
//     </ConfigProvider>
//   );
// };

// export default QuestionTable;

import { Table, Modal, ConfigProvider, message, Image, Tag, Button } from "antd";
import { RiDeleteBin6Line, RiEdit2Line, RiVideoFill } from "react-icons/ri"; // ভিডিও আইকন
import { useState } from "react";
import EditQuesForm from "./EditQuestionForm";
import { useDeleteQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";
import { circleStyle, normalizeOptions } from "../AdiTheoryManagement/AdiQuestionTable";

const QuestionTable = ({ question, refetch, handlePageChange, meta, page }) => {
  const [deleteQues] = useDeleteQuesMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [singleData, setSingleData] = useState({});
  
  // ভিডিও দেখার জন্য নতুন স্টেট
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const showModal = (record) => {
    setSingleData(record);
    setIsModalOpen(true);
  };

  const showEditModal = (record) => {
    setSingleData(record);
    setEditModalOpen(true);
  };

  // ভিডিও প্লে করার ফাংশন
  const handlePlayVideo = (videoUrl) => {
    setCurrentVideo(videoUrl);
    setVideoModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);
  const handleEditCancel = () => setEditModalOpen(false);

  const handleDelete = async (id) => {
    try {
      const res = await deleteQues(id).unwrap();
      if (res?.success) {
        message.success(res?.message || "Deleted successfully");
        refetch();
      }
    } catch (error) {
      message.error(error?.data?.message || "Delete failed");
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      align: "center",
      width: 60,
      render: (_, __, i) => (page - 1) * meta?.limit + (i + 1),
    },
    {
      title: "Media", // 
      key: "media",
      align: "center",
      width: 140,
      render: (_, record) => (
        <div className="flex flex-col items-center gap-2">
          {/* Image Preview */}
          {record.question_image ? (
            <Image
              src={record.question_image}
              width={70}
              height={50}
              className="rounded-md object-cover border border-gray-100"
            />
          ) : (
            <div className="text-[10px] text-gray-400">No Image</div>
          )}

          {/* Video Play Button - Standard Look */}
          {record.video ? (
            <button
              onClick={() => handlePlayVideo(record.video)}
              className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all border border-blue-200"
            >
              <RiVideoFill size={14} /> PLAY VIDEO
            </button>
          ) : (
            <span className="text-[10px] text-gray-400">No Video</span>
          )}
        </div>
      ),
    },
    {
      title: "Question Content",
      dataIndex: "question",
      key: "question",
      align: "center",
      width: "25%",
      render: (q) => (
        <div className="font-medium text-gray-800 text-sm leading-relaxed max-w-[300px] mx-auto">
          {q}
        </div>
      ),
    },
    {
      title: "Options & Answer",
      key: "options_answer",
      align: "center",
      width: "35%",
      render: (_, record) => {
        const opts = normalizeOptions(record?.options);
        return (
          <div className="flex flex-col items-center py-1">
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2 text-left">
              {opts.map((o, idx) => {
                const isCorrect = String(o.value) === String(record.answer);
                return (
                  <div key={idx} className="flex items-center space-x-2 text-[11px]">
                    <span style={circleStyle(isCorrect)} className="flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className={`${isCorrect ? "font-bold text-green-600" : "text-gray-600"}`}>
                      {o.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => showEditModal(record)}
            className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm"
          >
            <RiEdit2Line size={18} />
          </button>
          <button
            onClick={() => showModal(record)}
            className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm"
          >
            <RiDeleteBin6Line size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#3F5EAB",
            headerColor: "#ffffff",
          },
        },
      }}
    >
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <Table
          rowKey="_id"
          dataSource={question}
          columns={columns}
          pagination={{
            current: Number(page || 1),
            pageSize: Number(meta?.limit || 10),
            total: Number(meta?.total || 0),
            position: ["bottomCenter"],
          }}
          onChange={(pagination) => {
            handlePageChange(pagination.current, pagination.pageSize);
          }}
          scroll={{ x: 1000 }}
        />
      </div>

      {/* --- Video Play Modal --- */}
      <Modal
        title="Video Preview"
        open={videoModalOpen}
        onCancel={() => setVideoModalOpen(false)}
        footer={null}
        centered
        width={700}
        destroyOnClose // ক্লোজ করলে ভিডিও প্লে হওয়া বন্ধ হবে
      >
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
          <video 
            src={currentVideo} 
            controls 
            autoPlay 
            className="w-full h-full"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
        width={400}
      >
        {/* ... Delete Modal Content (Same as yours) ... */}
        <div className="text-center py-6 px-4">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <RiDeleteBin6Line size={30} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Are you sure?</h2>
          <div className="flex gap-4 mt-8">
            <button onClick={handleCancel} className="flex-1 py-2.5 border border-gray-300 rounded-lg">Cancel</button>
            <button onClick={() => handleDelete(singleData?._id)} className="flex-1 py-2.5 bg-red-500 text-white rounded-lg">Delete</button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={isEditModalOpen}
        centered
        onCancel={handleEditCancel}
        footer={null}
        width={700}
        title={<span className="text-xl font-bold px-4 pt-4 block">Update Question</span>}
        destroyOnClose
      >
        <div className="p-4">
          <EditQuesForm 
            refetch={refetch} 
            singleData={singleData} 
            handleEditCancel={handleEditCancel}
          />
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default QuestionTable;