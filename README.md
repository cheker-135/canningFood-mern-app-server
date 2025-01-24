 # Canning Food Project

## Overview
The Canning Food Project is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed for managing and reserving canned food items. The application offers functionality for both users and administrators with a focus on user-friendly interfaces, responsiveness, and robust features. It utilizes Redux for state management, Material-UI and Bootstrap for styling, and supports operations like food reservations, order management, and invoice generation.

## Features
### User Features
- **Browse Foods:** View available canned foods and other items.
- **Make Reservations:** Reserve food items for a specific date and time.
- **Place Orders:** Add food items to the cart and complete an order.
- **Download Invoices:** Download invoices for orders in PDF format.
- **Receive Invoices via Email:** Get invoices sent directly to your email.
- **Responsive Design:** Access the application seamlessly across devices.

### Admin Features
- **Add Foods:** Add new canned food items to the inventory.
- **Edit Foods:** Modify details of existing food items.
- **Delete Foods:** Remove food items from the inventory.
- **Generate Invoices:** Create invoices for user orders.
- **Send Invoices via Email:** Email invoices directly to users.

## Tech Stack
### Frontend
- **React:** Component-based library for building the user interface.
- **Material-UI:** Modern, customizable UI components for styling.
- **Bootstrap:** Responsive and mobile-first design framework.
- **Redux:** State management for handling global state.

### Backend
- **Node.js:** JavaScript runtime for backend development.
- **Express.js:** Web application framework for routing and APIs.

### Database
- **MongoDB:** NoSQL database for storing user data, food items, and orders.

## Installation
### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB (local or cloud instance)

### Steps
1. **Clone the Repository:**
   ```bash
   git clone repo
   cd cd repo
   ```

2. **Install Dependencies:**
   - Backend:
     ```bash
     cd back
     npm install
     ```
   - Frontend:
     ```bash
     cd front
     npm install
     ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the backend directory with the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_SERVICE_API_KEY=your_email_service_api_key
   ```

4. **Start the Application:**
   - Backend:
     ```bash
     cd backend
     npm start
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

## Folder Structure
```plaintext
canning-food-project/
├── backend/
│   ├── controller/
│   ├── model/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── app.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── actions/
│   │   ├── constants/
│   │   ├── reducers/
│   │   ├── routes/
│   │   ├── App.css
│   │   ├── App.js
│   │   └── index.js
│   │   └── store.js
│   └── public/
└── README.md
```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or support, please contact [chykou87@gmail.com].

Happy coding !!
