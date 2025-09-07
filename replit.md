# Overview

AgriSmart is an AI-powered agricultural recommendation platform designed to help farmers make informed decisions about crop selection and farming practices. The application combines real-time weather data, soil analysis, market prices, and machine learning algorithms to provide personalized crop recommendations that maximize farm profitability.

The platform features a modern web interface built with React and TypeScript, offering farmers an intuitive dashboard to input their farm parameters and receive tailored agricultural insights. The system integrates weather forecasting, market price tracking, and agricultural expertise to guide farmers toward optimal crop choices based on their specific conditions and resources.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using **React 18** with **TypeScript** and follows a component-based architecture. The application uses **Vite** as the build tool for fast development and optimized production builds. The UI is implemented with **shadcn/ui** components built on top of **Radix UI primitives**, providing a consistent and accessible design system.

**State Management**: The application uses **TanStack Query (React Query)** for server state management, providing caching, synchronization, and background updates for API data. Form state is managed using **React Hook Form** with **Zod** validation schemas.

**Styling**: The frontend uses **Tailwind CSS** for utility-first styling with a custom design system that includes CSS variables for theming. The design follows a "new-york" style variant from shadcn/ui.

**Routing**: Client-side routing is handled by **Wouter**, a lightweight alternative to React Router.

## Backend Architecture

The backend follows a **REST API** architecture built with **Express.js** and **TypeScript**. The server implements a clean separation of concerns with dedicated modules for routing, storage, and business logic.

**API Design**: RESTful endpoints handle crop recommendations, weather data retrieval, and market price information. The API includes proper error handling, request validation using Zod schemas, and structured JSON responses.

**Storage Layer**: The application uses an **interface-based storage abstraction** (`IStorage`) with a current in-memory implementation (`MemStorage`) for development. This design allows for easy migration to persistent databases without changing business logic.

**Data Models**: Strongly typed data models are defined using **Drizzle ORM** schemas, shared between frontend and backend through a common `shared/schema.ts` file.

## Development Environment

The application uses a **monorepo structure** with separate client and server directories. The development setup includes hot module replacement (HMR) for the frontend and automatic server restart for backend changes.

**Build Process**: Production builds are handled by Vite for the frontend and esbuild for the backend, creating optimized bundles for deployment.

# External Dependencies

## Database Technology

The application is configured to use **PostgreSQL** as the primary database with **Drizzle ORM** for database operations and migrations. The database connection is configured for **Neon Database** hosting service.

## UI Component Library

**shadcn/ui**: Provides pre-built, accessible UI components based on Radix UI primitives
**Radix UI**: Low-level UI primitives for building accessible design systems
**Tailwind CSS**: Utility-first CSS framework for styling

## State Management & Data Fetching

**TanStack Query**: Server state management, caching, and data synchronization
**React Hook Form**: Form state management and validation
**Zod**: Runtime type validation and schema definition

## Development Tools

**Vite**: Frontend build tool and development server
**TypeScript**: Static type checking and enhanced developer experience
**ESBuild**: Fast JavaScript bundler for backend builds
**Replit Integration**: Development environment integration for cloud-based coding

## Styling & Theming

**Tailwind CSS**: Utility-first CSS framework
**Class Variance Authority**: Utility for creating variant-based component APIs
**clsx**: Utility for constructing className strings conditionally

## Icons & Assets

**Lucide React**: Icon library providing consistent iconography
**Google Fonts**: Web fonts (Inter, DM Sans, Fira Code, Geist Mono)

The application architecture supports future integration with external APIs for weather data, market prices, and AI/ML services for crop recommendation algorithms.