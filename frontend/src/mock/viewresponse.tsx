import { FileResponse, FolderResponse, ViewFolderResponse } from "../model/ViewFolderResponse";

// Mock data for folders (Nested Structure)
const mockFolders: FolderResponse[] = [
    {
      id: 1,
      parentFolderId: null,
      name: "Documents",
      createdAt: new Date("2024-01-01T10:00:00Z"),
    },
    {
      id: 2,
      parentFolderId: null,
      name: "Photos",
      createdAt: new Date("2024-02-01T12:30:00Z"),
    },
    {
      id: 3,
      parentFolderId: 1,
      name: "Work",
      createdAt: new Date("2024-03-01T08:45:00Z"),
    },
    {
      id: 4,
      parentFolderId: 1,
      name: "Personal",
      createdAt: new Date("2024-03-02T11:00:00Z"),
    },
    {
      id: 5,
      parentFolderId: 3,
      name: "Projects",
      createdAt: new Date("2024-03-10T15:20:00Z"),
    }
  ];
  
  // Mock data for files (Distributed across folders)
  const mockFiles: FileResponse[] = [
    {
      id: 1,
      name: "resume.pdf",
      folderId: 1,
      createdAt: new Date("2024-01-02T09:00:00Z"),
      size: 1048576, // 1MB in bytes
      mimeType: "application/pdf",
    },
    {
      id: 2,
      name: "holiday.jpg",
      folderId: 2,
      createdAt: new Date("2024-02-05T14:15:00Z"),
      size: 2097152, // 2MB in bytes
      mimeType: "image/jpeg",
    },
    {
      id: 3,
      name: "report.docx",
      folderId: 3,
      createdAt: new Date("2024-03-05T13:10:00Z"),
      size: 524288, // 512KB in bytes
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    {
      id: 4,
      name: "budget.xlsx",
      folderId: 5,
      createdAt: new Date("2024-03-12T09:30:00Z"),
      size: 1048576, // 1MB in bytes
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    {
      id: 5,
      name: "vacation_plan.txt",
      folderId: 4,
      createdAt: new Date("2024-03-08T10:00:00Z"),
      size: 1024, // 1KB in bytes
      mimeType: "text/plain",
    }
  ];
  

export const getMockViewFolderResponse = (): ViewFolderResponse => {
    return new ViewFolderResponse(mockFolders, mockFiles);
}