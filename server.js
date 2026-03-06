import app from "./app.js";
import { configDotenv } from 'dotenv';
configDotenv();

const PORT = process.env.PORT || 8000;

app.get('/api/health', (_, res) => {
    res.json({ success: true, message: "Server is running!" })
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});