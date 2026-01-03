🩸 BloodLink – Blood Donation Management System (Frontend)

BloodLink is a web-based blood donation management platform designed to connect blood donors, volunteers, and administrators efficiently.  
The application focuses on usability, role-based access, and real-time blood request management to help save lives through faster coordination.

🚀 Live Project

Frontend Live URL: https://bloodlink-100.netlify.app/
Backend API: https://blood-link-six-kappa.vercel.app/

## 3. Technology Stack

### Frontend
- React.js
- JavaScript (ES6+)
- Tailwind CSS
- DaisyUI
- React Router 
- Axios

### Authentication & Hosting
- Firebase Authentication
- Vercel



## Core Features

🔐 Role-Based Authentication

Admin, Donor, and Volunteer dashboards

🧾 Blood Request Management

Create, view, update, and delete blood requests

🔎 Advanced Search & Filtering

Search by blood group, district, and upazila

📊 Dashboard Views

Separate dashboards for each role

⚡ Real-Time UI Updates

Status updates without page reload

📱 Responsive Design

Fully optimized for mobile, tablet, and desktop


## Dependency Used
- react
- react-router
- Axios
- firebase
- react-toastify
- react-sweatalert2
- react-icons

## Run the Project Locally


1. To run the BloodLink frontend locally, ensure that Node.js (v16 or later) and npm are installed on your system.
Clone the repository and navigate into the project directory using the following commands:


```bash
git clone https://github.com/khondhokersazzad/blood-link-frontend.git
cd blood-link-frontend

2.Install the required dependencies:
npm install

3. Create a .env.local file in the root directory and add the following environment variables:
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

4. Make sure the backend server is running locally or that the API URL points to a deployed backend service. Start the development server:

npm run dev
5. The application will be available at:

http://localhost:5173


---



> The backend is maintained in a separate repository and communicates via REST APIs.

> https://github.com/khondhokersazzad/bloodlink-backend
