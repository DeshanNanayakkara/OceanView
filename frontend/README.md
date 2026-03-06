# Hotel Booking System - Frontend

## Description

The **Hotel Booking System - Frontend** is a user-friendly, responsive web application developed with **HTML**, **CSS**, **JavaScript**, and **React** for managing hotel bookings. This application allows users to search for available rooms, view hotel details, make reservations, and manage their bookings, providing an intuitive interface for users to book hotel rooms effortlessly.

## Features
- **Room Search**: Search for rooms based on availability, location, and price.
- **Hotel Details**: View detailed information about the hotels, including photos, amenities, and pricing.
- **Booking Management**: Users can easily book rooms and manage their reservations.
- **Responsive Design**: The interface is responsive and adapts to different screen sizes (mobile, tablet, desktop).
- **User Authentication**: Allows users to register, log in, and securely manage their bookings.

## Technologies Used
- **HTML5**: Structure and content of the frontend.
- **CSS3**: Styling the frontend, including media queries for responsiveness.
- **JavaScript**: Logic for handling dynamic content and user interactions.
- **React.js**: JavaScript library for building the user interface.
- **Bootstrap**: For responsive design and layout components.
- **Font Awesome**: For icons in the user interface.

## Setup Instructions

### Prerequisites
Ensure you have the following tools installed:
- **Node.js** (version 16.x or later)
- **npm** (Node Package Manager)

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/KavinduSenesh/hotel-booking-system-frontend.git
   cd hotel-booking-system-frontend
Install the dependencies:

```bash
npm install
```
Start the development server:

```
npm start
```
The application will be available at http://localhost:3000.

### Available Scripts
npm start: Runs the app in development mode. Open http://localhost:3000 to view it in the browser.

npm run build: Builds the app for production to the build folder. The app is optimized and minified for best performance.

npm test: Runs the test suite.

Project Structure

Here’s a breakdown of the project structure:
```
bash
Copy
Edit
/public
    index.html           # Main HTML file
/src
    /components          # Reusable UI components
    /pages               # Different pages in the app (e.g., Home, Search, Booking)
    /services            # Functions for API calls (e.g., fetch hotels, booking services)
    /App.js              # Main component that holds the routing logic
    /index.js            # Entry point for the React app
    /styles              # CSS files for the app's styles
