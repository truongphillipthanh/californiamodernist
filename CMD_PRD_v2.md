# California Modernist Design Operational System
## Product Requirements Document v2.0

---

## Executive Summary

This document specifies a unified operational system for California Modernist Design (CMD), an architectural practice specializing in Malibu modernist residential projects. The system exists at the intersection of architectural practice management, geospatial information systems, regulatory compliance navigation, relationship management, and knowledge preservation.

The system is simultaneously:

- **A geospatially indexed, ontology-driven project operating system** that makes the studio's internal world coherent despite external regulatory chaos
- **A transition from document-driven, person-dependent workflows** to an information-centric, spatially indexed, versioned, multi-actor system
- **An ontological membrane** around CMD's operations that observes how work happens and makes it legible
- **A relationship management platform** that tracks all actors—clients, consultants, agencies, team members—and their interactions across projects
- **A communications hub** that centralizes internal coordination and external correspondence
- **A data management interface** that allows bulk operations for those who think in spreadsheets

These are not competing definitions but complementary perspectives on the same system.

---

## Part I: The Territory

### 1.1 The Fundamental Entities

#### The Parcel

The immutable anchor—the source of almost every constraint faced. A piece of earth with a boundary, existing before client, project, or CMD. Its properties are discovered rather than created: zoning designation, topographic slope, proximity to mean high tide line (MHTL), landslide zones, fire flow capacity, coastal jurisdiction thresholds, utility availability.

Parcels serve as both geographic coordinates and regulatory containers. Each carries immutable environmental data (FEMA flood zones, California Coastal Commission jurisdiction, geological survey results) and mutable regulatory status (current zoning, variance history, agency approvals). The parcel is simultaneously a physical location, a legal entity, and a regulatory territory with overlapping jurisdictional claims from multiple agencies.

#### The Project

An intention applied to a parcel—a client's desire for something to exist on that piece of earth that doesn't exist yet. The container for that intention as it moves through time, serving as the central anchor object to which all other entities relate.

Each project encompasses a BIM model, a permit path, a client relationship, and a historical timeline. Projects move through distinct workflow phases: Study, Risk Assessment, Solutions, Path, Planning, Design, Coordination, Permit Processing. These phases reflect internal work states, while permitting status reflects external regulatory states—the two progress semi-independently and must be continuously reconciled.

#### The Document

Exists in two fundamentally different states that must be distinguished:

- **Working documents** are alive—changing, annotated, extracted, recombined
- **Submitted documents** are frozen—what was sent to Planning on a specific date cannot change retroactively without breaking the chain of custody

Documents include drawing sets, reports, stamped versions, correspondence, approvals, corrections, BIM models (ArchiCAD 24 files), consultant submissions, agency responses, and napkin sketches. Documents must be versioned and diffable, never overwritten without trace.

#### The Person

Appears in multiple roles across the system. The same human might be a client on one project, a neighbor on another, and a consultant on a third. The Person entity captures the human being; role-specific entities capture their function in specific contexts.

**Person attributes:**
- Identity (name, contact information)
- Organization affiliation(s)
- Communication preferences and patterns
- Response history and temperament notes
- Role assignments across projects

#### The Organization

A first-class entity distinct from Person. Firms, agencies, districts, and consultancies exist independently of their individual contacts. This enables:

- Tracking relationships with firms before identifying specific contacts
- Maintaining institutional knowledge when contacts change
- Grouping multiple contacts under a single organizational umbrella
- Recording organizational patterns (response times, preferences, historical precedents)

**Organization attributes:**
- Name and type (DesignFirm, EngineeringFirm, Agency, WaterDistrict, Utility, etc.)
- Contact methods (phone, email, address, website)
- Associated persons (with role designations)
- Default contact (when known)
- Historical interaction patterns

#### The Contact Role

The intersection of Person, Organization, and functional category. A Contact Role captures:

- **Primary role**: Client, TeamMember, Consultant, AgencyContact, Vendor
- **Specialization** (for Consultants): Structural, Geotechnical, MEP, Landscape, Civil, Survey, Soils, Environmental, Coastal, Fire/Life Safety
- **Specialization** (for Agency): Planning, Building, Fire, DPH, Coastal, GEO, Public Works
- **Project associations**: Active and historical

#### The Agency

An external actor with its own logic, operating as a "personified authority" in many cases. Each has:

- Review states and expected durations
- Document expectations and submission requirements
- Response patterns and historical data
- Personnel relationships (key contacts)
- Jurisdictional boundaries
- Historical precedents and preferences

The system cannot control agency behavior but must track it: how long you've been waiting, comparison to historical norms, identification of stuck projects requiring follow-up.

#### The Communication

Everything that isn't a formal document but carries meaning: phone calls, emails, meetings, text messages, informal conversations. Most institutional knowledge lives in communications never formally recorded.

**Communication attributes:**
- Timestamp and duration
- Participants (Persons)
- Mode (email, phone, meeting, text, in-person)
- Content/transcript/summary
- Links to relevant entities (projects, milestones, tickets)
- Follow-up items generated

#### The Event

Captures interactions and state changes: meetings, site visits, phone calls, agency submissions, document uploads, approval receipts. Each event triggers:

- State updates in relevant entities
- Notifications to responsible actors
- Version commits for involved assets
- Logged traces for audit

#### The Ticket

Crystallizes a concern—something needing attention, assigned to someone, with a resolution state. Tickets transform informal knowledge ("we need to figure out the fire flow situation") into tractable work.

**Ticket attributes:**
- Description and context
- Priority (critical, high, medium, low)
- Status (todo, in_progress, blocked, done)
- Assignee and assigner
- Due date
- Links to originating communications, projects, documents
- Resolution notes

#### The Milestone

A threshold crossing, a transformation of state. When Planning stamps approval on a drawing set, it's not merely a date—it's a state transition. Milestones are the joints in the skeleton of a project:

