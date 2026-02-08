# Acceptance Checkpoint

**Ensure goals are genuinely accepted — not just assigned.**

A practical tool based on Salancik's Commitment Theory (1977) that helps goal setters and receivers create genuine commitment before accountability begins.

## The Problem

Performance targets are routinely assigned without genuine acceptance. Goals move from "proposed" to "committed" without the binding moment ever occurring.

## The Solution

A structured checkpoint that both parties complete together:

1. **Goal Setter** documents the target, assumptions, and constraints
2. **Receiver** reviews before the conversation
3. **Both** complete the acceptance checkpoint together
4. **Result:** Documented acceptance — or documented gaps

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd acceptance-checkpoint
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema in `supabase/schema.sql`
3. Create a storage bucket called `checkpoint-files` (Settings → Storage)
4. Copy your project URL and anon key from Settings → API

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel project settings
4. Deploy

## The Framework

Based on Salancik's Commitment Theory, genuine acceptance requires:

| Condition | Question |
|-----------|----------|
| **Understood** | Do I understand what I'm being asked — and the assumptions behind it? |
| **Realistic** | Is this achievable given what I control vs. what I don't? |
| **Committed** | Am I genuinely committing — or just receiving? |

If any answer is "no," the goal has not been accepted — only assigned.

## Tech Stack

- **Frontend:** Next.js 14, React, Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Storage)
- **Hosting:** Vercel

## License

MIT
