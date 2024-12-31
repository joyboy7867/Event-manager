# Dynamic Event Calendar Application

## Summary of Features
The **Dynamic Event Calendar Application** allows users to view and manage events on a calendar grid. Key features include:

- **Calendar View**: Displays a calendar grid for the current month with the ability to navigate between months.
- **Event Management**:
  - Add, edit, and delete events for any selected date.
  - Each event includes:
    - Event name
    - Start time and end time
    - Optional event description
  - Events are stored in **localStorage** to persist data between page refreshes.
- **Event List**: View all events for a selected day in a modal or side panel.
- **Data Export**: Export the event list for a specific month as a **JSON** or **CSV** file.
- **Prevent Overlapping Events**: The app ensures that events do not overlap by comparing start and end times.

## Instructions to Run the App Locally

Follow these steps to run the app locally on your machine:
### Steps:
1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   
Navigate to the project directory:


cd <project_directory>
Replace <project_directory> with the folder name of your project.

Install the dependencies:


npm install
This will install all the necessary packages and dependencies for the project.

## Start the development server:

 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



## Deploy on Vercel

link --- https://event-manager-nu-two.vercel.app/
