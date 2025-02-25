import axios from "axios";
import { useEffect, useState } from "react";
import { ViewFolderResponse } from "../model/ViewFolderResponse";
import { FaFolder, FaFileAlt } from "react-icons/fa"
import { ViewFolderRequest } from "../model/ViewFolderRequest";
import { getMockViewFolderResponse } from "../mock/viewresponse";

const mockResponse: ViewFolderResponse = getMockViewFolderResponse();

const FileManager = ( {token} ) => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
    const [items, setItems] = useState<ViewFolderResponse>();

    useEffect(() => {
        fetchFiles(currentFolderId);
    }, [currentFolderId])

    const fetchFiles = async (rootFolderId: number | null) => {
        setLoading(true);
        setError("");

        try {
            const request: ViewFolderRequest = new ViewFolderRequest(rootFolderId);
            // const { data } = await axios.get< {data: ViewFolderResponse} >('/api/folder/view', {
            //     headers: {
            //         Authorization: `${token}`
            //     },
            //     params: request
            // });

            const data = mockResponse;

            if (!data) {
                throw new Error('Response is empty.');
            }
            setItems(data);
        } catch (error) {
            setError('Failed to load files');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleFolderClick = (folderId: number | null) => {
        setCurrentFolderId(folderId);

    };

    const handleBack = () => {
        if (!items || items.folders.length === 0) {
            setCurrentFolderId(null);
            return;
        }

        const parentFolderId = items.folders[0].parentFolderId || null;
        setCurrentFolderId(parentFolderId);
    }

    return (
        <div className="p-5">
          <h2 className="text-lg font-semibold mb-4">📂 My Files</h2>
    
          {/* Breadcrumb Navigation */}
          <div className="mb-3">
            {currentFolderId !== null && currentFolderId !== 0 && (
              <button
                onClick={handleBack}
                className="text-blue-500 hover:underline mb-2"
              >
                ⬅ Back
              </button>
            )}
            <span className="ml-2 text-gray-500">{currentFolderId ?? null}</span>
          </div>
    
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items?.files.length === 0 && items?.folders.length === 0 ? (
              <p className="col-span-4 text-gray-500">No files found.</p>
            ) : (
              [...items.folders, ...items.files].map((item) => (
                <div
                    key={"folderId" in item ? `file-${item.id}` : `folder-${item.id}`}
                    onClick={() => "parentFolderId" in item ? handleFolderClick(item.id) : null}
                    className="p-4 border rounded-lg shadow-sm flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                >
                  {"folderId" in item ? (
                      <FaFileAlt className="text-gray-500 text-xl" />
                    ) : (
                      <FaFolder className="text-green-500 text-xl" />
                  )}
                  <span>{item.name}</span>
                </div>
              ))
            )}
          </div>
        )}
        </div>
    );
}

export default FileManager;