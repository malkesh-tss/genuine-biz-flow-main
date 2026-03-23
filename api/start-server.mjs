import app from './api/server.js';
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log('[INFO] Server listening on port', PORT));
