
#  MindSwap - Intellectual Exchange Platform
A full-stack real-time chat and video calling platform designed to foster intellectual discourse between individuals with diverse philosophical perspectives. MindSwap connects users based on contrasting belief systems to encourage constructive academic dialogue and broaden worldviews.

##  Features

###  Authentication & Security
- **JWT-based Authentication** with secure cookie management
- **Protected Routes** ensuring authenticated access
- **User Registration & Login** with comprehensive validation
- **Session Management** with automatic token refresh

###  User Management
- **Interactive Onboarding** with philosophical preference selection
- **Profile Customization** with real-time editing capabilities
- **Random Avatar Generation** with 100+ unique options
- **Belief System Tagging** for intellectual matching

###  Real-Time Communication
- **Instant Messaging** powered by Stream Chat SDK
- **Typing Indicators** and message reactions
- **Message History** with persistent chat storage
- **1-on-1 & Group Conversations** 

###  Video Calling
- **WebRTC-Powered Video Calls** with HD quality
- **Screen Sharing** for presentations and collaborative discussions
- **Call Recording** for important conversations
- **One-Click Call Invites** via shareable links
- **Call Controls** with mute, camera toggle, and screen share

###  Social Features
- **Friend Request System** with pending/accepted states
- **Notification Center** for all social interactions
- **Recommended Users** based on complementary philosophies
- **Intellectual Matching** connecting opposing viewpoints

###  User Experience
- **32 Theme Options** with real-time switching
- **Responsive Design** optimized for all devices
- **Dark/Light Mode** support across all themes
- **Accessibility Features** with keyboard navigation
- **Toast Notifications** for real-time feedback

###  Philosophy Matching System
Users can select from **competing philosophical perspectives**:
- **Free Will vs Determinism** (Hard Determinism, Libertarian Free Will, Compatibilism)
- **Epistemology** (Rationalism vs Empiricism, Foundationalism vs Coherentism)
- **Ethics** (Virtue Ethics vs Deontology vs Utilitarianism)
- **Political Philosophy** (Liberalism vs Conservatism vs Libertarianism)
- **Mind-Body Problem** (Dualism vs Materialism vs Idealism)
- **Economic Systems** (Capitalism vs Socialism, Austrian vs Keynesian Economics)
- **Reality & Existence** (Realism vs Anti-Realism, Existentialism vs Essentialism)

##  Techn Stack

### Frontend Stack
- **React 19.1.0** with modern hooks and context
- **Vite** for lightning-fast development and builds
- **TailwindCSS + DaisyUI** for responsive styling
- **TanStack Query** for server state management
- **Zustand** for global client state
- **Stream Chat React SDK** for messaging components
- **Stream Video React SDK** for video calling
- **React Router Dom** for client-side routing
- **Lucide React** for consistent iconography

### Backend Stack
- **Node.js + Express** for RESTful API development
- **MongoDB + Mongoose** for data persistence
- **JWT** for stateless authentication
- **bcryptjs** for secure password hashing
- **Stream Chat & Video APIs** for real-time features
- **CORS** for cross-origin resource sharing
- **Cookie Parser** for session management

### Project Structure
```
mindswap/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Authentication & validation
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── lib/             # Utilities & database config
│   │   └── server.js        # Express app entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # API calls & utilities
│   │   ├── store/           # Zustand state management
│   │   ├── constants/       # App constants & themes
│   │   └── main.jsx         # React app entry point
│   ├── public/              # Static assets
│   └── package.json
└── package.json             # Root package.json
```

##  Quick Start

### Prerequisites
- **Node.js** 18.0 or higher
- **MongoDB** 4.4 or higher
- **npm** or **yarn** package manager
- **Stream Chat & Video** API keys

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NanaKwameAmponsah/video-call-chat-app.git
   cd video-call-chat-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend && npm install
   
   # Install frontend dependencies
   cd frontend && npm install
   ```

3. **Environment Setup**

   **Backend** (`/backend/.env`):
   ```env
   PORT=5001
   MONGO_URI=your_mongo_uri
   STEAM_API_KEY=your_stream_api_key
   STEAM_API_SECRET=your_stream_api_secret
   JWT_SECRET_KEY=your_jwt_secret_key
   NODE_ENV=development
   ```

   **Frontend** (`/frontend/.env`):
   ```env
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1 - Start backend
   cd backend
   npm run dev
   
   # Terminal 2 - Start frontend
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

