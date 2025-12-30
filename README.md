# VZT Construction Management App

A comprehensive web and mobile application for managing heating, ventilation, and air conditioning (HVAC/VZT) construction projects.

## Features

- **User Authentication**: Multi-role login system (Admin, Supervisor, Worker)
- **Project Management**: Track and manage HVAC installation projects
- **Time Tracking**: Check-in/check-out functionality for workers
- **Location Services**: GPS-based tracking and mapping with Leaflet
- **Task Management**: Create, assign, and track project tasks
- **Photo Documentation**: Upload and manage project photos
- **Reports**: Generate work reports and project summaries
- **Multi-platform**: Web application with Android support via Capacitor

## Technology Stack

- HTML5, CSS3, JavaScript (Vanilla)
- [Capacitor](https://capacitorjs.com/) for mobile deployment
- [Leaflet](https://leafletjs.com/) for maps and location services
- LocalStorage for data persistence

## Quick Start

### Local Development

To run the application locally:

```bash
# Install dependencies
npm install

# Start local development server
npm run serve
```

The application will open automatically in your browser at `http://localhost:8080`.

### Web Deployment

The application is a static web app that can be deployed to any web hosting service:

1. Upload `index.html`, `style.css`, and `app.js` to your web server
2. Access the application through your web browser

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions.

### Android Deployment

The application is configured for Android deployment using Capacitor:

```bash
# Install dependencies
npm install

# Copy files to www directory and sync with Android
npm run build

# Open Android Studio
npm run open:android
```

## Demo Accounts

The application includes demo accounts for testing:

- **Admin**: admin@vzt.cz / admin123
- **Supervisor**: vedouci@vzt.cz / vedouci123  
- **Worker**: delnik@vzt.cz / delnik123

## Available Scripts

- `npm run serve` - Start local development server
- `npm run copy` - Copy files to www directory
- `npm run build` - Build and sync for Capacitor
- `npm run open:android` - Open Android project in Android Studio

## Project Structure

```
├── index.html          # Main HTML file
├── app.js              # Application logic
├── style.css           # Styles
├── capacitor.config.json  # Capacitor configuration
├── android/            # Android platform files
├── www/                # Web deployment directory
└── DEPLOY.md          # Deployment instructions
```

## License

See [LICENSE.txt](LICENSE.txt) for details.