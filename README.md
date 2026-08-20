# Multimedia Manager

Full-stack multimedia file manager built to the assessment brief.

## Structure
- `frontend/` React + Vite client with responsive dashboard
- `backend/` Express API with JWT HTTP-only cookies, validation, upload handling, Cloudinary and MongoDB hooks

## Run
1. Copy `.env.example` to `.env` and configure MongoDB Atlas, Cloudinary, and JWT variables.
2. `pnpm backend:dev` starts the API on port 4000.
3. `pnpm frontend:dev` starts the client on port 5173.

The API exposes `/health`, `/api/auth/*`, and `/api/files`. The upload endpoint accepts image, video, PDF, and DOC files up to 100 MB. Production deployment should provide the environment variables through the hosting platform rather than committing secrets.
