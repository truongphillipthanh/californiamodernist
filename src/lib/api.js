// API stub functions for CMD System
// These will be implemented in future tasks

import { projects, contacts, agencies } from '../data/mockData';

export const getProjects = async () => {
  // Stub: returns mock data
  return projects;
};

export const getProjectById = async (id) => {
  // Stub: returns single project
  return projects.find(p => p.id === id) || null;
};

export const getContacts = async () => {
  // Stub: returns mock contacts
  return contacts;
};

export const getContactById = async (id) => {
  // Stub: returns single contact
  return contacts.find(c => c.id === id) || null;
};

export const getAgencies = async () => {
  // Stub: returns mock agencies
  return agencies;
};
