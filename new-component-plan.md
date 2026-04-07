# New Component Plan

## Chosen Component
Node-cron

## Why I Chose This Component
I chose Node-cron because it fits the theme of my Music Rehearsal Management API well. 
My project is focused on helping a band organize songs, setlists, and rehearsal sessions. 
Since rehearsals happen on scheduled dates, a scheduling component makes sense for this API. 
Node-cron can be used to run background tasks at specific times or intervals, which makes it a practical choice for reminders related to rehearsals.

## Practical Value to the Project
This component adds value because it can help users stay organized and prepared. 
In the future version of this API, Node-cron could check for upcoming rehearsals and trigger reminder logic before a rehearsal starts. 
For example, the system could look for rehearsals scheduled within the next 24 hours and prepare a reminder for band members or log a reminder event for later notification support. 
This would make the API more useful than simple CRUD because it would add automation based on rehearsal schedules.

## Planned Integration
I plan to integrate Node-cron into the back-end after the main CRUD features are complete.

The integration plan is:

1. Install and configure Node-cron in the project.
2. Create a scheduler module or service for reminder tasks.
3. Run a scheduled job at a fixed interval, such as every hour.
4. Query the rehearsals collection in Firestore.
5. Check for rehearsals happening soon based on the stored date field.
6. Identify which rehearsals need reminders.
7. Trigger reminder handling logic, such as logging reminder events or preparing notifications.
8. Keep this logic separate from the CRUD routes so it follows the layered structure of the project.

## Expected Workflow
The expected workflow is simple:
- a rehearsal is created with a date, location, goals, and setlist ID
- the scheduler runs on a fixed interval
- it checks the rehearsal dates in Firestore
- it finds rehearsals that are approaching soon
- it triggers reminder logic for those rehearsals

## What I Will Not Implement in Milestone 1
For Milestone 1, I am only documenting the research and integration plan. I will not implement the real scheduled reminder feature yet.

The following are being postponed:
- real reminder delivery
- email or SMS integration
- user notification preferences
- advanced scheduling controls
- retry logic for reminder failures

## Challenges and Considerations
There are a few challenges I will need to think about when implementing this later:

### 1. Time Zones
Rehearsals may be stored in a date format that needs careful handling across time zones. The reminder job must compare dates consistently.

### 2. Duplicate Reminders
The system should avoid sending or preparing the same reminder more than once for the same rehearsal.

### 3. Frequency of Scheduled Jobs
Running the scheduler too often can waste resources, while running it too rarely can delay reminders. I will need to choose a practical interval.

### 4. Scope of Reminder Logic
For the capstone, I need to keep the feature manageable. I may start with simple logging or internal reminder tracking before adding full notification support.

## Why This Is a Good Fit for My Capstone
This component is a good fit because it extends the API in a useful way without changing the main theme of the project. 
My API already manages rehearsals, so adding scheduled reminder logic is a natural extension. 
It also shows that I can research and plan a backend component beyond the main course examples while keeping the feature connected to the project's purpose.

## Summary
My chosen new backend component is Node-cron. I selected it because it fits a rehearsal scheduling system and adds practical automation to the API. 
In a later milestone, I plan to use it to check upcoming rehearsals and trigger reminder-related logic. For Milestone 1, this file documents the choice, practical value, and integration plan.