const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

// In-memory store for sessions (use database in production)
const sessions = new Map();

app.use(cors());
app.use(express.json());

// Generate permission link
app.post('/api/generate-link', (req, res) => {
    const { walletAddress, permissions } = req.body;
    const sessionId = uuidv4();
    
    sessions.set(sessionId, {
        walletAddress,
        permissions,
        status: 'pending',
        createdAt: Date.now()
    });

    res.json({ 
        link: `http://localhost:8000/approve?session=${sessionId}`,
        sessionId
    });
});

// Check session status
app.get('/api/session/:id', (req, res) => {
    const session = sessions.get(req.params.id);
    if (!session) return res.status(404).send('Session not found');
    res.json(session);
});

// Approve session
app.post('/api/approve', (req, res) => {
    const { sessionId, approved } = req.body;
    const session = sessions.get(sessionId);
    
    if (!session) return res.status(404).send('Session not found');
    
    session.status = approved ? 'approved' : 'rejected';
    session.updatedAt = Date.now();
    
    res.json(session);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Permission server running on port ${PORT}`);
});
