# CMD System — Master Context Document
## California Modernist Design Operational System

**Version**: 2.1  
**Last Updated**: December 2, 2025  
**Status**: Development (MVP Phase)

---

## Executive Summary

CMD is an internal operational system for California Modernist Design, a Malibu-based architectural firm specializing in modernist residential projects. The system manages approximately 10 concurrent projects, with particular complexity around fire reconstruction work and multi-agency permitting that can span 6-12 months with parallel reviews.

**Core Philosophy**: Create an "ontological membrane" that observes and captures work patterns without forcing behavioral changes. Federation over consolidation. Accommodation over transformation.

---

## Part I: Organization Context

### The Firm

**California Modernist Design**
- Location: Malibu, California
- Website: https://www.californiamodernist.com/
- Specialty: Modernist residential architecture
- Primary work: Fire reconstruction, new construction, major remodels
- Active projects: ~10 concurrent
- Primary geography: Malibu coastline (Carbon Beach, Point Dume, Malibu Road)

### Key Personnel

| Name | Role | Workflow Preference | System Implication |
|------|------|---------------------|-------------------|
| **Frank Tapia** | COO | Spreadsheet-native; lives in Google Sheets | Data Manager with AG Grid interface required |
| **Vitus Mataré** | Head Designer | Operates outside formal systems; tacit knowledge holder | "Vitus Problem" — capture mechanisms needed |
| **Sarah Chen** | Project Manager | Structured processes, documentation | Primary power user for dashboard |

### The Vitus Problem

Vitus holds essential institutional knowledge that exists nowhere in formal systems — client relationships, agency contact personalities, site-specific considerations, design rationale. The system must create observational capture mechanisms (voice transcription, photo capture, quick notes) that don't require him to change behavior.

---

## Part II: Technical Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Database** | Supabase (PostgreSQL + PostGIS) | Primary data store with spatial extensions |
| **Backend** | Supabase Auth + RLS | Authentication, row-level security |
| **Frontend** | React 18 + Vite | Component-based UI |
| **Mapping** | Mapbox GL JS v3 | High-fidelity GIS (satellite, terrain, 3D) |
| **Design** | Platform-native typography | SF Compact Display, system fonts with fallbacks |

### Supabase Instance

```
Project ID: jycoijxszddtpzefvgfw
URL: https://jycoijxszddtpzefvgfw.supabase.co
Region: (Configured)
```

**Auth Status**: Email/password enabled; Google OAuth pending domain configuration.

### Environment Variables

```env
VITE_SUPABASE_URL=https://jycoijxszddtpzefvgfw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_MAPBOX_TOKEN=pk.eyJ1IjoidHJ1b25ncGhpbGxpcHRoYW5oIiwiYSI6ImNtaWdtaWhzaTA4ZWkzZXBsMXlocmZkZGIifQ.02JrRcL3oBb0GapLvvfpPg
```

---

## Part III: Data Model

### Core Entities

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    PERSONS      │──────▶│  CONTACT_ROLES  │◀──────│  ORGANIZATIONS  │
└─────────────────┘       └─────────────────┘       └─────────────────┘
        │                         │                         │
        │                         ▼                         │
        │                 ┌─────────────────┐               │
        │                 │   PROJECT_TEAM  │               │
        │                 └─────────────────┘               │
        │                         │                         │
        ▼                         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    PARCELS      │◀──────│    PROJECTS     │──────▶│    AGENCIES     │
└─────────────────┘       └─────────────────┘       └─────────────────┘
                                  │
            ┌─────────────────────┼─────────────────────┐
            ▼                     ▼                     ▼
    ┌───────────────┐     ┌───────────────┐     ┌───────────────┐
    │   DOCUMENTS   │     │    TICKETS    │     │    EVENTS     │
    └───────────────┘     └───────────────┘     └───────────────┘
