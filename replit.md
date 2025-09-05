# Overview

This is a romantic love letter website built as a full-stack application with a React frontend and Express backend. The application is designed as a personal, heartfelt digital experience featuring multiple pages dedicated to showcasing memories, photo galleries, love quotes, and personal letters. The website uses a warm, romantic design theme with pink/purple color schemes, floating hearts animations, and sparkle effects to create an intimate, loving atmosphere.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built using React with TypeScript, utilizing a component-based architecture with the following key decisions:

- **UI Framework**: Uses shadcn/ui components built on top of Radix UI primitives for consistent, accessible design
- **Styling**: Tailwind CSS with custom romantic color scheme and typography including Dancing Script and Poppins fonts
- **Routing**: Wouter for lightweight client-side routing with pages for Home, Memories, Gallery, and Letter
- **State Management**: TanStack React Query for server state management with custom query client configuration
- **Animations**: Custom CSS animations for floating hearts, sparkle effects, and romantic interactions

## Backend Architecture
The backend follows a minimal Express.js setup with the following design patterns:

- **Framework**: Express.js with TypeScript for type safety
- **Storage Interface**: Abstract storage interface (IStorage) with in-memory implementation for development
- **Route Organization**: Centralized route registration with API prefix convention
- **Error Handling**: Global error middleware for consistent error responses
- **Development Setup**: Vite integration for hot module replacement in development

## Data Storage
Currently implements an in-memory storage solution with plans for database integration:

- **ORM**: Drizzle ORM configured for PostgreSQL with schema definitions
- **Schema**: User table with basic authentication fields (id, username, password)
- **Migration**: Drizzle Kit for database schema management
- **Development Storage**: In-memory Map-based storage for rapid development iteration

## Authentication and Authorization
Basic user authentication structure is prepared but not fully implemented:

- **User Model**: Simple user schema with username/password fields
- **Validation**: Zod schemas for type-safe data validation
- **Session Management**: Prepared for session-based authentication (connect-pg-simple dependency present)

# External Dependencies

## UI and Styling
- **shadcn/ui**: Complete UI component library built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework with custom romantic theme
- **Radix UI**: Accessible component primitives for dialogs, dropdowns, navigation
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Dancing Script and Poppins fonts for romantic typography

## Database and ORM
- **Drizzle ORM**: Type-safe ORM for PostgreSQL database operations
- **@neondatabase/serverless**: Neon database driver for serverless PostgreSQL
- **Drizzle Kit**: Database migration and schema management tools

## Development Tools
- **Vite**: Build tool and development server with React plugin
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast bundling for production builds
- **@replit/vite-plugin-runtime-error-modal**: Replit-specific development tools
- **@replit/vite-plugin-cartographer**: Code navigation and mapping tools

## State Management and Data Fetching
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management with validation
- **@hookform/resolvers**: Integration between React Hook Form and validation libraries

## Utilities and Helpers
- **date-fns**: Date manipulation and formatting
- **clsx & class-variance-authority**: Conditional CSS class management
- **nanoid**: Unique ID generation for various use cases