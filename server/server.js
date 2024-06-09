const express = require('express');
const axios = require('axios');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');  // Required for file system operations
const FormData = require('form-data');

const app = express();
const PORT = 5000;

app.use(express.json());

app.post('/createVoiceJob', upload.single('soundFile'), async (req, res) => {
    const { voiceModelId } = req.body; // Extract voiceModelId from the body
    const soundFile = req.file; // Extracted sound file from the multipart form-data

    if (!soundFile || !voiceModelId) {
        return res.status(400).send('Both voiceModelId and soundFile are required');
    }

    const apiUrl = 'https://arpeggi.io/api/kits/v1/voice-conversions'; // Correct endpoint
    const formData = new FormData();
    formData.append('voiceModelId', voiceModelId);
    formData.append('soundFile', fs.createReadStream(soundFile.path)); // Appends the file to the form data

    const headers = {
        Authorization: 'Bearer hgioQle_.Mz-RY5qRGLgu57nBNvqZ5Pkz', // Replace YOUR_API_KEY with the actual API key
        ...formData.getHeaders(),
    };

    try {
        const apiResponse = await axios.post(apiUrl, formData, { headers });
        console.log('API response:', apiResponse.data);
        res.status(200).json(apiResponse.data);
    } catch (error) {
        console.error('API request failed:', error.response ? JSON.stringify(error.response.data) : error.message);
        res.status(500).send('Failed to create voice conversion job');
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
