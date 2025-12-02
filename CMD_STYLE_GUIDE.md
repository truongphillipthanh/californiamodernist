# CMD System — Design Language Specification
## California Modernist Design

**Version**: 2.0  
**Last Updated**: December 2, 2025  
**Authority**: This document governs all visual and interaction design decisions.

---

## Part I: Design Philosophy

### Core Tenets

1. **The Map is the Interface**  
   The spatial canvas is not a feature — it is the foundation. All UI floats above it like architectural glass: present when needed, invisible when not.

2. **Monochrome + Earned Color**  
   The interface is achromatic. Color is not decoration; it is *signal*. The only hues come from status indicators, the map itself, and photography.

3. **Taschen Minimalism**  
   Every element must earn its presence. White space is structural, not filler. Typography does the heavy lifting — no decorative elements, no gratuitous shadows, no ornamentation.

4. **Progressive Disclosure**  
   Information reveals itself through interaction: hover for preview, click for detail, expand for full context. Never overwhelm; always invite deeper exploration.

5. **Designer-Forward, Invisible**  
   The system should feel crafted but never call attention to itself. It exists to make work legible, not to impress. Function and legibility are non-negotiable.

### Anti-Patterns

Do not:
- Add color for visual interest
- Use rounded corners larger than 4px (except pills/buttons)
- Apply shadows except for floating elements
- Use icons when text suffices
- Compress information that deserves space
- Animate for effect rather than guidance

---

## Part II: Color System

### Base Palette

```
STONE (Primary Neutrals)
┌─────────────────────────────────────────────────────────────┐
│  50   │ #FAFAF9  │ Page background, hover states           │
│ 100   │ #F5F5F4  │ Card backgrounds, alternating rows      │
│ 200   │ #E7E5E4  │ Borders, dividers                       │
│ 300   │ #D6D3D1  │ Disabled states, placeholder text       │
│ 400   │ #A8A29E  │ Secondary text, icons                   │
│ 500   │ #78716C  │ Body text (muted)                       │
│ 600   │ #57534E  │ Body text (standard)                    │
│ 700   │ #44403C  │ Headings, primary text                  │
│ 800   │ #292524  │ Display text, emphasis                  │
│ 900   │ #1C1917  │ Maximum contrast, logo                  │
└─────────────────────────────────────────────────────────────┘
```

### Status Colors (Earned)

These colors appear *only* to indicate operational state:

```
STATUS
┌─────────────────────────────────────────────────────────────┐
│ blocked   │ #DC2626  │ Critical attention required          │
│ waiting   │ #D97706  │ Pending external response            │
│ active    │ #16A34A  │ Work in progress                     │
│ complete  │ #6366F1  │ Finished, archived                   │
│ on_hold   │ #78716C  │ Paused (uses Stone 500)              │
└─────────────────────────────────────────────────────────────┘
```

### Zone Colors (Map Overlays)

```
ZONES (Used on map layers only)
┌─────────────────────────────────────────────────────────────┐
│ coastal   │ #0EA5E9  │ Coastal Commission jurisdiction      │
│ fire      │ #EF4444  │ Fire hazard zone                     │
│ landslide │ #8B5CF6  │ Geological hazard zone               │
└─────────────────────────────────────────────────────────────┘
```

### Color Usage Rules

