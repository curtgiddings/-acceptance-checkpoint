'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCheckpoint, getCheckpointFiles, updateCheckpoint, type Checkpoint, type CheckpointFile } from '@/lib/supabase'

export default function CheckpointReview({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [checkpoint, setCheckpoint] = useState<Checkpoint | null>(null)
  const [files, setFiles] = useState<CheckpointFile[]>([])
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState('')
  const [concerns, setConcerns] = useState('')

  useEffect(() => {
    async function load() {
      const cp = await getCheckpoint(params.id)
      if (cp) {
        setCheckpoint(cp)
        setQuestions(cp.receiver_questions || '')
        setConcerns(cp.receiver_concerns || '')
        const f = await getCheckpointFiles(params.id)
        setFiles(f)
      }
      setLoading(false)
    }
    load()
  }, [params.id])

  const handleReady = async () => {
    await updateCheckpoint(params.id, {
      receiver_questions: questions,
      receiver_concerns: concerns,
      receiver_reviewed_at: new Date().toISOString(),
      status: 'ready_for_session'
    })
    router.push(`/c/${params.id}/session`)
  }

  if (loading) {
    return (
      <div className="py-20 text-center animate-fade-in">
        <p className="text-stone-400 text-sm">Loading...</p>
      </div>
    )
  }

  if (!checkpoint) {
    return (
      <div className="py-20 text-center animate-fade-in">
        <p className="font-serif text-2xl text-stone-900 mb-2">Not Found</p>
        <p className="text-stone-500 text-sm">This link may be invalid or expired.</p>
      </div>
    )
  }

  const sourceLabel = {
    bi_report: 'BI / Analytics Report',
    leadership_email: 'Leadership Email',
    planning_doc: 'Planning Document',
    verbal: 'Verbal / Meeting',
    other: 'Other'
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-6">
          Review Before Meeting
        </p>
        <h1 className="font-serif text-3xl font-light text-stone-900 mb-3">
          {checkpoint.setter_name} shared<br />a goal with you
        </h1>
        <p className="text-stone-500 text-sm">
          Review the details and note any questions.
        </p>
      </div>

      {/* Goal */}
      <div className="bg-stone-100 p-6 mb-6">
        <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-2">The Goal</p>
        <p className="font-serif text-xl text-stone-900 mb-1">{checkpoint.goal_description}</p>
        <p className="text-sm text-stone-500">{checkpoint.target_value} by {checkpoint.deadline}</p>
        
        {checkpoint.context && (
          <div className="mt-6 pt-6 border-t border-stone-200">
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Context</p>
            <p className="text-sm text-stone-700">{checkpoint.context}</p>
          </div>
        )}
        
        {checkpoint.source_type && (
          <div className="mt-6 pt-6 border-t border-stone-200">
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Source</p>
            <p className="text-sm text-stone-700">
              {sourceLabel[checkpoint.source_type as keyof typeof sourceLabel]}
              {checkpoint.source_description && ` — ${checkpoint.source_description}`}
            </p>
          </div>
        )}
        
        {files.length > 0 && (
          <div className="mt-6 pt-6 border-t border-stone-200">
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-3">Attached Documents</p>
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between py-3 px-4 bg-white">
                  <span className="text-sm text-stone-700 truncate">{file.file_name}</span>
                  <button className="text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors">
                    VIEW
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Assumptions from Setter */}
      <div className="border-2 border-stone-200 p-6 mb-10">
        <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-4">
          From {checkpoint.setter_name}
        </p>
        
        {checkpoint.setter_assumptions && (
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Assumptions</p>
            <p className="text-sm text-stone-800">{checkpoint.setter_assumptions}</p>
          </div>
        )}
        
        {checkpoint.setter_constraints && (
          <div className="mb-4">
            <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Constraints</p>
            <p className="text-sm text-stone-800">{checkpoint.setter_constraints}</p>
          </div>
        )}
        
        {checkpoint.setter_dependencies && (
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Dependencies</p>
            <p className="text-sm text-stone-800">{checkpoint.setter_dependencies}</p>
          </div>
        )}
      </div>

      {/* Your Preparation */}
      <div className="border-t border-stone-200 pt-10 mb-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-6 text-center">
          Your Preparation
        </p>
        <p className="text-stone-500 text-sm mb-6 text-center">
          Note anything you want to discuss with {checkpoint.setter_name}.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">
              Questions you want to ask
            </label>
            <textarea
              className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400 resize-none"
              rows={2}
              placeholder="What do you need clarified?"
              value={questions}
              onChange={(e) => setQuestions(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">
              Initial concerns (if any)
            </label>
            <textarea
              className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400 resize-none"
              rows={2}
              placeholder="What worries you about this target?"
              value={concerns}
              onChange={(e) => setConcerns(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleReady}
        className="w-full py-4 bg-stone-900 text-white font-medium tracking-wide hover:bg-stone-800 transition-colors"
      >
        I&apos;M READY FOR THE CONVERSATION
      </button>
      <p className="text-xs text-center mt-3 text-stone-400">
        You&apos;ll complete the checkpoint with {checkpoint.setter_name}
      </p>
    </div>
  )
}
