## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3501](http://localhost:3501) with your browser to see the result.
---

# Work-Clock Documentation

!! **This documentation contains instructions and guidelines for setting up a work-clock system.** It is important to carefully read and understand the instructions before proceeding with the implementation. However, please note that this documentation does not provide any legal or professional advice regarding attendance tracking or employee management. It is your responsibility to ensure that the system complies with applicable laws, regulations, and company policies. Additionally, make sure to handle sensitive user data securely and follow best practices for data protection.

> **Software Name:** Work -Clock  
> **Version:** 0.1.0
> **Date: **2023-06-29

## **Software summary **👀

The documentation outlines the vision and implementation plan for a work-clock system that replaces traditional punch systems with QR code scanning. The system includes a front-end developed using Next.js, a back-end built with Node.js and Express.js, and MongoDB for the database. The implementation roadmap includes steps for setting up the project, front-end and back-end development, database integration, real-time updates, security and authorization, error handling and logging, testing, and deployment. The system incorporates JWT authentication, QR code scanning, attendance recording, and real-time updates using web sockets. It emphasizes security measures such as token handling, access controls, and error monitoring. The documentation advises handling edge cases, following best practices, and considering additional security measures like rate limiting and input validation.

## Features 🧩

**Dashboard Features:**

1.  **Date Display:** The dashboard prominently displays the current date at the top.

2.  **Punch-In/Out & Meal-In/Out Section:** A structured section for recording entire day's punch-in/out and meal-in/out times.

3.  **Backward Countdown:** A countdown timer showing the time remaining to complete 9 hours of work.

4.  **Countdown Graphs:**

    -   Weekly Countdown Graph: Visual representation of weekly working hours countdown.
    -   Monthly Countdown Graph: Visual representation of monthly working hours countdown.
    -   Quarterly Countdown Graph: Visual representation of quarterly working hours countdown.

5.  **On-Time and Late Average Data:** Two buttons displaying average on-time and late arrival data, located next to the countdown timer.

6.  **Notification Button:** A notification icon/button that opens a sidebar for viewing all notifications and starred notifications.

7.  **Profile Button (Mobile View):** A button that allows users to access their profile information when using the dashboard on a mobile device.

8.  **Time Status in Profile:** Within the profile section, time status is displayed according to weekly, monthly, and quarterly work hours.

9.  **Logout Button:** Located in the top right corner of the dashboard, a button that allows users to log out of their account.

10. **Dark-Light Theme Button:** A toggle button located next to the logout button, enabling users to switch between dark and light themes for the dashboard.

**Reports Page Features:**

1.  **Attendance Table:** A table displaying detailed attendance records, including punch-in/out times, for a specified date range.
2.  **Date Range Selection:** User-friendly options for selecting a specific date range for generating the attendance report.
3.  **Download in CSV:** A button that allows users to download the attendance report in CSV format for further analysis or record-keeping.

## **Requirements ☝️

1.  User Authentication:

-   Implement a secure user authentication system using JWT tokens.
-   Allow users to register, login, and manage their account credentials.

1.  QR Code Generation:

-   Generate a unique QR code daily that employees can scan for attendance.
-   Ensure that each QR code is valid only for a specific day.

1.  QR Code Scanning:

-   Integrate a QR code scanning feature using a library like react-qr-reader.
-   Enable employees to scan the QR code to record their attendance.

1.  Attendance Management:

-   Create a dashboard where employees can view their attendance details.
-   Display in-time, out-time, lunch break, and tea break details for each day.

1.  Real-time Updates:

-   Enable real-time updates on the dashboard using web sockets (e.g., Socket.io).
-   Push attendance updates to relevant users when actions like in-time, out-time, or breaks occur.

1.  Database Integration:

-   Connect the Node.js server with either MongoDB or Firebase as the chosen database system.
-   Create appropriate collections/tables to store user information, attendance records, and QR codes.
-   Implement database queries and operations for storing and retrieving attendance-related data.

1.  Security and Authorization:

-   Ensure secure token handling by implementing proper encryption and validation mechanisms.
-   Set up routes for token issuance, renewal, and validation.
-   Implement middleware to verify and decode tokens for protected routes.

1.  Error Handling and Logging:

-   Implement error handling middleware to catch and handle exceptions.
-   Set up logging mechanisms to track errors and monitor system behavior.

1.  Testing and Deployment:

-   Perform thorough testing to ensure the functionality and security of the system.
-   Deploy the application to a hosting platform of choice, considering scalability and performance.

1.  Additional Security Measures:

-   Consider implementing rate limiting to prevent abuse and protect against potential attacks.
-   Implement input validation to ensure data integrity and protect against malicious inputs.

1.  User Interface Design:

-   Create a user-friendly and intuitive interface for the login page and dashboard.
-   Ensure the design is responsive and accessible across different devices.

1.  Maintenance and Support:

-   Plan for regular maintenance and updates to address any bugs or security vulnerabilities.
-   Provide ongoing support to address user inquiries and issues.

## How to develop 🐣

### Step 1 - Project Setup

-   Choose the tech stack: Next.js for the front-end, Node.js and Express.js for the back-end.
-   Set up a new Next.js project and initialize the back-end with Node.js and Express.js.
-   Create a project structure for both the front-end and back-end.

