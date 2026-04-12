# Milestone 2 - Sprint Demo and Component Integration

## Project Name
Music Rehearsal Management API

## Working MVP
My application currently has a working MVP that runs without errors and supports the essential operations of the project. The API can successfully perform CRUD operations for the three main resources:

- Songs
- Setlists
- Rehearsals

The application is built with Node.js, TypeScript, Express, and Firebase Firestore. It also includes validation, error handling, and Swagger/OpenAPI documentation.

## Current Progress
So far, I have completed the main CRUD features for all three resources.

### Songs
- Create Song
- Get All Songs
- Get Song By ID
- Update Song
- Delete Song

### Setlists
- Create Setlist
- Get All Setlists
- Get Setlist By ID
- Update Setlist
- Delete Setlist

### Rehearsals
- Create Rehearsal
- Get All Rehearsals
- Get Rehearsal By ID
- Update Rehearsal
- Delete Rehearsal

I also added:
- Joi validation for request data
- global error handling
- Swagger/OpenAPI documentation
- Jest and Supertest tests
- GitHub Actions CI workflow
- a README file
- a new-component-plan.md file for Node-cron

## New Component Highlights
The new component I selected for this project is Node-cron.

### Purpose
The goal of this component is to support scheduled rehearsal reminder logic. Since the project already manages rehearsals with date and location data, Node-cron is a natural extension because it allows the application to check for upcoming rehearsals automatically.

### Progress So Far
For Milestone 2, I integrated the basics of the component by:
- installing Node-cron
- creating a scheduler module for rehearsal reminder checks
- adding reminder configuration through environment variables
- creating a service function that finds upcoming rehearsals within a configurable time window
- adding a new endpoint to preview upcoming rehearsals for reminder purposes

### New Endpoint Added
- `GET /api/v1/rehearsals/upcoming-reminders`
- optional query parameter: `hoursAhead`

This endpoint helps demonstrate the component logic clearly while keeping the application easy to test.

### Challenges
Some challenges I considered during this step were:
- handling time-based logic correctly
- keeping the component simple enough for the milestone
- making the feature easy to demonstrate without adding too much complexity
- avoiding changes that belong more appropriately to Milestone 3

### How I Handled Them
I kept the first integration simple:
- the reminder logic checks for rehearsals happening within a selected time window
- the scheduler logs reminder information to the console
- the new endpoint allows me to demonstrate the reminder logic without relying only on the cron schedule timing

## Working Tests
The project’s automated tests are currently passing.

### Current Results
- Test Suites: 3 passed
- Tests: 27 passed
- Coverage: 74.25%

This is above the Milestone 1 and ongoing testing expectation of 65% coverage, and the test suite remains passing after the Milestone 2 component integration.

## API Documentation Status
Swagger/OpenAPI documentation is available and working.

### Documented Areas
- Songs endpoints
- Setlists endpoints
- Rehearsals endpoints
- upcoming rehearsal reminder endpoint

This provides a working reference for the API during the current stage of development.

## Git Workflow
The project continues to use the required branch workflow:
- `main` for the polished version
- `development` for integrated ongoing work
- feature branches for milestone tasks and implementation pieces

For Milestone 2, I used feature branch work for the component integration and this sprint demo documentation.

## Next Steps
The next major tasks for the project are:

1. Add secure Firebase Authentication
2. Add role-based authorization
3. expand the new component with more advanced behavior if needed
4. improve API documentation further if endpoints change
5. continue strengthening tests for later milestones
6. complete final polish and final project presentation requirements

## Summary
At this stage, the application has a working MVP, complete CRUD for the three main resources, working tests, Swagger documentation, and the basic integration of the new Node-cron component. The project is now in a strong position for the next milestone, where I will focus on authentication, authorization, and final project completion.