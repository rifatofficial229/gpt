const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// RapidAPI credentials
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || 'b58eb7d5b8msh635991f26e55ba2p15e48fjsnc62ae9817d29';
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'free-chatgpt-api.p.rapidapi.com';

/**
 * API Endpoint: GET /question?q=hello
 * Example: https://your-app.onrender.com/question?q=hello
 */
app.get('/question', async (req, res) => {
    const query = req.query.q; // Get question from 'q' query parameter

    if (!query) {
        return res.status(400).json({ error: "Missing 'q' parameter" });
    }

    try {
        const response = await axios.get('https://free-chatgpt-api.p.rapidapi.com/chat-completion-one', {
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST
            },
            params: { prompt: query }
        });

        res.json({
            q: query,
            response: response.data,
            owner: "Mueid Mursalin Rifat"
        });
    } catch (error) {
        res.status(500).json({ 
            q: query,
            error: "API request failed", 
            details: error.message,
            owner: "Mueid Mursalin Rifat"
        });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
