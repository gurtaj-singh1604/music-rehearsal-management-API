# Milestone 3 – Final Touches and Project Completion

## Student Name
Gurtaj Singh

## Project Name
Music Rehearsal Management API

## Repository
Paste your GitHub main branch link here.

---

## Project Overview

My capstone project is a back-end RESTful API called Music Rehearsal Management API. It is built with Node.js, TypeScript, Express, Firebase Firestore, and Firebase Authentication. The purpose of the project is to support a music rehearsal workflow by managing Songs, Setlists, Rehearsals, and reminder-related functionality.

The three main resources in the system are:
- Songs
- Setlists
- Rehearsals

The project uses a layered architecture with routes, controllers, services, and repositories.

---

## Advanced Feature Expansion

For Milestone 3, I expanded the reminder component by adding more advanced features to the existing rehearsal reminder functionality.

### Added Features
- filtering reminders by location
- sorting reminders by date
- stronger rehearsal date validation using ISO date format checks
- stronger goals validation for rehearsal creation and updates

### Result
The reminder feature is more practical and easier to use because it can now return more focused results and enforce better input quality.

---

## Authentication and Authorization

For Milestone 3, I added secure authentication and authorization using Firebase Authentication and Firebase Admin.

### Authentication
- Email/Password sign-in is enabled in Firebase Authentication
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

### Authorization
The API uses two roles:
- `member`
- `admin`

### Access Rules
- authenticated members can perform read operations
- admins can perform create, update, and delete operations

This keeps the security model simple and logical for the project.

---

## API Documentation

Swagger / OpenAPI documentation is included and updated for the project.

The documentation covers:
- authentication endpoints
- songs endpoints
- setlists endpoints
- rehearsals endpoints
- upcoming reminder query options
- protected route behavior

This keeps the API documentation aligned with the final Milestone 3 functionality.

---

## Working Tests

The project includes passing automated tests for the important features.

### Covered Areas
- auth routes
- auth service
- auth middleware
- songs routes
- setlists routes
- rehearsals routes
- rehearsals service
- reminder scheduler

The tests are passing and confirm that the important Milestone 3 functionality is working.

---

## Project Organization and Completeness

The project is organized with a clear structure and separated layers:
- routes
- controllers
- services
- repositories
- middleware
- config
- schedulers
- tests

The project also includes:
- updated README instructions
- Swagger documentation
- validation
- error handling
- authentication
- authorization
- reminder component enhancement

This makes the codebase easier to understand and extend.

---

## Summary

At the end of Milestone 3, the Music Rehearsal Management API includes:
- complete CRUD operations for Songs, Setlists, and Rehearsals
- Firebase Email/Password Authentication
- role-based authorization with admin and member roles
- advanced reminder filtering, sorting, and validation
- updated Swagger documentation
- passing tests
- improved project organization and completeness

This milestone completes the major final touches required for the capstone project and leaves the project in a polished, submission-ready state.