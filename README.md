# TripFlow

> A simple, responsive trip planning application built as part of my AI Front-End Engineer internship at FlyRank AI.

## Overview

TripFlow is a lightweight, one-page trip planning application that helps users organize a trip itinerary and keep track of estimated expenses.

The application allows users to create a trip by entering a destination, travel dates, and a budget. They can then organize activities by day, estimate activity costs, manage their itinerary, monitor their total estimated spending, and print the final itinerary.

The project was intentionally kept simple and maintainable, without authentication, a backend, a database, or external APIs.

## Features

- Create a trip with:
  - Destination
  - Start date
  - End date
  - Trip budget
- Automatically generate trip days from the selected date range
- Add activities to specific trip days
- Add estimated costs for activities
- Add optional notes to activities
- Edit existing activities
- Delete activities
- View activities organized by day
- View estimated cost for each day
- View total estimated trip cost
- View remaining budget
- Clearly indicate whether the trip is within or over budget
- Form validation and basic edge-case handling
- Responsive design for desktop and mobile devices
- Print-friendly itinerary using the browser's native print functionality

## Tech Stack

- React
- JavaScript
- Vite
- HTML
- CSS
- Git
- GitHub
- Vercel
- GitHub Copilot

## Project Structure

```text
tripflow/
├── public/
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── AI-ASSISTANCE.md
├── PROMPT.md
├── README.md
├── package.json
└── ...