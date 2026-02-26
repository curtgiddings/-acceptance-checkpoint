'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type DemoStep = 'intro' | 'setter-goal' | 'setter-assumptions' | 'setter-confidence' | 'setter-done' | 'receiver-review' | 'receiver-confidence' | 'session' | 'results'

const demoData = {
  setterName: 'Sarah Chen',
  receiverName: 'Alex Kim',
  goal: 'Increase Western Canada lens attachment rate from 42% to 55%',
  target: '55% attachment rate',
  deadline: 'June 30, 2026',
  context: 'Corporate is rolling out a new premium lens portfolio in Q2. Western Canada is being used as the pilot region before national rollout. Success here determines whether the program scales.',
  source: 'Leadership Email',
  assumptions: 'New lens portfolio launches on schedule in April. Marketing materials and training modules are ready by March 15. Current optical staff retention holds steady.',
  constraints: 'No additional headcount. Training budget is fixed at current levels. Cannot discount lenses below MAP pricing.',
  dependencies: 'Marketing team delivering updated POS displays by April 1. IT completing the new lens configurator tool integration. Supply chain confirming adequate inventory levels.',
  setterConfidence: 'high',
  receiverConfidence: 'medium',
  questions: 'What happens if the lens portfolio launch is delayed? Do I have flexibility to run local promotions? Is the 55% target based on units or revenue?',
  concerns: 'The timeline feels aggressive given we need to retrain 30+ retail partners. Previous product launches have typically taken 6-8 weeks to gain traction, not 12.',
}

