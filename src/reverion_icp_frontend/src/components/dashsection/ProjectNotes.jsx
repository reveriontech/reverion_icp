import React, { useState } from 'react';

const ProjectNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Website Navigation Structure',
      content: 'Need to simplify the main navigation menu. Users are finding it difficult to locate key sections. Consider a max of 5 main nav items with dropdown menus for subsections.',
      createdBy: 'Robert Davis',
      createdAt: 'Mar 24, 2025',
      tags: ['UX', 'Navigation'],
      color: '#4f46e5' // Indigo
    },
    {
      id: 2,
      title: 'Mobile Responsiveness Requirements',
      content: 'All new pages must be fully responsive for mobile devices. Testing should include iPhone SE (small), iPhone 12 (medium), and iPad (tablet) at minimum.',
      createdBy: 'Sarah Kim',
      createdAt: 'Mar 22, 2025',
      tags: ['Mobile', 'Responsive Design'],
      color: '#16a34a' // Green
    },
    {
      id: 3,
      title: 'Content Migration Plan',
      content: 'For the blog section, we need to maintain URL structure for SEO. Redirects should be set up for any URLs that do change. Metadata needs to be preserved and updated where appropriate.',
      createdBy: 'Michael Thompson',
      createdAt: 'Mar 20, 2025',
      tags: ['Content', 'SEO'],
      color: '#ea580c' // Orange
    }
  ]);

  const [activeNote, setActiveNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editNote, setEditNote] = useState(null);

  // Filter notes based on search term
  const filteredNotes = searchTerm
    ? notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : notes;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNoteClick = (note) => {
    setActiveNote(note);
    setIsEditMode(false);
  };

  const handleNewNoteChange = (e) => {
    const { name, value } = e.target;
    setNewNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditNoteChange = (e) => {
    const { name, value } = e.target;
    setEditNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNote = () => {
    if (!newNote.title || !newNote.content) return;
    
    // Generate a random color for the note
    const colors = ['#4f46e5', '#16a34a', '#ea580c', '#0ea5e9', '#8b5cf6', '#dc2626', '#0891b2'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newNoteObject = {
      id: Date.now(),
      title: newNote.title,
      content: newNote.content,
      createdBy: 'Current User', // This would come from auth context in a real app
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      color: randomColor
    };
    
    setNotes(prev => [newNoteObject, ...prev]);
    setNewNote({
      title: '',
      content: '',
      tags: ''
    });
    
    // Automatically select the new note
    setActiveNote(newNoteObject);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setEditNote({...activeNote});
  };

  const handleSaveEdit = () => {
    if (!editNote.title || !editNote.content) return;
    
    const updatedNote = {
      ...editNote,
      tags: typeof editNote.tags === 'string' 
        ? editNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : editNote.tags
    };
    
    setNotes(prev => prev.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    ));
    
    setActiveNote(updatedNote);
    setIsEditMode(false);
  };

  const handleDeleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (activeNote && activeNote.id === id) {
      setActiveNote(null);
      setIsEditMode(false);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return dateStr;
    }
  };

  return (
    <div className="project-notes-page container-fluid p-4">
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <h2 className="mb-md-0 mb-3 fw-bold">Project Notes</h2>
        </div>
        <div className="col-md-6">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-white border-end-0 rounded-pill-start">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control border-start-0 rounded-pill-end" 
              placeholder="Search notes..."
              aria-label="Search notes"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card mb-4 border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="card-title mb-3 fw-bold">Add New Note</h5>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input 
                  type="text" 
                  className="form-control rounded-3" 
                  id="title" 
                  name="title" 
                  value={newNote.title} 
                  onChange={handleNewNoteChange} 
                  placeholder="Enter note title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea 
                  className="form-control rounded-3" 
                  id="content" 
                  name="content" 
                  value={newNote.content} 
                  onChange={handleNewNoteChange} 
                  placeholder="Enter note content"
                  rows={4}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="tags" className="form-label">Tags (comma separated)</label>
                <input 
                  type="text" 
                  className="form-control rounded-3" 
                  id="tags" 
                  name="tags" 
                  value={newNote.tags} 
                  onChange={handleNewNoteChange} 
                  placeholder="UX, Design, etc."
                />
              </div>
              <button 
                className="btn btn-primary w-100 rounded-pill" 
                onClick={handleAddNote}
                disabled={!newNote.title || !newNote.content}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add Note
              </button>
            </div>
          </div>

          <div className="card notes-list-card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="card-title mb-3 fw-bold">All Notes {filteredNotes.length > 0 && <span className="badge rounded-pill bg-light text-dark">{filteredNotes.length}</span>}</h5>
              
              {filteredNotes.length === 0 && (
                <div className="text-center p-4 bg-light rounded-3">
                  <i className="bi bi-journal-text fs-1 text-muted mb-2 d-block"></i>
                  <p className="mb-0">No notes found</p>
                </div>
              )}
              
              <div className="notes-list" style={{ maxHeight: "600px", overflowY: "auto" }}>
                {filteredNotes.map(note => (
                  <div 
                    key={note.id} 
                    className={`note-item card mb-3 border-0 shadow-sm hover-transform ${activeNote && activeNote.id === note.id ? 'border-start border-5 border-primary shadow' : ''}`}
                    onClick={() => handleNoteClick(note)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body p-3">
                      <div className="note-color-indicator" style={{ width: "100%", height: "4px", backgroundColor: note.color, borderRadius: "2px", marginBottom: "10px" }}></div>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-0 fw-semibold">{note.title}</h6>
                        <small className="text-muted badge bg-light">{formatDate(note.createdAt)}</small>
                      </div>
                      <p className="note-preview small text-muted mb-2">
                        {note.content.length > 80 ? `${note.content.substring(0, 80)}...` : note.content}
                      </p>
                      <div className="note-footer d-flex justify-content-between align-items-center">
                        <div className="note-tags">
                          {note.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="badge rounded-pill bg-light text-dark me-1">{tag}</span>
                          ))}
                          {note.tags.length > 2 && (
                            <span className="badge rounded-pill bg-light text-dark">+{note.tags.length - 2}</span>
                          )}
                        </div>
                        <small className="text-muted d-flex align-items-center">
                          <span className="avatar-mini rounded-circle bg-light text-dark d-inline-flex align-items-center justify-content-center me-1" style={{ width: "20px", height: "20px", fontSize: "10px" }}>
                            {note.createdBy.split(' ').map(name => name[0]).join('')}
                          </span>
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          {activeNote && !isEditMode ? (
            <div className="card h-100 border-0 shadow">
              <div className="card-body p-4">
                <div className="note-detail-header mb-4 border-bottom pb-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="mb-0 fw-bold">{activeNote.title}</h3>
                    <div className="note-actions">
                      <button className="btn btn-sm btn-outline-primary rounded-pill me-2" onClick={handleEditClick}>
                        <i className="bi bi-pencil me-1"></i> Edit
                      </button>
                      <button className="btn btn-sm btn-outline-danger rounded-pill me-2" onClick={() => handleDeleteNote(activeNote.id)}>
                        <i className="bi bi-trash me-1"></i> Delete
                      </button>
                      <button className="btn btn-sm btn-outline-secondary rounded-pill">
                        <i className="bi bi-share me-1"></i> Share
                      </button>
                    </div>
                  </div>
                  <div className="d-flex align-items-center text-muted gap-3">
                    <div className="d-flex align-items-center">
                      <div className="avatar-placeholder rounded-circle bg-light text-dark d-flex align-items-center justify-content-center me-2" style={{ width: "30px", height: "30px", fontSize: "12px" }}>
                        {activeNote.createdBy.split(' ').map(name => name[0]).join('')}
                      </div>
                      <span>{activeNote.createdBy}</span>
                    </div>
                    <span><i className="bi bi-calendar-event me-1"></i> {activeNote.createdAt}</span>
                  </div>
                </div>
                <div className="note-detail-content mb-4">
                  <div className="p-4 bg-light rounded-3 mb-4" style={{ borderLeft: `4px solid ${activeNote.color}` }}>
                    <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{activeNote.content}</p>
                  </div>
                </div>
                <div className="note-detail-tags">
                  <h6 className="mb-3">Tags</h6>
                  {activeNote.tags.map((tag, index) => (
                    <span key={index} className="badge rounded-pill bg-primary-subtle text-primary me-2 mb-2 p-2">{tag}</span>
                  ))}
                  {activeNote.tags.length === 0 && (
                    <span className="text-muted">No tags</span>
                  )}
                </div>
              </div>
            </div>
          ) : isEditMode && editNote ? (
            <div className="card h-100 border-0 shadow">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                  <h3 className="mb-0 fw-bold">Edit Note</h3>
                  <div>
                    <button className="btn btn-outline-secondary rounded-pill me-2" onClick={() => setIsEditMode(false)}>
                      Cancel
                    </button>
                    <button className="btn btn-primary rounded-pill" onClick={handleSaveEdit}>
                      Save Changes
                    </button>
                  </div>
                </div>
                <div className="edit-form">
                  <div className="mb-3">
                    <label htmlFor="edit-title" className="form-label">Title</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg rounded-3" 
                      id="edit-title" 
                      name="title" 
                      value={editNote.title} 
                      onChange={handleEditNoteChange} 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edit-content" className="form-label">Content</label>
                    <textarea 
                      className="form-control rounded-3" 
                      id="edit-content" 
                      name="content" 
                      value={editNote.content} 
                      onChange={handleEditNoteChange} 
                      rows={10}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edit-tags" className="form-label">Tags (comma separated)</label>
                    <input 
                      type="text" 
                      className="form-control rounded-3" 
                      id="edit-tags" 
                      name="tags" 
                      value={typeof editNote.tags === 'string' ? editNote.tags : editNote.tags.join(', ')} 
                      onChange={handleEditNoteChange} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card h-100 border-0 shadow">
              <div className="card-body d-flex flex-column align-items-center justify-content-center text-center p-5">
                <div className="empty-state py-5">
                  <div className="empty-state-icon mb-4">
                    <div className="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: "100px", height: "100px" }}>
                      <i className="bi bi-sticky-fill fs-1 text-primary"></i>
                    </div>
                  </div>
                  <h4 className="fw-bold">No Note Selected</h4>
                  <p className="text-muted mb-4">Select a note from the list or create a new one to view its details here.</p>
                  <button className="btn btn-primary rounded-pill" onClick={() => document.getElementById('title').focus()}>
                    <i className="bi bi-plus-circle me-2"></i>
                    Create a New Note
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .hover-transform {
          transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        
        .hover-transform:hover {
          transform: translateY(-2px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.08) !important;
        }
        
        .rounded-pill-start {
          border-top-left-radius: 50rem !important;
          border-bottom-left-radius: 50rem !important;
        }
        
        .rounded-pill-end {
          border-top-right-radius: 50rem !important;
          border-bottom-right-radius: 50rem !important;
        }
        
        /* Custom scrollbar for notes list */
        .notes-list::-webkit-scrollbar {
          width: 6px;
        }
        
        .notes-list::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .notes-list::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        
        .notes-list::-webkit-scrollbar-thumb:hover {
          background: #aaa;
        }
      `}</style>
    </div>
  );
};

export default ProjectNotes;