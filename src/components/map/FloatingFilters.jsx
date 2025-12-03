// Floating Filters - Center-top filter controls with 4 dropdown pills
// Style Guide Part II (Stone palette), Part VII (Interactions)
// Position: center-top, below header (top: 80px)

import { useState } from 'react';
import FilterDropdown from '../ui/FilterDropdown';

const statusOptions = [
  { id: 'all', label: 'All Status' },
  { id: 'blocked', label: 'Blocked' },
  { id: 'waiting', label: 'Waiting' },
  { id: 'active', label: 'Active' },
  { id: 'complete', label: 'Complete' },
];

const phaseOptions = [
  { id: 'all', label: 'All Phases' },
  { id: 'planning', label: 'Planning Review' },
  { id: 'plancheck', label: 'Plan Check' },
  { id: 'approval', label: 'Approval Pending' },
  { id: 'issue', label: 'Issue Resolution' },
  { id: 'permit', label: 'Permit Issued' },
];

const zoneOptions = [
  { id: 'all', label: 'All Zones' },
  { id: 'coastal', label: 'Coastal' },
  { id: 'fire', label: 'Fire Zone' },
  { id: 'landslide', label: 'Landslide' },
];

const typeOptions = [
  { id: 'all', label: 'All Types' },
  { id: 'new', label: 'New Construction' },
  { id: 'fire', label: 'Fire Rebuild' },
  { id: 'addition', label: 'Addition' },
  { id: 'renovation', label: 'Renovation' },
];

export default function FloatingFilters({ filters, onFilterChange }) {
  const [statusFilter, setStatusFilter] = useState(filters?.status || 'all');
  const [phaseFilter, setPhaseFilter] = useState(filters?.phase || 'all');
  const [zoneFilter, setZoneFilter] = useState(filters?.zone || 'all');
  const [typeFilter, setTypeFilter] = useState(filters?.type || 'all');

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      status: statusFilter,
      phase: phaseFilter,
      zone: zoneFilter,
      type: typeFilter,
      [filterType]: value,
    };

    if (filterType === 'status') setStatusFilter(value);
    if (filterType === 'phase') setPhaseFilter(value);
    if (filterType === 'zone') setZoneFilter(value);
    if (filterType === 'type') setTypeFilter(value);

    onFilterChange?.(newFilters);
  };

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
      <div className="bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
        <FilterDropdown
          label="All Status"
          options={statusOptions}
          value={statusFilter}
          onChange={(value) => handleFilterChange('status', value)}
        />
        <FilterDropdown
          label="All Phases"
          options={phaseOptions}
          value={phaseFilter}
          onChange={(value) => handleFilterChange('phase', value)}
        />
        <FilterDropdown
          label="All Zones"
          options={zoneOptions}
          value={zoneFilter}
          onChange={(value) => handleFilterChange('zone', value)}
        />
        <FilterDropdown
          label="All Types"
          options={typeOptions}
          value={typeFilter}
          onChange={(value) => handleFilterChange('type', value)}
        />
      </div>
    </div>
  );
}
