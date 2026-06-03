# York University Event Aggregator App

## Motivation

York University students often miss campus events because information is scattered across multiple platforms such as Discord servers, Instagram pages, and club websites. The Event Aggregator App provides a centralized platform that automatically collects and organizes event data from these sources using web scraping and APIs (with permission). It gives students one location to find all upcoming social, and club events, helping them stay informed and engaged in campus life. The project exists to simplify event discovery, improve participation, and support both students and club organizers through automation and accessibility.

## Installation

### Required Tools and Programs

- Node.js (version 18 or higher)
- Next.js (version 15 or higher)
- npm (package management)
- Python 3.9 or higher (backend and scraping)
- Postgre (database)
- Git (version control)

### Setup Procedure

1. Clone the repository: `git clone https://github.com/EECS3311F25/project-yuevents.git // NOW git clone https://github.com/kyconf/project-yuevents.git due to GitHub Classroom removal`
2. Navigate to the path frontend/next-app: `cd frontend/next-app`
3. Install frontend dependencies: `npm install`
4. Start the development server: `npm start`
5. Run the backend setup script (completes all setup) in CMD: `cd ../../`, `cd backend`, `setup.bat`
6. Use pgAdmin to connect your personal DB instance
   - Backend in `database/connection.py`

## Contribution

### Workflow

The team uses Git Flow for version control. All changes are developed in separate branches and merged through pull requests after review.

### Branch Naming

- **main**: stable branch for final releases or submissions
- **dev**: active development branch
- **feature/<name>**: new features (for example, `feature/calendar-view`)
- **bugfix/<description>**: fixes or patches (for example, `bugfix/api-error`)
- **docs/<change>**: documentation updates

### Process

1. Create a new branch from dev for your task
2. Commit changes with clear messages
3. Push the branch to GitHub and open a pull request into dev
4. Another team member reviews the pull request
5. Once approved and tested, merge into main

### Issue Tracking

The team uses GitHub Issues to manage:

- Bugs and errors
- New features
- Assigned tasks

Each issue is labeled (frontend, backend, scraping, documentation) and assigned to a specific team member
