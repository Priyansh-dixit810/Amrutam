# Full-Stack Web Application – Product Module

This is a full-stack web application built using **React.js** for the frontend and **Node.js with MongoDB** for the backend. This project implements the **Product** feature, allowing users to add, manage, and view product details.

## Features

- Add product general information, images, and descriptions
- Manage product benefits, properties, and FAQs
- Upload images using Cloudinary
- CRUD operations with Node.js and MongoDB
- Session management with `express-session` and MongoDB store
- Secure data handling with HTTPS-compatible cookies

## Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **File Storage:** Cloudinary  
- **Session Management:** express-session (MongoDB store)  
- **Deployment:** Vercel

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-link>
   cd <repo-folder>

2. npm install

3. create a .env file in the backend folder
PORT=8080
MONGO_URL=<your-mongodb-connection-string>
SECRET_CODE=<your-session-secret>
CLOUD_NAME=<your-cloudinary-cloud-name>
API_KEY=<your-cloudinary-api-key>
API_SECRET=<your-cloudinary-api-secret>

4. Run the backend server:
   node index.js
5. Install and start the frontend:
   cd frontend
npm install
npm start

API Endpoints
	•	POST /generalInfo – Upload product info and images
	•	POST /benefits – Save product benefits
	•	POST /properties – Save product properties
	•	POST /faq – Save product FAQ
	•	GET /overview – Retrieve product session data
	•	POST /overview – Save full product data to MongoDB
	•	GET /productList – Fetch all products
	•	PUT /details/activity/:id – Update product status
	•	PUT /details/editInfo/:id – Update product general info

Deployment
	•	Frontend and backend deployed on Vercel
	•	Session management works with secure cookies over HTTPS

License

MIT License
