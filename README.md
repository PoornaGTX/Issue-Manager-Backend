
# Project overview

The developed project management tool that enables user account creation and login for efficient project management. Upon registration, users can select their company from pre-defined options, ensuring seamless collaboration within their organizational context. The tool supports multiple user roles, including project managers, testers, and developers. Project managers are granted advanced permissions to assign tasks to team members and manage their activities, fostering streamlined collaboration and enhancing project efficiency. They also have the authority to delete or edit tasks assigned to others within the company. Additionally, I integrated a feature to monitor task statuses using graphical charts, providing project managers with clear visual insights into project progress and team performance, thereby facilitating informed decision-making and successful project outcomes.

Additionally, the tool features filters for categorizing tasks into "Personal" and "Assigned to Me" categories. The "Personal" category includes tasks created by the user, while the "Assigned to Me" category lists tasks specifically assigned to them by the project manager, facilitating focused task management.

## Technology Used

**Frontend** - React Js  
**Backend** - Express Js  
**Database** - MongoDB


## Packages Used in backend

- **TypeScript** - Leveraged for type-safe JavaScript development.
- **Express** - Used as the core backend framework.
- **mongoose** - Used for robust schema validation in TypeScript.
- **jsonwebtoken** - Library for generating and verifying JSON Web Tokens (JWTs).
- **express-async-errors** - Middleware to handle asynchronous errors in Express.js.
- **bcryptjs** - Library for hashing passwords securely.
- **dotenv** - Module for loading environment variables from a `.env` file into `process.env`.
- **morgan** - Integrated to display visually appealing loading spinners during asynchronous operations or data fetching.
- **cors** - Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
- **nodemon** - Utility that automatically restarts the server when code changes occur during development.
- **validator** - Library for validating and sanitizing strings such as emails, URLs, and others.

## Installation

Install my-project with npm

```bash
01. run 'npm install' command
02. Navigate to the src/utils/consts.js file in your project directory.
03. Locate the BASE_URL constant in the file.
04. Update the BASE_URL constant with the URL of your locally running backend API.
05. run 'npm start' command
```
    