### Step 2 - Front-end Development

-   Design and develop the user interface for the login page and dashboard using HTML, CSS, and React.
-   Implement user registration, login, and account management functionality using Next.js API routes.
-   Integrate a QR code scanning library (e.g., react-qr-reader) and implement the QR code scanning feature.

### Step 3 - Back-end Development

-   Set up Express.js routes for generating a daily unique QR code and recording attendance actions.
-   Implement routes for in-time, out-time, lunch break, and tea break actions.
-   Create routes for fetching attendance details for a specific user or date range.
-   Implement the necessary business logic for generating and validating QR codes, recording attendance, and fetching data.

### Step 4 - Database Integration

-   Set up Express.js routes for generating a daily unique QR code and recording attendance actions.
-   Implement routes for in-time, out-time, lunch break, and tea break actions.
-   Create routes for fetching attendance details for a specific user or date range.
-   Implement the necessary business logic for generating and validating QR codes, recording attendance, and fetching data.

### Step 5 - Real-time Updates

-   Integrate Socket.io or a similar library to enable real-time updates on the dashboard.
-   Implement server-side logic to push attendance updates to relevant users when actions occur.

### Step 6 - Security and Authorization

-   Implement JWT authentication using refresh and access tokens.
-   Set up routes for token issuance and renewal.
-   Secure the routes and sensitive data by validating user credentials and implementing proper access controls.
-   Implement middleware to verify and decode tokens for protected routes.

### Step 7 - Error Handling and Logging

-   Implement error handling middleware to catch and handle exceptions.
-   Set up proper logging mechanisms to track errors and monitor system behavior.

### Step 8 - Deployment

-   Deploy the application to a hosting platform of your choice.
-   Set up continuous integration and deployment pipelines to automate the deployment process.

### Step 9 - Additional Security Measures

-   Implement rate limiting to prevent abuse and protect against potential attacks.
-   Implement input validation to ensure data integrity and protect against malicious inputs.

### Step 10 - Maintenance and Support

-   Plan for regular maintenance and updates to address any bugs or security vulnerabilities.
-   Provide ongoing support to address user inquiries and issues.

## **Tech Stack **🚀

-   Front-end: Next.js, React, HTML, CSS
-   Back-end: Node.js, Express.js
-   Database: MongoDB or Firebase
-   Authentication: JWT
-   Real-time Updates: Socket.io or similar library
-   Testing: Jest, React Testing Library
-   Deployment: Hosting platform of choice (e.g., Heroku, AWS, Azure)

## Sitemap For User 🌍

### Home

### ├── Login

### └── Dashboard

    ├── Profile

    ├── Attendance

    │   ├── Scan QR Code

    │   ├── Punch In

    │   ├── Lunch Break

    │   ├── Tea Break

    │   ├── Overtime Attendance

    │   └── View Details

    │       ├── Daily Attendance

    │       │   ├── Attendance Summary

    │       │   └── Detailed Attendance

    │       ├── Monthly Attendance

    │       │   ├── Attendance Summary

    │       │   └── Detailed Attendance

    │       └── Custom Range Attendance

    │           ├── Attendance Summary

    │           └── Detailed Attendance

    ├── Dark-Light Theme Button

    ├── On Time Button

    ├── Late Average Button

    ├── Notification Button

    └── Logout 🙋🏽‍♂️

### Reports

├── Table of All Attendance

├── Date Range Selection

└── Download in CSV

Answer and document frequently asked questions below.

## Sitemap For admin 🌍

Not Available yet.

**Dashboard Features:**

1.  **Date Display:** The dashboard prominently displays the current date at the top.

2.  **Punch-In/Out & Meal-In/Out Section:** A structured section for recording entire day's punch-in/out and meal-in/out times.

3.  **Backward Countdown:** A countdown timer showing the time remaining to complete 9 hours of work.

4.  **Countdown Graphs:**

    -   Weekly Countdown Graph: Visual representation of weekly working hours countdown.
    -   Monthly Countdown Graph: Visual representation of monthly working hours countdown.
    -   Quarterly Countdown Graph: Visual representation of quarterly working hours countdown.

5.  **On-Time and Late Average Data:** Two buttons displaying average on-time and late arrival data, located next to the countdown timer.

6.  **Notification Button:** A notification icon/button that opens a sidebar for viewing all notifications and starred notifications.

7.  **Profile Button (Mobile View):** A button that allows users to access their profile information when using the dashboard on a mobile device.

8.  **Time Status in Profile:** Within the profile section, time status is displayed according to weekly, monthly, and quarterly work hours.

9.  **Logout Button:** Located in the top right corner of the dashboard, a button that allows users to log out of their account.

10. **Dark-Light Theme Button:** A toggle button located next to the logout button, enabling users to switch between dark and light themes for the dashboard.

**Reports Page Features:**

1.  **Attendance Table:** A table displaying detailed attendance records, including punch-in/out times, for a specified date range.
2.  **Date Range Selection:** User-friendly options for selecting a specific date range for generating the attendance report.
3.  **Download in CSV:** A button that allows users to download the attendance report in CSV format for further analysis or record-keeping.

## Any Queries? 💬

**Contact** - Amit Thakur and Karun Gupta

          