const axios = require('axios');

const API_KEY = '0k2sjzLw.KmLXtsxCFpWHmDm-p1ujUnZP';
const endpoint = 'https://api.kils.ai/generate_voice';

async function cloneVoice(audioSample, text) {
    const formData = new FormData();
    formData.append('audio', audioSample);
    formData.append('text', text);

    try {
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to clone voice:', error);
    }
}