- Target date and actual date
- Responsible parties
- Dependencies (what must happen first)
- Required documents
- Blocking relationships

#### The Decision

An explicit object rather than being buried in emails or conversations:

- What was decided
- By whom, when
- Based on what information
- Affecting which projects or entities
- Rationale and context

Making decisions first-class entities prevents lost context and enables decision review.

#### The Asset

Drawing sets, BIM models, PDFs, consultant reports, stamped documents, correspondence, and napkin sketches. Assets must be:

- Versioned with immutable commits
- Branched for parallel work streams
- Diffable where possible (PDF diffing, BIM diffing)
- Access-controlled to restrict destructive edits
- Tracked for chain of custody

---

### 1.2 The Two Key Operational Problems

#### The Vitus Problem: Managing Analog Genius

The Head Designer operates outside systems because his value comes precisely from that position. He has tacit knowledge that can't be easily written down, relationships that work because they're personal not procedural, and produces outputs through processes opaque even to himself.

The system's relationship to Vitus is observational, not prescriptive. It watches the boundary:

- When a document leaves the fortress (gets submitted to an agency), it gets frozen and versioned
- When Vitus modifies something, the system doesn't stop him—it notices and creates a branch
- The original remains intact; his modification becomes a new version with lineage
- Accept that Vitus works analog; when he draws on a plan, that paper must be scanned immediately
- Treat manual markups as layer/overlay on top of versioned PDF, not replacement
- Dedicated mobile interface for photographing sketches and tagging them to projects immediately

#### The Frank Problem: Empowering the Spreadsheet Native

The COO operates as "every single brick" of the system—the one who will actually manage data day-to-day. His fluency is in Excel, VBA, and Smartsheet. The system must meet him where he is while providing the benefits of structured data.

**Solution: The Data Manager Interface**

A spreadsheet-native UI component within the application providing:

- Tabular views of all major entities (Projects, Contacts, Organizations, Documents, Tickets)
- Inline editing with immediate persistence
- Bulk selection and batch operations
- Column sorting, filtering, and grouping
- Export to CSV/Excel for offline analysis
- Import capability for bulk updates
- Familiar keyboard navigation (Tab, Enter, arrow keys)
- Cell validation with immediate feedback

This keeps Frank in the system while giving him the grid paradigm that matches his mental model.

---

### 1.3 Regulatory Process as State Space

The Malibu permitting process is a map of a state space with approximately 50+ discrete states and branching conditions. Each box in the flowchart is a state a project can be in. Each arrow is a transition.

**Key characteristics:**

- Multiple agencies operate asynchronously (Planning, Building & Safety, Fire, DPH, Coastal, GEO, Public Works)
- Each agency has its own review state and document expectations
- Agencies don't coordinate with each other—that burden falls entirely on the architect
- Many "WAIT-FOR-EMAIL" states where projects can stall indefinitely
- Parallel tracks must eventually synchronize before permit issuance

**Malibu vs. LA County:**
- Malibu: ~12 months, serial reviews, email-based handoffs, highly manual
- LA County (EPIC LA): ~6 months, more parallel processing, better automation

The system cannot make agencies respond faster, but it can:
- Track how long you've been waiting
- Compare to historical norms ("Planning usually responds in 3-4 weeks; we're at week 6")
- Surface projects that are stuck so someone can follow up
- Predict completion dates based on historical patterns

---

## Part II: System Architecture

### 2.1 Conceptual Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                   │
├──────────────┬──────────────┬───────────────┬──────────────────────────┤
│   Spatial    │     CRM      │ Communications│     Data Manager         │
│  Interface   │    Page      │     Page      │    (Spreadsheet)         │
├──────────────┼──────────────┼───────────────┼──────────────────────────┤
│   Project    │    Client    │               │                          │
│  Dashboard   │    Portal    │               │                          │
└──────────────┴──────────────┴───────────────┴──────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           API LAYER                                      │
├─────────────────────────────────────────────────────────────────────────┤
│  Authentication  │  REST API (CRUD)  │  WebSocket Server  │  OAuth     │
│  (JWT + RBAC)    │  + Query Engine   │  (Realtime)        │  (Gmail)   │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                                     │
├─────────────────────────────────────────────────────────────────────────┤
│  PostgreSQL + PostGIS      │  Cloud Storage     │  Redis/Cache         │
│  (Entities, Spatial,       │  (Documents,       │  (Sessions,          │
│   Relationships)           │   Assets, Media)   │   Realtime State)    │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Layer Responsibilities

#### Spatial Index Layer
A 3D geospatial canvas as entry point where each parcel is a clickable entity. The 3D view is a UI lens over the structured database. Purpose: intuitive navigation plus immediate context (site slope, adjacency, jurisdiction lines, hazard zones).

#### Knowledge Graph Layer
The single source of truth. Each project node links to: Parcel, Client, DesignState (with version pointers to BIM), PermitProcess (decomposed into review tracks), Tasks, Assets (doc store + version metadata), Meetings (transcripts, notes), Decisions.

#### Process Engine Layer
Stateful workflows for permitting. Each agency or review represented as a state machine with events (upload, correction, approval, fee payment, meeting) and dependencies. Explicit state machines prevent phantom progress, missing handoffs, and silent waits.

#### Version-Controlled Asset Store
Immutable commits for drawing/document versions, branches for parallel work, auto-diff tools, access controls, automated chain of custody receipts.

#### Integration Layer
Connections to external systems: Gmail (OAuth + API), Calendar, City portals (structured human workflows where no API exists).

---

## Part III: Interface Specifications

### 3.1 Spatial Interface (Existing)

The primary navigation surface. A high-fidelity Mapbox implementation with:

