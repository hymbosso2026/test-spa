# 🌍 NKY Travel - Project Documentation

## Project Overview

Welcome to **NKY Travel**, a modern and interactive web application designed to inspire travelers and showcase beautiful destinations around the world. This project combines elegant design with powerful features to create an immersive travel storytelling experience.

> "A visual journey that connects travelers, shares moments, and celebrates the beauty of exploration."

---

## ✨ Key Features

### 📸 Camera Capture
Capture beautiful moments directly from your device's camera and share them instantly with the community.

### 🗺️ Travel Mapping
Explore destinations and view travel routes with an interactive mapping interface.

### 🖼️ Gallery Management
Organize and showcase your travel photos in beautiful, responsive galleries that work seamlessly across all devices.

### ✍️ Travel Notes
Document your journeys with detailed travel notes, observations, and personal experiences.

### ⭐ Spotboard
Discover and share hidden gems and travel recommendations from the community.

### 👥 Community Connection
Connect with other travelers, explore their adventures, and build a global travel community.

---

## 💻 Technology Stack

### Frontend
- **React 18** - Modern UI framework with hooks and concurrent rendering
- **TypeScript** - Type-safe JavaScript for better code quality
- **Tailwind CSS** - Utility-first CSS for rapid UI development
- **Vite** - Lightning-fast build tool and development server

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Powerful relational database
- **Real-time APIs** - Instant data synchronization

### Additional Tools
- **ESLint** - Code quality and linting
- **PostCSS** - CSS transformation and optimization
- **Prettier** - Code formatting

---

## 📁 Project Structure

```
test-spa/
├── src/
│   ├── modules/
│   │   ├── overview/          # Dashboard and overview components
│   │   ├── presentation/      # Authentication and welcome screens
│   │   ├── spotboard/         # Photo spotting and sharing features
│   │   ├── travel-notes/      # Travel documentation and notes
│   │   ├── travelers/         # Traveler profiles and galleries
│   │   └── shared/            # Shared utilities, hooks, and components
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── supabase/
│   └── migrations/           # Database schema migrations
├── public/
│   ├── demo.html            # Interactive demo
│   ├── ppt.html             # Presentation slides
│   └── readme.html          # Documentation page
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Project dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git (optional)

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   cd test-spa
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5174` in your web browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🎯 Main Modules

### Overview Module (`src/modules/overview/`)
- Dashboard displaying travel statistics
- Overview feed showing recent activities
- User activity tracking

### Presentation Module (`src/modules/presentation/`)
- Authentication forms
- Welcome page
- Language selection modal
- User onboarding

### Spotboard Module (`src/modules/spotboard/`)
- Photo spotting and sharing
- Camera capture functionality
- Gallery display
- Rating and appreciation system

### Travel Notes Module (`src/modules/travel-notes/`)
- Create and publish travel narratives
- Rich text editing
- Photo integration
- Metadata and tagging

### Travelers Module (`src/modules/travelers/`)
- Traveler profiles
- Personal galleries
- Travel history
- Community discovery

### Shared Module (`src/modules/shared/`)
- **Hooks**: `useAuth`, `useCamera`, `useTranslation`, `useTravels`, `useAppreciate`
- **Services**: Translation service, authentication service
- **Types**: TypeScript interfaces and type definitions
- **Utilities**: Helper functions and constants
- **Components**: Cameroon star animation, reusable UI components

---

## 🗄️ Database Schema

### Core Tables

**user_profiles**
- Stores user information and profile data
- Linked to authentication system

**travels**
- Travel records and metadata
- Associated with user profiles

**photos**
- Photo storage and references
- Linked to travels and spotboard

**spotboard_photos**
- Spotboard contributions and shared spots
- Community content

**spotboard_ratings**
- Community ratings and feedback
- Appreciation system

**appreciations**
- User appreciation/like system
- Track user engagement

---

## 🔒 Security Features

✅ **Row-Level Security (RLS)** - Enabled on all database tables
✅ **JWT Authentication** - Secure token-based authentication
✅ **CORS Protection** - Cross-Origin Resource Sharing configured
✅ **API Rate Limiting** - Prevent abuse and ensure stability
✅ **Encrypted Connections** - All data transmitted securely

---

## 🎨 Design System

### Cameroon Flag Colors
- **Green** (#007A5E) - Represents peace and hope
- **Red** (#CE1126) - Represents courage and determination
- **Yellow** (#FCD116) - Represents the sun and wealth

### Animations
- **Twinkling Stars** - Background animation
- **Smooth Transitions** - Fluid page transitions
- **Interactive Hover Effects** - Enhanced user experience
- **Loading Animations** - Visual feedback during operations

---

## 📊 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run typecheck    # Check TypeScript types
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

---

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💼 Author

**NKWEMI KEYIM HYMBOSSO**

A passionate developer creating beautiful, functional travel experiences.

---

## 🎓 Project Highlights

- ✅ Modern React with TypeScript
- ✅ Real-time database synchronization
- ✅ Beautiful, responsive UI with Tailwind CSS
- ✅ Efficient build process with Vite
- ✅ Community-driven features
- ✅ Mobile-first design
- ✅ Production-ready architecture

---

## 🌟 Future Enhancements

- [ ] Advanced filtering and search
- [ ] AI-powered recommendations
- [ ] Social sharing integration
- [ ] Offline mode support
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)

---

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the project maintainer.

---

**Made with ❤️ and inspired by Cameroon's beautiful landscapes**

🇨🇲 Cameroon Flag 🇨🇲
