import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import roomRoutes from './src/routes/roomRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';


const app = express();

const allowedOrigins = process.env.CORS_ORIGIN
    ? [process.env.CORS_ORIGIN]
    : ['http://localhost:5173', 'http://localhost:5174'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// Root Route - Premium API Welcome Page
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GrubPac API | Production Ready</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #030712;
            --card: #111827;
            --primary: #6366f1;
            --secondary: #a855f7;
            --text: #f3f4f6;
            --muted: #9ca3af;
        }
        body { 
            font-family: 'Outfit', sans-serif; 
            background: var(--bg); 
            color: var(--text); 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            min-height: 100vh; 
            margin: 0;
            background-image: radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent),
                              radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.1), transparent);
        }
        .container { 
            max-width: 700px; 
            width: 90%;
            background: var(--card); 
            padding: 50px; 
            border-radius: 32px; 
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); 
            border: 1px solid rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
        }
        .header { margin-bottom: 40px; text-align: center; }
        .badge { 
            display: inline-block; 
            padding: 8px 16px; 
            background: rgba(99, 102, 241, 0.1); 
            border: 1px solid rgba(99, 102, 241, 0.2);
            border-radius: 100px; 
            font-size: 14px; 
            color: #818cf8; 
            font-weight: 600; 
            margin-bottom: 24px; 
            letter-spacing: 0.5px;
        }
        h1 { font-size: 42px; font-weight: 800; margin: 0 0 16px; background: linear-gradient(to right, #818cf8, #c084fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        p { color: var(--muted); font-size: 17px; line-height: 1.6; margin: 0; text-align: center; }
        
        .section-title { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: var(--muted); margin: 40px 0 20px; font-weight: 700; text-align: left; }
        
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .endpoint { 
            background: rgba(255, 255, 255, 0.03); 
            padding: 16px; 
            border-radius: 16px; 
            text-align: left;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: 13px;
            transition: all 0.2s ease;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .endpoint:hover { background: rgba(255, 255, 255, 0.06); transform: translateY(-2px); border-color: rgba(99, 102, 241, 0.3); }
        .method { font-weight: 800; margin-right: 12px; font-size: 11px; padding: 4px 8px; border-radius: 6px; }
        .post { background: rgba(16, 185, 129, 0.1); color: #34d399; }
        .get { background: rgba(59, 130, 246, 0.1); color: #60a5fa; }
        
        .footer { margin-top: 50px; font-size: 14px; color: var(--muted); border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 30px; text-align: center; }
        .footer b { color: var(--text); }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="badge">SYSTEM STATUS: OPERATIONAL</div>
            <h1>GrubPac API</h1>
            <p>Premium Hospitality Management System Backend. Secure, scalable, and fully integrated.</p>
        </div>
        
        <div class="section-title">Authentication</div>
        <div class="grid">
            <div class="endpoint"><span class="method post">POST</span>/api/auth/register</div>
            <div class="endpoint"><span class="method post">POST</span>/api/auth/login</div>
        </div>

        <div class="section-title">Rooms & Bookings</div>
        <div class="grid">
            <div class="endpoint"><span class="method get">GET</span>/api/rooms</div>
            <div class="endpoint"><span class="method get">GET</span>/api/rooms/:id</div>
            <div class="endpoint"><span class="method post">POST</span>/api/bookings</div>
            <div class="endpoint"><span class="method get">GET</span>/api/bookings/my</div>
        </div>
        
        <div class="footer">
            For detailed integration guides, refer to <b>API_Documentation.md</b>
        </div>
    </div>
</body>
</html>
    `);
});


export default app;
