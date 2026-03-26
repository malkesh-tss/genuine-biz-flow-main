import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

// Debug logging function
function debugLog(message, data = {}) {
  console.log(`[DEBUG ${new Date().toISOString()}] ${message}`, JSON.stringify(data, null, 2));
}

const app = express();

// CORS configuration - allow all origins for flexibility
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const PORT = process.env.PORT || 3001;

// NeonDB PostgreSQL connection pool - only create if DATABASE_URL exists
let pool = null;

function getPool() {
  if (!pool && process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    pool.on('connect', () => {
      console.log('[INFO] Connected to NeonDB PostgreSQL');
    });
    
    pool.on('error', (err) => {
      console.error('[ERROR] NeonDB connection error:', err);
    });
  }
  return pool;
}

// Nodemailer transporter configuration for Gmail
let transporter = null;

function getTransporter() {
  if (!transporter && process.env.GMAIL_EMAIL && process.env.GMAIL_APP_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
    
    transporter.verify((error, success) => {
      if (error) {
        console.error('[ERROR] Gmail transporter verification failed:', error);
      } else {
        console.log('[INFO] Gmail transporter is ready');
      }
    });
  }
  return transporter;
}

// Function to send confirmation email
async function sendConfirmationEmail(email, name) {
  // Check if Gmail credentials are configured
  if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_APP_PASSWORD) {
    console.warn('[WARN] Gmail credentials not configured. Skipping email send.');
    console.warn('[WARN] Required: GMAIL_EMAIL and GMAIL_APP_PASSWORD environment variables');
    return false;
  }

  // Create transporter fresh for each request (more reliable in serverless)
  const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: 'Registration Confirmed - Monthly Online Networking Event',
    html: `
      <div style="font-family: Arial, sans-serif; background-color:#00264d; padding:40px 0;">
  <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.15);">

    <!-- Header -->
    <div style="background-color:#00264d; padding:20px; text-align:center;">
      <h1 style="color:#ffffff; margin:0;">Monthly Online Networking</h1>
      <p style="color:#df902e; margin:5px 0 0;">Registration Confirmed</p>
    </div>

    <!-- Body -->
    <div style="padding:30px; color:#00264d;">
      <h2 style="margin-top:0;">Welcome, ${name}!</h2>

      <p>
        We’re excited to confirm your registration for the 
        <strong>Monthly Online Networking</strong>.
      </p>

      <p>
        Get ready to connect with industry leaders, entrepreneurs, and innovators in an engaging and high-energy networking experience.
      </p>

      <!-- Event Details -->
      <div style="margin:25px 0; padding:18px; background:#f5f7fa; border-left:5px solid #df902e;">
        <strong>📅 Event Details</strong><br><br>
        <strong>When:</strong> Every 4th Wednesday of the month<br>
        <strong>Time:</strong> 12:00 PM PST / 3:00 PM EST<br>
        <strong>Location:</strong> Online via Zoom
      </div>

      <div style="margin:25px 0; padding:15px; background:#f5f7fa; border-left:5px solid #df902e;">
        <strong>🎉 Your spot is officially secured!</strong><br>
        Keep an eye on your inbox for event updates and reminders.
      </div>

      <!-- Zoom Section -->
      <div style="margin:30px 0; text-align:center;">
        <p style="font-weight:bold; margin-bottom:12px;">Join the event via Zoom:</p>

        <a href="https://us06web.zoom.us/j/84967249302?pwd=wBsRSOfxGKg8XLO0s3psStWo5d7j17.1"
           style="display:inline-block; background:#df902e; color:#00264d; padding:12px 22px; border-radius:6px; text-decoration:none; font-weight:bold;">
          👉 Join Zoom Meeting
        </a>

        <p style="font-size:12px; margin-top:10px; word-break:break-all;">
          Or copy & paste this link:<br>
          <a href="https://us06web.zoom.us/j/84967249302?pwd=wBsRSOfxGKg8XLO0s3psStWo5d7j17.1" style="color:#00264d;">
            https://us06web.zoom.us/j/84967249302?pwd=wBsRSOfxGKg8XLO0s3psStWo5d7j17.1
          </a>
        </p>
      </div>

      <p>
        If you have any questions or need assistance, our team is always happy to help.
      </p>

      <p style="margin-top:30px;">
        Looking forward to seeing you there!<br>
        <strong>— The Scale Summit Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#00264d; padding:15px; text-align:center;">
      <p style="color:#ffffff; font-size:12px; margin:0;">
        © Scale Summit • All Rights Reserved
      </p>
    </div>

  </div>
</div>
    `
  };

  try {
    await mailTransporter.sendMail(mailOptions);
    console.log(`[INFO] Confirmation email sent to: ${email}`);
    return true;
  } catch (error) {
    console.error('[ERROR] Failed to send confirmation email:', error);
    return false;
  }
}

// API endpoint to register attendee
app.post('/api/services/register', async (req, res) => {
  debugLog('API /api/register called', { body: req.body, headers: req.headers });
  
  try {
    const dbPool = getPool();
    
    if (!dbPool) {
      return res.status(500).json({ error: 'Database not configured' });
    }

    const { name, email, business, looking } = req.body;

    if (!name || !email) {
      debugLog('Validation failed - missing required fields', { name: !!name, email: !!email });
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    debugLog('Inserting registration into NeonDB', { name, email, business, looking });

    // Insert into NeonDB
    const query = `
      INSERT INTO tss.registrations (name, email, business, looking, created_at, updated_at)
      VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      RETURNING id, name, email, business, looking, created_at
    `;
    
    const values = [name, email, business || null, looking || null];
    const result = await dbPool.query(query, values);

    debugLog('Registration inserted successfully', { id: result.rows[0].id });
    
    // Send confirmation email (await for serverless reliability)
    const emailSent = await sendConfirmationEmail(email, name);
    debugLog('Email send result', { email, sent: emailSent });
    
    res.json({ 
      success: true, 
      message: 'Registration successful',
      registration: result.rows[0]
    });
  } catch (error) {
    console.error('[ERROR] Registration error:', error);
    debugLog('Registration error', { message: error.message, stack: error.stack });
    res.status(500).json({ 
      error: 'Registration failed',
      message: error.message 
    });
  }
});

// Get all registrations (optional endpoint for admin)
app.get('/api/registrations', async (req, res) => {
  try {
    const dbPool = getPool();
    
    if (!dbPool) {
      return res.status(500).json({ error: 'Database not configured' });
    }
    
    const result = await dbPool.query('SELECT * FROM tss.registrations ORDER BY created_at DESC');
    res.json({ registrations: result.rows });
  } catch (error) {
    console.error('[ERROR] Fetch registrations error:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  debugLog('Health check called');
  
  let dbStatus = 'disconnected';
  try {
    const dbPool = getPool();
    if (dbPool) {
      await dbPool.query('SELECT 1');
      dbStatus = 'connected';
    }
  } catch (error) {
    dbStatus = 'error';
  }
  
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbStatus,
    databaseUrlConfigured: !!process.env.DATABASE_URL
  });
});

app.listen(5000,() => {
  console.log('[INFO] API server listening on port 5000');
});
//export default app;
