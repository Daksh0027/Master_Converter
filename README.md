Master_Converter
A high-performance, simple-to-use web application to convert MP4 video files to MP3 audio files. This project was developed using the AI-powered Cursor editor, with project management and task breakdown managed by Taskmaster AI. It features a React frontend and a Node.js backend.

Introduction
This tool provides a fast and efficient way to extract the audio track from an MP4 video file and save it as a high-quality MP3 file through a user-friendly web interface. It's designed for developers, content creators, and anyone who needs a quick and reliable audio extraction solution. The development process was accelerated by leveraging the AI capabilities of Cursor for code generation and debugging, and Taskmaster AI for organizing the development workflow.

Features
Modern UI: A clean and intuitive user interface built with React.

Robust Backend: A powerful Node.js and Express backend handles file processing.

Fast Conversion: Utilizes FFmpeg for speedy and reliable conversions.

High-Quality Output: Preserves audio quality during the conversion process.

Cross-Platform: The web application can be run on Windows, macOS, and Linux.

Tech Stack
Frontend: React.js

Backend: Node.js, Express.js

Development Environment: Cursor IDE

Project Management: Taskmaster AI

Core Conversion Library: FFmpeg

Installation
This tool requires Node.js, npm (or yarn), and FFmpeg.

1. Install FFmpeg
FFmpeg is a prerequisite for the backend to function. Follow the instructions for your operating system.

On macOS (using Homebrew):

brew install ffmpeg

On Windows (using Chocolatey):

choco install ffmpeg

Alternatively, you can download the FFmpeg binaries from the official website and add the bin directory to your system's PATH.

On Linux (using apt):

sudo apt update
sudo apt install ffmpeg

2. Install Server and Client
Clone the repository and install the dependencies for both the backend and frontend.

# Clone the repository
git clone https://github.com/Daksh0027/Master_Converter.git

# Navigate to the project directory
cd Master_Converter

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

Usage
To run the application, you need to start both the backend server and the frontend client.

1. Start the Backend Server

Navigate to the backend directory and run:

npm start

The server will typically start on http://localhost:5000.

2. Start the Frontend Application

In a new terminal, navigate to the frontend directory and run:

npm start

The React development server will start, and your browser should automatically open to http://localhost:3000.

3. Convert Files

Use the web interface to upload your MP4 file. The converted MP3 file will be processed by the backend and will be available for download.

Contributing
Contributions are welcome! If you have ideas for new features, improvements, or bug fixes, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes.

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.

License
This project is licensed under the MIT License. See the LICENSE file for more details.
