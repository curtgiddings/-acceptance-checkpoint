-- Acceptance Checkpoint Schema
-- Run this in your Supabase SQL editor

-- Checkpoints table
CREATE TABLE checkpoints (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending_receiver', 'ready_for_session', 'accepted', 'gaps_identified')),
  
  -- Goal info
  goal_description TEXT NOT NULL,
  target_value TEXT,
  deadline TEXT,
  context TEXT,
  
  -- Source documentation
  source_type TEXT CHECK (source_type IN ('bi_report', 'leadership_email', 'planning_doc', 'verbal', 'other')),
  source_description TEXT,
  
  -- People
  setter_name TEXT NOT NULL,
  setter_email TEXT,
  receiver_name TEXT NOT NULL,
  receiver_email TEXT,
  
  -- Setter's prep
  setter_assumptions TEXT,
  setter_constraints TEXT,
  setter_dependencies TEXT,
  setter_q1 BOOLEAN,
  setter_q2 BOOLEAN,
  setter_completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Receiver's review
  receiver_questions TEXT,
  receiver_concerns TEXT,
  receiver_reviewed_at TIMESTAMP WITH TIME ZONE,
  
  -- Live session
  live_q1 BOOLEAN,
  live_q2 BOOLEAN,
  live_q3 BOOLEAN,
  live_needs TEXT,
  
  -- Final
  accepted BOOLEAN DEFAULT FALSE,
  accepted_at TIMESTAMP WITH TIME ZONE
);

-- File attachments table
CREATE TABLE checkpoint_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checkpoint_id TEXT REFERENCES checkpoints(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  storage_path TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_checkpoints_status ON checkpoints(status);
CREATE INDEX idx_checkpoints_setter_email ON checkpoints(setter_email);
CREATE INDEX idx_checkpoints_receiver_email ON checkpoints(receiver_email);
CREATE INDEX idx_checkpoint_files_checkpoint ON checkpoint_files(checkpoint_id);

-- Enable RLS
ALTER TABLE checkpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkpoint_files ENABLE ROW LEVEL SECURITY;

-- Policies (open for now - tighten with auth later)
CREATE POLICY "Allow all access to checkpoints" ON checkpoints FOR ALL USING (true);
CREATE POLICY "Allow all access to checkpoint_files" ON checkpoint_files FOR ALL USING (true);

-- Storage bucket for file uploads
-- Run this separately or via Supabase dashboard:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('checkpoint-files', 'checkpoint-files', false);
