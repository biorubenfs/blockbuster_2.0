import express from 'express';

import dotenv from 'dotenv';

// Init dotenv
dotenv.config();

// APP port
const port = process.env.PORT;

// Initialize Express
const app = express();

app.get('/', (req, res) => {
    res.json({ message: "content" })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})