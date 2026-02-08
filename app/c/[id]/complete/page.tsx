'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCheckpoint, type Checkpoint } from '@/lib/supabase'

export default function Complete({ params }: { params: { id: string } }) {
  const [checkpoint, setCheckpoint] = useState<Checkpoint | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const cp = await getCheckpoint(params.id)
      setCheckpoint(cp)
      setLoading(false)
    }
    load()
  }, [params.id])

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

  const isAccepted = checkpoint.accepted
  const today = checkpoint.accepted_at 
    ? new Date(checkpoint.accepted_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

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
      <div className="text-center mb-12">
        <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-6">
          Checkpoint Complete
        </p>
        <h1 className="font-serif text-4xl font-light text-stone-900 mb-3">
          {isAccepted ? 'Goal Accepted' : 'Gaps Identified'}
        </h1>
        <p className="text-stone-500">
          {isAccepted 
            ? 'This commitment is now documented.' 
            : 'Follow-up needed before acceptance.'
          }
        </p>
      </div>

      {/* Status */}
      <div className="flex justify-center gap-6 mb-12">
        <div className="text-center">
          <div className={`w-12 h-12 mx-auto mb-2 flex items-center justify-center font-serif text-lg ${
            checkpoint.live_q1 ? 'bg-stone-900 text-white' : 'bg-amber-500 text-white'
          }`}>
            {checkpoint.live_q1 ? '✓' : '!'}
          </div>
          <p className="text-[10px] uppercase tracking-wider text-stone-500">Understood</p>
        </div>
        <div className="text-center">
          <div className={`w-12 h-12 mx-auto mb-2 flex items-center justify-center font-serif text-lg ${
            checkpoint.live_q2 ? 'bg-stone-900 text-white' : 'bg-amber-500 text-white'
          }`}>
            {checkpoint.live_q2 ? '✓' : '!'}
          </div>
          <p className="text-[10px] uppercase tracking-wider text-stone-500">Realistic</p>
        </div>
        <div className="text-center">
          <div className={`w-12 h-12 mx-auto mb-2 flex items-center justify-center font-serif text-lg ${
            checkpoint.live_q3 ? 'bg-stone-900 text-white' : 'bg-amber-500 text-white'
          }`}>
            {checkpoint.live_q3 ? '✓' : '!'}
          </div>
          <p className="text-[10px] uppercase tracking-wider text-stone-500">Committed</p>
        </div>
      </div>

      {/* Needs */}
      {!isAccepted && checkpoint.live_needs && (
        <div className="border-2 border-amber-500 bg-amber-50 p-6 mb-10">
          <p className="text-[10px] uppercase tracking-wider text-amber-700 mb-2">
            Needs Before Acceptance
          </p>
          <p className="text-sm text-stone-800">{checkpoint.live_needs}</p>
        </div>
      )}

      {/* Record */}
      <div className="bg-stone-100 p-6 mb-10">
        <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-4">
          {isAccepted ? 'Acceptance Record' : 'Checkpoint Summary'}
        </p>
        
        <div className="mb-6 pb-6 border-b border-stone-200">
          <p className="font-serif text-lg text-stone-900 mb-1">{checkpoint.goal_description}</p>
          <p className="text-sm text-stone-500">{checkpoint.target_value} by {checkpoint.deadline}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Set by</p>
            <p className="text-sm text-stone-800">{checkpoint.setter_name}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">{isAccepted ? 'Accepted by' : 'Reviewed by'}</p>
            <p className="text-sm text-stone-800">{checkpoint.receiver_name}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Date</p>
            <p className="text-sm text-stone-800">{today}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Status</p>
            <p className={`text-sm font-medium ${isAccepted ? 'text-stone-900' : 'text-amber-600'}`}>
              {isAccepted ? 'Accepted' : 'Pending'}
            </p>
          </div>
        </div>

        {checkpoint.setter_assumptions && (
          <div className="pt-6 border-t border-stone-200">
            <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Documented Assumptions</p>
            <p className="text-sm text-stone-700">{checkpoint.setter_assumptions}</p>
          </div>
        )}

        {checkpoint.source_type && (
          <div className="pt-4 mt-4 border-t border-stone-200">
            <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Target Source</p>
            <p className="text-sm text-stone-700">
              {sourceLabel[checkpoint.source_type as keyof typeof sourceLabel]}
              {checkpoint.source_description && ` — ${checkpoint.source_description}`}
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <Link
        href="/"
        className="block w-full py-4 bg-stone-900 text-white font-medium tracking-wide text-center hover:bg-stone-800 transition-colors"
      >
        START NEW CHECKPOINT
      </Link>
    </div>
  )
}
