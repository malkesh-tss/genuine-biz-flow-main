-- Registration Table Schema
-- Database: NeonDB (PostgreSQL)

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    business VARCHAR(150),
    looking VARCHAR(50) CHECK (looking IN ('partnerships', 'clients', 'networking', 'mentorship', 'other')),
    
    -- Zoom integration fields
    zoom_registrant_id VARCHAR(100),
    zoom_registrant_email VARCHAR(255),
    zoom_registration_status VARCHAR(50) DEFAULT 'pending',
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_created_at ON registrations(created_at);

-- Enable Row Level Security (NeonDB/Supabase recommended)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Optional: Create policy for inserting (adjust as needed for your auth setup)
-- CREATE POLICY "Allow inserts" ON registrations FOR INSERT WITH CHECK (true);