```

### Role Taxonomy

**Primary Roles** (enum):
- `client` — Property owner commissioning work
- `team_member` — CMD internal staff
- `consultant` — External professionals (engineers, surveyors)
- `agency_contact` — Government/utility contacts
- `vendor` — Suppliers, contractors

**Specializations** (enum):
- Engineering: `structural`, `geotechnical`, `civil`, `mep`, `survey`
- Design: `landscape`, `environmental`, `coastal`
- Agency: `planning`, `building`, `fire`, `dph`, `coastal_commission`, `geo`, `public_works`, `water_district`
- Internal: `design`, `project_management`, `drafting`, `operations`, `admin`

### Project Lifecycle

**Phases** (sequential):
```
STU → RSK → SOL → PTH → PLN → CHK → APP → ISS → PRM → CON → FNL
Study  Risk  Solutions Path Planning Plan  Approvals Issue Permit Construction Final
                              Review  Check          Resolution Issuance
```

**Status States** (concurrent):
- `prospective` — Initial inquiry
- `active` — Work in progress
- `waiting` — Pending external response
- `blocked` — Critical issue stopping progress
- `on_hold` — Paused by client
- `complete` — Finished
- `cancelled` — Terminated

### Agency Review Model

Malibu permits require parallel review by 6 agencies:

| Code | Agency | Typical Timeline |
|------|--------|------------------|
| PLN | City of Malibu Planning | 8-12 weeks |
| BLDG | City of Malibu Building & Safety | 4-6 weeks |
| FIRE | LA County Fire | 2-4 weeks |
| WWD29 | West Waterworks District 29 | 2-3 weeks |
| CCC | California Coastal Commission | 6-12 months (if triggered) |
| GEO | Geotechnical Review | 3-4 weeks |

Each project tracks `project_agency_status` with:
- Current status (not_started → submitted → in_review → corrections_requested → approved)
- Correction rounds count
- Last activity date
- Case/tracking numbers

---

## Part IV: UI Architecture

### Design System

**Typography** (Platform-Native with Fallbacks):
```css
--font-display: "SF Compact Display", "Roboto Condensed", "Bebas Neue", sans-serif;
--font-sans: -apple-system, "Roboto", "Segoe UI", system-ui, sans-serif;
--font-mono: "SF Mono", "Roboto Mono", "Cascadia Code", "Fira Code", monospace;
--font-serif: "New York", "Roboto Serif", Georgia, serif;
```

**Color Palette**:
```javascript
status: {
  blocked: '#DC2626',    // Red — immediate attention
  waiting: '#D97706',    // Orange — pending external
  active: '#16A34A',     // Green — work in progress
  complete: '#6366F1'    // Purple — finished
}

zones: {
  coastal: '#0EA5E9',    // Blue — Coastal Zone overlay
  fire: '#EF4444',       // Red — Fire hazard zone
  landslide: '#8B5CF6'   // Purple — Landslide zone
}

stone: {
  50: '#FAFAF9',         // Page background
  100: '#F5F5F4',        // Card backgrounds
  200: '#E7E5E4',        // Borders
  // ... through 900
  900: '#1C1917'         // Maximum contrast
}
```

### Component Hierarchy

```
App
├── AuthScreen (login/signup)
└── CMDSystem (authenticated)
    ├── Header
    │   ├── MapIcon (home, left of search)
    │   ├── Logo → links to californiamodernist.com
    │   ├── SearchBar
    │   ├── FeatureIcons (Map, CRM, Comms, future expansions)
    │   └── UserInitials
    │
    ├── SpatialInterface (MapPage)
    │   ├── MapboxMap
    │   ├── Sidebar (toggleable)
    │   │   ├── SidebarHeader (☰ List, ▤ Card, ▦ Photo)
    │   │   ├── ListView (Taschen-style names only)
    │   │   ├── CardView (Kanban-esque details)
    │   │   └── PhotoView (HoverCards in list form)
    │   ├── ProjectMarkers (with emphasis states)
    │   ├── HoverCard (on marker hover OR PhotoView hover)
    │   ├── ClickCard (on marker/sidebar click)
    │   ├── MalibuBeacon (center-bottom)
    │   ├── LayerPills (center-bottom, below beacon)
    │   └── ZoomPills + MapboxControls (bottom-right)
    │
    ├── ProjectDashboard (Modal)
    │   ├── OverviewTab
    │   ├── AgenciesTab
    │   ├── DocumentsTab
    │   └── TimelineTab
    │
    ├── CRMPage (split view)
    │   ├── ContactFilters
    │   ├── ContactList (full or 1/3 compressed)
    │   │   └── ContactRow (3 lines + icon counts)
    │   └── ContactDetail (2/3 panel when active)
    │
    ├── CommunicationsPage
    │   ├── GmailEmbed (left 2/3)
    │   └── InternalMessaging (right 1/3)
    │       ├── Bulletin
    │       ├── Channels
    │       └── DirectMessages
    │
    ├── DataManagerPage (AG Grid)
    │
    └── ClientPortal (simplified view)
