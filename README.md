# Cloud File Storage System

## Table of Contents
1. [Overview](#overview)
2. [Project Phases](#project-phases)
    - [Phase 1: MVP (Minimum Viable Product)](#phase-1-mvp-minimum-viable-product)
    - [Phase 2: Enhanced Functionality & Security](#phase-2-enhanced-functionality--security)
    - [Phase 3: Advanced Features & Multi-Platform Support](#phase-3-advanced-features--multi-platform-support)
3. [Core Features](#core-features)
4. [Security Features](#security-features)
5. [UI & User Experience](#ui--user-experience)
6. [Advanced Features](#advanced-features)
7. [Getting Started](#getting-started)
8. [Contributing](#contributing)
9. [License](#license)
10. [Code of Conduct](#code-of-conduct)
11. [Contact](#contact)

## Overview

Welcome to CloudBox, a fun and powerful open-source cloud file storage system that you can easily self-host! This project was built as a hobby, and its goal is to provide you with a simple, secure, and scalable solution for managing your files without relying on third-party services. Whether you want to keep your data private, need a personal file storage system, or just love tinkering with cloud technology, CloudBox has you covered.

With a focus on easy deployment and flexibility, you can clone this repository and self-host it on your own server, VPS, or cloud platform of choice. No matter if you're using AWS, DigitalOcean, or your local machine, you can customize and scale it to fit your needs.

The project is designed with simplicity and security in mind—it's packed with modern cloud technologies and provides an intuitive web interface for effortless file management. Fork it, improve it, or just use it to manage your own files—the choice is yours. ✨

---

## Project Phases

### Phase 1: MVP (Minimum Viable Product)

**Goal:** Establish a basic file storage system.

- **User Authentication & Management**
    - Login/Registration ☑️
    - OAuth (Google, GitHub)
    - Role-based access control (Admin/User)

- **File Upload & Management**
    - Drag-and-drop file upload
    - File preview (images, PDFs)
    - Folder and file creation & organization ☑️
    - Basic search & filtering ☑️
    - Metadata display (size, type, last modified date) ☑️

- **Storage & Sync**
    - Cloud-based or self-hosted storage (AWS S3, MinIO, or local storage) ☑️
    - Single and Multipart file upload ☑️

- **Security & Privacy**
    - TLS encryption for file transfers
    - Secure public file access (presigned URL expiry)
    - Password hashing (bcrypt) ☑️
    - Secure file deletion (soft delete with trash bin)

- **Basic Web Interface**
    - React or Next.js frontend for uploading & managing files

---

### Phase 2: Enhanced Functionality & Security

**Goal:** Add more advanced features and improve security.

- **File Management Enhancements**
    - File Versioning (track changes and restore previous versions)
    - Resume Interrupted Uploads
    - Full-Text Search (index file contents for easier search)

- **Sharing & Collaboration**
    - Public/Private File Sharing Links
    - Set Permissions (Read, Edit, Comment)
    - Password-Protected Sharing Links
    - Link Expiry Dates

- **Security & Privacy Upgrades**
    - End-to-End Encryption (AES-256)
    - Access Logs & Activity Tracking (logins, file downloads)
    - 2FA (Two-Factor Authentication)

- **Backup & Restore**
    - Scheduled Backups
    - Permanent File Wipe (GDPR-compliant deletion)

- **Performance & Scalability**
    - CDN Integration for Faster File Access
    - Basic Caching Mechanism for Frequently Accessed Files

---

### Phase 3: Advanced Features & Multi-Platform Support

**Goal:** Make it a feature-rich and scalable cloud storage system.

- **Cross-Platform Support**
    - Mobile Apps (Android & iOS)
    - Desktop Sync Client (Windows, Mac, Linux)

- **Admin Dashboard & User Management**
    - User & Storage Usage Monitoring
    - Admin Panel for Managing Users & Permissions

- **Advanced File Collaboration**
    - Real-Time Collaboration (Google Docs-style editing, optional integration with OnlyOffice or Collabora)
    - File Commenting & Annotations

- **Smart AI-Powered Features**
    - AI-Based File Tagging & Organization
    - Automated File Categorization (Docs, Images, Videos, etc.)
    - Duplicate File Detection & Removal

- **Integrations & API Support**
    - WebDAV / FTP Support
    - REST API for Automation & External Integration
    - Webhook Notifications for File Changes

---

## Core Features

### Feature Checklist

- **User Authentication & Management**
    - [x] Login/Registration
    - [x] OAuth (Google, GitHub)
    - [x] Basic role-based access control (Admin/User)

- **File Upload & Management**
    - [ ] Drag-and-drop file upload
    - [ ] File preview (images, PDFs)
    - [x] Folder creation & organization
    - [x] File creation & organization
    - [x] Basic search & filtering
    - [x] Metadata display (size, type, last modified date)

- **Storage & Sync**
    - [x] Cloud-based or self-hosted storage (AWS S3, MinIO, or local storage)
    - [x] Upload Single part
    - [x] Upload Multipart

- **Security & Privacy**
    - [ ] TLS encryption for file transfers
    - [ ] Secure public file access
    - [x] Password hashing (bcrypt)
    - [x] Secure file deletion (soft delete with trash bin)

- **Basic Web Interface**
    - [ ] React or Next.js frontend
    - [ ] Simple UI for uploading & managing files

---

## Security Features

1. **TLS Encryption for File Transfers**
    - Ensure all file transfers are secure using TLS.

2. **Password Hashing**
    - Use bcrypt for securing passwords.

3. **Secure File Deletion**
    - Implement soft delete with the ability to restore files from the trash bin.

4. **Secure Public File Access**
    - Enforce HTTPS for file access in S3.

---

## UI & User Experience

- **React or Next.js Frontend**
    - Develop a simple, user-friendly interface that allows users to upload and manage files effortlessly.

---

## Advanced Features

- **Real-Time Collaboration**
    - Enable users to collaborate on files in real-time with integration options for platforms like OnlyOffice or Collabora.

- **AI-Based File Tagging & Organization**
    - Implement AI to automatically tag and categorize files for easier management.

- **Mobile & Desktop Sync**
    - Create mobile apps for iOS and Android and a sync client for desktop platforms (Windows, Mac, Linux).

---

## Getting Started

To set up this project locally, follow the instructions below:

### Prerequisites

- React and Node.js
- AWS S3 or MinIO account (for blob storage)
- PostgreSQL/MySQL database (for user and file metadata)

### Installation TODO...

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/cloud-file-storage.git
   cd cloud-file-storage
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Set up the following environment variables for AWS S3/MinIO and database configurations:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_S3_BUCKET_NAME`
   - `DATABASE_URL`
   
4. **Run the application**:
   ```bash
   npm start
   ```

   This will start the app on `http://localhost:3000`. You can now access the file management interface.

---

## Contributing

I’m always down to improve this! Whether it’s fixing a bug or adding a cool feature, feel free to contribute.

### How to Contribute

1. **Fork the repository** to your own GitHub account.
2. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/yourusername/cloud-file-storage.git
   ```
3. **Create a new branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and commit them:
   ```bash
   git commit -m "Add feature: Description of your feature"
   ```
5. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a pull request** to the main repository.

Please refer to our [CONTRIBUTING.md](CONTRIBUTING.md) for more detailed instructions.

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## Code of Conduct

By participating in this project, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md). We aim to maintain a welcoming and inclusive environment for all contributors.

---

## Contact

For any questions or inquiries, feel free to contact me via GitHub Issues or by emailing me at [officialbagus15@gmail.com](mailto:officialbagus15@gmail.com).

