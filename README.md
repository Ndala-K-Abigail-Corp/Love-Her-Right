# ❤️ LoveHerRight - Relationship Companion Web App

A complete web application to help you be the best partner by tracking important dates, understanding your partner's cycle, setting reminders, and keeping track of her favorite things.

## 🚀 Features

- **Authentication**: Email/Password and Google Sign-in
- **Dashboard**: Daily relationship tips, cycle tracking, upcoming dates
- **Reminders**: Create recurring reminders for important tasks
- **Calendar**: Visual calendar with special dates and cycle phases
- **Favorites**: Track your partner's favorite things by category
- **Tasks**: Manage gift ideas and to-do items
- **Settings**: Manage profile, cycle tracking, and special dates

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: TailwindCSS
- **Backend**: Firebase
  - Authentication (Email/Password + Google)
  - Firestore Database
  - Cloud Functions
- **Libraries**:
  - React Router DOM
  - date-fns
  - axios

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- Firebase account and project created

### Setup Steps

1. **Clone and install dependencies**:

   ```bash
   npm install
   ```

2. **Set up Firebase**:

   - Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password and Google providers)
   - Create a Firestore database
   - Copy your Firebase config

3. **Configure environment variables**:

   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration:
     ```
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Deploy Firestore rules**:

   ```bash
   firebase deploy --only firestore:rules
   ```

5. **Set up Cloud Functions** (optional):
   ```bash
   cd functions
   npm install
   npm run build
   cd ..
   firebase deploy --only functions
   ```

## 🚀 Running the App

### Development Mode

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

### Deploy to Firebase Hosting

1. Build the app:

   ```bash
   npm run build
   ```

2. Deploy to Firebase:
   ```bash
   firebase deploy --only hosting
   ```

### Deploy to Vercel

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

## 📁 Project Structure

```
src/
  components/
    Navbar.tsx          # Navigation bar
    Card.tsx            # Reusable card component
    CalendarView.tsx    # Calendar component

  pages/
    Auth.tsx            # Authentication page
    Dashboard.tsx       # Main dashboard
    Reminders.tsx       # Reminders management
    Calendar.tsx        # Calendar view
    Favorites.tsx       # Favorites management
    Tasks.tsx           # Tasks/gift ideas
    Settings.tsx        # User settings

  hooks/
    useAuth.tsx         # Authentication hook

  lib/
    firebase.ts         # Firebase configuration
    cycle.ts            # Cycle calculation utilities

  types/
    index.ts            # TypeScript interfaces

  App.tsx               # Main app component
  main.tsx              # Entry point
  index.css             # Global styles

functions/
  src/
    index.ts            # Cloud Functions
```

## 🔒 Firestore Schema

```
users/{uid}
  profile/
    data: { name, partnerName, loveLanguage, cycleStartDate, cycleLength, notificationsEnabled }

  reminders/{id}
    { title, message, schedule, time, nextRun, enabled, createdAt }

  favorites/{id}
    { item, category, notes, createdAt }

  tasks/{id}
    { title, done, createdAt }

  specialDates/{id}
    { label, date, type, recurring }
```

## 🔐 Security

- Firestore security rules ensure users can only access their own data
- Authentication required for all routes except `/auth`
- Environment variables for sensitive Firebase config

## 📝 Cloud Functions

### `sendReminders`

- Runs every 5 minutes
- Checks for due reminders and sends notifications
- Updates nextRun time based on schedule

### `initializeNewUser`

- Triggered on new user creation
- Sets up default profile and collections
- Creates welcome reminder

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the primary color palette.

### Relationship Tips

Edit the `relationshipTips` array in `src/pages/Dashboard.tsx`.

### Cycle Phases

Customize cycle phase calculations in `src/lib/cycle.ts`.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 💡 Future Enhancements

- [ ] Push notifications
- [ ] Email reminders via SendGrid
- [ ] Photo gallery for memories
- [ ] Mood tracking
- [ ] Relationship journal
- [ ] Export data functionality

---

Made with ❤️ for better relationships
#