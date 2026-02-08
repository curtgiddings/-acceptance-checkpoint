'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCheckpoint, updateCheckpoint, type Checkpoint } from '@/lib/supabase'

export default function LiveSession({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [checkpoint, setCheckpoint] = useState<Checkpoint | null>(null)
  const [loading, setLoading] = useState(true)
  
  const [liveQ1, setLiveQ1] = useState<boolean | null>(null)
  const [liveQ2, setLiveQ2] = useState<boolean | null>(null)
  const [liveQ3, setLiveQ3] = useState<boolean | null>(null)
  const [liveNeeds, setLiveNeeds] = useState('')

  useEffect(() => {
    async function load() {
      const cp = await getCheckpoint(params.id)
      if (cp) {
        setCheckpoint(cp)
        setLiveQ1(cp.live_q1)
        setLiveQ2(cp.live_q2)
        setLiveQ3(cp.live_q3)
        setLiveNeeds(cp.live_needs || '')
      }
      setLoading(false)
    }
    load()
  }, [params.id])

  const handleComplete = async () => {
    const isAccepted = liveQ3 === true
    await updateCheckpoint(params.id, {
      live_q1: liveQ1,
      live_q2: liveQ2,
      live_q3: liveQ3,
      live_needs: liveNeeds,
      accepted: isAccepted,
      accepted_at: isAccepted ? new Date().toISOString() : null,
      status: isAccepted ? 'accepted' : 'gaps_identified'
    })
    router.push(`/c/${params.id}/complete`)
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

  const allAnswered = liveQ1 !== null && liveQ2 !== null && liveQ3 !== null
  const hasGaps = liveQ1 === false || liveQ2 === false

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-6">
          Live Session
        </p>
        <h1 className="font-serif text-3xl font-light text-stone-900 mb-2">
          Acceptance Checkpoint
        </h1>
        <p className="text-stone-500 text-sm">
          {checkpoint.setter_name} + {checkpoint.receiver_name}
        </p>
      </div>

      {/* Goal Summary */}
      <div className="bg-stone-100 p-6 mb-10">
        <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-2">The Goal</p>
        <p className="font-serif text-lg text-stone-900">{checkpoint.goal_description}</p>
        <p className="text-sm text-stone-500 mt-1">{checkpoint.target_value} by {checkpoint.deadline}</p>
      </div>

      {/* Questions */}
      <div className="space-y-4 mb-10">
        {/* Q1 */}
        <div className={`p-6 border-2 transition-colors ${
          liveQ1 === null ? 'border-stone-200' : (liveQ1 ? 'border-stone-900 bg-stone-50' : 'border-amber-500 bg-amber-50')
        }`}>
          <div className="flex gap-4">
            <div className="font-serif text-2xl text-stone-300 w-8">01</div>
            <div className="flex-1">
              <p className="text-stone-900 font-medium mb-1">
                Do you understand what you&apos;re being asked?
              </p>
              <p className="text-xs text-stone-500 mb-4">
                Is the target clear, including assumptions behind it?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setLiveQ1(true)}
                  className={`flex-1 py-3 font-medium text-sm tracking-wide transition-colors ${
                    liveQ1 === true 
                      ? 'bg-stone-900 text-white' 
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  YES, I UNDERSTAND
                </button>
                <button
                  onClick={() => setLiveQ1(false)}
                  className={`flex-1 py-3 font-medium text-sm tracking-wide transition-colors ${
                    liveQ1 === false 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  I HAVE QUESTIONS
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Q2 */}
        <div className={`p-6 border-2 transition-colors ${
          liveQ2 === null ? 'border-stone-200' : (liveQ2 ? 'border-stone-900 bg-stone-50' : 'border-amber-500 bg-amber-50')
        }`}>
          <div className="flex gap-4">
            <div className="font-serif text-2xl text-stone-300 w-8">02</div>
            <div className="flex-1">
              <p className="text-stone-900 font-medium mb-1">
                Is this realistic given what you control?
              </p>
              <p className="text-xs text-stone-500 mb-4">
                Consider resources, timeline, and dependencies.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setLiveQ2(true)}
                  className={`flex-1 py-3 font-medium text-sm tracking-wide transition-colors ${
                    liveQ2 === true 
                      ? 'bg-stone-900 text-white' 
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  YES, IT&apos;S REALISTIC
                </button>
                <button
                  onClick={() => setLiveQ2(false)}
                  className={`flex-1 py-3 font-medium text-sm tracking-wide transition-colors ${
                    liveQ2 === false 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  I HAVE CONCERNS
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Needs */}
        {hasGaps && (
          <div className="p-6 border-2 border-amber-500 bg-amber-50 animate-slide-up">
            <label className="block text-[10px] uppercase tracking-wider text-amber-700 mb-2">
              What needs to be addressed before you can accept?
            </label>
            <textarea
              className="w-full px-4 py-3 border border-amber-300 bg-white text-stone-900 placeholder-amber-400 resize-none"
              rows={2}
              placeholder="Be specific..."
              value={liveNeeds}
              onChange={(e) => setLiveNeeds(e.target.value)}
            />
          </div>
        )}

        {/* Q3 - The Moment */}
        <div className={`p-6 border-2 transition-colors ${
          liveQ3 === null ? 'border-stone-900 bg-stone-50' : (liveQ3 ? 'border-stone-900 bg-stone-900' : 'border-amber-500 bg-amber-50')
        }`}>
          <div className="flex gap-4">
            <div className={`font-serif text-2xl w-8 ${liveQ3 === true ? 'text-stone-600' : 'text-stone-400'}`}>03</div>
            <div className="flex-1">
              <p className={`font-medium mb-1 ${liveQ3 === true ? 'text-white' : 'text-stone-900'}`}>
                Are you genuinely committing to this target?
              </p>
              <p className={`text-xs mb-4 ${liveQ3 === true ? 'text-stone-400' : 'text-stone-500'}`}>
                This is the acceptance moment — public, voluntary, binding.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setLiveQ3(true)}
                  className={`flex-1 py-3 font-medium text-sm tracking-wide transition-colors ${
                    liveQ3 === true 
                      ? 'bg-white text-stone-900' 
                      : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  YES, I ACCEPT
                </button>
                <button
                  onClick={() => setLiveQ3(false)}
                  className={`flex-1 py-3 font-medium text-sm tracking-wide transition-colors ${
                    liveQ3 === false 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  NOT YET
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complete */}
      <button
        onClick={handleComplete}
        disabled={!allAnswered}
        className="w-full py-4 bg-stone-900 text-white font-medium tracking-wide hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        COMPLETE CHECKPOINT
      </button>
    </div>
  )
}
