# NodeReact Project
This project combines an Express server with a React frontend application.

### Getting Started
#### Prerequisites
Ensure you have the following installed on your local machine:

- Node.js
- npm

#### Installation
1. Clone the repository:

```sh
git clone https://github.com/your-username/NodeReact.git
cd NodeReact
```
2. Install server dependencies:
```sh
npm install
```
3. Install client dependencies:
```sh
cd client
npm install
cd ..
```

### Running the Application
#### Start the Express Server
To start the Express server, run the following command in the root directory of the project:
```
npm start
```

#### Build the React App
To build the React application to see the changes in express server application, run the following command in the root directory of the project:
```
npm run build
```

Alternatively, you can run the React application directly in development mode (This is not reflect the changes in Express):
```sh
cd client
npm run client
```

### Folder Structure
Below is the folder structure of this repository:
```graphql
NodeReact/
  ├── client/       # React app
  ├── build/        # Build folder of the React app
  ├── models/
  │   └── server.js # The Express.js server code which contains the NONCE
  ├── node_modules/ # Node.js modules
  ├── package.json  # NPM package configuration file
  └── README.md     # This file
````

### Additional Notes
Ensure you have the required environment variables set up as needed.
The NONCE in server.js refers to a unique token used for security purposes. Make sure to handle it securely.