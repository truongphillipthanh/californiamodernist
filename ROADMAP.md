# CMD System — Feature Roadmap

**Version**: 1.0  
**Last Updated**: December 1, 2025

---

## Current Sprint: Stabilization

**Goal**: Get a working demo with Supabase auth and core navigation.

### This Week
- [ ] Fix Supabase auth (disable email confirmation)
- [ ] Verify seed data loads correctly
- [ ] Complete CRM slide-out panel
- [ ] Test full navigation flow

---

## Phase 1: Foundation (Weeks 1-4)

### Core Navigation ✓
- [x] Spatial interface (Mapbox)
- [x] Project markers with status
- [x] Dashboard modal (4 tabs)
- [x] Filter pills

### Authentication
- [ ] Email/password signup (fix pending)
- [ ] Session persistence
- [ ] Protected routes
- [ ] User profile basics

### CRM
- [ ] Contact list with role filters
- [ ] Slide-out detail panel
- [ ] Waiting status indicators
- [ ] Project associations
- [ ] Last correspondence tracking

---

## Phase 2: Core Features (Weeks 5-8)

### Data Manager (Frank's Interface)
- [ ] AG Grid integration
- [ ] Bulk editing capabilities
- [ ] Export to Google Sheets
- [ ] Column customization
- [ ] Saved views

### Communications
- [ ] Internal bulletin board
- [ ] Channel-based messaging (team, project)
- [ ] Direct messages
- [ ] Notifications (in-app)
- [ ] Gmail embed (view-only initially)

### Document Management
- [ ] Upload interface
- [ ] Version tracking
- [ ] Status badges (draft → submitted → approved)
- [ ] Type categorization
- [ ] Synology NAS integration path

---

## Phase 3: Integration (Weeks 9-12)

### Gmail Integration
- [ ] OAuth connection
- [ ] Filtered inbox by contact
- [ ] Send from within CMD
- [ ] Auto-log communications
- [ ] Thread association with projects

### Capture Pipeline
- [ ] Voice recording
- [ ] Whisper API transcription
- [ ] Photo capture with metadata
- [ ] Quick notes
- [ ] Auto-tagging to projects

### Client Portal
- [ ] Simplified dashboard view
- [ ] Plain-language status
- [ ] Document downloads
- [ ] Messaging to team
- [ ] Notification preferences

---

## Phase 4: Advanced Features (Weeks 13-16+)

### Asset Management (BIM Connector)
**Context**: ArchiCAD 24 with BIM Cloud on Synology NAS

- [ ] Research ArchiCAD API capabilities
- [ ] File sync monitoring (detect changes)
- [ ] Version tree visualization
- [ ] Check-in/check-out status
- [ ] Thumbnail generation
- [ ] Cross-reference to project documents

**Reference**: Shotgun/Flow Production Tracking (post-production paradigm)

### Project/Task Management
**Context**: ClickUp/Jira-like functionality

- [ ] Task hierarchy (Epic → Task → Subtask)
- [ ] Dependencies and blockers
- [ ] Assignment and due dates
- [ ] Timeline/Gantt view
- [ ] Template projects
- [ ] Recurring tasks

**Integration Points**:
- Tickets → Tasks promotion
- Agency milestones → Auto-tasks
- Document deadlines → Task creation

### Analytics & Reporting
- [ ] Project timeline analytics
- [ ] Bottleneck detection (which agency/consultant delays)
- [ ] Phase duration benchmarks
- [ ] Workload distribution
- [ ] PDF report generation
- [ ] Dashboard for leadership

---

## Future Considerations

### Mobile App
- React Native or PWA
- Capture-focused (voice, photo)
- Status checking
- Push notifications

### AI Integration
- Vitus knowledge extraction
- Document analysis (permit conditions)
- Email summarization
- Proactive blocker detection

### GIS Enhancements
- LA County parcel data overlay
- Zoning layer
- Historical permit data
- Neighbor notification radius

---

## Technical Debt Backlog

- [ ] Test coverage (currently 0%)
- [ ] Error boundary components
- [ ] Loading states consistency
- [ ] Mobile responsiveness
- [ ] Performance profiling
- [ ] Accessibility audit (WCAG 2.1)
- [ ] TypeScript migration (optional)

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-11-28 | Supabase over Firebase | PostgreSQL + PostGIS for spatial |
| 2025-11-28 | Mapbox over Google Maps | Better satellite imagery, 3D terrain |
| 2025-11-29 | Email auth first, OAuth later | Faster iteration without domain config |
| 2025-12-01 | AG Grid for Data Manager | Frank's spreadsheet mental model |

---

*This roadmap is a living document. Update as priorities shift.*
