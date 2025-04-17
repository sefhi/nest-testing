CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_email ON "user" (email);
CREATE INDEX IF NOT EXISTS idx_user_name ON "user" (name);

INSERT INTO "user" (id, email, name) VALUES (uuid_generate_v4(), 'duplicateemail@example.com', 'Example Example');