**Views:**
- **Coastline** (zoom 11, 0° pitch): Entire Malibu coast, all project markers visible
- **Neighborhood** (zoom 14.5, 45° pitch): Neighborhood detail with perspective
- **Parcel** (zoom 17.5, 60° pitch): Individual parcels with dramatic 3D terrain

**Components:**
- Header with search, navigation, user avatar
- Floating filter bar (Status, Phase, Zone, Type)
- Project markers color-coded by status
- Popup cards on marker click with key metrics
- Sidebar with sortable project list
- Zoom level controls (COASTLINE | NEIGHBORHOOD | PARCEL)

**Interaction Model:**
- Click marker → popup card with summary
- "View Details" → Project Dashboard modal
- Sidebar project click → fly to location
- Filter selection → marker visibility updates

### 3.2 Project Dashboard

Full project view with tabbed interface:

**Tabs:**
- **Overview**: Status metrics, current phase, action items, agency summary, zones, project details
- **Agencies**: Review progression visualization, detailed status per agency, correction history
- **Documents**: Document tree with version indicators, submission history, working vs. submitted distinction
- **Timeline**: Chronological event feed, milestones, communications, state transitions

**Internal vs. Client View:**
- Internal view shows all operational details, blockers, internal notes
- Client view (Portal) shows sanitized progress, estimated timelines, required actions only

### 3.3 CRM Page (New)

A comprehensive contact and relationship management interface.

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  [☰]  California Modernist              [Search...]     [+] [👤] FT │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ [ALL] [CLIENT ▼] [ENGINEER ▼] [CONSULTANT ▼] [AGENCY ▼] [TEAM] ││
│  └─────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ [🔍 Search contacts...]                                         ││
│  └─────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────────────────────┬────────────────────────────┐│
│  │                                    │                            ││
│  │  CONTACT LIST (2/3 width)          │  DETAIL PANEL (1/3 width)  ││
│  │                                    │  (slides in from right)    ││
│  │  ┌──────────────────────────────┐  │                            ││
│  │  │ Sarah Miller                 │  │  [Full contact details]    ││
│  │  │ Client · Miller Residence    │  │  [Active projects]         ││
│  │  │ Last: Email on Nov 20, 2024  │  │  [Past projects]           ││
│  │  │ [📞] [💬] [✉️] [🌐]           │  │  [Waiting status]          ││
│  │  └──────────────────────────────┘  │  [Temperament notes]       ││
│  │                                    │  [Communication history]   ││
│  │  ┌──────────────────────────────┐  │  [Gmail filter button]     ││
│  │  │ Rodriguez Engineering        │  │                            ││
│  │  │ Engineer: Structural         │  │                            ││
│  │  │ ⚠️ No primary contact        │  │                            ││
│  │  │ [🌐]                          │  │                            ││
│  │  └──────────────────────────────┘  │                            ││
│  │                                    │                            ││
│  └────────────────────────────────────┴────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**Filter Bar:**
- Main category buttons filter to ALL contacts of that type
- Dropdown reveals subcategories:
  - **ENGINEER**: Structural, Geotechnical, Civil, MEP, Survey
  - **CONSULTANT**: Landscape, Environmental, Coastal, Soils, Fire/Life Safety
  - **AGENCY**: Planning, Building, Fire, DPH, Coastal, GEO, Public Works, Water District

**Contact List Cards:**
- Full name (or Organization name if no primary contact)
- Role and specialization
- Company/Organization
- Last correspondence: "[mode] on [full date + time]"
- Quick action icons: Call, Text, Email, Website
- Visual indicator for "awaiting us" / "awaiting them" / "awaiting third party"

