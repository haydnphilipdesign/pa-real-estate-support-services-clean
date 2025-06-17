# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `npm run dev` - Start Vite dev server on all network interfaces (0.0.0.0:5173)
- `npm run dev:server` - Start Express server with nodemon for development
- `npm run dev:full` - Run both frontend and backend concurrently
- `npm run build` - Build production bundle with Vite
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run lint` - Run ESLint with TypeScript support and unused imports detection
- `npm run type-check` - Run TypeScript compiler without emitting files

### Production
- `npm run start:prod` - Start production server
- `npm run server` - Start Express server in production mode

## Architecture Overview

### Technology Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router v6 with BrowserRouter
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom wrappers
- **State Management**: React Query + Context API + useReducer pattern
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Backend**: Express.js server in `/server/`
- **Database**: Airtable integration for data management
- **PDF Generation**: jsPDF + Puppeteer with custom templates

### Project Structure
```
/src/
├── components/          # Reusable UI components
│   ├── ui/             # Base design system components (Radix UI wrappers)
│   ├── TransactionForm/ # Multi-step transaction form components
│   └── [FeatureName]/  # Feature-specific component groups
├── pages/              # Route-level page components
├── hooks/              # Custom React hooks
├── context/            # React context providers and state management
├── utils/              # Utility functions and API services
├── types/              # TypeScript type definitions
├── styles/             # CSS files and design tokens
├── services/           # External API integrations (Airtable, PDF, Email)
└── providers/          # App-wide provider configuration

/server/                # Express.js backend
/templates/             # HTML templates for PDF generation
/api/                   # API endpoints and utilities
```

### Key Architectural Patterns

#### State Management
- **Form State**: Complex transaction forms use useReducer with TypeScript actions
- **Server State**: React Query handles API caching and synchronization
- **UI State**: Multiple specialized contexts (e.g., TransactionFormContext, GlobalSlideshowContext)
- **Provider Composition**: Centralized in `AppProviders.tsx` with proper nesting order

#### Component Organization
- **Design System**: Complete UI library in `/src/components/ui/` based on Radix UI
- **Feature Modules**: Complex features get dedicated directories with sub-components
- **Page Components**: Simple route-level components that compose feature components
- **Error Boundaries**: Multi-level error handling with graceful fallbacks

#### Type Safety
- **Business Entities**: Comprehensive TypeScript interfaces for domain models
- **API Integration**: Type-safe Airtable field mappings and service layer
- **Form Validation**: Zod schemas with TypeScript integration
- **Component Props**: Strict typing with proper prop interfaces

## Business Domain Context

This is a **real estate transaction support services application** that:

1. **Generates PDF Cover Sheets**: Automated document generation from Airtable data
2. **Manages Transaction Forms**: Multi-step forms for buyer/seller/dual agent transactions
3. **Integrates with Airtable**: Full CRUD operations with field mapping for client data
4. **Handles Email Automation**: PDF delivery via Make.com webhooks
5. **Provides Professional UI**: Glass morphism design system with animations

### Critical Business Components

#### TransactionForm System
- Multi-step wizard with progress tracking
- Role-based form variations (Buyer's Agent, Listing Agent, Dual Agent)
- Real-time validation and error handling
- Signature capture and document management
- Commission calculation logic

#### PDF Generation Pipeline
- Server-side generation with Puppeteer in Express backend
- Client-side fallback with jsPDF
- Template-based system with field mapping
- Integration with Make.com for Airtable attachment handling

#### Airtable Integration
- Direct API integration with field ID mapping
- Data transformation between form state and Airtable schema
- Record creation and updates with proper error handling

## Development Guidelines

### File Editing Preferences
- **Always edit existing files** rather than creating new ones when possible
- **Follow existing patterns** in component structure, naming, and organization
- **Maintain TypeScript strict mode** compliance in all new code
- **Use existing UI components** from `/src/components/ui/` before creating new ones

### Code Style
- **Components**: Functional components with TypeScript interfaces
- **Hooks**: Custom hooks for complex logic, following `use[Name]` convention
- **Styling**: Tailwind CSS classes with responsive design patterns
- **State**: Use React Query for server state, Context/useReducer for complex local state
- **Validation**: Zod schemas with React Hook Form integration

### Testing and Quality
- **Type Checking**: Always run `npm run type-check` before committing
- **Linting**: Use `npm run lint` to catch code quality issues
- **Build Verification**: Run `npm run build` to ensure production readiness

### Environment Configuration
- **Development**: Uses `.env.local` for environment variables
- **Production**: Configured for serverless deployment (Vercel compatible)
- **API Keys**: Airtable API key and base ID required for data operations
- **Webhooks**: Make.com webhook URL for PDF attachment automation

## Important Airtable Field Mappings

Key field IDs used throughout the application:
- `fldOVyoxz38rWwAFy` - Agent Role
- `fld6O2FgIXQU5G27o` - MLS Number  
- `fldypnfnHhplWYcCW` - Property Address
- `fldSqxNOZ9B5PgSab` - Client Name
- `flddP6a8EG6qTJdIi` - Client Email
- `fldhrYdoFwtNfzdFY` - PDF Attachment (for Make.com integration)

## Common Development Tasks

### Adding New Transaction Form Steps
1. Create step component in `/src/components/TransactionForm/`
2. Add step configuration to `FORM_STEPS` array
3. Update form state interface in context
4. Add validation schema if needed

### Modifying PDF Templates
1. Edit HTML templates in `/templates/` directory
2. Update field mappings in `pdfGenerator.ts` if new fields added
3. Test PDF generation with `npm run dev:server`

### Adding UI Components
1. Check if Radix UI primitive exists for base functionality
2. Create wrapper component in `/src/components/ui/`
3. Follow existing patterns for styling and TypeScript interfaces
4. Export from appropriate index files