export default function Demo() {
  const router = useRouter()
  const [step, setStep] = useState<DemoStep>('intro')

  const tipStyle = "bg-amber-50 border-2 border-amber-400 p-4 mb-6 text-sm text-amber-800"

  if (step === 'intro') {
    return (
      <div className="animate-fade-in text-center">
        <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-6">Interactive Demo</p>
        <h1 className="font-serif text-3xl font-light text-stone-900 mb-4">See How It Works</h1>
        <p className="text-stone-500 text-sm mb-4 max-w-[300px] mx-auto leading-relaxed">Walk through a real scenario where a regional director sets a sales target for a territory manager.</p>
        <div className="bg-stone-100 p-6 mb-8 text-left">
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-3">The Scenario</p>
          <div className="space-y-3 text-sm text-stone-700">
            <p><span className="font-medium text-stone-900">Setter:</span> {demoData.setterName} (Regional Director)</p>
            <p><span className="font-medium text-stone-900">Receiver:</span> {demoData.receiverName} (Territory Manager)</p>
            <p><span className="font-medium text-stone-900">Goal:</span> {demoData.goal}</p>
            <p><span className="font-medium text-stone-900">Target:</span> {demoData.target} by {demoData.deadline}</p>
          </div>
        </div>
        <button onClick={() => setStep('setter-goal')} className="w-full py-4 bg-stone-900 text-white font-medium tracking-wide hover:bg-stone-800 transition-colors">START THE DEMO</button>
        <button onClick={() => router.push('/')} className="block mx-auto mt-4 text-stone-500 text-sm hover:text-stone-900 transition-colors">&larr; Back to home</button>
      </div>
    )
  }

  if (step === 'setter-goal') {
    return (
      <div className="animate-fade-in">
        <div className={tipStyle}>
          <p className="font-medium mb-1">Step 1: Goal Setter Documents the Goal</p>
          <p>Sarah (the director) fills in what she is asking Alex to achieve, including the target, deadline, and context behind the number.</p>
        </div>
        <div className="flex justify-center gap-4 mb-8">
          <div className="text-center">
            <p className="font-serif text-2xl text-stone-900">01</p>
            <p className="text-[10px] uppercase tracking-wider text-stone-900">Goal</p>
          </div>
          <div className="flex items-center"><div className="w-12 h-px bg-stone-300"></div></div>
          <div className="text-center">
            <p className="font-serif text-2xl text-stone-300">02</p>
            <p className="text-[10px] uppercase tracking-wider text-stone-300">Assumptions</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Setter</p>
              <div className="px-4 py-3 bg-stone-100 text-stone-900 text-sm">{demoData.setterName}</div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Receiver</p>
              <div className="px-4 py-3 bg-stone-100 text-stone-900 text-sm">{demoData.receiverName}</div>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Goal Description</p>
            <div className="px-4 py-3 bg-stone-100 text-stone-900 text-sm">{demoData.goal}</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Target</p>
              <div className="px-4 py-3 bg-stone-100 text-stone-900 text-sm">{demoData.target}</div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Deadline</p>
              <div className="px-4 py-3 bg-stone-100 text-stone-900 text-sm">{demoData.deadline}</div>
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Context</p>
            <div className="px-4 py-3 bg-stone-100 text-stone-900 text-sm">{demoData.context}</div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Source</p>
            <div className="px-4 py-3 bg-stone-900 text-white text-sm text-center">{demoData.source}</div>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <button onClick={() => setStep('intro')} className="text-stone-500 text-sm">&larr; Back</button>
          <button onClick={() => setStep('setter-assumptions')} className="px-8 py-3 bg-stone-900 text-white font-medium tracking-wide">NEXT</button>
        </div>
      </div>
    )
  }

  if (step === 'setter-assumptions') {
    return (
      <div className="animate-fade-in">
        <div className={tipStyle}>
          <p className="font-medium mb-1">Step 2: Setter Shares Assumptions</p>
          <p>Sarah documents the assumptions, constraints, and dependencies behind the target. This transparency is what makes The Missing A different from traditional goal-setting.</p>
        </div>
        <div className="flex justify-center gap-4 mb-8">
          <div className="text-center">
            <p className="font-serif text-2xl text-stone-400">01</p>
            <p className="text-[10px] uppercase tracking-wider text-stone-400">Goal</p>
          </div>
          <div className="flex items-center"><div className="w-12 h-px bg-stone-900"></div></div>
          <div className="text-center">
            <p className="font-serif text-2xl text-stone-900">02</p>
            <p className="text-[10px] uppercase tracking-wider text-stone-900">Assumptions</p>
          </div>
        </div>
        <div className="bg-stone-100 p-4 mb-6">
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">The Goal</p>
          <p className="font-serif text-stone-900">{demoData.goal}</p>
          <p className="text-sm text-stone-500">{demoData.target} by {demoData.deadline}</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Assumptions</p>
            <div className="px-4 py-3 bg-stone-100 text-stone-900 text-sm">{demoData.assumptions}</div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Constraints</p>
            <div className="px-4 py-3 bg-stone-100 text-stone-900 text-sm">{demoData.constraints}</div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Dependencies</p>
            <div className="px-4 py-3 bg-stone-100 text-stone-900 text-sm">{demoData.dependencies}</div>
          </div>
        </div>
        <div className="mt-8 space-y-3">
          <div className="p-4 border-2 border-stone-900 bg-stone-50">
            <p className="text-stone-900 text-sm mb-2">Have you explained the context — not just the number?</p>
            <div className="bg-stone-900 text-white text-sm text-center py-2 font-medium">YES</div>
          </div>
          <div className="p-4 border-2 border-stone-900 bg-stone-50">
            <p className="text-stone-900 text-sm mb-2">Will you invite Alex to flag concerns before finalizing?</p>
            <div className="bg-stone-900 text-white text-sm text-center py-2 font-medium">YES</div>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <button onClick={() => setStep('setter-goal')} className="text-stone-500 text-sm">&larr; Back</button>
          <button onClick={() => setStep('setter-confidence')} className="px-8 py-3 bg-stone-900 text-white font-medium tracking-wide">NEXT</button>
        </div>
      </div>
    )
  }

  if (step === 'setter-confidence') {
    return (
      <div className="animate-fade-in">
        <div className={tipStyle}>
          <p className="font-medium mb-1">Step 3: Setter Rates Confidence</p>
          <p>Sarah rates her confidence in Alex hitting this goal. This gets compared with Alex&apos;s rating later to surface any perception gaps.</p>
        </div>
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-4">Likelihood of Hitting This Goal</p>
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            <div className="py-3 text-sm font-medium bg-stone-100 text-stone-600">Low</div>
            <div className="py-3 text-sm font-medium bg-stone-100 text-stone-600">Medium</div>
            <div className="py-3 text-sm font-medium bg-stone-900 text-white">High</div>
          </div>
          <p className="text-xs text-stone-400 mt-3">Sarah selected <span className="font-medium text-stone-700">High</span></p>
        </div>
        <div className="bg-stone-100 p-6 text-center">
          <p className="text-sm text-stone-700">Sarah now sends the checkpoint link to Alex for review before their meeting.</p>
        </div>
        <div className="flex justify-between mt-10">
          <button onClick={() => setStep('setter-assumptions')} className="text-stone-500 text-sm">&larr; Back</button>
          <button onClick={() => setStep('receiver-review')} className="px-8 py-3 bg-stone-900 text-white font-medium tracking-wide">SEE RECEIVER VIEW</button>
        </div>
      </div>
    )
  }

  if (step === 'receiver-review') {
    return (
      <div className="animate-fade-in">
        <div className={tipStyle}>
          <p className="font-medium mb-1">Step 4: Receiver Reviews Before Meeting</p>
          <p>Alex opens the link and sees everything Sarah documented. He can prepare questions and concerns before their conversation. No surprises.</p>
        </div>
        <div className="text-center mb-6">
          <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-4">Review Before Meeting</p>
          <h2 className="font-serif text-2xl font-light text-stone-900">{demoData.setterName} shared a goal with you</h2>
        </div>
        <div className="bg-stone-100 p-4 mb-4">
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">The Goal</p>
          <p className="font-serif text-stone-900">{demoData.goal}</p>
          <p className="text-sm text-stone-500">{demoData.target} by {demoData.deadline}</p>
          <div className="mt-4 pt-4 border-t border-stone-200">
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Context</p>
            <p className="text-sm text-stone-700">{demoData.context}</p>
          </div>
        </div>
        <div className="border-2 border-stone-200 p-4 mb-6">
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-3">From {demoData.setterName}</p>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Assumptions</p>
              <p className="text-stone-800">{demoData.assumptions}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Constraints</p>
              <p className="text-stone-800">{demoData.constraints}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Dependencies</p>
              <p className="text-stone-800">{demoData.dependencies}</p>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Alex&apos;s Questions</p>
            <div className="px-4 py-3 bg-stone-100 text-stone-900 text-sm">{demoData.questions}</div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">Alex&apos;s Concerns</p>
            <div className="px-4 py-3 bg-stone-100 text-stone-900 text-sm">{demoData.concerns}</div>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <button onClick={() => setStep('setter-confidence')} className="text-stone-500 text-sm">&larr; Back</button>
          <button onClick={() => setStep('receiver-confidence')} className="px-8 py-3 bg-stone-900 text-white font-medium tracking-wide">NEXT</button>
        </div>
      </div>
    )
  }

  if (step === 'receiver-confidence') {
    return (
      <div className="animate-fade-in">
        <div className={tipStyle}>
          <p className="font-medium mb-1">Step 5: Receiver Rates Confidence</p>
          <p>Alex rates his own confidence. He selects <span className="font-medium">Medium</span> — different from Sarah&apos;s <span className="font-medium">High</span>. This gap will be surfaced on the results page.</p>
        </div>
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-4">Likelihood of Hitting This Goal</p>
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            <div className="py-3 text-sm font-medium bg-stone-100 text-stone-600">Low</div>
            <div className="py-3 text-sm font-medium bg-stone-900 text-white">Medium</div>
            <div className="py-3 text-sm font-medium bg-stone-100 text-stone-600">High</div>
          </div>
          <p className="text-xs text-stone-400 mt-3">Alex selected <span className="font-medium text-stone-700">Medium</span></p>
        </div>
        <div className="bg-stone-100 p-6 text-center">
          <p className="text-sm text-stone-700">Alex is now ready for the live checkpoint conversation with Sarah.</p>
        </div>
        <div className="flex justify-between mt-10">
          <button onClick={() => setStep('receiver-review')} className="text-stone-500 text-sm">&larr; Back</button>
          <button onClick={() => setStep('session')} className="px-8 py-3 bg-stone-900 text-white font-medium tracking-wide">SEE LIVE SESSION</button>
        </div>
      </div>
    )
  }

  if (step === 'session') {
    return (
      <div className="animate-fade-in">
        <div className={tipStyle}>
          <p className="font-medium mb-1">Step 6: The Live Checkpoint</p>
          <p>Sarah and Alex sit down together. They go through three questions based on Salancik&apos;s Commitment Theory. Both must agree before the goal is accepted.</p>
        </div>
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-4">Live Checkpoint</p>
          <h2 className="font-serif text-2xl font-light text-stone-900">Together with {demoData.receiverName}</h2>
        </div>
        <div className="space-y-3 mb-6">
          <div className="p-4 border-2 border-stone-900 bg-stone-50">
            <p className="text-stone-900 text-sm mb-2">Does {demoData.receiverName} fully understand the goal and the reasoning behind it?</p>
            <div className="bg-stone-900 text-white text-sm text-center py-2 font-medium">YES</div>
          </div>
          <div className="p-4 border-2 border-stone-900 bg-stone-50">
            <p className="text-stone-900 text-sm mb-2">Does {demoData.receiverName} believe this goal is achievable given current resources?</p>
            <div className="bg-stone-900 text-white text-sm text-center py-2 font-medium">YES</div>
          </div>
          <div className="p-4 border-2 border-stone-900 bg-stone-50">
            <p className="text-stone-900 text-sm mb-2">Is {demoData.receiverName} genuinely committing to this goal?</p>
            <div className="bg-stone-900 text-white text-sm text-center py-2 font-medium">YES</div>
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <button onClick={() => setStep('receiver-confidence')} className="text-stone-500 text-sm">&larr; Back</button>
          <button onClick={() => setStep('results')} className="px-8 py-3 bg-stone-900 text-white font-medium tracking-wide">SEE RESULTS</button>
        </div>
      </div>
    )
  }

  if (step === 'results') {
    return (
      <div className="animate-fade-in">
        <div className={tipStyle}>
          <p className="font-medium mb-1">Step 7: The Results</p>
          <p>The checkpoint is complete. Notice the <span className="font-medium">confidence gap</span> between Sarah (High) and Alex (Medium). This gap is exactly the kind of misalignment that traditional SMART goals miss — and exactly what The Missing A surfaces.</p>
        </div>
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-4">Checkpoint Complete</p>
          <h2 className="font-serif text-3xl font-light text-stone-900 mb-2">Goal Accepted</h2>
          <p className="text-stone-500 text-sm">This commitment is now documented.</p>
        </div>
        <div className="flex justify-center gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center font-serif text-lg bg-stone-900 text-white">&#10003;</div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500">Understood</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center font-serif text-lg bg-stone-900 text-white">&#10003;</div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500">Realistic</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center font-serif text-lg bg-stone-900 text-white">&#10003;</div>
            <p className="text-[10px] uppercase tracking-wider text-stone-500">Committed</p>
          </div>
        </div>
        <div className="p-6 mb-8 border-2 border-amber-500 bg-amber-50">
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-4 text-center">Likelihood of Hitting This Goal</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-2">{demoData.setterName}</p>
              <p className="font-serif text-2xl text-amber-700">High</p>
              <p className="text-[10px] uppercase tracking-wider text-stone-400 mt-1">Setter</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-2">{demoData.receiverName}</p>
              <p className="font-serif text-2xl text-amber-700">Medium</p>
              <p className="text-[10px] uppercase tracking-wider text-stone-400 mt-1">Receiver</p>
            </div>
          </div>
          <p className="text-xs text-amber-700 text-center mt-4 pt-4 border-t border-amber-200">Confidence gap detected — this is a key conversation point.</p>
        </div>
        <div className="bg-stone-100 p-6 mb-8">
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mb-3">Acceptance Record</p>
          <div className="mb-4 pb-4 border-b border-stone-200">
            <p className="font-serif text-stone-900">{demoData.goal}</p>
            <p className="text-sm text-stone-500">{demoData.target} by {demoData.deadline}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Set by</p>
              <p className="text-stone-800">{demoData.setterName}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Accepted by</p>
              <p className="text-stone-800">{demoData.receiverName}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Date</p>
              <p className="text-stone-800">February 26, 2026</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-stone-400 mb-1">Status</p>
              <p className="text-stone-900 font-medium">Accepted</p>
            </div>
          </div>
        </div>
        <button onClick={() => router.push('/')} className="w-full py-4 bg-stone-900 text-white font-medium tracking-wide hover:bg-stone-800 transition-colors">BACK TO HOME</button>
        <button onClick={() => setStep('intro')} className="block mx-auto mt-4 text-stone-500 text-sm hover:text-stone-900 transition-colors">Restart demo</button>
      </div>
    )
  }

  return null
}
