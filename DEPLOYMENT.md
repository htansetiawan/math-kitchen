# 🚀 Deployment Guide for Math Kitchen

## Prerequisites

1. **Node.js** (v14 or higher)
2. **Firebase CLI** installed globally
3. **Firebase project** set up

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory with your Firebase configuration:

```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=aaa
REACT_APP_FIREBASE_AUTH_DOMAIN=math-kitchen.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=math-kitchen
REACT_APP_FIREBASE_STORAGE_BUCKET=math-kitchen.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=7
REACT_APP_FIREBASE_APP_ID=1:7:web:063bb16e116cc3781721e4
REACT_APP_FIREBASE_MEASUREMENT_ID=G-M

# Environment
NODE_ENV=development
```

### 3. Firebase Setup

#### Install Firebase CLI (if not already installed)
```bash
npm install -g firebase-tools
```

#### Login to Firebase
```bash
firebase login
```

#### Initialize Firebase in your project (if not already done)
```bash
firebase init
```

Select:
- Hosting: Configure files for Firebase Hosting
- Use existing project: `math-kitchen`
- Public directory: `build`
- Single-page app: Yes
- Set up automatic builds: No

### 4. Development

#### Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

#### Build for Production
```bash
npm run build
```

### 5. Deployment to Firebase

#### Deploy to Firebase Hosting
```bash
npm run deploy
```

Or manually:
```bash
npm run build
firebase deploy
```

#### Deploy with Custom Message
```bash
firebase deploy -m "Your deployment message"
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run deploy` - Build and deploy to Firebase

## Project Structure

```
math-kitchen/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── StoryChapter.js
│   │   ├── VisualChapter.js
│   │   ├── InteractiveChapter.js
│   │   └── ExamplesChapter.js
│   ├── styles/
│   │   └── App.css
│   ├── firebase.js
│   ├── App.js
│   └── index.js
├── .env
├── .firebaserc
├── firebase.json
└── package.json
```

## Environment Variables

All Firebase configuration is managed through environment variables. Make sure to:

1. **Never commit `.env` to version control**
2. **Set up environment variables in your CI/CD pipeline**
3. **Use different `.env` files for different environments**

### Production Environment Variables

For production deployment, set these environment variables in your hosting platform:

```
REACT_APP_FIREBASE_API_KEY=aaa
REACT_APP_FIREBASE_AUTH_DOMAIN=math-kitchen.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=math-kitchen
REACT_APP_FIREBASE_STORAGE_BUCKET=math-kitchen.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=7
REACT_APP_FIREBASE_APP_ID=1:7:web:063bb16e116cc3781721e4
REACT_APP_FIREBASE_MEASUREMENT_ID=G-M
```

## Firebase Features Used

- **Hosting**: Static site hosting
- **Analytics**: User interaction tracking (optional)

## Troubleshooting

### Common Issues

1. **Build Fails**: Check that all environment variables are set correctly
2. **Firebase Deploy Fails**: Ensure you're logged in with `firebase login`
3. **Environment Variables Not Loading**: Make sure they start with `REACT_APP_`

### Debugging

```bash
# Check Firebase login status
firebase login:list

# Check project configuration
firebase projects:list

# Test local build
npm run build && npx serve -s build
```

## Security Notes

- The `.env` file is in `.gitignore` and should never be committed
- Firebase API keys are safe to expose in client-side code
- All Firebase security is handled through Firebase Security Rules

## Performance Optimization

The app includes:
- Code splitting with React.lazy (if implemented)
- Optimized bundle size
- CDN delivery through Firebase Hosting
- Caching headers for static assets

## Analytics Setup

The app includes Google Analytics integration. To enable:

1. Ensure `REACT_APP_FIREBASE_MEASUREMENT_ID` is set
2. Analytics will automatically track page views and user interactions

## Support

For issues related to:
- **React**: Check the React documentation
- **Firebase**: Check Firebase documentation
- **Plotly**: Check Plotly.js documentation
- **KaTeX**: Check KaTeX documentation 