```

### Navigation Model

- **Spatial-First**: Map is the default landing; "place as primary key"
- **Sidebar System**: Three view modes (List/Card/Photo) with hover coordination to map
- **Modal Depth**: Project dashboard opens as overlay, preserving spatial context
- **Split Views**: CRM uses 1/3 list + 2/3 detail; Communications uses embed + messaging
- **View Modes**: Internal (full detail) vs. Client (simplified, plain-language)

### Map Layout

```
CENTER-BOTTOM (stacked):
├── Malibu Beacon ("◉ Malibu, CA")
└── Layer Pills (Map | Satellite | Terrain)

BOTTOM-RIGHT (grouped):
├── Zoom Level Pills (COASTLINE | NEIGHBORHOOD | PARCEL)
└── Mapbox Controls (+/−)
```

---

## Part V: Current Implementation Status

### Completed (✓)

- [x] Database schema (Supabase migration)
- [x] Seed data (3 projects, contacts, agencies)
- [x] Mapbox integration with satellite/terrain
- [x] 3D zoom transitions (Coastline → Neighborhood → Parcel)
- [x] Project markers with status colors
- [x] Project dashboard (4 tabs)
- [x] Design token system
- [x] Mock data layer for UI development
- [x] Basic auth scaffolding

### In Progress (~)

- [ ] Sidebar system (List/Card/Photo views)
- [ ] CRM page with split view
- [ ] Map layout (beacon, layer pills, zoom pills placement)
- [ ] Supabase auth flow (email confirmation disabled needed)
- [ ] Communications page (scaffolded, needs Gmail integration)
- [ ] Data Manager (AG Grid integration pending)

### Planned (○)

- [ ] Real-time subscriptions (Supabase channels)
- [ ] Document versioning system
- [ ] Voice capture → transcription pipeline
- [ ] Client portal with filtered access
- [ ] Google OAuth integration
- [ ] Asset Management (ArchiCAD BIM Cloud connector)
- [ ] Project/Task Management (ClickUp-like features)

---

## Part VI: Sample Data

### Projects

| Name | Client | Address | Status | Phase | Zone |
|------|--------|---------|--------|-------|------|
| Miller Residence | Sarah Miller | 21500 Pacific Coast Hwy | waiting | PLN | Coastal |
| Chen Estate | David Chen | 6310 Malibu Road | active | CHK | Fire Zone |
| Nakamura House | Kenji Nakamura | 28900 Cliffside Dr | blocked | APP | Coastal, Fire Zone |

### Geographic Bounds

```javascript
MALIBU_GIS: {
  center: [-118.7798, 34.0259],
  views: {
    coastline: { zoom: 11, pitch: 0 },
    neighborhood: { zoom: 14.5, pitch: 45 },
    parcel: { zoom: 17.5, pitch: 60 }
  }
}
```

---

## Part VII: Development Workflow

### Parallel Execution Model

This project uses multiple Claude instances for parallel development:

| Instance | Role | Focus |
|----------|------|-------|
| **Claude 1 (Opus)** | High Command | Architecture, strategy, orchestration |
| **Claude 2 (Sonnet)** | Spatial | GIS, map, sidebar system |
| **Claude 3 (Sonnet)** | CRM | Contacts, communications, data manager |
| **Claude Code** | Executor | File operations, git, builds |
| **Gemini** | Analyst | Long-context analysis, QA |

### Task Packet Structure

When assigning work to executor instances:

```markdown
## TASK-[XXX]: [Name]
**Assigned**: Claude [N]
**Priority**: [P0-P3]
**Depends On**: [None | Task IDs]

