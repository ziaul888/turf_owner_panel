# Turf Management System

A comprehensive turf management system built with Next.js, TypeScript, and modern UI components.

## Features

- **Field Management**: Track multiple turf fields with detailed information
- **Maintenance Scheduling**: Plan and track maintenance activities
- **Usage Analytics**: Monitor field usage patterns and statistics
- **Weather Integration**: Weather-aware maintenance recommendations
- **Irrigation Management**: Track watering schedules and soil conditions
- **Equipment Tracking**: Manage maintenance equipment and supplies

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/
│   └── (main)/
│       └── dashboard/
│           ├── turf/              # Turf management pages
│           │   ├── fields/        # Field management
│           │   ├── maintenance/   # Maintenance scheduling
│           │   ├── analytics/     # Usage analytics
│           │   └── irrigation/    # Irrigation management
├── components/
│   ├── ui/                        # Reusable UI components
│   └── turf/                      # Turf-specific components
├── lib/
│   ├── turf/                      # Turf management utilities
│   └── validations/               # Zod schemas
└── types/
    └── turf.ts                    # Type definitions
```