##  Configuration

### Stream API Setup
1. Create a [Stream account](https://getstream.io/)
2. Create a new Chat + Video application
3. Copy your API Key and Secret
4. Add them to your environment variables

### MongoDB Setup
- **Local**: Install MongoDB locally and use default connection string
- **Cloud**: Use MongoDB Atlas and replace connection string in `.env`

### JWT Configuration
You can use any secure string for your JWT secret. In this project, we use a Base64-encoded secret:
```env
JWT_SECRET_KEY=YOUR_JWT_SECRET_KEY
```

Or generate your own using any method you prefer (Base64, hex, or plain text).

##  API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/onboarding` - Complete user onboarding
- `PUT /api/auth/profile` - Update user profile

### User Management
- `GET /api/users` - Get recommended users
- `GET /api/users/friends` - Get user's friends
- `POST /api/users/friend-request/:id` - Send friend request
- `PUT /api/users/friend-request/:id/accept` - Accept friend request
- `GET /api/users/friend-requests` - Get pending friend requests
- `GET /api/users/outgoing-friend-requests` - Get sent friend requests

### Chat & Video
- `GET /api/chat/token` - Generate Stream authentication token

##  Theme System

MindSwap features 32 beautiful themes powered by DaisyUI:

**Light Themes**: Light, Cupcake, Bumblebee, Emerald, Corporate, Garden, Lofi, Pastel, Fantasy, Wireframe, CMYK, Autumn, Business, Lemonade, Winter

**Dark Themes**: Dark, Synthwave, Retro, Cyberpunk, Valentine, Halloween, Forest, Aqua, Luxury, Dracula, Acid, Night, Coffee, Dim, Nord, Sunset, Black

Themes can be switched in real-time using the theme selector in the navigation bar.

##  Development

### Available Scripts

**Root Level**:
- `npm run build` - Build entire application for production
- `npm start` - Start production server

**Backend**:
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

**Frontend**:
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **ESLint** for code linting
- **Prettier** for code formatting
- **Consistent naming conventions**
- **Component-based architecture**
- **Custom hooks** for reusable logic

##  Deployment

### Production Build
```bash
npm run build
```

### Environment Variables (Production)
Ensure all environment variables are set in your production environment:
- `NODE_ENV=production`
- Update `MONGO_URI` to production database
- Set secure `JWT_SECRET_KEY`
- Configure `CORS` for production domain

### Deployment Platforms
- **Render** (Recommended)
- **Vercel** (Frontend)
- **Railway** (Backend)
- **Netlify** (Frontend)
- **Heroku**

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and patterns
- Write descriptive commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed


##  Acknowledgments

- **Stream** for providing excellent Chat and Video SDKs
- **DaisyUI** for beautiful UI components
- **TailwindCSS** for utility-first CSS framework
- **React Team** for the amazing framework
- **MongoDB** for flexible database solutions

##  Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Open an issue on GitHub for bugs or feature requests
- **Email**: [vfy7pe@virginia.edu](mailto:your-email@example.com)

##  Roadmap

### Upcoming Features
- [ ] Push notifications for mobile
- [ ] Advanced search and filtering
- [ ] Group video calls with multiple participants
- [ ] File sharing in chats
- [ ] Calendar integration for scheduled discussions
- [ ] AI-powered conversation suggestions
- [ ] Advanced analytics and insights
- [ ] Mobile application (React Native)
- [ ] Moderation tools and reporting system
- [ ] Integration with academic platforms

---
## Developer

**Nana Kwame Amponsah**

- 📧 Email: [vfy7pe@virginia.edu]
- 💼 LinkedIn: [www.linkedin.com/in/nana-kwame-amponsah]
- 🌐 Portfolio: [coming soon!]

**Built with love for intellectual discourse and meaningful connections.**