1. **Body text**: Stone 600-700 only
2. **Headings**: Stone 800-900
3. **Backgrounds**: Stone 50-100 (never pure white #FFFFFF)
4. **Borders**: Stone 200
5. **Status indicators**: Use status colors at full saturation, never tinted
6. **Never** use color for links — underline instead
7. **Never** use gradients

---

## Part III: Typography

### Type Stack (Platform-Native with Fallbacks)

The system uses platform-native fonts for optimal rendering, with graceful fallbacks.

```css
/* Display: Compressed Gothic for architectural hierarchy */
--font-display: 
  "SF Compact Display",           /* Apple (preferred) */
  "Roboto Condensed",             /* Google/Android */
  "Segoe UI",                     /* Microsoft */
  "Bebas Neue",                   /* Open fallback */
  Impact, sans-serif;             /* Universal fallback */

/* Sans: System UI for body and interface */
--font-sans: 
  -apple-system,                  /* Apple */
  BlinkMacSystemFont,             /* Apple (Chrome) */
  "SF Pro Text",                  /* Apple explicit */
  "Roboto",                       /* Google/Android */
  "Segoe UI",                     /* Microsoft */
  system-ui, sans-serif;          /* Universal */

/* Mono: For technical data and codes */
--font-mono: 
  "SF Mono",                      /* Apple */
  "Roboto Mono",                  /* Google */
  "Cascadia Code",                /* Microsoft */
  "Fira Code",                    /* Open fallback */
  Consolas, monospace;            /* Universal */

/* Serif: For long-form reading (rare use) */
--font-serif: 
  "New York",                     /* Apple */
  "Roboto Serif",                 /* Google */
  "Georgia",                      /* Microsoft/Universal */
  "Times New Roman", serif;       /* Universal fallback */
```

### Scale

The scale is deliberately dramatic. Subtle differences don't work in a Taschen-influenced system.

```
DISPLAY        48px / 52px    Display font, uppercase, -1% tracking
TITLE          32px / 36px    Display font, uppercase, -0.5% tracking
HEADING 1      24px / 30px    System sans, medium weight, Stone 800
HEADING 2      18px / 24px    System sans, medium weight, Stone 700
HEADING 3      14px / 20px    System sans, semibold, uppercase, +5% tracking
BODY           15px / 24px    System sans, regular, Stone 600
BODY SMALL     13px / 20px    System sans, regular, Stone 500
CAPTION        11px / 16px    System sans, regular, Stone 400
MONO           13px / 20px    Monospace, regular, Stone 600
MONO SMALL     11px / 16px    Monospace, regular, Stone 500
```

### Typographic Roles

| Role | Treatment | Example |
|------|-----------|---------|
| **Project Name** | Display, uppercase, centered | NAKAMURA |
| **Page Title** | Title, uppercase | CRM |
| **Section Header** | Heading 3, uppercase, tracked | AGENCIES |
| **Card Title** | Heading 2 | Miller Residence |
| **Body Text** | Body | Client requested timeline update... |
| **Metadata** | Body Small | Last updated 3 days ago |
| **Technical Data** | Mono | APN: 4452-012-018 |
| **Phase Codes** | Mono Small, uppercase | PLN · CHK · APP |
| **Status Badge** | Caption, uppercase, status color | WAITING |

### Spacing (Letter-spacing)

```
Compressed:  -1% to -0.5%   Display and Title only
Normal:      0%             Body text, descriptions
Tracked:     +3% to +5%     Section headers, labels, badges
Wide:        +8% to +10%    Very small text, extreme hierarchy
```

### Case Conventions

| Case | Meaning |
|------|---------|
| **UPPERCASE** | Structural elements, navigation, status, project names on markers |
| **Title Case** | Proper nouns, card titles, contact names |
| **Sentence case** | Descriptions, body text, conversational content |
| **lowercase** | Never used as primary treatment |

---

## Part IV: Spatial System

### Base Unit

All spacing derives from an 8px base unit.

```
SPACING SCALE
┌──────────────────────────────────────┐
│  0   │  0px   │ None                 │
│  1   │  4px   │ Tight                │
│  2   │  8px   │ Base                 │
│  3   │ 12px   │ Compact              │
│  4   │ 16px   │ Standard             │
│  5   │ 20px   │ Comfortable          │
│  6   │ 24px   │ Relaxed              │
│  8   │ 32px   │ Section gap          │
│ 10   │ 40px   │ Major section        │
│ 12   │ 48px   │ Page margin (mobile) │
│ 16   │ 64px   │ Page margin (desktop)│
│ 20   │ 80px   │ Hero spacing         │
└──────────────────────────────────────┘
```

### Container Widths

```
CONTAINERS
┌──────────────────────────────────────┐
│ Sidebar (closed) │ 0px              │
│ Sidebar (open)   │ 360px - 420px    │
│ Card (hover)     │ 280px            │
│ Card (click)     │ 480px - 560px    │
│ Card (full)      │ 960px max        │
│ Modal            │ 640px - 800px    │
│ Slideout (1/3)   │ 33% viewport     │
│ Slideout (2/3)   │ 67% viewport     │
│ Content          │ 720px max        │
└──────────────────────────────────────┘
```

### Border Radius

Minimal. This is architecture, not friendliness.

```
RADII
┌──────────────────────────────────────┐
│ none   │ 0px  │ Images, full-bleed   │
│ sm     │ 2px  │ Inputs, subtle       │
│ base   │ 4px  │ Cards, containers    │
│ pill   │ 9999px │ Pills, badges      │
└──────────────────────────────────────┘
```

---

## Part V: Component Patterns

### Map Markers

**Default State (on map)**
```
┌─────────────────┐
│    NAKAMURA     │  ← Project name, uppercase, Display font, CENTERED
└─────────────────┘     Background: Stone 900, Text: Stone 50
    ●                   Status dot: left of text, status color
```

**Hover State**
```
Marker scales to 1.05x
Drop shadow appears (subtle)
Cursor: pointer
```

**Emphasized State** (when corresponding sidebar item is hovered)
```
Marker scales to 1.1x
Stronger shadow
Slight glow effect (status color at 20% opacity)
```

### Hover Card (Map Popup)

Appears on marker hover OR when Picture View sidebar item is hovered. 280px wide.

```
┌────────────────────────────────────────────┐
│ ┌────────────────────────────────────────┐ │
│ │                                        │ │
│ │            [PHOTO/RENDER]              │ │  ← 16:9 aspect
│ │                                        │ │
│ └────────────────────────────────────────┘ │
│                                            │
│  Miller Residence                          │  ← Heading 2
│  21500 Pacific Coast Highway              │  ← Body Small, Stone 500
│                                            │
│  ● WAITING  ·  PLN  ·  42 days            │  ← Status + Phase + Duration
│                                            │
└────────────────────────────────────────────┘
```

**Photo Fallback Hierarchy:**
1. Photography → 2. 3D Render → 3. 2D Elevation → 4. Grey placeholder with icon

### Click Card (Zillow-style)

Appears on marker click. 480-560px wide. Centers on map with slight upward offset.

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Map                                    ⤢ Expand      │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────┐ ┌─────────┐ ┌─────────┐   │
│ │                                  │ │         │ │         │   │
│ │                                  │ │         │ │         │   │
│ │         PRIMARY PHOTO            │ │  THUMB  │ │  THUMB  │   │
│ │                                  │ │         │ │         │   │
│ │                                  │ │         │ └─────────┘   │
│ │                                  │ │         │ ┌─────────┐   │
│ └──────────────────────────────────┘ │         │ │ +3 more │   │
│                                      └─────────┘ └─────────┘   │
│                                                                 │
│                        NAKAMURA                                 │  ← Display, centered
│              28900 Cliffside Drive, Malibu                     │  ← Body, centered
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐   │
│  │ ● WAIT  │  │  PLN    │  │ 42 DAYS │  │  COASTAL · FIRE │   │  ← Pills
│  └─────────┘  └─────────┘  └─────────┘  └─────────────────────┘   │
│                                                                 │
│  Fire Rebuild · 3,200 sqft · APN 4452-012-018                  │  ← Meta
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  AGENCIES                                                       │  ← Section
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │ PLN  ●   │ │ BLDG ◐   │ │ FIRE ○   │ │ GEO  ●   │          │
│  │ approved │ │ in review│ │ pending  │ │ approved │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    View Full Dashboard                   │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Status Badges

```
BLOCKED    → Red background (#DC2626), white text
WAITING    → Amber background (#D97706), white text  
ACTIVE     → Green background (#16A34A), white text
COMPLETE   → Purple background (#6366F1), white text
```

Badges are always:
- Uppercase
- Caption size (11px)
- +5% letter-spacing
- Pill radius (9999px)
- Horizontal padding: 8px
- Vertical padding: 2px

---

## Part VI: Sidebar System

The sidebar is a critical navigation element with three view modes.

### Sidebar States

**Closed**: No sidebar visible. Hamburger icon floats on map (top-left, below header).

**Open**: Sidebar slides in from left. Contains header with view mode icons.

### Sidebar Header

```
┌────────────────────────────────────────────────────────────┐
│  ☰  │  ▤  │  ▦  │                    All Status ▾   Sort ▾│
│ List  Card  Photo                                          │
└────────────────────────────────────────────────────────────┘
```

- **☰ List**: Hamburger icon, toggles sidebar. When clicked while in List View, closes sidebar.
- **▤ Card**: Grid icon, switches to Card View. When clicked while in Card/Photo View, reverts to List View.
- **▦ Photo**: Image icon, switches to Photo View. When clicked while in Card/Photo View, reverts to List View.

### List View (Default)

Single column, Taschen-style. Minimal information, maximum scanability.

```
┌────────────────────────────────────────────────────────────┐
│  ☰  │  ▤  │  ▦  │                    All Status ▾   Sort ▾│
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Nakamura                                                  │
│  ─────────────────────────────────────────────────────────│
│  Miller                                                    │
│  ─────────────────────────────────────────────────────────│
│  Chen                                                      │
│  ─────────────────────────────────────────────────────────│
│  Okonkwo                                                   │
│  ─────────────────────────────────────────────────────────│
│  Hartley                                                   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Hover Behavior (List View)**:
- Row highlights (Stone 100 background)
- Tooltip appears: "Last Update: {date}" + Status badge
- Corresponding map marker becomes **emphasized**

**Click Behavior (List View)**:
- Opens Click Card on map
- Map zooms to project location

### Card View (Kanban-esque)

Richer information cards, still single column.

```
┌────────────────────────────────────────────────────────────┐
│  ☰  │  ▤  │  ▦  │                    All Status ▾   Sort ▾│
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ ● BLOCKED                        FIRE REBUILD        │ │
│  │                                                      │ │
│  │ Nakamura House                                       │ │
│  │ 27834 Sea Vista Drive                                │ │
│  │                                                      │ │
│  │ 45 DAYS  ·  5/5 AGENCIES  ·  3,100 SQ FT            │ │
│  │                                                      │ │
│  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░ Permit Issuance  92%       │ │
│  │                                                      │ │
│  │ ┌─────────┐ ┌─────────┐                             │ │
│  │ │FIRE ZONE│ │ BLOCKER │                             │ │
│  │ └─────────┘ └─────────┘                             │ │
│  │                                                      │ │
│  │ Waiting for permit technician appointment           │ │
│  │ (3-week backlog)                                    │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ ● WAITING                      NEW CONSTRUCTION      │ │
│  │ ...                                                  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Hover Behavior (Card View)**:
- Card elevates slightly (shadow increase)
- Corresponding map marker becomes **emphasized**

**Click Behavior (Card View)**:
- Reverts to List View
- Same as List View click: Opens Click Card, zooms map

### Photo View (Hover Cards as List)

Displays the Hover Card component in a vertical list.

```
┌────────────────────────────────────────────────────────────┐
│  ☰  │  ▤  │  ▦  │                    All Status ▾   Sort ▾│
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ ┌──────────────────────────────────────────────────┐ │ │
│  │ │                                                  │ │ │
│  │ │              [PHOTO/RENDER]                      │ │ │
│  │ │                                                  │ │ │
│  │ └──────────────────────────────────────────────────┘ │ │
│  │                                                      │ │
│  │ Nakamura House                                       │ │
│  │ 27834 Sea Vista Drive                                │ │
│  │                                                      │ │
│  │ ● BLOCKED  ·  ISS  ·  45 days                       │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ ...                                                  │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Hover Behavior (Photo View)**:
- Card highlights
- Corresponding map marker becomes **emphasized**
- **ALSO** shows Hover Card popup on the map at marker location

**Click Behavior (Photo View)**:
- Reverts to List View
- Opens Click Card on map

### Sidebar Dismissal

- Clicking outside sidebar (on map) closes sidebar
- Clicking hamburger icon in List View closes sidebar
- ESC key closes sidebar

---

## Part VII: Interaction Patterns

### Transitions

All transitions are subtle and purposeful. Never decorative.

```
DURATION
┌──────────────────────────────────────┐
│ Instant     │ 0ms    │ Focus states  │
│ Fast        │ 100ms  │ Hovers, toggles│
│ Normal      │ 200ms  │ Cards, reveals│
│ Slow        │ 300ms  │ Modals, slides│
│ Sidebar     │ 250ms  │ Slide in/out  │
│ Map zoom    │ 2000ms │ Google Earth  │
└──────────────────────────────────────┘

EASING
┌──────────────────────────────────────┐
│ Default     │ ease-out               │
│ Bounce      │ Never use              │
│ Sidebar     │ ease-in-out            │
│ Map         │ ease-in-out            │
└──────────────────────────────────────┘
```

### Map Zoom Behavior (Google Earth Style)

When transitioning between zoom levels:
- Animate over 2000-3000ms
- Pitch increases as zoom increases (0° → 45° → 60°)
- Bearing shifts slightly for dramatic effect
- Center moves smoothly to target

```
ZOOM LEVELS
┌──────────────────────────────────────────────────────────────────┐
│ Coastline    │ Zoom 11  │ Pitch 0°   │ Bearing 0°   │ All markers│
│ Neighborhood │ Zoom 14.5│ Pitch 45°  │ Bearing -15° │ Area focus │
│ Parcel       │ Zoom 17.5│ Pitch 60°  │ Bearing -30° │ Single site│
└──────────────────────────────────────────────────────────────────┘
```

### Click/Tap Targets

Minimum touch target: 44px × 44px (Apple HIG standard)

### Hover States

- **Links**: Underline appears
- **Buttons**: Background darkens (Stone 100 → Stone 200)
- **Cards**: Subtle shadow appears, slight lift (translateY -2px)
- **Markers**: Scale to 1.05x, shadow appears
- **Markers (emphasized)**: Scale to 1.1x, glow effect
- **Icons**: Opacity 0.6 → 1.0
- **Sidebar rows**: Background Stone 100, tooltip with last update + status

### Focus States

Never remove focus outlines. Use a subtle ring:
```css
outline: 2px solid Stone 400;
outline-offset: 2px;
```

---

## Part VIII: Icons

### Style

Follow Apple SF Symbols conventions:
- 1.5px stroke weight
- Rounded line caps
- Rounded line joins
- Geometric construction
- Optically aligned to grid

### Size Scale

```
┌──────────────────────────────────────┐
│ XS   │ 12px │ Inline with text       │
│ SM   │ 16px │ Buttons, inputs        │
│ MD   │ 20px │ Navigation, default    │
│ LG   │ 24px │ Feature icons          │
│ XL   │ 32px │ Empty states, heroes   │
└──────────────────────────────────────┘
```

### Icon Usage

- Always pair with text in navigation (except very common actions)
- Use Stone 400 for default, Stone 700 for active
- Never use colored icons except for status indication
- Prefer text over icons when space permits

### Common Icons (Semantic Mapping)

```
Navigation
──────────────────────────────────────────────
Home / Map         → Map pin (filled when active)
CRM / Contacts     → Person outline
Communications     → Chat bubble
Data Manager       → Table/grid (for future: FT initials)
Asset Store        → Box/package (future feature)
Task Manager       → Checkmark list (future feature)

Sidebar
──────────────────────────────────────────────
Toggle sidebar     → Hamburger (three lines)
List view          → Hamburger (same icon)
Card view          → Grid (2x2 squares)
Photo view         → Image/landscape

Actions
──────────────────────────────────────────────
Search             → Magnifying glass
Filter             → Sliders or funnel
Sort               → Arrows up/down
Expand             → Arrows diagonal out
Close              → X
Add                → Plus
Edit               → Pencil

Contact
──────────────────────────────────────────────
Call               → Phone
Message / Text     → Chat bubble (small)
Email              → Envelope
Website            → Globe or arrow-out

Status
──────────────────────────────────────────────
Blocked            → Octagon or X-circle
Waiting            → Clock
Active             → Play or checkmark
Complete           → Double-check
```

---

## Part IX: Imagery

### Photography Standards

When photography is available:
- Architectural photography preferred (Julius Shulman aesthetic)
- Exterior shots prioritized
- Natural lighting
- No heavy editing or filters
- Landscape orientation (16:9 or 4:3)

### Render Standards

When no photography exists:
- Photorealistic exterior renders
- Match site lighting conditions
- Include landscape context
- Same aspect ratios as photography

### Fallback Hierarchy

1. **Photograph** — Professional architectural photo
2. **3D Render** — Photorealistic exterior
3. **2D Elevation** — Line drawing or CAD export
4. **Placeholder** — Grey field (#E7E5E4) with minimal house icon, centered

### Image Containers

- No border radius on images (architecture is rectangular)
- No decorative borders
- No drop shadows on image containers
- Subtle border (Stone 200) only if needed for separation

---

## Part X: Page Patterns

### Global Header

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  🗺 │ CALIFORNIA MODERNIST DESIGN │ 🔍 Search projects │  🏠  👥  💬  FT   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
     │              │                     │                    │
     │              │                     │                    └─ User initials
     │              │                     │
     │              │                     └─ Feature icons: Map (home), CRM, Comms, (future expansions)
     │              │
     │              └─ Logo: Links to https://www.californiamodernist.com/
     │
     └─ Map icon (home): Returns to map, left-flanks search bar
```

**Header Behavior:**
- Logo ("CALIFORNIA MODERNIST DESIGN") links to external website
- Map icon (🗺) is the home/return-to-map action, positioned LEFT of search bar
- Right side: Feature page icons + User initials
- Feature icons leave room for future expansion (Asset Store, Task Manager)

### Map Page (Home)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ☰  ← Hamburger (floating when sidebar closed)                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                              M A P                                          │
│                                                                             │
│           [Markers with status dots]                                        │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                        ┌─────────────────┐                                 │
│                        │  ◉ Malibu, CA   │                                 │
│                        │  34.0259° N...  │                                 │
│                        └─────────────────┘                                 │
│                     ┌─────────────────────┐                                │
│                     │ Map│Satellite│Terrain│                               │
│                     └─────────────────────┘                                │
│                                                                             │
│                              ┌──────────────────────────────────┐  ┌───┐  │
│                              │ COASTLINE│NEIGHBORHOOD│PARCEL    │  │ + │  │
│                              └──────────────────────────────────┘  │ ─ │  │
│                                                                    └───┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Layout Rules:**
- **Malibu Beacon**: Center-bottom, above layer pills
- **Layer Pills** (Map | Satellite | Terrain): Center-bottom, below beacon
- **Zoom Level Pills** (COASTLINE | NEIGHBORHOOD | PARCEL): Bottom-right, left of Mapbox controls
- **Mapbox Zoom Controls** (+/-): Bottom-right corner, right of zoom pills

### Map Page with Sidebar Open

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                       │
├────────────────────────┬────────────────────────────────────────────────────┤
│                        │                                                    │
│  ☰  ▤  ▦  │ Sort ▾    │                                                    │
│                        │                                                    │
│  ───────────────────── │                                                    │
│                        │                                                    │
│  Nakamura              │                 M A P                              │
│  ───────────────────── │                                                    │
│  Miller                │        [Markers]                                  │
│  ───────────────────── │                                                    │
│  Chen                  │                                                    │
│  ───────────────────── │                                                    │
│  Okonkwo               │                                                    │
│  ───────────────────── │         ┌─────────────────┐                       │
│  Hartley               │         │  ◉ Malibu, CA   │                       │
│                        │         └─────────────────┘                       │
│                        │      ┌─────────────────────┐                      │
│                        │      │ Map│Satellite│Terrain│                      │
│                        │      └─────────────────────┘                      │
│                        │                                                    │
│                        │        ┌─────────────────────────┐  ┌───┐        │
│                        │        │COASTLINE│NEIGHBORHOOD│PARCEL│  │ + │        │
│                        │        └─────────────────────────┘  │ ─ │        │
│                        │                                      └───┘        │
└────────────────────────┴────────────────────────────────────────────────────┘
       ~360px                              Remaining width
```

### CRM Page

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  All · Client · Consultant · Agency · Team          🔍 Search...    │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                     │  │
│   │  Sarah Miller                                   💬 2  📞 1  ✉ 1    │  │
│   │  Client                                                             │  │
│   │  —                                                                  │  │
│   │                                                                     │  │
│   ├─────────────────────────────────────────────────────────────────────┤  │
│   │                                                                     │  │
│   │  Michael Rodriguez                              💬 1  📞 2  ✉ 1    │  │
│   │  Structural Engineer                                    📞 +1      │  │
│   │  Pacific Structural Associates                                      │  │
│   │                                                                     │  │
│   ├─────────────────────────────────────────────────────────────────────┤  │
│   │                                                                     │  │
│   │  Maria Santos                                   💬 3  📞 1  ✉ 2    │  │
│   │  Planning Technician                                                │  │
│   │  City of Malibu                                                    │  │
│   │                                                                     │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

**CRM Row Structure:**
- Left side (stacked, left-aligned):
  - **Line 1**: Name (Heading 2)
  - **Line 2**: Role (Body, Stone 600)
  - **Line 3**: Organization (Body Small, Stone 500) — or "—" if none
- Right side (inline, right-aligned, vertically centered):
  - Message icon + count
  - Phone icon + count (if multiple numbers, stack with "+N" indicator, max 3 visible)
  - Email icon + count
- **Hover**: Shows "Last Contact: {date}" tooltip

### CRM Detail Slideout (Split View)

When a contact is selected, the page splits 1/3 + 2/3:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER                                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │  All · Client · Consultant · Agency · Team          🔍 Search...    │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
├────────────────────┬────────────────────────────────────────────────────────┤
│                    │                                                        │
│  Sarah Miller      │  ×                                                     │
│  💬 📞 ✉          │                                                        │
│  ────────────────  │  Sarah Miller                                         │
│  Michael Rodriguez │  Client                                               │
│  💬 📞 ✉          │                                                        │
│  ────────────────  │  ● Waiting on us                                      │
│  Maria Santos      │                                                        │
│  💬 📞 ✉          │  ──────────────────────────────────────────────────── │
│  ────────────────  │                                                        │
│  ...               │  CONTACT                                               │
│                    │                                                        │
│                    │  ✉  sarah.miller@email.com                            │
│                    │  📞 (310) 555-1001                                    │
│                    │  📱 (310) 555-1002 mobile                             │
│                    │                                                        │
│                    │  ──────────────────────────────────────────────────── │
│                    │                                                        │
│                    │  PROJECTS                                              │
│                    │                                                        │
│                    │  • Miller Residence (active)                          │
│                    │                                                        │
│                    │  ──────────────────────────────────────────────────── │
│                    │                                                        │
│                    │  NOTES                                                 │
│                    │                                                        │
│                    │  Very detail-oriented. Prefers written updates.       │
│                    │  Responsive within 24 hours.                          │
│                    │                                                        │
├────────────────────┴────────────────────────────────────────────────────────┤
        ~33%                              ~67%
```

**Split View Behavior:**
- Left 1/3: Compressed list view
  - Name only
  - Contact icons collapse to icon-only (no counts)
  - Selected row highlighted
- Right 2/3: Full detail panel
  - Close button (×) returns to full list view
  - All contact details expanded

---

## Part XI: Implementation Notes

### CSS Custom Properties

```css
:root {
  /* Colors */
  --stone-50: #FAFAF9;
  --stone-100: #F5F5F4;
  --stone-200: #E7E5E4;
  --stone-300: #D6D3D1;
  --stone-400: #A8A29E;
  --stone-500: #78716C;
  --stone-600: #57534E;
  --stone-700: #44403C;
  --stone-800: #292524;
  --stone-900: #1C1917;
  
  --status-blocked: #DC2626;
  --status-waiting: #D97706;
  --status-active: #16A34A;
  --status-complete: #6366F1;
  
  /* Typography */
  --font-display: "SF Compact Display", "Roboto Condensed", "Segoe UI", "Bebas Neue", sans-serif;
  --font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Roboto", "Segoe UI", system-ui, sans-serif;
  --font-mono: "SF Mono", "Roboto Mono", "Cascadia Code", "Fira Code", Consolas, monospace;
  --font-serif: "New York", "Roboto Serif", Georgia, "Times New Roman", serif;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  
  /* Radii */
  --radius-sm: 2px;
  --radius-base: 4px;
  --radius-pill: 9999px;
  
  /* Transitions */
  --transition-fast: 100ms ease-out;
  --transition-normal: 200ms ease-out;
  --transition-slow: 300ms ease-out;
  --transition-sidebar: 250ms ease-in-out;
  --transition-map: 2000ms ease-in-out;
}
```

---

## Part XII: Accessibility

### Contrast Requirements

- Body text on backgrounds: Minimum 4.5:1 contrast ratio
- Large text (18px+): Minimum 3:1 contrast ratio
- Status badges: Use white text on colored backgrounds (verified)

### Keyboard Navigation

- All interactive elements must be focusable
- Focus order follows visual order
- No keyboard traps
- ESC closes sidebar and modals
- Tab navigates through sidebar items when open

### Screen Readers

- Semantic HTML structure
- ARIA labels for icon-only buttons
- Alt text for all meaningful images
- Status updates announced via aria-live regions
- Sidebar state announced on open/close

### Motion

- Respect `prefers-reduced-motion`
- Provide alternative for map animations
- No auto-playing animations

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-01 | Claude (Opus) | Initial specification |
| 2.0 | 2025-12-02 | Claude (Opus) | Typography fallback hierarchy, sidebar system, CRM split view, map layout refinements |

---

*This document is the authoritative source for all CMD visual design decisions. All Claude instances, whether building UI components or reviewing designs, must reference this specification. Deviations require explicit approval.*
