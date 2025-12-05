// CMD System — API Stubs
// These return mock data now; will connect to Supabase later

import {
  parcels,
  projects,
  contacts,
  contactRoles,
  agencies,
  submissions,
  documents,
  milestones,
} from '../data/mockData';

// Simulate async delay (remove when connecting real backend)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// === PROJECTS ===

export async function getProjects() {
  await delay(100);
  return projects.map((project) => ({
    ...project,
    parcel: parcels.find((p) => p.id === project.parcelId),
  }));
}

export async function getProjectById(id) {
  await delay(50);
  const project = projects.find((p) => p.id === id);
  if (!project) return null;
  return {
    ...project,
    parcel: parcels.find((p) => p.id === project.parcelId),
    contacts: getProjectContacts(id),
    submissions: submissions.filter((s) => s.projectId === id),
    documents: documents.filter((d) => d.projectId === id),
    milestones: milestones.filter((m) => m.projectId === id),
  };
}

export async function getProjectsByStatus(status) {
  await delay(100);
  return projects.filter((p) => p.status === status);
}

// === CONTACTS ===

export async function getContacts() {
  await delay(100);
  return contacts;
}

export async function getContactById(id) {
  await delay(50);
  const contact = contacts.find((c) => c.id === id);
  if (!contact) return null;

  // Get all projects this contact is associated with
  const roles = contactRoles.filter((cr) => cr.contactId === id);
  const contactProjects = roles.map((role) => ({
    ...projects.find((p) => p.id === role.projectId),
    role: role.role,
    isPrimary: role.isPrimary,
  }));

  return {
    ...contact,
    projects: contactProjects,
  };
}

export async function getContactsByType(type) {
  await delay(100);
  return contacts.filter((c) => c.type === type);
}

function getProjectContacts(projectId) {
  const roles = contactRoles.filter((cr) => cr.projectId === projectId);
  return roles.map((role) => ({
    ...contacts.find((c) => c.id === role.contactId),
    role: role.role,
    isPrimary: role.isPrimary,
  }));
}

// === PARCELS ===

export async function getParcels() {
  await delay(100);
  return parcels;
}

export async function getParcelById(id) {
  await delay(50);
  return parcels.find((p) => p.id === id) || null;
}

// === MAP DATA ===

export async function getMapMarkers() {
  await delay(100);
  return projects.map((project) => {
    const parcel = parcels.find((p) => p.id === project.parcelId);
    // Build zones array from parcel data
    const zones = [];
    if (parcel?.coastal) zones.push('coastal');
    if (parcel?.fireZone) zones.push('fire');
    // Add landslide zone if present (future data)
    return {
      id: project.id,
      name: project.name,
      displayName: project.displayName || project.name, // Use shorthand displayName for markers
      status: project.status,
      phase: project.phase,
      type: project.type,
      zones, // TASK-051: Add zones for filtering
      coordinates: parcel?.coordinates || { lng: -118.75, lat: 34.03 },
      address: parcel?.address || '',
    };
  });
}

// === AGENCIES & SUBMISSIONS ===

export async function getAgencies() {
  await delay(100);
  return agencies;
}

export async function getSubmissionsByProject(projectId) {
  await delay(100);
  return submissions
    .filter((s) => s.projectId === projectId)
    .map((sub) => ({
      ...sub,
      agency: agencies.find((a) => a.id === sub.agencyId),
    }));
}

// === DOCUMENTS ===

export async function getDocumentsByProject(projectId) {
  await delay(100);
  return documents.filter((d) => d.projectId === projectId);
}

// === TIMELINE ===

export async function getMilestonesByProject(projectId) {
  await delay(100);
  return milestones
    .filter((m) => m.projectId === projectId)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}
