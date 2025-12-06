// Floating Filters - Center-top filter controls with 4 dropdown pills
// Style Guide Part II (Stone palette), Part VII (Interactions)
// Position: center-top, below header (top: 76px = 72px header + 4px gap)
// TASK-051: Wired to filter map markers

import FilterDropdown from '../ui/FilterDropdown';

const statusOptions = [
  { id: 'all', label: 'All Status' },
  { id: 'active', label: 'Active' },
  { id: 'pending', label: 'Pending' },
  { id: 'complete', label: 'Complete' },
];

const phaseOptions = [
  { id: 'all', label: 'All Phases' },
  { id: 'pre_design', label: 'Pre-Design' },
  { id: 'design', label: 'Design' },
  { id: 'permitting', label: 'Permitting' },
  { id: 'construction', label: 'Construction' },
  { id: 'closeout', label: 'Closeout' },
];

const zoneOptions = [
  { id: 'all', label: 'All Zones' },
  { id: 'coastal', label: 'Coastal' },
  { id: 'fire', label: 'Fire Zone' },
  { id: 'landslide', label: 'Landslide' },
];

const typeOptions = [
  { id: 'all', label: 'All Types' },
  { id: 'new_construction', label: 'New Construction' },
  { id: 'fire_reconstruction', label: 'Fire Rebuild' },
  { id: 'addition', label: 'Addition' },
  { id: 'renovation', label: 'Renovation' },
];

export default function FloatingFilters({ filters, onFilterChange }) {
  // Use parent state directly - no local state duplication
  const handleFilterChange = (filterType, value) => {
    onFilterChange?.({ ...filters, [filterType]: value });
  };

  return (
    <div className="fixed top-[76px] left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
      <div className="bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
        <FilterDropdown
          label="All Status"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
        <FilterDropdown
          label="All Phases"
          options={phaseOptions}
          value={filters.phase}
          onChange={(value) => handleFilterChange('phase', value)}
        />
        <FilterDropdown
          label="All Zones"
          options={zoneOptions}
          value={filters.zone}
          onChange={(value) => handleFilterChange('zone', value)}
        />
        <FilterDropdown
          label="All Types"
          options={typeOptions}
          value={filters.type}
          onChange={(value) => handleFilterChange('type', value)}
        />
      </div>
    </div>
  );
}
