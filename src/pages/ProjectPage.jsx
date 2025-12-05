import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProjectById } from '../lib/api';
import { ArrowLeft } from 'lucide-react';

export default function ProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getProjectById(id)
        .then(setProject)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-72px)] flex items-center justify-center">
        <p className="text-stone-400">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-[calc(100vh-72px)] flex items-center justify-center">
        <p className="text-stone-400">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-stone-50">
      {/* Back link */}
      <div className="bg-white border-b border-stone-200 px-6 py-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>

      {/* Project header */}
      <div className="bg-white border-b border-stone-200 px-6 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-stone-900 tracking-tight">
              {project.name}
            </h1>
            <p className="text-stone-500 mt-1">{project.parcel?.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`
              inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
              ${project.status === 'active' ? 'bg-green-100 text-green-700' : ''}
              ${project.status === 'pending' ? 'bg-amber-100 text-amber-700' : ''}
              ${project.status === 'complete' ? 'bg-blue-100 text-blue-700' : ''}
            `}>
              {project.status}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs placeholder */}
      <div className="bg-white border-b border-stone-200 px-6">
        <nav className="flex gap-6">
          {['Overview', 'Agencies', 'Documents', 'Timeline'].map((tab, i) => (
            <button
              key={tab}
              className={`
                py-3 text-sm font-medium border-b-2 transition-colors
                ${i === 0
                  ? 'border-stone-900 text-stone-900'
                  : 'border-transparent text-stone-500 hover:text-stone-700'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Content area */}
      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Project details card */}
          <div className="col-span-2 bg-white rounded-lg border border-stone-200 p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Details</h2>
            <p className="text-stone-600">{project.description}</p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Type</p>
                <p className="text-stone-900 mt-1">{project.type.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Phase</p>
                <p className="text-stone-900 mt-1">{project.phase.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Square Footage</p>
                <p className="text-stone-900 mt-1">{project.squareFootage?.toLocaleString()} SF</p>
              </div>
              <div>
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">Budget</p>
                <p className="text-stone-900 mt-1">${project.budget?.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Contacts card */}
          <div className="bg-white rounded-lg border border-stone-200 p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Team</h2>
            <ul className="space-y-3">
              {project.contacts?.map((contact) => (
                <li key={contact.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center">
                    <span className="text-xs font-medium text-stone-600">
                      {contact.firstName[0]}{contact.lastName[0]}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-900">
                      {contact.firstName} {contact.lastName}
                    </p>
                    <p className="text-xs text-stone-500">{contact.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
