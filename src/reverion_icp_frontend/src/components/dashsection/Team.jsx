import React, { useState } from 'react';

const Team = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'Sarah Kim',
      role: 'UI/UX Designer',
      email: 'sarahk@example.com',
      avatar: 'SK',
      tasks: 8,
      activeTasks: 3,
      status: 'active'
    },
    {
      id: 2,
      name: 'Michael Thompson',
      role: 'Content Specialist',
      email: 'michaelt@example.com',
      avatar: 'MT',
      tasks: 12,
      activeTasks: 5,
      status: 'active'
    },
    {
      id: 3,
      name: 'Jessica Chen',
      role: 'Front-end Developer',
      email: 'jessicac@example.com',
      avatar: 'JC',
      tasks: 15,
      activeTasks: 6,
      status: 'active'
    },
    {
      id: 4,
      name: 'Robert Davis',
      role: 'Project Manager',
      email: 'robertd@example.com',
      avatar: 'RD',
      tasks: 20,
      activeTasks: 7,
      status: 'active'
    },
    {
      id: 5,
      name: 'Emily Wilson',
      role: 'SEO Specialist',
      email: 'emilyw@example.com',
      avatar: 'EW',
      tasks: 10,
      activeTasks: 2,
      status: 'vacation'
    }
  ]);
  
  // New member form state
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    email: '',
    tasks: 0,
    activeTasks: 0,
    status: 'active'
  });
  
  // Filter members based on search
  const filteredMembers = searchTerm 
    ? teamMembers.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : teamMembers;

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle form input changes for add/edit member
  const handleInputChange = (e, formType = 'new') => {
    const { name, value } = e.target;
    
    if (formType === 'new') {
      setNewMember(prev => ({ ...prev, [name]: value }));
    } else {
      setCurrentMember(prev => ({ ...prev, [name]: value }));
    }
  };
  
  // Add new team member
  const handleAddMember = () => {
    const memberToAdd = {
      ...newMember,
      id: Math.max(...teamMembers.map(m => m.id), 0) + 1,
      avatar: newMember.name.split(' ').map(name => name[0]).join('')
    };
    
    setTeamMembers(prev => [...prev, memberToAdd]);
    setNewMember({
      name: '',
      role: '',
      email: '',
      tasks: 0,
      activeTasks: 0,
      status: 'active'
    });
    setShowAddModal(false);
  };
  
  // Open edit modal with member data
  const handleEditClick = (member) => {
    setCurrentMember(member);
    setShowEditModal(true);
  };
  
  // Save edited member
  const handleSaveEdit = () => {
    setTeamMembers(prev => 
      prev.map(member => member.id === currentMember.id ? currentMember : member)
    );
    setShowEditModal(false);
  };
  
  // Status badge mapping
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return (
          <div className="d-flex align-items-center">
            <span className="status-indicator bg-success rounded-circle me-2" style={{ width: "8px", height: "8px" }}></span>
            <span>Active</span>
          </div>
        );
      case 'vacation':
        return (
          <div className="d-flex align-items-center">
            <span className="status-indicator bg-warning rounded-circle me-2" style={{ width: "8px", height: "8px" }}></span>
            <span>Vacation</span>
          </div>
        );
      case 'inactive':
        return (
          <div className="d-flex align-items-center">
            <span className="status-indicator bg-secondary rounded-circle me-2" style={{ width: "8px", height: "8px" }}></span>
            <span>Inactive</span>
          </div>
        );
      default:
        return (
          <div className="d-flex align-items-center">
            <span className="status-indicator bg-secondary rounded-circle me-2" style={{ width: "8px", height: "8px" }}></span>
            <span>{status}</span>
          </div>
        );
    }
  };
  
  // Get avatar background color based on id
  const getAvatarColor = (id) => {
    const colors = [
      'bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info'
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="team-page container-fluid p-4">
      <div className="row mb-4 align-items-center">
        <div className="col-md-6">
          <h2 className="mb-md-0 mb-3 fw-bold">Team Members</h2>
        </div>
        <div className="col-md-6 d-flex justify-content-md-end">
          <button 
            className="btn btn-primary rounded-pill shadow-sm"
            onClick={() => setShowAddModal(true)}
          >
            <i className="bi bi-plus-lg me-2"></i> Add Team Member
            <span className="badge bg-light text-dark ms-2 rounded-pill">15 credits</span>
          </button>
        </div>
      </div>

      <div className="row mb-4 g-4 team-stats">
        <div className="col-xl-3 col-md-6">
          <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
            <div className="card-body text-center p-4">
              <div className="icon-circle bg-primary-subtle text-primary mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "60px", height: "60px" }}>
                <i className="bi bi-people-fill fs-4"></i>
              </div>
              <h3 className="fw-bold">{teamMembers.length}</h3>
              <p className="text-muted mb-0">Total Team Members</p>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6">
          <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
            <div className="card-body text-center p-4">
              <div className="icon-circle bg-success-subtle text-success mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "60px", height: "60px" }}>
                <i className="bi bi-diagram-3-fill fs-4"></i>
              </div>
              <h3 className="fw-bold">3</h3>
              <p className="text-muted mb-0">Active Projects</p>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6">
          <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
            <div className="card-body text-center p-4">
              <div className="icon-circle bg-info-subtle text-info mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "60px", height: "60px" }}>
                <i className="bi bi-list-check fs-4"></i>
              </div>
              <h3 className="fw-bold">
                {teamMembers.reduce((sum, member) => sum + member.tasks, 0)}
              </h3>
              <p className="text-muted mb-0">Total Tasks</p>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6">
          <div className="card h-100 border-0 shadow-sm hover-shadow transition-all">
            <div className="card-body text-center p-4">
              <div className="icon-circle bg-warning-subtle text-warning mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "60px", height: "60px" }}>
                <i className="bi bi-hourglass-split fs-4"></i>
              </div>
              <h3 className="fw-bold">
                {teamMembers.reduce((sum, member) => sum + member.activeTasks, 0)}
              </h3>
              <p className="text-muted mb-0">Active Tasks</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow">
        <div className="card-header bg-white py-3 border-0">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <h5 className="mb-0 fw-bold">Team Members</h5>
            <div className="input-group" style={{ maxWidth: "300px" }}>
              <span className="input-group-text bg-white border-end-0 rounded-pill-start">
                <i className="bi bi-search"></i>
              </span>
              <input 
                type="text" 
                className="form-control border-start-0 rounded-pill-end" 
                placeholder="Search members..."
                aria-label="Search members"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Team Member</th>
                <th>Role</th>
                <th>Tasks</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map(member => (
                <tr key={member.id}>
                  <td data-label="Team Member">
                    <div className="d-flex align-items-center">
                      <div className={`avatar-placeholder rounded-circle ${getAvatarColor(member.id)} d-flex align-items-center justify-content-center text-white`} style={{ width: "45px", height: "45px", fontSize: "1rem", fontWeight: "500" }}>
                        {member.avatar}
                      </div>
                      <div className="ms-3">
                        <h6 className="fw-semibold mb-0">{member.name}</h6>
                        <small className="text-muted d-flex align-items-center">
                          <i className="bi bi-envelope-fill me-1" style={{ fontSize: "0.7rem" }}></i> {member.email}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td data-label="Role">
                    <span className="badge rounded-pill bg-light text-dark px-3 py-2">
                      {member.role}
                    </span>
                  </td>
                  <td data-label="Tasks">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <div className="task-chart rounded-circle d-flex align-items-center justify-content-center position-relative" style={{ width: "45px", height: "45px", backgroundColor: "#f0f0f0" }}>
                          <div className="task-progress position-absolute" style={{ 
                            width: "45px", 
                            height: "45px", 
                            borderRadius: "50%", 
                            background: `conic-gradient(#0d6efd ${member.activeTasks / member.tasks * 100}%, transparent 0)` 
                          }}></div>
                          <div className="task-inner bg-white rounded-circle d-flex align-items-center justify-content-center position-absolute" style={{ width: "35px", height: "35px" }}>
                            <span className="fw-semibold small">{Math.round(member.activeTasks / member.tasks * 100)}%</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="fw-semibold">{member.tasks} Tasks</div>
                        <small className="text-muted">{member.activeTasks} Active</small>
                      </div>
                    </div>
                  </td>
                  <td data-label="Status">
                    {getStatusBadge(member.status)}
                  </td>
                  <td data-label="Actions">
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-primary rounded-start">
                        <i className="bi bi-eye d-md-none"></i>
                        <span className="d-none d-md-inline">View</span>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-secondary rounded-end"
                        onClick={() => handleEditClick(member)}
                      >
                        <i className="bi bi-pencil d-md-none"></i>
                        <span className="d-none d-md-inline">Edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMembers.length === 0 && (
          <div className="text-center p-5">
            <div className="mb-3">
              <i className="bi bi-people text-muted" style={{ fontSize: "3rem" }}></i>
            </div>
            <p className="text-muted mb-0">No team members found</p>
          </div>
        )}
      </div>
      
      {/* Add Team Member Modal */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Add Team Member</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="name" 
                      name="name"
                      value={newMember.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      name="email"
                      value={newMember.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="role" 
                      name="role"
                      value={newMember.role}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="tasks" className="form-label">Total Tasks</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="tasks" 
                        name="tasks"
                        value={newMember.tasks}
                        onChange={handleInputChange}
                        min="0"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="activeTasks" className="form-label">Active Tasks</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="activeTasks" 
                        name="activeTasks"
                        value={newMember.activeTasks}
                        onChange={handleInputChange}
                        min="0"
                        max={newMember.tasks}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select 
                      className="form-select" 
                      id="status" 
                      name="status"
                      value={newMember.status}
                      onChange={handleInputChange}
                    >
                      <option value="active">Active</option>
                      <option value="vacation">Vacation</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-light rounded-pill"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary rounded-pill"
                  onClick={handleAddMember}
                  disabled={!newMember.name || !newMember.email || !newMember.role}
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Team Member Modal */}
      {showEditModal && currentMember && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Edit Team Member</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="edit-name" className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="edit-name" 
                      name="name"
                      value={currentMember.name}
                      onChange={(e) => handleInputChange(e, 'edit')}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edit-email" className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="edit-email" 
                      name="email"
                      value={currentMember.email}
                      onChange={(e) => handleInputChange(e, 'edit')}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edit-role" className="form-label">Role</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="edit-role" 
                      name="role"
                      value={currentMember.role}
                      onChange={(e) => handleInputChange(e, 'edit')}
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="edit-tasks" className="form-label">Total Tasks</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="edit-tasks" 
                        name="tasks"
                        value={currentMember.tasks}
                        onChange={(e) => handleInputChange(e, 'edit')}
                        min="0"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="edit-activeTasks" className="form-label">Active Tasks</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id="edit-activeTasks" 
                        name="activeTasks"
                        value={currentMember.activeTasks}
                        onChange={(e) => handleInputChange(e, 'edit')}
                        min="0"
                        max={currentMember.tasks}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edit-status" className="form-label">Status</label>
                    <select 
                      className="form-select" 
                      id="edit-status" 
                      name="status"
                      value={currentMember.status}
                      onChange={(e) => handleInputChange(e, 'edit')}
                    >
                      <option value="active">Active</option>
                      <option value="vacation">Vacation</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-light rounded-pill"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary rounded-pill"
                  onClick={handleSaveEdit}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Backdrop for both modals */}
      {(showAddModal || showEditModal) && (
        <div className="modal-backdrop fade show" style={{ display: 'none' }}></div>
      )}
      
      <style jsx>{`
        .hover-shadow:hover {
          transform: translateY(-3px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
        }
        
        .transition-all {
          transition: all 0.3s ease;
        }
        
        .rounded-pill-start {
          border-top-left-radius: 50rem !important;
          border-bottom-left-radius: 50rem !important;
        }
        
        .rounded-pill-end {
          border-top-right-radius: 50rem !important;
          border-bottom-right-radius: 50rem !important;
        }
      `}</style>
    </div>
  );
};

export default Team;