# TripFlow

> **A simple trip planning application that helps you organize day-by-day itineraries and keep track of your travel budget.**

TripFlow is a lightweight, responsive trip planning application built as part of my AI Front-End Engineer internship at FlyRank AI.

Create a trip, set your dates and budget, add activities to specific days, estimate costs, manage your itinerary, and print the final plan — all without requiring an account, backend, database, or external API.

## Features

* **Trip Creation**
  Create a trip by entering a destination, start date, end date, and budget.

* **Automatic Day Generation**
  TripFlow automatically generates individual trip days from the selected date range.

* **Day-by-Day Itinerary**
  Organize activities under specific trip days for a clear chronological itinerary.

* **Activity Management**
  Add activities with an estimated cost and optional notes.

* **Edit & Delete Activities**
  Modify existing activities or remove them from the itinerary.

* **Budget Tracking**
  View daily costs, total estimated trip cost, remaining budget, and budget status.

* **Budget Status**
  Quickly see whether the planned trip is within budget, at budget, or over budget.

* **Responsive Design**
  Designed to work across desktop, tablet, and mobile screen sizes.

* **Printable Itinerary**
  Print the completed itinerary using the browser's native print functionality.

## How It Works

    Create Trip
        ↓
    Set Destination, Dates & Budget
        ↓
    Generate Trip Days
        ↓
    Add Activities
        ↓
    Estimate Activity Costs
        ↓
    Review Daily Itinerary
        ↓
    Track Total Budget
        ↓
    Print Itinerary

TripFlow keeps the experience intentionally simple. Users can plan a complete trip without creating an account or relying on external services.

## Tech Stack

### Frontend

* **React** — UI development and component-based architecture
* **JavaScript** — application logic
* **Vite** — development server and build tooling
* **CSS** — styling and responsive design

### Development & Deployment

* **Git** — version control
* **GitHub** — source code hosting
* **GitHub Copilot** — AI-assisted development
* **Vercel** — deployment

## Core Application Structure

    TripFlow
    ├── Trip Setup
    │   ├── Destination
    │   ├── Start Date
    │   ├── End Date
    │   └── Budget
    │
    ├── Trip Planning
    │   ├── Generated Trip Days
    │   ├── Activity Management
    │   └── Day-by-Day Itinerary
    │
    ├── Budget Tracking
    │   ├── Daily Costs
    │   ├── Total Estimated Cost
    │   ├── Remaining Budget
    │   └── Budget Status
    │
    └── Final Itinerary
        └── Print

## Trip & Activity Data

Each trip contains:

* Destination
* Start date
* End date
* Budget
* Generated trip days

Each activity can contain:

* Activity name
* Estimated cost
* Optional notes
* Assigned trip day

The application calculates daily and overall costs dynamically from the activity data.

## Validation & Edge Cases

TripFlow handles common invalid inputs, including:

* Empty destination
* Missing dates
* Invalid date ranges
* Negative or invalid budgets
* Empty activity names
* Negative or invalid activity costs
* Empty trip days
* Activity editing and deletion
* Budget overages

The application recalculates itinerary and budget information whenever activities are added, edited, or removed.

## Data & Persistence

TripFlow is intentionally a frontend-only application.

It does not use:

* Authentication
* Backend services
* Database storage
* External APIs

Trip information is maintained in React state during the current session.

Refreshing the page resets the current trip.

This approach keeps the application small and maintainable while satisfying the scope of the internship assignment.

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

You can verify the installations with:

    node --version
    npm --version
    git --version

### Installation

Clone the repository:

    git clone https://github.com/muhammadahsxn/tripflow.git

Navigate to the project directory:

    cd tripflow

Install dependencies:

    npm install

### Run the Development Server

Start the Vite development server:

    npm run dev

Open the local development URL provided by Vite, typically:

    http://localhost:5173

### Production Build

To create a production build:

    npm run build

To preview the production build locally:

    npm run preview

## Deployment

TripFlow is deployed using Vercel.

**Live Application:**

Add the deployed Vercel URL here after deployment.

## AI-Assisted Development

TripFlow was developed using **GitHub Copilot** as an AI development assistant.

AI was used throughout the development process for:

* Requirements analysis
* Application architecture
* Component planning
* State structure
* React implementation
* Feature development
* Validation
* Debugging
* UI refinement
* Code review
* Final testing

The development workflow followed:

    Requirements
        ↓
    Planning
        ↓
    AI-Assisted Implementation
        ↓
    Manual Review
        ↓
    Testing
        ↓
    Corrections
        ↓
    Refinement
        ↓
    Deployment

AI-generated code was reviewed and tested before being accepted into the application.

All prompts used during development are documented in [`PROMPT.md`](./PROMPT.md).

A detailed explanation of the AI-assisted workflow and manual improvements is available in [`AI-ASSISTANCE.md`](./AI-ASSISTANCE.md).

## Manual Improvements

AI was used as a development assistant rather than as an autonomous replacement for development.

The application was manually reviewed throughout implementation, including:

* Testing the complete trip creation flow
* Testing activity creation, editing, and deletion
* Checking budget calculations
* Testing invalid inputs and edge cases
* Reviewing responsive layouts
* Testing the print experience
* Reviewing generated code
* Removing unnecessary complexity
* Running the production build before deployment

Project scope was deliberately controlled to keep TripFlow focused on the assignment rather than turning it into a full travel platform.

## Design Goal

TripFlow was designed around one simple idea:

**Plan your trip without the overhead.**

The interface focuses on:

* Clear information hierarchy
* Simple trip setup
* Easy activity management
* Day-by-day organization
* Immediate budget feedback
* Responsive usability
* Minimal visual clutter

The goal was to create a small application that feels like a useful product rather than simply demonstrating React forms.

## Roadmap

Future development could include:

* [ ] Local storage persistence
* [ ] Weather information
* [ ] Map integration
* [ ] Destination recommendations
* [ ] Activity recommendations
* [ ] Drag-and-drop itinerary planning
* [ ] PDF itinerary export
* [ ] Trip sharing
* [ ] User accounts and cloud storage

These features are intentionally outside the scope of the current assignment.

## Project Status

**Completed MVP**

The current version includes:

* Trip creation
* Automatic day generation
* Activity management
* Day-by-day itinerary
* Budget tracking
* Validation
* Responsive UI
* Print functionality
* Production build
* Vercel deployment

## Internship Context

TripFlow was developed as part of my **AI Front-End Engineer internship at FlyRank AI**.

The project focuses on demonstrating practical React development while using AI as a development assistant throughout planning, implementation, testing, and refinement.
