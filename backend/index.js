const express = require('express');
const cors = require('cors');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Multer setup for file uploads (no size limit)
const upload = multer({
  dest: 'uploads/',
  // limits: { fileSize: 100 * 1024 * 1024 }, // 100MB (removed)
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'video/mp4') {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only MP4 files are allowed'));
    }
    cb(null, true);
  },
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/convert', (req, res) => {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({ error: 'File too large.' });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        // This is triggered for non-MP4 files
        return res.status(400).json({ error: 'Only MP4 files are allowed.' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      // Other errors
      return res.status(400).json({ error: err.message || 'File upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const inputPath = req.file.path;
    const outputPath = path.join('uploads', `${req.file.filename}.mp3`);

    ffmpeg(inputPath)
      .toFormat('mp3')
      .on('error', (err) => {
        fs.unlinkSync(inputPath);
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        return res.status(500).json({ error: 'Conversion failed', details: err.message });
      })
      .on('end', () => {
        res.download(outputPath, 'converted.mp3', (err) => {
          fs.unlinkSync(inputPath);
          if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        });
      })
      .save(outputPath);
  });
});

// Global error handler (fallback)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 