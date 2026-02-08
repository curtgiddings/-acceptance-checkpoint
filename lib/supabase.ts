import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types
export interface Checkpoint {
  id: string
  created_at: string
  updated_at: string
  status: 'draft' | 'pending_receiver' | 'ready_for_session' | 'accepted' | 'gaps_identified'
  
  goal_description: string
  target_value: string | null
  deadline: string | null
  context: string | null
  
  source_type: 'bi_report' | 'leadership_email' | 'planning_doc' | 'verbal' | 'other' | null
  source_description: string | null
  
  setter_name: string
  setter_email: string | null
  receiver_name: string
  receiver_email: string | null
  
  setter_assumptions: string | null
  setter_constraints: string | null
  setter_dependencies: string | null
  setter_q1: boolean | null
  setter_q2: boolean | null
  setter_completed_at: string | null
  
  receiver_questions: string | null
  receiver_concerns: string | null
  receiver_reviewed_at: string | null
  
  live_q1: boolean | null
  live_q2: boolean | null
  live_q3: boolean | null
  live_needs: string | null
  
  accepted: boolean
  accepted_at: string | null
}

export interface CheckpointFile {
  id: string
  checkpoint_id: string
  file_name: string
  file_size: number
  file_type: string
  storage_path: string
  uploaded_at: string
}

// Database functions
export async function createCheckpoint(data: Partial<Checkpoint>): Promise<Checkpoint | null> {
  const { data: checkpoint, error } = await supabase
    .from('checkpoints')
    .insert(data)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating checkpoint:', error)
    return null
  }
  return checkpoint
}

export async function getCheckpoint(id: string): Promise<Checkpoint | null> {
  const { data: checkpoint, error } = await supabase
    .from('checkpoints')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching checkpoint:', error)
    return null
  }
  return checkpoint
}

export async function updateCheckpoint(id: string, data: Partial<Checkpoint>): Promise<Checkpoint | null> {
  const { data: checkpoint, error } = await supabase
    .from('checkpoints')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) {
    console.error('Error updating checkpoint:', error)
    return null
  }
  return checkpoint
}

export async function getCheckpointFiles(checkpointId: string): Promise<CheckpointFile[]> {
  const { data: files, error } = await supabase
    .from('checkpoint_files')
    .select('*')
    .eq('checkpoint_id', checkpointId)
  
  if (error) {
    console.error('Error fetching files:', error)
    return []
  }
  return files || []
}

export async function uploadFile(checkpointId: string, file: File): Promise<CheckpointFile | null> {
  const filePath = `${checkpointId}/${Date.now()}_${file.name}`
  
  // Upload to storage
  const { error: uploadError } = await supabase.storage
    .from('checkpoint-files')
    .upload(filePath, file)
  
  if (uploadError) {
    console.error('Error uploading file:', uploadError)
    return null
  }
  
  // Create database record
  const { data: fileRecord, error: dbError } = await supabase
    .from('checkpoint_files')
    .insert({
      checkpoint_id: checkpointId,
      file_name: file.name,
      file_size: file.size,
      file_type: file.type,
      storage_path: filePath
    })
    .select()
    .single()
  
  if (dbError) {
    console.error('Error creating file record:', dbError)
    return null
  }
  
  return fileRecord
}

export async function getFileUrl(storagePath: string): Promise<string | null> {
  const { data } = await supabase.storage
    .from('checkpoint-files')
    .createSignedUrl(storagePath, 3600) // 1 hour expiry
  
  return data?.signedUrl || null
}