**Detail Panel (slides in on contact click):**
- Full contact information
- Organization details
- Active project associations with role
- Past project associations
- Waiting status with context (who/what they're waiting on)
- Temperament/working style notes (free-form)
- Recent communication history (last 10)
- "Open in Gmail" button to filter email by contact

**Firm-Without-Person Handling:**
- Organizations can exist without any associated Person
- Display with "No primary contact" indicator
- Allow associating to projects as Organization
- When Person identified, create and link to existing Organization

### 3.4 Communications Page (New)

Centralized hub for all internal and external communications.

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  [☰]  California Modernist              [Search...]     [+] [👤] FT │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────────────────────┬────────────────────────────┐│
│  │                                    │                            ││
│  │  GMAIL EMBED (2/3 width)           │  INTERNAL MESSAGING        ││
│  │                                    │  (1/3 width)               ││
│  │  ┌──────────────────────────────┐  │                            ││
│  │  │                              │  │  [🏠] [👥] [💬] [🎫] [🔔]  ││
│  │  │   Gmail OAuth Embed          │  │                            ││
│  │  │   or                         │  │  ┌──────────────────────┐  ││
│  │  │   Custom Email Renderer      │  │  │                      │  ││
│  │  │                              │  │  │  Message Feed        │  ││
│  │  │                              │  │  │  (context-dependent) │  ││
│  │  │                              │  │  │                      │  ││
│  │  │                              │  │  │                      │  ││
│  │  │                              │  │  │                      │  ││
│  │  │                              │  │  │                      │  ││
│  │  │                              │  │  └──────────────────────┘  ││
│  │  │                              │  │                            ││
│  │  │                              │  │  ┌──────────────────────┐  ││
│  │  │                              │  │  │ [Type message...]    │  ││
│  │  └──────────────────────────────┘  │  └──────────────────────┘  ││
│  │                                    │                            ││
│  └────────────────────────────────────┴────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

**Gmail Section (2/3 width):**
- OAuth-authenticated Gmail embed or custom renderer
- Filter by contact, project, date range
- Link emails to projects/contacts from within interface
- Flag for follow-up, creating tickets

**Internal Messaging Section (1/3 width):**

Top navigation icons:
- **🏠 Home (Bulletin Board)**: Company-wide announcements, pinned items, general feed
- **👥 Channels**: Topic-based group channels (#miller-residence, #permits, #general)
- **💬 Direct Messages**: 1:1 or small group conversations

Bottom navigation icons:
- **🎫 Tickets**: Tasks assigned to current user, created by current user
- **🔔 Notifications**: Activity feed (comments on documents, downloads, mentions, status changes)

**Message Features:**
- Rich text with @mentions
- File attachments (linked to Asset store)
- Link to entities (projects, documents, contacts)
- Reactions/acknowledgments
- Thread replies

**Ticket View:**
- List of assigned tickets with priority indicators
- Quick status toggle (todo → in_progress → done)
- Link to originating context
- Due date visibility

**Notification Types:**
- Someone commented on a document you're watching
- Someone downloaded/cloned a file you own
- You were mentioned in a message
- A project you're on changed status
- A ticket was assigned to you
- An agency responded (email parsed)

### 3.5 Data Manager Page (New)

Frank's spreadsheet interface for bulk data operations.

**Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  [☰]  California Modernist              [Search...]     [+] [👤] FT │
├─────────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ [PROJECTS] [CONTACTS] [ORGANIZATIONS] [DOCUMENTS] [TICKETS]     ││
│  └─────────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ [+ Add Row] [⬇ Export CSV] [⬆ Import] [🗑 Delete Selected]     ││
│  └─────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │ ☐ │ Name          │ Status  │ Phase │ Client      │ Days │ ... ││
│  ├───┼───────────────┼─────────┼───────┼─────────────┼──────┼─────┤│
│  │ ☐ │ Miller Res... │ waiting │ CHK   │ Sarah Mill..│  23  │     ││
│  │ ☐ │ Chen Estate   │ active  │ PLN   │ David Chen  │  12  │     ││
│  │ ☑ │ Nakamura H... │ blocked │ ISS   │ Kenji Naka..│  45  │     ││
│  │   │               │         │       │             │      │     ││
│  │   │               │         │       │             │      │     ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
│  Showing 3 of 47 records │ [◀ Prev] [1] [2] [3] ... [Next ▶]       │
└─────────────────────────────────────────────────────────────────────┘
```

**Features:**
- Tab switching between entity types
- Column headers with sort (click) and filter (dropdown)
- Inline cell editing (double-click to edit, Tab/Enter to confirm)
- Checkbox selection for bulk operations
- Row-level actions (delete, duplicate, view details)
- Column resizing and reordering
- Sticky header row
- Pagination with configurable page size
- Bulk export to CSV/Excel
- Bulk import with validation preview
- Keyboard navigation (arrow keys, Tab, Enter, Escape)
- Undo/redo for recent changes
- Cell validation with error highlighting
- Quick filters (dropdowns in column headers)
- Saved filter presets

**Entity-Specific Columns:**

*Projects:*
Name, Status, Phase, Client, Address, Neighborhood, Days in Phase, Completion %, Type, Fire Rebuild, Zones, Current Blocker

*Contacts:*
Name, Role, Specialization, Organization, Email, Phone, Last Contact, Waiting Status, Active Projects

*Organizations:*
Name, Type, Website, Primary Contact, Phone, Email, Active Projects

*Documents:*
Name, Project, Type, Version, Status, Author, Created, Modified, Submitted Date

*Tickets:*
Title, Project, Status, Priority, Assignee, Created, Due Date, Assigner

### 3.6 Navigation Structure

**Primary Navigation (Header - persistent across all pages):**
- Hamburger menu (☰) → Sidebar with full navigation
- Logo/wordmark → Home (Spatial Interface)
- Global search
- Quick actions (+)
- User avatar with menu

**Top-Right Icon Bar:**
- User avatar (profile, settings, logout)

**Sidebar Navigation (on hamburger click):**
- **Map** (Spatial Interface) - Home
- **Projects** (List view alternative to map)
- **CRM** (Contacts & Organizations)
- **Communications** (Email + Internal messaging)
- **Data Manager** (Spreadsheet interface)
- **Documents** (Global document browser)
- **Reports** (Analytics & forecasting) [Future]
- **Settings** (User preferences, integrations)

---

## Part IV: Data Model

### 4.1 Core Entities Schema

```sql
-- =============================================================================
-- ORGANIZATIONS & PEOPLE
-- =============================================================================

CREATE TYPE org_type AS ENUM (
  'design_firm', 'engineering_firm', 'consulting_firm', 
  'agency', 'water_district', 'utility', 'contractor', 'other'
);

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type org_type NOT NULL,
  website VARCHAR(500),
  phone VARCHAR(50),
  email VARCHAR(255),
  address TEXT,
  notes TEXT,
  default_contact_id UUID REFERENCES persons(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE persons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  mobile VARCHAR(50),
  preferred_contact_mode VARCHAR(20), -- 'email', 'phone', 'text'
  temperament_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE person_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title VARCHAR(100),
  is_primary BOOLEAN DEFAULT false,
  UNIQUE(person_id, organization_id)
);

CREATE TYPE primary_role AS ENUM (
  'client', 'team_member', 'consultant', 'agency_contact', 'vendor'
);

CREATE TYPE specialization AS ENUM (
  -- Engineering
  'structural', 'geotechnical', 'civil', 'mep', 'survey',
  -- Consulting
  'landscape', 'environmental', 'coastal', 'soils', 'fire_life_safety',
  -- Agency
  'planning', 'building', 'fire', 'dph', 'coastal_commission', 
  'geo', 'public_works', 'water_district',
  -- Team
  'design', 'project_management', 'drafting', 'operations', 'admin',
  -- Other
  'general', 'other'
);

CREATE TABLE contact_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID REFERENCES persons(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  primary_role primary_role NOT NULL,
  specialization specialization,
  is_active BOOLEAN DEFAULT true,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- Either person or organization must be set, or both
  CONSTRAINT contact_has_entity CHECK (person_id IS NOT NULL OR organization_id IS NOT NULL)
);

-- =============================================================================
-- PARCELS & PROJECTS
-- =============================================================================

CREATE TABLE parcels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  apn VARCHAR(50) UNIQUE NOT NULL, -- Assessor's Parcel Number
  address TEXT,
  neighborhood VARCHAR(100),
  coordinates GEOGRAPHY(POINT, 4326),
  boundary GEOGRAPHY(POLYGON, 4326),
  zoning VARCHAR(50),
  lot_size_sqft INTEGER,
  -- Risk/constraint flags
  coastal_zone BOOLEAN DEFAULT false,
  fire_zone BOOLEAN DEFAULT false,
  landslide_zone BOOLEAN DEFAULT false,
  flood_zone VARCHAR(20),
  mhtl_proximity_ft INTEGER,
  -- Discovered constraints (JSON for flexibility)
  constraints JSONB DEFAULT '{}',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TYPE project_status AS ENUM (
  'prospective', 'active', 'waiting', 'blocked', 'on_hold', 'complete', 'cancelled'
);

CREATE TYPE project_phase AS ENUM (
  'STU', -- Study
  'RSK', -- Risk Assessment
  'SOL', -- Solutions
  'PTH', -- Path (permit strategy)
  'PLN', -- Planning Review
  'CHK', -- Plan Check
  'APP', -- Approvals
  'ISS', -- Issue Resolution
  'PRM', -- Permit Issuance
  'CON', -- Construction
  'FNL'  -- Final/Closeout
);

CREATE TYPE project_type AS ENUM (
  'new_construction', 'fire_rebuild', 'addition', 'renovation', 'adu'
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  parcel_id UUID REFERENCES parcels(id),
  client_contact_id UUID REFERENCES contact_roles(id),
  
  status project_status DEFAULT 'prospective',
  phase project_phase DEFAULT 'STU',
  phase_name VARCHAR(100),
  project_type project_type,
  
  sqft INTEGER,
  is_fire_rebuild BOOLEAN DEFAULT false,
  
  days_in_phase INTEGER DEFAULT 0,
  completion_percent INTEGER DEFAULT 0,
  
  -- Current blocker (denormalized for quick access)
  blocker_agency VARCHAR(50),
  blocker_description TEXT,
  
  -- Jurisdiction
  jurisdiction VARCHAR(50) DEFAULT 'City of Malibu',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE project_zones (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  zone_name VARCHAR(50) NOT NULL, -- 'Coastal', 'Fire Zone', 'Landslide'
  PRIMARY KEY (project_id, zone_name)
);

CREATE TABLE project_team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  contact_role_id UUID NOT NULL REFERENCES contact_roles(id),
  project_role VARCHAR(100), -- 'Lead Designer', 'PM', 'Structural Engineer', etc.
  is_active BOOLEAN DEFAULT true,
  start_date DATE,
  end_date DATE,
  UNIQUE(project_id, contact_role_id)
);

-- =============================================================================
-- AGENCIES & PERMIT TRACKING
-- =============================================================================

CREATE TABLE agencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  code VARCHAR(20) UNIQUE NOT NULL, -- 'PLN', 'BLDG', 'FIRE', 'DPH', 'GEO', 'COAST', 'PW'
  jurisdiction VARCHAR(50),
  typical_review_days INTEGER,
  portal_url VARCHAR(500),
  notes TEXT
);

CREATE TYPE agency_status AS ENUM (
  'not_started', 'submitted', 'in_review', 'corrections_requested',
  'corrections_submitted', 'approved', 'rejected', 'not_required'
);

CREATE TABLE project_agency_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  agency_id UUID NOT NULL REFERENCES agencies(id),
  status agency_status DEFAULT 'not_started',
  submitted_date DATE,
  last_activity_date DATE,
  correction_rounds INTEGER DEFAULT 0,
  estimated_completion DATE,
  primary_contact_id UUID REFERENCES contact_roles(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, agency_id)
);

