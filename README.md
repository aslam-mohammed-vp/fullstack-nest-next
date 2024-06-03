
#Full Stack Nest Next App

Application built using nestjs and nextjs

## Content

- [The Application](#the-application)
  - [Features](#features)
  - [Running the app](#running-the-app)
  - [Folder Structure](#running-unit-tests)
- [Future Improvements](#future-improvements)

---

## The Application
Application implements simle user authentication with 
user credentials

### Features

- **User Authentication**: User can sign up/login/logout

---

### Running the app

Once you have the folder and are ready to start, you can run `yarn` (or `npm install`) from the root directory to install dependencies. After that, you can run:

```bash
# npm
npm run start

# or yarn
yarn start
```

This will start the application in development mode.

If you face issue in starting the next dev server with erro code 'ENOWORKSPACES' please run below command.


```bash
npx next telemetry disable
```

You can see the client application running in your browser by going to http://localhost:3000.

You can access the API documentation(Swagger) with below url:

http://localhost:3002/api


### Folder Structure

Apart from the basic folders generated by next.js we have below files and folders under 'src' folder:

- **client**: Contains the next js source code for frontend.
- **server**: Contains the nest js source code for backend

---

## Future Improvements

- API Documentation
