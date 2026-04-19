# Music Rehearsal Management API

This project is a back-end RESTful API built with Node.js, TypeScript, Express, and Firebase Firestore. It is designed to help manage a music rehearsal workflow by organizing songs, setlists, rehearsals, and reminder-related functionality.

## Features

### Core Resources
- Songs CRUD
- Setlists CRUD
- Rehearsals CRUD

### Authentication and Authorization
- Firebase Email/Password Authentication
- Login and register endpoints
- Firebase token verification
- Role-based access control with `admin` and `member`

### Reminder Component
- Node-cron rehearsal reminder scheduler
- Upcoming rehearsal reminder endpoint
- Advanced reminder filtering and sorting

### Quality and Documentation
- Swagger / OpenAPI documentation
- Joi validation
- Global error handling
- Jest and Supertest tests
- Layered architecture using routes, controllers, services, and repositories

## Tech Stack

- Node.js
- TypeScript
- Express
- Firebase Firestore
- Firebase Authentication
- Joi
- Swagger UI Express
- Swagger JSDoc
- Jest
- Supertest
- Node-cron

## Project Structure

```text
src/
  api/v1/
    auth/
    songs/
    setlists/
    rehearsals/
  config/
  middleware/
  schedulers/
  utils/
scripts/
test/