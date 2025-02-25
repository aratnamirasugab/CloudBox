// import React from "react";

// const FileUpload = () => {
//     const fileInputRef = React.useRef(null);
//     const [error, setError] = React.useState("");

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setError("");
//         if (!event.target.files) {
//             return;
//         }

//         const files: FileList = event.target.files;
//         const file: File = files.item(0);
//         const request = 

//     }

//     const handleButtonClick = () => {

//     }

//     return (
//         <div className="flex flex-col items-center">
//             <button
//                 onClick={handleButtonClick}
//                 className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white text-2xl rounded-full shadow-md hover:bg-blue-600 transition"
//             >
//                 +
//             </button>

//             <input 
//                 type="file" 
//                 ref={fileInputRef}
//                 className="hidden"
//                 onChange={handleFileChange}

//             />

//         </div>
//     )

// }

// export class FileUploadRequest() => {
//     fileName: string;
// }

// export default FileUpload;