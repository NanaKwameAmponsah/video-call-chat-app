# video-call-chat-app

- Architected & built a full-stack real-time chat & video-call platform using Node.js, Express, and MongoDB on the backend, and React with TanStack Query and Tailwind CSS on the frontend.  
- Implemented secure user authentication (JWT-backed auth, protected routes, and cookie-based session management), onboarding flows, friend-request and notification systems, and customizable UI via dynamic theming with a Zustand store.  
- Integrated Stream Chat & Video SDKs for real-time messaging (typing indicators & reactions) and one-click WebRTC-powered 1-on-1 & group video calls with screen sharing, session recording, and call-link invites.  
- Deployed the monorepo on Render using CI/CD scripts.  
- Managed global state with Zustand; handled client-server syncing and cache invalidation via TanStack Query.  
- Unified frontend and backend error boundaries, inline form validation, and toast notifications.  
- **Intellectual Exchange**: Users tag their belief systems (e.g. atheism) and “curiosities” (e.g. theism), then discover and connect with peers holding complementary viewpoints for constructive academic dialogue.

## .env Setup

### Backend (`/backend`)

Create a file named `.env` in your backend folder with:
```dotenv
PORT=5001
MONGO_URI=your_mongo_uri
STEAM_API_KEY=your_steam_api_key
STEAM_API_SECRET=your_steam_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
