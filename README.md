# TripPeo

_Pronounced as Trippy (Trips and People)_
_Share, Explore, Inspire through your travel stories._

## Description

This project is built using React JS with Vite, Node.js, and MongoDB. The backend also integrates with Cloudinary for image management, and the frontend uses the Mapbox API for location services.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)

## Installation

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- npm
- MongoDB (local instance or cloud service like MongoDB Atlas)

### Cloning the Repository

1. Clone the frontend repository from GitHub:

   ```sh
   git clone git@github.com:nilufarshaikh/trippeo-client.git
   ```

2. Navigate to the project directory:

   ```sh
   cd trippeo-client
   ```

3. Clone the backend repository from GitHub:

   ```sh
   git clone git@github.com:nilufarshaikh/trippeo-server.git
   ```

4. Navigate to the backend project directory:

   ```sh
   cd trippeo-server
   ```

### Installing Dependencies

3. Install backend dependencies:

   ```sh
   npm install
   ```

4. Install frontend dependencies:

   ```sh
   npm install
   ```

## Configuration

### Backend Configuration

1. Create a `.env` file in the `trippeo-server` directory and add the following environment variables:

   ```plaintext
   PORT=8080
   CORS_ORIGIN=http://localhost:5173
   MONGO_URI=<mongo-db-connection-string>
   JWT_KEY=<secret-key>
   CLOUDINARY_CLOUD_NAME=<your_cloud_name>
   CLOUDINARY_API_KEY=<your_api_key>
   CLOUDINARY_API_SECRET=<your_api_secret>
   ```

   Replace `<mongo-db-connection-string>`, `<secret-key>`, `<your_cloud_name>`, `<your_api_key>`, and `<your_api_secret>` with your actual values.

### Frontend Configuration

1. Create a `.env` file in the `trippeo-client` directory and add the following environment variable:

   ```plaintext
   VITE_API_URL=http://localhost:8080
   VITE_MAPBOX_API_KEY=<your_mapbox_api_key>
   ```

   Replace `<your_mapbox_api_key>` with your actual Mapbox API key.

## Running the Project

### Starting the Backend Server

1. Navigate to the `trippeo-server` directory:

   ```sh
   cd trippeo-server
   ```

2. Start the backend server:

   ```sh
   node --watch index.js
   ```

   The backend server should now be running on the port specified in the `.env` file (default: 8080).

### Starting the Frontend Development Server

1. Navigate to the `trippeo-client` directory:

   ```sh
   cd trippeo-client
   ```

2. Start the frontend development server:

   ```sh
   npm run dev
   ```

   The frontend development server should now be running on http://localhost:5173.

## Technologies Used

- **Frontend:** React JS, Vite, Mapbox API
- **Backend:** Node.js, Express, MongoDB, Cloudinary
- **Database:** MongoDB

### Additional Notes

- Make sure MongoDB is running locally or adjust `MONGO_URI` for a remote MongoDB service.
- Ensure your Cloudinary and Mapbox API keys are correct and have necessary permissions.
