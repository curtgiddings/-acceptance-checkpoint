'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { nanoid } from 'nanoid'
import { createCheckpoint, uploadFile } from '@/lib/supabase'

type Step = 'goal' | 'assumptions' | 'complete'

export default function NewCheckpoint() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('goal')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [checkpointId, setCheckpointId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  
  const [form, setForm] = useState({
    setterName: '',
    receiverName: '',
    receiverEmail: '',
    goalDescription: '',
    targetValue: '',
    deadline: '',
    context: '',
    sourceType: '',
    sourceDescription: '',
    assumptions: '',
    constraints: '',
    dependencies: '',
    setterQ1: null as boolean | null,
    setterQ2: null as boolean | null,
  })
  
  const [files, setFiles] = useState<File[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const copyLink = () => {
    const url = `${window.location.origin}/c/${checkpointId}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const id = nanoid(9)
    
    const checkpoint = await createCheckpoint({
      id,
      goal_description: form.goalDescription,
      target_value: form.targetValue,
      deadline: form.deadline,
      context: form.context,
      source_type: form.sourceType as any || null,
      source_description: form.sourceDescription,
      setter_name: form.setterName,
      receiver_name: form.receiverName,
      receiver_email: form.receiverEmail,
      setter_assumptions: form.assumptions,
      setter_constraints: form.constraints,
      setter_dependencies: form.dependencies,
      setter_q1: form.setterQ1,
      setter_q2: form.setterQ2,
      setter_completed_at: new Date().toISOString(),
      status: 'pending_receiver'
    })

    if (checkpoint) {
      for (const file of files) {
        await uploadFile(id, file)
      }
      setCheckpointId(id)
      setStep('complete')
    }
    
    setIsSubmitting(false)
  }

  // Step 1: Define the Goal
  if (step === 'goal') {
    return (
      <div className="animate-fade-in">
        {/* Progress */}
        <div className="flex justify-center gap-4 mb-12">
          <div className="text-center">
            <p className="font-serif text-2xl text-stone-900">01</p>
            <p className="text-[10px] uppercase tracking-wider text-stone-900">Goal</p>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-px bg-stone-300"></div>
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl text-stone-300">02</p>
            <p className="text-[10px] uppercase tracking-wider text-stone-300">Assumptions</p>
          </div>
        </div>

        <h1 className="font-serif text-3xl font-light text-stone-900 mb-2 text-center">
          Define the Goal
        </h1>
        <p className="text-stone-500 text-sm mb-10 text-center">
          What are you asking them to achieve?
        </p>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400"
                placeholder="Sarah Chen"
                value={form.setterName}
                onChange={(e) => setForm({...form, setterName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Their Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400"
                placeholder="Alex Kim"
                value={form.receiverName}
                onChange={(e) => setForm({...form, receiverName: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Their Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400"
              placeholder="alex@company.com"
              value={form.receiverEmail}
              onChange={(e) => setForm({...form, receiverEmail: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Goal Description</label>
            <textarea
              className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400 resize-none"
              rows={3}
              placeholder="What specifically are you asking them to achieve?"
              value={form.goalDescription}
              onChange={(e) => setForm({...form, goalDescription: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Target</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400"
                placeholder="$500K"
                value={form.targetValue}
                onChange={(e) => setForm({...form, targetValue: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Deadline</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400"
                placeholder="March 31"
                value={form.deadline}
                onChange={(e) => setForm({...form, deadline: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">Context</label>
            <textarea
              className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400 resize-none"
              rows={2}
              placeholder="Why is this target important?"
              value={form.context}
              onChange={(e) => setForm({...form, context: e.target.value})}
            />
          </div>
        </div>

        {/* Source */}
        <div className="mt-10 pt-10 border-t border-stone-200">
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-4">Target Source</p>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { id: 'bi_report', label: 'BI Report' },
              { id: 'leadership_email', label: 'Leadership' },
              { id: 'planning_doc', label: 'Planning Doc' },
              { id: 'verbal', label: 'Verbal' },
            ].map(source => (
              <button
                key={source.id}
                type="button"
                onClick={() => setForm({...form, sourceType: source.id})}
                className={`py-3 text-sm font-medium transition-colors ${
                  form.sourceType === source.id 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {source.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400 mb-4"
            placeholder="Brief description (optional)"
            value={form.sourceDescription}
            onChange={(e) => setForm({...form, sourceDescription: e.target.value})}
          />

          <div 
            className="border-2 border-dashed border-stone-300 p-8 text-center cursor-pointer hover:border-stone-400 hover:bg-stone-100 transition-colors"
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              accept=".pdf,.xlsx,.xls,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.csv"
              onChange={handleFileChange}
            />
            <p className="text-stone-500 text-sm">
              Attach source documents
            </p>
            <p className="text-stone-400 text-xs mt-1">
              PDF, Excel, Word, PowerPoint
            </p>
          </div>
          
          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between py-3 px-4 bg-stone-100">
                  <span className="text-sm text-stone-700 truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="text-stone-400 hover:text-stone-900 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <button
            onClick={() => router.push('/')}
            className="text-stone-500 text-sm hover:text-stone-900 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => setStep('assumptions')}
            disabled={!form.goalDescription || !form.setterName || !form.receiverName}
            className="px-8 py-3 bg-stone-900 text-white font-medium tracking-wide hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            CONTINUE
          </button>
        </div>
      </div>
    )
  }

  // Step 2: Assumptions
  if (step === 'assumptions') {
    return (
      <div className="animate-fade-in">
        {/* Progress */}
        <div className="flex justify-center gap-4 mb-12">
          <div className="text-center">
            <p className="font-serif text-2xl text-stone-400">01</p>
            <p className="text-[10px] uppercase tracking-wider text-stone-400">Goal</p>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-px bg-stone-900"></div>
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl text-stone-900">02</p>
            <p className="text-[10px] uppercase tracking-wider text-stone-900">Assumptions</p>
          </div>
        </div>

        {/* Goal Summary */}
        <div className="bg-stone-100 p-6 mb-10">
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-2">The Goal</p>
          <p className="font-serif text-lg text-stone-900">{form.goalDescription}</p>
          <p className="text-sm text-stone-500 mt-1">{form.targetValue} by {form.deadline}</p>
        </div>

        <h1 className="font-serif text-3xl font-light text-stone-900 mb-2 text-center">
          Your Assumptions
        </h1>
        <p className="text-stone-500 text-sm mb-10 text-center">
          Help {form.receiverName} understand what&apos;s behind the number.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">
              Assumptions this target is based on
            </label>
            <textarea
              className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400 resize-none"
              rows={2}
              placeholder="e.g., Product launches on time, budget stays flat..."
              value={form.assumptions}
              onChange={(e) => setForm({...form, assumptions: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">
              Constraints {form.receiverName} should know about
            </label>
            <textarea
              className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400 resize-none"
              rows={2}
              placeholder="e.g., Budget is fixed, no new headcount..."
              value={form.constraints}
              onChange={(e) => setForm({...form, constraints: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-stone-500 mb-2">
              Dependencies
            </label>
            <textarea
              className="w-full px-4 py-3 border border-stone-300 bg-white text-stone-900 placeholder-stone-400 resize-none"
              rows={2}
              placeholder="e.g., IT delivering the new CRM by March..."
              value={form.dependencies}
              onChange={(e) => setForm({...form, dependencies: e.target.value})}
            />
          </div>
        </div>

        {/* Commitment Questions */}
        <div className="mt-10 pt-10 border-t border-stone-200 space-y-4">
          <div className={`p-6 border-2 transition-colors ${
            form.setterQ1 === null ? 'border-stone-200' : (form.setterQ1 ? 'border-stone-900 bg-stone-50' : 'border-amber-500 bg-amber-50')
          }`}>
            <p className="text-stone-900 mb-4">
              Have you explained the context — not just the number?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm({...form, setterQ1: true})}
                className={`flex-1 py-3 font-medium text-sm transition-colors ${
                  form.setterQ1 === true 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => setForm({...form, setterQ1: false})}
                className={`flex-1 py-3 font-medium text-sm transition-colors ${
                  form.setterQ1 === false 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                NOT YET
              </button>
            </div>
          </div>

          <div className={`p-6 border-2 transition-colors ${
            form.setterQ2 === null ? 'border-stone-200' : (form.setterQ2 ? 'border-stone-900 bg-stone-50' : 'border-amber-500 bg-amber-50')
          }`}>
            <p className="text-stone-900 mb-4">
              Will you invite {form.receiverName} to flag concerns before finalizing?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setForm({...form, setterQ2: true})}
                className={`flex-1 py-3 font-medium text-sm transition-colors ${
                  form.setterQ2 === true 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                YES
              </button>
              <button
                type="button"
                onClick={() => setForm({...form, setterQ2: false})}
                className={`flex-1 py-3 font-medium text-sm transition-colors ${
                  form.setterQ2 === false 
                    ? 'bg-amber-500 text-white' 
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                NO
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <button
            onClick={() => setStep('goal')}
            className="text-stone-500 text-sm hover:text-stone-900 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={form.setterQ1 !== true || form.setterQ2 !== true || isSubmitting}
            className="px-8 py-3 bg-stone-900 text-white font-medium tracking-wide hover:bg-stone-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'CREATING...' : `SEND TO ${form.receiverName.toUpperCase()}`}
          </button>
        </div>
      </div>
    )
  }

  // Step 3: Complete
  return (
    <div className="animate-fade-in text-center">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-6">
          Ready to Send
        </p>
        <h1 className="font-serif text-3xl font-light text-stone-900 mb-4">
          Share with {form.receiverName}
        </h1>
        <p className="text-stone-500 text-sm">
          They can review before your conversation.
        </p>
      </div>

      {/* Share Link */}
      <div className="bg-stone-100 p-6 mb-6 text-left">
        <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-3">Share Link</p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={`${typeof window !== 'undefined' ? window.location.origin : ''}/c/${checkpointId}`}
            className="flex-1 px-4 py-3 border border-stone-300 bg-white text-stone-700 text-sm"
          />
          <button
            onClick={copyLink}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              copied 
                ? 'bg-stone-900 text-white' 
                : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
            }`}
          >
            {copied ? 'COPIED' : 'COPY'}
          </button>
        </div>
        
        <a
          href={`mailto:${form.receiverEmail}?subject=${encodeURIComponent(`Please review: ${form.goalDescription}`)}&body=${encodeURIComponent(`Hi ${form.receiverName},

I'd like to discuss a goal with you. Before we meet, please take a few minutes to review the details and note any questions or concerns:

${typeof window !== 'undefined' ? window.location.origin : ''}/c/${checkpointId}

Goal: ${form.goalDescription}
Target: ${form.targetValue} by ${form.deadline}

Thanks,
${form.setterName}`)}`}
          className="block w-full mt-4 py-3 border-2 border-stone-900 text-stone-900 font-medium text-sm text-center hover:bg-stone-900 hover:text-white transition-colors"
        >
          SEND VIA EMAIL
        </a>
      </div>

      {/* Preview */}
      <div className="bg-stone-100 p-6 mb-10 text-left">
        <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-3">
          What {form.receiverName} Will See
        </p>
        <ul className="space-y-2 text-sm text-stone-700">
          <li>• The goal: {form.goalDescription}</li>
          <li>• Target: {form.targetValue} by {form.deadline}</li>
          <li>• Your assumptions and constraints</li>
          <li>• Space to note questions</li>
        </ul>
      </div>

      {/* Live Session */}
      <button
        onClick={() => router.push(`/c/${checkpointId}/session`)}
        className="w-full py-4 bg-stone-900 text-white font-medium tracking-wide hover:bg-stone-800 transition-colors mb-3"
      >
        START LIVE SESSION
      </button>
      <p className="text-xs text-stone-400 mb-10">
        Use when {form.receiverName} is ready to complete the checkpoint together
      </p>

      <button
        onClick={() => router.push('/')}
        className="text-stone-500 text-sm hover:text-stone-900 transition-colors"
      >
        Create another checkpoint
      </button>
    </div>
  )
}
