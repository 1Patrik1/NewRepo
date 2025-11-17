# VZT Construction Management Application

The VZT Construction Management Application is a comprehensive, single-page tool designed to streamline project management for construction companies. Built with vanilla JavaScript, HTML, and CSS, this application offers a lightweight yet powerful solution for managing projects, tracking attendance, and facilitating team communication.

## Key Features

- **Dashboard**: Get a quick overview of active projects, daily photo uploads, weekly reports, and personal work hours.
- **GPS Attendance**: Check in and out of job sites with geolocation tracking to ensure accurate record-keeping.
- **Photo Documentation**: Upload and manage project photos, providing visual records of progress and completed work.
- **Reporting System**: Create and view daily, weekly, or inspection reports to maintain clear and consistent project documentation.
- **VZT Calculators**: Access a suite of specialized calculators for pipe sizing, duct length, airflow, and pressure loss to support on-site technical decisions.
- **Team Chat**: Communicate with your team in real-time through dedicated channels for general and emergency messaging.
- **User Roles**: Manage access and permissions with distinct roles for Admins, Supervisors, and Workers.
- **Customizable Themes**: Switch between light and dark modes to suit your viewing preferences.

## Getting Started

To run the application locally, follow these simple steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/vzt-construction-management.git
   cd vzt-construction-management
   ```

2. **Serve the Application**
   Since this is a client-side application, you can serve it using any simple HTTP server. If you have Python installed, you can use its built-in server:
   ```bash
   python3 -m http.server 8000
   ```
   Or, with Node.js, you can use a package like `http-server`:
   ```bash
   npx http-server -p 8000
   ```

3. **Access the Application**
   Open your web browser and navigate to `http://localhost:8000`.

## How to Use

- **Login/Registration**: New users can register for an account, while existing users can log in with their credentials. For a quick tour, use the demo buttons to log in as an Admin, Supervisor, or Worker.
- **Navigation**: Use the sidebar to switch between different sections of the application, such as the Dashboard, GPS & Attendance, and Calculators.
- **Data Persistence**: All application data is stored in the browser's `localStorage`, allowing your session and project data to persist between visits.

## File Structure

- `index.html`: The main HTML file that structures the application's UI.
- `style.css`: Contains all the styling rules for the application, including a responsive design and theme support.
- `app.js`: The core JavaScript file that houses the `VZTApp` class and all the application's logic.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.