### Context
[Minimal context needed to execute]

### Acceptance Criteria
- [ ] Specific, testable requirement
- [ ] Specific, testable requirement

### Style Guide Checkpoints
- [ ] Reference specific Part numbers from CMD_STYLE_GUIDE.md

### Files to Modify
- `path/to/file.jsx`

### Do Not Touch
- `path/to/protected/file.jsx`
```

### File Structure

```
cmd/
├── src/
│   ├── App.jsx              # Router + auth wrapper
│   ├── main.jsx             # Entry point
│   ├── components/
│   │   ├── CMDSystem.jsx    # Main authenticated wrapper
│   │   ├── MapPage.jsx      # Spatial interface
│   │   ├── Sidebar.jsx      # List/Card/Photo views
│   │   ├── ProjectMarker.jsx
│   │   ├── HoverCard.jsx
│   │   ├── ClickCard.jsx
│   │   ├── CRMPage.jsx      # Split view contacts
│   │   ├── ContactRow.jsx
│   │   ├── ContactDetail.jsx
│   │   ├── CommunicationsPage.jsx
│   │   ├── DataManagerPage.jsx
│   │   └── AuthScreen.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useData.js       # Supabase data hooks
│   └── lib/
│       ├── supabase.js      # Client config
│       ├── tokens.js        # Design system
│       └── mockData.js      # Development data
├── .env
├── package.json
├── vite.config.js
└── index.html
```

---

## Part VIII: Quick Reference

### Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run Supabase SQL
# Dashboard → SQL Editor → New Query → Paste → Run
```

### Auth Troubleshooting

If signup fails:
1. Supabase Dashboard → Authentication → Providers → Email
2. Disable "Confirm email"
3. Save
4. Retry signup

### Key URLs

- Supabase Dashboard: `https://supabase.com/dashboard/project/jycoijxszddtpzefvgfw`
- Auth Providers: `/auth/providers`
- SQL Editor: `/sql/new`
- CMD Website: `https://www.californiamodernist.com/`

---

## Part IX: Roadmap

### Phase 1: Foundation (Current)
- Implement sidebar system with three view modes
- Complete CRM with split view
- Stabilize auth flow
- Wire mock data to Supabase

### Phase 2: Core Features (Weeks 3-6)
- Data Manager with AG Grid
- Communications (internal messaging)
- Document management basics

### Phase 3: Integration (Weeks 7-10)
- Gmail API integration
- Voice capture + transcription
- Client portal access

### Phase 4: Advanced (Weeks 11-16)
- Asset Management (BIM Cloud connector)
- Project/Task Management
- Analytics and reporting
- Mobile optimization

---

## Part X: Appendices

### A. Agency Contact Intelligence

```
Maria Santos (Planning) — 15+ years at city, knows coastal overlay inside and out
Robert Kim (Building) — Thorough plan checker, 48hr email response, prefers detailed submittals
James O'Connor (Fire) — Fire flow expert, strict but fair, open to creative solutions
```

### B. Client Temperament Notes

```
Sarah Miller — Detail-oriented, prefers written updates, responds within 24 hours
David Chen — Busy executive, best to call mobile, decides quickly when reached
Kenji Nakamura — Fire victim, anxious about timeline, needs frequent reassurance
```

### C. Consultant Characteristics

```
Michael Rodriguez (Structural) — Very thorough, 2-week turnaround, good at client explanations
Malibu Geotechnical Associates — Recommended by City, good with landslide zones
```

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.1 | 2025-12-02 | Claude (Opus) | Typography stack, sidebar system, map layout, CRM split view |
| 2.0 | 2025-12-01 | Claude (Opus) | Complete synthesis from project threads |
| 1.0 | 2025-11-28 | Multiple | Initial PRD and prototypes |

---

*This document serves as the canonical cold-start context for any Claude instance working on the CMD project. All architectural decisions, data models, and implementation details are authoritative as of the version date.*