-- =============================================================================
-- DOCUMENTS & ASSETS
-- =============================================================================

CREATE TYPE document_type AS ENUM (
  'drawing_set', 'report', 'permit', 'correspondence', 'photo',
  'sketch', 'bim_model', 'specification', 'contract', 'invoice', 'other'
);

CREATE TYPE document_status AS ENUM (
  'draft', 'ready', 'submitted', 'approved', 'corrections', 'superseded', 'archived'
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  
  name VARCHAR(255) NOT NULL,
  document_type document_type,
  status document_status DEFAULT 'draft',
  
  -- Version tracking
  version VARCHAR(20),
  parent_document_id UUID REFERENCES documents(id),
  is_submitted BOOLEAN DEFAULT false, -- Frozen flag
  submitted_date TIMESTAMPTZ,
  submitted_to VARCHAR(100), -- Agency name
  
  -- Storage
  storage_path VARCHAR(500),
  file_hash VARCHAR(64), -- SHA-256
  file_size_bytes BIGINT,
  mime_type VARCHAR(100),
  
  -- Metadata
  author_id UUID REFERENCES persons(id),
  description TEXT,
  tags TEXT[],
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE document_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  file_hash VARCHAR(64),
  change_description TEXT,
  created_by UUID REFERENCES persons(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(document_id, version_number)
);

-- =============================================================================
-- COMMUNICATIONS
-- =============================================================================

CREATE TYPE communication_mode AS ENUM (
  'email', 'phone', 'meeting', 'text', 'in_person', 'video_call', 'portal', 'other'
);

CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  
  mode communication_mode NOT NULL,
  direction VARCHAR(10), -- 'inbound', 'outbound', 'internal'
  subject VARCHAR(500),
  summary TEXT,
  full_content TEXT,
  
  occurred_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER,
  
  -- External reference (e.g., Gmail message ID)
  external_id VARCHAR(255),
  external_source VARCHAR(50),
  
  created_by UUID REFERENCES persons(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE communication_participants (
  communication_id UUID NOT NULL REFERENCES communications(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES persons(id),
  role VARCHAR(20), -- 'from', 'to', 'cc', 'attendee'
  PRIMARY KEY (communication_id, person_id)
);

-- =============================================================================
-- INTERNAL MESSAGING (Slack-like)
-- =============================================================================

CREATE TABLE channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_private BOOLEAN DEFAULT false,
  project_id UUID REFERENCES projects(id), -- Optional project association
  created_by UUID REFERENCES persons(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE channel_members (
  channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES persons(id),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (channel_id, person_id)
);

CREATE TABLE direct_message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE direct_message_participants (
  thread_id UUID NOT NULL REFERENCES direct_message_threads(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES persons(id),
  PRIMARY KEY (thread_id, person_id)
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Polymorphic: either channel or DM thread
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  dm_thread_id UUID REFERENCES direct_message_threads(id) ON DELETE CASCADE,
  
  author_id UUID NOT NULL REFERENCES persons(id),
  content TEXT NOT NULL,
  
  -- Reply threading
  parent_message_id UUID REFERENCES messages(id),
  
  -- Rich content
  attachments JSONB DEFAULT '[]', -- [{document_id, name, type}]
  mentions JSONB DEFAULT '[]', -- [person_id, ...]
  linked_entities JSONB DEFAULT '{}', -- {project_id, document_id, ticket_id}
  
  is_pinned BOOLEAN DEFAULT false,
  is_edited BOOLEAN DEFAULT false,
  edited_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT message_has_destination CHECK (
    (channel_id IS NOT NULL AND dm_thread_id IS NULL) OR
    (channel_id IS NULL AND dm_thread_id IS NOT NULL)
  )
);

CREATE TABLE message_reactions (
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES persons(id),
  emoji VARCHAR(20) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (message_id, person_id, emoji)
);

-- =============================================================================
-- TICKETS & TASKS
-- =============================================================================

CREATE TYPE ticket_status AS ENUM (
  'todo', 'in_progress', 'blocked', 'done', 'cancelled'
);

CREATE TYPE ticket_priority AS ENUM (
  'critical', 'high', 'medium', 'low'
);

CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
  
  status ticket_status DEFAULT 'todo',
  priority ticket_priority DEFAULT 'medium',
  
  assignee_id UUID REFERENCES persons(id),
  assigner_id UUID REFERENCES persons(id),
  
  due_date DATE,
  completed_at TIMESTAMPTZ,
  
  -- Source tracking
  source_communication_id UUID REFERENCES communications(id),
  source_message_id UUID REFERENCES messages(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ticket_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES persons(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- NOTIFICATIONS
-- =============================================================================

CREATE TYPE notification_type AS ENUM (
  'comment', 'download', 'assignment', 'mention', 'status_change',
  'agency_response', 'deadline', 'message'
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES persons(id),
  
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  
  -- Source entity (polymorphic)
  source_type VARCHAR(50), -- 'document', 'project', 'ticket', 'message', etc.
  source_id UUID,
  
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TIMELINE & EVENTS
-- =============================================================================

CREATE TYPE event_type AS ENUM (
  'milestone', 'submission', 'communication', 'decision', 'status_change',
  'document_upload', 'correction', 'approval', 'meeting', 'site_visit'
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  event_type event_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  
  occurred_at TIMESTAMPTZ NOT NULL,
  
  -- Related entities
  agency_id UUID REFERENCES agencies(id),
  document_id UUID REFERENCES documents(id),
  communication_id UUID REFERENCES communications(id),
  
  created_by UUID REFERENCES persons(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  target_date DATE,
  actual_date DATE,
  
  is_complete BOOLEAN DEFAULT false,
  
  -- Dependencies
  depends_on_milestone_id UUID REFERENCES milestones(id),
  
  responsible_contact_id UUID REFERENCES contact_roles(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- WAITING STATUS (for CRM)
-- =============================================================================

CREATE TYPE waiting_status AS ENUM (
  'none', 'awaiting_us', 'awaiting_them', 'awaiting_third_party'
);

CREATE TABLE contact_waiting_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_role_id UUID NOT NULL REFERENCES contact_roles(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  status waiting_status DEFAULT 'none',
  waiting_on_person_id UUID REFERENCES persons(id),
  waiting_on_org_id UUID REFERENCES organizations(id),
  description TEXT,
  
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(contact_role_id, project_id)
);

-- =============================================================================
-- USER ACCOUNTS & AUTH
-- =============================================================================

CREATE TYPE user_role AS ENUM (
  'admin', 'team', 'client', 'consultant', 'readonly'
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID NOT NULL REFERENCES persons(id),
  
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255), -- For email/password auth
  
  role user_role DEFAULT 'readonly',
  is_active BOOLEAN DEFAULT true,
  
  -- OAuth tokens (encrypted)
  gmail_refresh_token TEXT,
  
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- AUDIT LOG
-- =============================================================================

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  
  action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'view', 'export'
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  
  changes JSONB, -- {field: {old: x, new: y}}
  
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INDEXES
-- =============================================================================

CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_phase ON projects(phase);
CREATE INDEX idx_projects_parcel ON projects(parcel_id);
CREATE INDEX idx_projects_client ON projects(client_contact_id);

CREATE INDEX idx_parcels_coordinates ON parcels USING GIST(coordinates);
CREATE INDEX idx_parcels_apn ON parcels(apn);

CREATE INDEX idx_documents_project ON documents(project_id);
CREATE INDEX idx_documents_status ON documents(status);

CREATE INDEX idx_communications_project ON communications(project_id);
CREATE INDEX idx_communications_occurred ON communications(occurred_at);

CREATE INDEX idx_messages_channel ON messages(channel_id);
CREATE INDEX idx_messages_dm_thread ON messages(dm_thread_id);
CREATE INDEX idx_messages_created ON messages(created_at);

CREATE INDEX idx_tickets_assignee ON tickets(assignee_id);
CREATE INDEX idx_tickets_project ON tickets(project_id);
CREATE INDEX idx_tickets_status ON tickets(status);

CREATE INDEX idx_notifications_recipient ON notifications(recipient_id, is_read);

CREATE INDEX idx_events_project ON events(project_id);
CREATE INDEX idx_events_occurred ON events(occurred_at);

CREATE INDEX idx_contact_roles_person ON contact_roles(person_id);
CREATE INDEX idx_contact_roles_org ON contact_roles(organization_id);

CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_user ON audit_log(user_id);
```

### 4.2 Key Relationships Diagram

```
                              ┌─────────────┐
                              │   PARCEL    │
                              │  (anchor)   │
                              └──────┬──────┘
                                     │
                                     ▼
┌─────────────┐              ┌─────────────┐              ┌─────────────┐
│   PERSON    │◄────────────►│   PROJECT   │◄────────────►│   AGENCY    │
└──────┬──────┘              └──────┬──────┘              └─────────────┘
       │                            │
       ▼                            ▼
┌─────────────┐              ┌─────────────┐
│ORGANIZATION │              │  DOCUMENT   │
└─────────────┘              └─────────────┘
       │                            │
       ▼                            ▼
┌─────────────┐              ┌─────────────┐
│CONTACT ROLE │              │   VERSION   │
└──────┬──────┘              └─────────────┘
       │
       ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│COMMUNICATION│    │   MESSAGE   │    │   TICKET    │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       └──────────────────┼──────────────────┘
                          ▼
                   ┌─────────────┐
                   │    EVENT    │
                   │  (timeline) │
                   └─────────────┘
```

---

## Part V: Technology Stack

### 5.1 Recommended Stack

**Frontend:**
- React 18+ with TypeScript
- React Router for navigation
- Mapbox GL JS for spatial interface
- AG Grid for Data Manager spreadsheet views
- TanStack Query for data fetching/caching
- Tailwind CSS for styling

**Backend:**
- Supabase (hosted PostgreSQL + PostGIS + Auth + Realtime + Storage)
- Row Level Security (RLS) for authorization
- Edge Functions for custom logic (TypeScript/Deno)

**Integrations:**
- Google OAuth for Gmail access
- Gmail API for email embedding/parsing
- Supabase Realtime for WebSocket messaging

**Infrastructure:**
- Supabase manages hosting, scaling, backups
- Vercel or Netlify for frontend hosting
- Cloudflare for CDN and DDoS protection

### 5.2 Why Supabase

Supabase provides out-of-the-box:

1. **PostgreSQL + PostGIS**: Full SQL power with spatial extensions
2. **Authentication**: Email/password, OAuth (Google), magic links
3. **Row Level Security**: Fine-grained access control at database level
4. **Realtime**: WebSocket subscriptions for live updates (messaging, notifications)
5. **Storage**: S3-compatible object storage for documents
6. **Edge Functions**: Serverless functions for custom logic
7. **Auto-generated API**: REST and GraphQL APIs from schema
8. **Dashboard**: Admin UI for data management during development

This eliminates the need to stand up separate services for auth, realtime, and storage—all critical for your requirements.

### 5.3 Security Architecture

**Authentication:**
- JWT-based session management
- OAuth 2.0 for Google/Gmail integration
- Refresh token rotation
- Secure password hashing (bcrypt)

**Authorization:**
- Role-based access control (admin, team, client, consultant, readonly)
- Row Level Security policies in PostgreSQL
- Client portal sees only their projects and sanitized data
- Consultants see only projects they're assigned to

**Data Protection:**
- All data encrypted at rest (Supabase default)
- TLS 1.3 for data in transit
- Document storage with signed URLs (time-limited access)
- PII handling compliant with CCPA

**Audit:**
- All mutations logged with user, timestamp, IP, changes
- Document access logged
- Session management with expiration

---

## Part VI: Implementation Roadmap

### Phase 0: Foundation (Weeks 1-2)

**Objective:** Establish infrastructure and migrate existing prototype

**Tasks:**
1. Create Supabase project
2. Deploy database schema
3. Configure authentication (email/password + Google OAuth)
4. Set up Row Level Security policies
5. Migrate existing React code to proper project structure
6. Add React Router for navigation
7. Connect frontend to Supabase client
8. Seed sample data

**Deliverables:**
- Working auth flow (login, logout, session persistence)
- Database with sample data
- Frontend connected to backend
- Basic navigation between pages

### Phase 1: Core Data & CRM (Weeks 3-5)

**Objective:** CRM page fully functional with real data

**Tasks:**
1. Build CRM page layout
2. Implement contact list with filtering
3. Build detail panel with slide-in animation
4. Create/edit contact forms
5. Organization management (create without person)
6. Waiting status tracking
7. Project association management
8. Communication history display
9. Search functionality

**Deliverables:**
- Full CRM page with CRUD operations
- Contact filtering by role/specialization
- Organization-without-person support
- Waiting status indicators

### Phase 2: Data Manager (Weeks 6-7)

**Objective:** Frank's spreadsheet interface

**Tasks:**
1. Integrate AG Grid
2. Build tabbed interface for entity types
3. Implement inline editing with save
4. Bulk selection and operations
5. Column sorting and filtering
6. CSV export
7. CSV import with validation preview
8. Undo/redo stack

**Deliverables:**
- Data Manager page for all entities
- Bulk operations working
- Import/export functional
- Keyboard navigation

### Phase 3: Communications (Weeks 8-10)

**Objective:** Internal messaging and email integration

**Tasks:**
1. Build Communications page layout
2. Implement channel creation and management
3. Build message posting and threading
4. Real-time message delivery via Supabase Realtime
5. Direct message threads
6. Bulletin board (pinned messages, announcements)
7. @mentions with notifications
8. File attachments linked to Asset store
9. Gmail OAuth flow
10. Gmail embed or custom email renderer
11. Email-to-project linking

**Deliverables:**
- Working internal messaging (Slack-like)
- Notifications for mentions and activity
- Gmail integration for email viewing
- Ticket system accessible from comms

### Phase 4: Project Dashboard Enhancement (Weeks 11-12)

**Objective:** Full project dashboard connected to real data

**Tasks:**
1. Connect existing dashboard to Supabase
2. Agency status tracking with real data
3. Document management with upload/versioning
4. Timeline/event logging
5. Action items (tickets) integration
6. Milestone tracking

**Deliverables:**
- Project dashboard fully data-driven
- Document upload and versioning working
- Timeline populated from events
- Tickets visible in dashboard

### Phase 5: Client Portal (Weeks 13-14)

**Objective:** Secure client-facing view

**Tasks:**
1. Client role authentication
2. Row Level Security for client data filtering
3. Simplified dashboard view
4. Document sharing with client
5. Messaging channel with CMD team
6. Status notifications

**Deliverables:**
- Client login and portal access
- Sanitized project view
- Secure document access
- Client-team communication channel

### Phase 6: Polish & Launch Prep (Weeks 15-16)

**Objective:** Production readiness

**Tasks:**
1. Performance optimization
2. Error handling and logging
3. Mobile responsiveness audit
4. Security audit
5. Documentation
6. Team training
7. Data migration from Google Sheets
8. Soft launch with pilot projects

**Deliverables:**
- Production-ready system
- Documentation for team
- Frank onboarding complete
- 3-5 pilot projects in system

---

## Part VII: Success Metrics

### Operational Metrics

1. **Reduced client calls**: Target 50% reduction in "status check" calls within 6 months of client portal launch
2. **Zero lost documents**: No document version conflicts or missing files after Phase 4
3. **Agency tracking accuracy**: 100% of projects have current agency status within 24 hours of activity
4. **Response time visibility**: Every project shows "days waiting" on agencies

### Adoption Metrics

1. **Daily active users**: All team members using system daily within 4 weeks of launch
2. **Data entry compliance**: 90%+ of new contacts entered via CRM (not ad-hoc)
3. **Communication centralization**: 80%+ of internal coordination via system messaging within 8 weeks

### System Health Metrics

1. **Uptime**: 99.9% availability
2. **Page load**: <2 seconds for dashboard
3. **Search response**: <500ms
4. **Real-time latency**: <1 second for message delivery

---

## Part VIII: Open Questions & Future Considerations

### Near-term Decisions

1. **Gmail approach**: Full embed via iframe, or custom renderer pulling messages via API? Embed is faster but less integrated; custom renderer allows richer linking to projects.

2. **Mobile capture interface**: Progressive Web App sufficient, or native app needed? PWA can do photo capture and voice memos; native adds offline capability and push notifications.

3. **ArchiCAD integration**: File watcher on Synology for auto-versioning, or manual upload workflow? File watcher reduces friction but requires server-side agent.

### Future Capabilities

1. **Meeting transcription**: Whisper API integration for automatic transcription and action item extraction

2. **Email parsing**: Auto-detect project references in emails, suggest linking

3. **Predictive timelines**: ML model trained on historical agency response times

4. **LA County integration**: EPIC LA API integration for automated status updates

5. **Document diffing**: Visual diff for PDF drawing sets between versions

6. **Mobile field capture**: Dedicated interface for site photos with auto-tagging

---

## Appendix A: Contact Role Taxonomy

### Primary Roles

| Role | Description |
|------|-------------|
| Client | Property owner or their representative |
| Team Member | CMD internal staff |
| Consultant | External professional services |
| Agency Contact | Government/regulatory personnel |
| Vendor | Contractors, suppliers, service providers |

### Consultant Specializations

| Specialization | Typical Firms |
|----------------|---------------|
| Structural | Structural engineering firms |
| Geotechnical | Soil/geo engineering firms |
| Civil | Civil engineering, grading |
| MEP | Mechanical, electrical, plumbing |
| Survey | Land surveyors |
| Landscape | Landscape architects |
| Environmental | Environmental consultants |
| Coastal | Coastal engineering specialists |
| Soils | Soils engineers |
| Fire/Life Safety | Fire protection engineers |

### Agency Specializations

| Specialization | Agency |
|----------------|--------|
| Planning | City of Malibu Planning |
| Building | Building & Safety |
| Fire | LA County Fire |
| DPH | Dept of Public Health |
| Coastal | California Coastal Commission |
| GEO | Geotechnical review |
| Public Works | Public Works Dept |
| Water District | WWD29, LVMWD |

---

## Appendix B: Permitting State Machine

Based on the analyzed flow chart, the Malibu permitting process includes these major states:

### Planning Track
1. Initial Application
2. Planning Submission
3. Planning Review (3-4 weeks)
4. Corrections (if needed, 3-4 weeks each round)
5. Planning Approval

### Building Track
1. Building Application
2. Plan Check Submission
3. Plan Check Review (parallel agency reviews)
4. Corrections (multiple agencies)
5. All Approved convergence

### Parallel Agency Reviews (during Plan Check)
- Building (BLDG#)
- Fire (FEPC#)
- Geotechnical (GEO)
- Environmental Health (EH)
- Public Works (PW)
- Coastal (if required)
- GMED (ESTU#)
- Grading (GRAD#, if required)

### Permit Issuance
1. All approvals received
2. Fee calculation
3. Fee payment
4. Permit issuance
5. Construction set stamping

---

*Document Version: 2.0*
*Last Updated: November 2024*
*Status: Active Development*
