import { useRef, useState } from "react"
import {FaPlus, FaFileUpload, FaFolderPlus, FaTimes} from "react-icons/fa"

const AddButton = ({onUpload, onCreateFolder}) => {
    const [isOpen, setIsOpen] = useState(false);   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [folderName, setFolderName] = useState(""); 
    const fileInputRef = useRef(null);

    const handleFolderCreation = () => {
        if (folderName.trim() === "") {
            return;
        }

        onCreateFolder(folderName);
        setFolderName("");
        setIsModalOpen(false);
    }

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target?.files[0];
        if (file) {
            onUpload(file);
        }
    }


    return (
        <div className="fixed bottom-20 right-20">

            {/* Floating + Button */}
            <button
                className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaPlus className="text-xl" />
            </button>

            {/* Options (Upload File / Create Folder) */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-2">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 p-2 hover:bg-gray-300 rounded-md transition"
                    >
                        <FaFileUpload className="text-blue-500" />
                        Upload File
                    </button>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                    />

                    <button
                        onClick={() => {
                            setIsOpen(true);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 p-2 hover:bg-gray-300 rounded-md transition"
                    >
                        <FaFolderPlus className="text-yellow-500" />
                        Create Folder
                    </button>
                </div>
            )}

            {/* Create Folder Modal */}
            { isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Create New Folder</h2>
                            <button
                                onClick={() => {
                                    setIsModalOpen(false);
                                }}
                            >
                                <FaTimes className="text-gray-500 hover:text-gray-700" />
                            </button>
                        </div>

                        <input 
                            type="text" 
                            value={folderName} 
                            placeholder="Folder Name"
                            onChange={(e) => setFolderName(e.target.value)} 
                            className="w-full mt-3 p-2 border rounded-md"
                        /> 

                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                onClick={() => handleFolderCreation()}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddButton;