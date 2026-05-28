const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware configurations
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure target physical directory exists in the remote data hub
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// In-Memory Database Matrix tracking chronological interactions linearly
let photoDatabase = [];

// Automated disk engine configuration preserving file integrity extensions
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate cryptographic timestamp naming matrices to prevent payload collisions
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// API Endpoint: Anonymous Upload Core
app.post('/api/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Payload missing file data.' });
    }

    // Register interactions without compiling user metadata strings
    const newPhotoRecord = {
        id: photoDatabase.length + 1,
        url: `/uploads/${req.file.filename}`,
        timestamp: new Date()
    };

    // Prepend object instance array so newest photos instantly occupy slot position 1
    photoDatabase.unshift(newPhotoRecord);

    res.status(201).json({ success: true, message: "Anonymous node injection verified." });
});

// API Endpoint: Retrieve Timeline Matrix Array
app.get('/api/photos', (req, res) => {
    res.json(photoDatabase);
});

// Activate server listener loop
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  PHOTO FOX CORE STORAGE NODE ACTIVE ON PORT ${PORT}`);
    console.log(`  Processing Anonymous Visual Streams Continuously  `);
    console.log(`====================================================`);
});