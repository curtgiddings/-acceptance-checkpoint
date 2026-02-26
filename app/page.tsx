import Link from 'next/link'
export default function Home() {
  return (
    <div className="animate-fade-in">
      <div className="text-center mb-16">
        <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-6">
          Goal Setting Framework
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-900 mb-6 leading-[1.1]">
          Acceptance<br />Checkpoint
        </h1>
        <p className="text-stone-500 max-w-[260px] mx-auto leading-relaxed">
          Ensure goals are genuinely accepted — not just assigned.
        </p>
      </div>
      <div className="space-y-3 mb-20">
        <Link
          href="/new"
          className="block w-full py-4 bg-stone-900 text-white text-center font-medium tracking-wide hover:bg-stone-800 transition-colors"
        >
          I&apos;M SETTING A GOAL
        </Link>
        <Link
          href="/review"
          className="block w-full py-4 border-2 border-stone-900 text-stone-900 text-center font-medium tracking-wide hover:bg-stone-900 hover:text-white transition-colors"
        >
          I RECEIVED A GOAL
        </Link>
        <Link
          href="/demo"
          className="block w-full py-4 border-2 border-amber-500 text-amber-700 text-center font-medium tracking-wide hover:bg-amber-500 hover:text-white transition-colors"
        >
          SEE A DEMO
        </Link>
      </div>
      <div className="border-t border-stone-200 pt-12 mb-12">
        <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-8 text-center">
          How It Works
        </p>
        <div className="flex justify-between text-center max-w-xs mx-auto">
          <div>
            <p className="font-serif text-3xl text-stone-900 mb-2">01</p>
            <p className="text-xs text-stone-500 uppercase tracking-wider">Document</p>
          </div>
          <div>
            <p className="font-serif text-3xl text-stone-900 mb-2">02</p>
            <p className="text-xs text-stone-500 uppercase tracking-wider">Review</p>
          </div>
          <div>
            <p className="font-serif text-3xl text-stone-900 mb-2">03</p>
            <p className="text-xs text-stone-500 uppercase tracking-wider">Accept</p>
          </div>
        </div>
      </div>
      <div className="border-t border-stone-200 pt-12">
        <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400 mb-6 text-center">
          The Framework
        </p>
        <p className="text-center text-stone-600 text-sm leading-relaxed">
          For a goal to be genuinely accepted, it must be<br />
          <span className="font-serif italic">Observable</span> · <span className="font-serif italic">Irrevocable</span> · <span className="font-serif italic">Voluntary</span>
        </p>
      </div>
      <div className="mt-16 pt-8 border-t border-stone-200 text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400">
          Based on Salancik&apos;s Commitment Theory (1977)
        </p>
      </div>
    </div>
  )
}
