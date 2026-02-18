
// import { Table, Modal, ConfigProvider, message, Image, Tooltip } from "antd";
// import { RiDeleteBin6Line, RiEdit2Line } from "react-icons/ri";
// import { useState } from "react";
// import EditAdiQuesForm from "./EditAdiQuesForm";
// import { useDeleteQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";

// // Helper functions (Keeping them as they are core logic)
// export const normalizeOptions = (options = []) =>
//   options.map((opt) => {
//     if (typeof opt === "string") return { label: opt, value: opt };
//     const value = opt?.value ?? opt?.label ?? opt?.text ?? "";
//     const label = opt?.label ?? String(value);
//     return { label, value, text: opt?.text };
//   });

// export const circleStyle = (filled) => ({
//   display: "inline-block",
//   width: 22,
//   height: 22,
//   borderRadius: "50%",
//   border: filled ? "none" : "1.5px solid #3F5EAB",
//   backgroundColor: filled ? "#3F5EAB" : "transparent",
//   color: filled ? "#fff" : "#3F5EAB",
//   fontWeight: 600,
//   textAlign: "center",
//   lineHeight: "22px",
//   marginRight: 8,
//   userSelect: "none",
// });

// const AdiQuestionTable = ({ question, refetch, page, meta, handlePageChange }) => {
//   const [deleteQues] = useDeleteQuesMutation();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setEditModalOpen] = useState(false);
//   const [singleData, setSingleData] = useState({});

//   const currentPage = Number(page ?? 1);
//   const pageSize = Number(meta?.limit ?? 10);
//   const total = Number(meta?.total ?? 0);

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
//       message.error(error?.data?.message || "Something went wrong");
//     }
//     setIsModalOpen(false);
//   };

//   const columns = [
//     {
//       title: "SL",
//       key: "sl",
//       align: "center",
//       width: 70,
//       render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
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
//             className="rounded-md object-cover border border-gray-100 shadow-sm"
//             fallback="https://via.placeholder.com/80x60?text=No+Image"
//           />
//         ) : (
//           <span className="text-gray-400 italic text-xs">No Image</span>
//         ),
//     },
//     {
//       title: "Question",
//       dataIndex: "question",
//       key: "question",
//       align: "center",
//       width: "30%",
//       render: (q) => (
//         <div className="font-medium text-gray-800 text-sm max-w-[300px] mx-auto leading-relaxed">
//           {q}
//         </div>
//       ),
//     },
//     {
//       title: "Answers & Explanation",
//       key: "details",
//       align: "center",
//       width: "40%",
//       render: (_, record) => {
//         const opts = normalizeOptions(record?.options);
//         return (
//           <div className="flex flex-col items-center py-2">
//             {/* Options Grid */}
//             <div className="grid grid-cols-2 gap-x-10 gap-y-2 mb-3">
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
//             {/* Explanation box */}
//             {record.explanation && (
//               <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-100 max-w-[350px]">
//                 <p className="text-[11px] text-gray-500 text-left italic">
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
//       width: 110,
//       render: (_, record) => (
//         <div className="flex justify-center items-center gap-3">
//           <Tooltip title="Edit">
//             <button
//               onClick={() => showEditModal(record)}
//               className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm border-none"
//             >
//               <RiEdit2Line size={18} />
//             </button>
//           </Tooltip>
//           <Tooltip title="Delete">
//             <button
//               onClick={() => showModal(record)}
//               className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm border-none"
//             >
//               <RiDeleteBin6Line size={18} />
//             </button>
//           </Tooltip>
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
//             headerColor: "#fff",
//             headerBorderRadius: 8,
//             cellFontSize: 14,
//             headerSplitColor: "transparent",
//           },
//           Pagination: {
//             colorPrimary: "#00c0b5",
//           },
//         },
//       }}
//     >
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <Table
//           rowKey="_id"
//           dataSource={question}
//           columns={columns}
//           pagination={{
//             current: currentPage,
//             pageSize,
//             total,
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

//       {/* Modernized Delete Confirmation Modal */}
//       <Modal
//         open={isModalOpen}
//         centered
//         onCancel={handleCancel}
//         footer={null}
//         width={400}
//         destroyOnClose
//       >
//         <div className="text-center py-6">
//           <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
//             <RiDeleteBin6Line size={30} className="text-red-500" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800">Are you sure?</h2>
//           <p className="text-gray-500 mt-2 text-sm px-4">
//             Do you really want to delete this question? This process cannot be undone.
//           </p>
//           <div className="flex gap-4 mt-8 px-4">
//             <button
//               onClick={handleCancel}
//               className="flex-1 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => handleDelete(singleData?._id)}
//               className="flex-1 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors shadow-md shadow-red-100"
//             >
//               Confirm
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
//         title={<span className="text-xl font-bold text-gray-800 block p-2">Update Question</span>}
//         destroyOnClose
//       >
//         <div className="p-2">
//           <EditAdiQuesForm
//             refetch={refetch}
//             singleData={singleData}
//             handleEditCancel={handleEditCancel}
//           />
//         </div>
//       </Modal>
//     </ConfigProvider>
//   );
// };

// export default AdiQuestionTable;

import { Table, Modal, ConfigProvider, message, Image, Tooltip } from "antd";
import { RiDeleteBin6Line, RiEdit2Line, RiVideoFill } from "react-icons/ri"; // ভিডিও আইকন যুক্ত করা হয়েছে
import { useState } from "react";
import EditAdiQuesForm from "./EditAdiQuesForm";
import { useDeleteQuesMutation } from "../../redux/feature/theoryManagement/theoryApi";

