# INSURE GHANA

##  MVP

### Overview:
This MVP (Minimum Viable Product) project is a web application that serves as a platform for users to access information about insurance in Ghana. It consists of both a backend server and a client-side frontend application.

### Technologies Used:
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JSON Web Tokens (JWT) for authentication
  - bcrypt for password hashing
  - node-cron for scheduling tasks
  - dotenv for environment variable management
  - cors for Cross-Origin Resource Sharing
  - cookie-parser for parsing cookies
  - validator for input validation

- **Frontend**:
  - React.js
  - React Router for client-side routing
  - Redux Toolkit for state management
  - Tailwind CSS for styling
  - jwt-decode for decoding JWT tokens
  - react-hot-toast for toast notifications
  - react-icons for icons
  - react-type-animation for text animations

### Folder Structure:
- **Backend**:
  - `models/`: Contains Mongoose models for interacting with MongoDB.
  - `controllers/`: Contains logic for executing route functionalities.
  - `routes/`: Contains route handlers for different API endpoints.
  - `app.js`: Entry point for the backend server.
  - `.env`: Environment variables file for storing sensitive information.

- **Frontend**:
  - `src/`: Contains all frontend source code.
    - `components/`: Contains React components.
    - `pages/`: Contains different pages of the application.
    - `store/`: Contains Redux store configuration and slices.
    - `styles/`: Contains global styles and Tailwind CSS configuration.
    - `hooks/`: Contains custom hooks.
    - `assets/`: Contains images.
    - `helper/`: Contains utility functions.
    - `App.js`: Main component serving as the entry point of the frontend.
    - `index.js`: Entry point of the React application.
  - `public/`: Contains static assets and HTML template.

### Installation:
1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies for both backend and frontend:
   ```
   cd backend
   npm install
   
   cd ../client
   npm install
   ```
4. Set up MongoDB and configure environment variables in the backend `.env` file.
5. Start the backend server:
   ```
   cd ../server
   npm start
   ```
6. Start the frontend development server:
   ```
   cd ../client
   npm start
   ```
7. Access the application at `http://localhost:3000`.

### Features:
- User authentication (signup, login, logout) with JWT tokens.
- CRUD operations for certain resources (e.g., users, currency data).
- Scheduled tasks using node-cron for fetching and updating data.
- Responsive design using Tailwind CSS for better usability across devices.
- Redux Toolkit for state management in the frontend.

### Usage:
- Open the url and navigate the various pages especially the calculator page
- Sign up for a new account or log in with existing credentials.
- Navigate through different sections/pages of the application using the navigation menu.
- Perform CRUD operations on available resources as permitted by the user role.
- Log out from the application to invalidate the JWT token.

### Contributors:
- [EMMANUEL NTAADU GYAMFI](engyamfi@st.ug.edu.gh)
- [Brigitte Koranteng](korantengbrigitte96@gmail.com)



### Acknowledgements:
- [ALX SE](https://tech.alxafrica.com/software-engineering-programme-accra)

---


