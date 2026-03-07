# MovieMart (Next.js 14 + TMDB + OpenRouter Chatbot)

A movie discovery + request storefront with an AI bargaining chatbot.

## 1) Setup
1. Install Node.js (18+ recommended)
2. In this folder:
   ```bash
   npm install
   ```
3. Create `.env.local` from `.env.example` and fill:
   - `TMDB_API_KEY` (TMDB v3 API Key)
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL` (optional)
   - `INSTAGRAM_HANDLE` (and optionally `NEXT_PUBLIC_INSTAGRAM_HANDLE`)

## 2) Run
```bash
npm run dev
```
Open http://localhost:3000

## 3) Deploy (Vercel)
- Push to GitHub
- Import project in Vercel
- Add the same environment variables in Vercel settings
- Deploy


## Adsterra ads (optional)

This project has demo ad slots in `components/AdShowcase.tsx`.
To enable Adsterra ads, add your keys to `.env.local` (or copy `.env.example` to `.env.local`).

- `NEXT_PUBLIC_ADSTERRA_DISPLAY_1` (728x90)
- `NEXT_PUBLIC_ADSTERRA_DISPLAY_2` (300x250)
- `NEXT_PUBLIC_ADSTERRA_VIDEO_1`
- `NEXT_PUBLIC_ADSTERRA_VIDEO_2`

Then restart `npm run dev`.