// Helper functions
export const normalizeOptions = (options = []) =>
  options.map((opt) => {
    if (typeof opt === "string") return { label: opt, value: opt };
    const value = opt?.value ?? opt?.label ?? opt?.text ?? "";
    const label = opt?.label ?? String(value);
    return { label, value, text: opt?.text };
  });

export const circleStyle = (filled) => ({
  display: "inline-block",
  width: 22,
  height: 22,
  borderRadius: "50%",
  border: filled ? "none" : "1.5px solid #3F5EAB",
  backgroundColor: filled ? "#3F5EAB" : "transparent",
  color: filled ? "#fff" : "#3F5EAB",
  fontWeight: 600,
  textAlign: "center",
  lineHeight: "22px",
  marginRight: 8,
  userSelect: "none",
});

const AdiQuestionTable = ({ question, refetch, page, meta, handlePageChange }) => {
  const [deleteQues] = useDeleteQuesMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [singleData, setSingleData] = useState({});
  
  // ভিডিও দেখার জন্য স্টেট
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");

  const currentPage = Number(page ?? 1);
  const pageSize = Number(meta?.limit ?? 10);
  const total = Number(meta?.total ?? 0);

  const showModal = (record) => {
    setSingleData(record);
    setIsModalOpen(true);
  };

  const showEditModal = (record) => {
    setSingleData(record);
    setEditModalOpen(true);
  };

  // ভিডিও প্লে হ্যান্ডলার
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
      message.error(error?.data?.message || "Something went wrong");
    }
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      align: "center",
      width: 70,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Media", // Image ও Video প্লে বাটন একসাথে
      key: "media",
      align: "center",
      width: 140,
      render: (_, record) => (
        <div className="flex flex-col items-center gap-2">
          {/* ইমেজ প্রিভিউ */}
          {record.question_image ? (
            <Image
              src={record.question_image}
              alt="question"
              width={70}
              height={50}
              className="rounded-md object-cover border border-gray-100 shadow-sm"
              fallback="https://via.placeholder.com/80x60?text=No+Image"
            />
          ) : (
            <span className="text-[10px] text-gray-400 italic">No Image</span>
          )}


          {record.video ? (
            <button
              onClick={() => handlePlayVideo(record.video)}
              className="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-all border border-blue-200"
            >
              <RiVideoFill size={14} /> PLAY VIDEO
            </button>
          ) : (
            <span className="text-[10px] text-gray-400 italic">No Video</span>
          )}
        </div>
      ),
    },
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
      align: "center",
      width: "25%",
      render: (q) => (
        <div className="font-medium text-gray-800 text-sm max-w-[250px] mx-auto leading-relaxed">
          {q}
        </div>
      ),
    },
    {
      title: "Answers & Explanation",
      key: "details",
      align: "center",
      width: "35%",
      render: (_, record) => {
        const opts = normalizeOptions(record?.options);
        return (
          <div className="flex flex-col items-center py-2">
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-2">
              {opts.map((o, idx) => {
                const isCorrect = String(o.value) === String(record.answer);
                return (
                  <div key={idx} className="flex items-center space-x-2 text-[11px] text-left">
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
            {record.explanation && (
              <div className="mt-1 p-2 bg-gray-50 rounded border border-gray-100 max-w-[300px]">
                <p className="text-[10px] text-gray-500 text-left leading-snug">
                  <strong>Explanation:</strong> {record.explanation}
                </p>
              </div>
            )}
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
          <Tooltip title="Edit">
            <button
              onClick={() => showEditModal(record)}
              className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-sm border-none cursor-pointer"
            >
              <RiEdit2Line size={18} />
            </button>
          </Tooltip>
          <Tooltip title="Delete">
            <button
              onClick={() => showModal(record)}
              className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm border-none cursor-pointer"
            >
              <RiDeleteBin6Line size={18} />
            </button>
          </Tooltip>
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
            headerColor: "#fff",
            headerBorderRadius: 8,
            cellFontSize: 14,
            headerSplitColor: "transparent",
          },
          Pagination: {
            colorPrimary: "#00c0b5",
          },
        },
      }}
    >
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table
          rowKey="_id"
          dataSource={question}
          columns={columns}
          pagination={{
            current: currentPage,
            pageSize,
            total,
            showSizeChanger: false,
            position: ["bottomCenter"],
          }}
          onChange={(pagination) => {
            handlePageChange(pagination.current, pagination.pageSize);
          }}
          scroll={{ x: 1000 }}
          bordered={false}
        />
      </div>

      {/* --- vedio play--- */}
      <Modal
        title="Video Preview"
        open={videoModalOpen}
        onCancel={() => setVideoModalOpen(false)}
        footer={null}
        centered
        width={700}
        destroyOnClose 
      >
        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl">
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
        destroyOnClose
      >
        <div className="text-center py-6">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <RiDeleteBin6Line size={30} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Are you sure?</h2>
          <p className="text-gray-500 mt-2 text-sm px-4">
            Do you really want to delete this ADI question?
          </p>
          <div className="flex gap-4 mt-8 px-4">
            <button onClick={handleCancel} className="flex-1 py-2.5 border border-gray-300 rounded-lg font-medium">Cancel</button>
            <button onClick={() => handleDelete(singleData?._id)} className="flex-1 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 shadow-md">Confirm</button>
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
        title={<span className="text-xl font-bold text-gray-800 block p-2">Update ADI Question</span>}
        destroyOnClose
      >
        <div className="p-2">
          <EditAdiQuesForm
            refetch={refetch}
            singleData={singleData}
            handleEditCancel={handleEditCancel}
          />
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default AdiQuestionTable;