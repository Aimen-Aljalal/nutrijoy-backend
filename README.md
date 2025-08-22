# NutriJoy - Backend API

The backend API for **NutriJoy**, a nutrition tracking and meal planning app.  
This API provides authentication, user management, calorie calculation, meal tracking, and an admin panel for managing meals and users.

---

## Features
- User registration & authentication (JWT).
- BMI, ideal weight, and daily calories calculation.
- Track meals and plan daily consumption.
- History management (save daily meals after finalizing).
- Admin dashboard to:
  - Add new meals.
  - View total users and their details.

---

## Tech Stack
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Multer** for file upload (if needed)
- **Express Validator** for input validation

---

## Installation

1. Clone the repository:
   git clone <your-backend-repo-url>
   cd nutrijoy-backend

2. Install dependencies:
npm install

3. Set up environment variables in a .env file at the root:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

⚠️ Replace values with your own credentials.

4. Run the server:

*Development mode:
npm run dev

*Production mode:
npm start
