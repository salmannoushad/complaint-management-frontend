# Complaint Management System

Frontend for the User Role-Based Complaint Management System, built with React.js. Features role-based dashboards, ticket management interfaces.

# Frontend Features

### 1. **General:**
  - **Role-Based UI:**
    - Dynamically renders the appropriate dashboard and features based on the user's role (Admin or Customer).

  - **Secure Authentication Flow:**
    - Single login page for both Admins and Customers.
    - Protected routes to restrict unauthorized access.

### 2. **Customer Features:**
- **Dashboard:**
    - View a list of all complaints submitted by the customer.
    - Track the status of tickets (e.g., Open, Resolved, Closed).
- **Complaint Management::**
    - Create a new ticket with subject and description.
    - Edit/update existing tickets.
    - Delete complaints.
- **User-Friendly Forms:**
    - Input validation and error handling for ticket creation and updates.

### 3. **Admin Features:**
- **Dashboard:**
    - View a list of all tickets submitted by customers.
    - Change any user to admin
- **Complaint Management:**
    - Reply to tickets directly.
    - Update the status of tickets (e.g., mark as "Resolved" or "Closed").
    

### 4. **UI/UX**
- **Intuitive Navigation::**
    - role-specific actions.
    - Easy-to-access logout button.
- **Error Messages & Alerts:**
    - User-friendly error messages for failed actions.
    - Confirmation modals for critical actions like ticket deletion.

# Technologies Used
- React.js
- Material-UI

## Prerequisites
Ensure you have the following installed:
- node: v18.20.4
- npm: 10.7.0

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/salmannoushad/complaint-management-frontend.git
   cd complaint-management-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the development server:
   ```bash
   npm run start
   ```
2. Open the application in your browser at:
   ```
   http://localhost:3000
   ```

## Project Structure

    ├── src
    │   ├── api
    │   │   ├── auth.js
    │   │   └── tickets.js
    │   ├── assets
    │   ├── components
    │   │   ├── Auth
    │   │   │   ├── Login.js
    │   │   │   └── ProtectedRoute.js
    │   │   ├── Dashboard
    │   │   │   ├── AdminDashboard.js
    │   │   │   └── CustomerDashboard.js
    │   │   ├── Tickets
    │   │   │   ├── ReplyForm.js
    │   │   │   ├── TicketCard.js
    │   │   │   ├── TicketForm.js
    │   │   │   └── TicketList.js
    │   ├── config
    │   │   └── apiConfig.js
    │   ├── context
    │   │   └── AuthContext.js
    │   ├── data
    │   │   └── mockData.js
    │   ├── pages
    │   │   ├── AdminPage.js
    │   │   ├── CustomerPage.js
    │   │   └── Register.jsx
    │   ├── router
    │   │   └── AppRouter.js
    │   ├── styles
    │   │   └── global.css
    │   ├── utils
    │   │   ├── apiClient.js
    │   │   ├── constants.js
    │   │   └── index.css
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── public
    │   └── index.html
    ├── package.json
    |── .env
    |── .gitignore
    └── README.md

## Dockerfile for React Frontend with Runtime Environment Variable

Below is the Dockerfile used to run the React.js application in a containerized environment. It uses the Node.js runtime and allows dynamic configuration of the backend URL via the `REACT_APP_BACKEND_URL` environment variable.

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Define the environment variable for the backend URL
ENV REACT_APP_BACKEND_URL=http://localhost:5000/api

# Start the React app
CMD ["npm", "run", "start"]
```

#Build and Run the Docker Image:
1. Build the Docker image:

```
docker build -t react-frontend-dev .
```
2. Run the container and pass the REACT_APP_BACKEND_URL value if needed:

```
docker run -p 3000:3000 -e REACT_APP_BACKEND_URL=http://api.example.com react-frontend-dev
```

Feel free to contribute or open issues for improvements! Happy coding! 🎉
