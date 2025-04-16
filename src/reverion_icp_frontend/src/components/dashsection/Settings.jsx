import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form state
  const [profileForm, setProfileForm] = useState({
    fullName: user?.name || 'Rod Albores',
    email: user?.email || 'rod@example.com',
    phone: user?.phone || '(555) 123-4567',
    role: user?.role || 'Project Manager',
    company: user?.company || 'ReverionTech'
  });
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    taskAssignments: true,
    taskUpdates: true,
    teamChanges: false,
    projectChanges: true,
    weeklyReports: true
  });
  
  const [appearance, setAppearance] = useState({
    theme: 'light',
    colorScheme: 'default',
    fontSize: 'medium',
    compactMode: false
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleAppearanceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppearance(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Get the icon for the sidebar items
  const getTabIcon = (tab) => {
    switch(tab) {
      case 'profile':
        return <i className="bi bi-person-fill"></i>;
      case 'notifications':
        return <i className="bi bi-bell-fill"></i>;
      case 'appearance':
        return <i className="bi bi-palette-fill"></i>;
      case 'billing':
        return <i className="bi bi-credit-card-fill"></i>;
      case 'integrations':
        return <i className="bi bi-puzzle-fill"></i>;
      default:
        return <i className="bi bi-gear-fill"></i>;
    }
  };
  
  // Get theme preview
  const getThemePreview = (theme) => {
    if (theme === 'light') {
      return (
        <div className="theme-preview d-flex">
          <div className="me-2 rounded" style={{ width: '30px', height: '30px', backgroundColor: '#ffffff', border: '1px solid #dee2e6' }}></div>
          <div className="rounded" style={{ width: '30px', height: '30px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}></div>
        </div>
      );
    } else if (theme === 'dark') {
      return (
        <div className="theme-preview d-flex">
          <div className="me-2 rounded" style={{ width: '30px', height: '30px', backgroundColor: '#212529' }}></div>
          <div className="rounded" style={{ width: '30px', height: '30px', backgroundColor: '#343a40' }}></div>
        </div>
      );
    } else {
      return (
        <div className="theme-preview d-flex">
          <div className="me-2 rounded" style={{ width: '30px', height: '30px', backgroundColor: '#ffffff', border: '1px solid #dee2e6' }}></div>
          <div className="rounded" style={{ width: '30px', height: '30px', backgroundColor: '#212529' }}></div>
        </div>
      );
    }
  };
  
  // Get color scheme preview
  const getColorPreview = (scheme) => {
    const colors = {
      default: '#0d6efd',
      purple: '#6f42c1',
      green: '#198754',
      orange: '#fd7e14'
    };
    
    return (
      <div className="color-preview rounded-circle" style={{ width: '24px', height: '24px', backgroundColor: colors[scheme] || colors.default }}></div>
    );
  };

  return (
    <div className="settings-page container-fluid p-4">
      <div className="row mb-4 align-items-center">
        <div className="col-12">
          <h2 className="mb-0 fw-bold">Settings</h2>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card settings-sidebar border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="list-group list-group-flush border-0">
                {['profile', 'notifications', 'appearance', 'billing', 'integrations'].map((tab) => (
                  <button 
                    key={tab}
                    className={`list-group-item list-group-item-action border-0 py-3 px-4 d-flex align-items-center ${activeTab === tab ? 'active bg-primary text-white' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    <span className="settings-icon me-3">
                      {getTabIcon(tab)}
                    </span>
                    <span className="settings-label">
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </span>
                    {activeTab === tab && <i className="bi bi-chevron-right ms-auto"></i>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              {activeTab === 'profile' && (
                <div className="settings-section">
                  <h4 className="card-title mb-1 fw-bold">Profile Settings</h4>
                  <p className="text-muted mb-4">Manage your personal information and account settings.</p>
                  
                  <div className="row mb-4">
                    <div className="col-12">
                      <div className="card bg-light border-0 rounded-4">
                        <div className="card-body p-4">
                          <div className="d-flex flex-column flex-md-row align-items-center">
                            <div className="text-center mb-3 mb-md-0">
                              <div className="avatar-placeholder rounded-circle bg-primary d-flex align-items-center justify-content-center text-white mx-auto" style={{ width: "100px", height: "100px", fontSize: "2.5rem" }}>
                                {profileForm.fullName.split(' ').map(name => name[0]).join('')}
                              </div>
                            </div>
                            <div className="ms-md-4 text-center text-md-start">
                              <h5 className="mb-2 fw-bold">{profileForm.fullName}</h5>
                              <p className="text-muted mb-3">{profileForm.role} at {profileForm.company}</p>
                              <div className="d-flex gap-2 justify-content-center justify-content-md-start">
                                <button type="button" className="btn btn-primary btn-sm rounded-pill px-4">
                                  <i className="bi bi-upload me-2"></i>Upload
                                </button>
                                <button type="button" className="btn btn-outline-danger btn-sm rounded-pill px-4">
                                  <i className="bi bi-trash me-2"></i>Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <form className="profile-settings-form">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="fullName" className="form-label fw-semibold">Full Name</label>
                          <div className="input-group shadow-sm rounded-3 overflow-hidden">
                            <span className="input-group-text bg-white border-end-0">
                              <i className="bi bi-person"></i>
                            </span>
                            <input 
                              type="text" 
                              className="form-control border-start-0" 
                              id="fullName" 
                              name="fullName" 
                              value={profileForm.fullName} 
                              onChange={handleProfileChange} 
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                          <div className="input-group shadow-sm rounded-3 overflow-hidden">
                            <span className="input-group-text bg-white border-end-0">
                              <i className="bi bi-envelope"></i>
                            </span>
                            <input 
                              type="email" 
                              className="form-control border-start-0" 
                              id="email" 
                              name="email" 
                              value={profileForm.email} 
                              onChange={handleProfileChange} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
                          <div className="input-group shadow-sm rounded-3 overflow-hidden">
                            <span className="input-group-text bg-white border-end-0">
                              <i className="bi bi-telephone"></i>
                            </span>
                            <input 
                              type="text" 
                              className="form-control border-start-0" 
                              id="phone" 
                              name="phone" 
                              value={profileForm.phone} 
                              onChange={handleProfileChange} 
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="role" className="form-label fw-semibold">Role</label>
                          <div className="input-group shadow-sm rounded-3 overflow-hidden">
                            <span className="input-group-text bg-white border-end-0">
                              <i className="bi bi-briefcase"></i>
                            </span>
                            <input 
                              type="text" 
                              className="form-control border-start-0" 
                              id="role" 
                              name="role" 
                              value={profileForm.role} 
                              onChange={handleProfileChange} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="company" className="form-label fw-semibold">Company</label>
                          <div className="input-group shadow-sm rounded-3 overflow-hidden">
                            <span className="input-group-text bg-white border-end-0">
                              <i className="bi bi-building"></i>
                            </span>
                            <input 
                              type="text" 
                              className="form-control border-start-0" 
                              id="company" 
                              name="company" 
                              value={profileForm.company} 
                              onChange={handleProfileChange} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-end gap-2">
                      <button type="button" className="btn btn-light rounded-pill px-4 shadow-sm">Cancel</button>
                      <button type="button" className="btn btn-primary rounded-pill px-4 shadow-sm">
                        <i className="bi bi-check-lg me-2"></i>Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="settings-section">
                  <h4 className="card-title mb-1 fw-bold">Notification Settings</h4>
                  <p className="text-muted mb-4">Configure how and when you receive notifications.</p>
                  
                  <div className="notification-settings">
                    <div className="card mb-4 border-0 shadow-sm">
                      <div className="card-body p-4">
                        <h5 className="mb-4 fw-bold d-flex align-items-center">
                          <i className="bi bi-bell-fill text-primary me-2"></i> Email Notifications
                        </h5>
                        
                        {Object.entries(notifications).map(([key, value], index) => (
                          <div key={key} className={`mb-3 pb-3 ${index !== Object.entries(notifications).length - 1 ? 'border-bottom' : ''}`}>
                            <div className="form-check form-switch d-flex justify-content-between align-items-center">
                              <div>
                                <label className="form-check-label fw-semibold" htmlFor={key}>
                                  {key === 'emailNotifications' ? 'All Email Notifications' : 
                                   key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </label>
                                <p className="text-muted mb-0 small">
                                  {key === 'emailNotifications' && 'Receive all notifications via email'}
                                  {key === 'taskAssignments' && 'Receive notifications when you are assigned to a task'}
                                  {key === 'taskUpdates' && 'Receive notifications when a task is updated'}
                                  {key === 'teamChanges' && 'Receive notifications when team members are added or removed'}
                                  {key === 'projectChanges' && 'Receive notifications when project details are updated'}
                                  {key === 'weeklyReports' && 'Receive weekly summary reports of your projects'}
                                </p>
                              </div>
                              <div className="form-switch form-switch-lg">
                                <input 
                                  className="form-check-input" 
                                  type="checkbox" 
                                  id={key} 
                                  name={key}
                                  checked={value} 
                                  onChange={handleNotificationChange}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-end gap-2">
                      <button type="button" className="btn btn-light rounded-pill px-4 shadow-sm">Cancel</button>
                      <button type="button" className="btn btn-primary rounded-pill px-4 shadow-sm">
                        <i className="bi bi-check-lg me-2"></i>Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'appearance' && (
                <div className="settings-section">
                  <h4 className="card-title mb-1 fw-bold">Appearance Settings</h4>
                  <p className="text-muted mb-4">Customize how the dashboard looks and feels.</p>
                  
                  <div className="appearance-settings">
                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="mb-3 fw-semibold">Theme</h5>
                            
                            <div className="d-flex flex-column gap-3">
                              {['light', 'dark', 'system'].map(theme => (
                                <div 
                                  key={theme}
                                  className={`theme-option card p-3 cursor-pointer ${appearance.theme === theme ? 'border-primary' : 'border-0 bg-light'}`}
                                  onClick={() => setAppearance(prev => ({ ...prev, theme }))}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                      {getThemePreview(theme)}
                                      <span className="ms-3 fw-medium">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                                    </div>
                                    {appearance.theme === theme && (
                                      <div className="check-icon bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                                        <i className="bi bi-check-lg text-white small"></i>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm">
                          <div className="card-body p-4">
                            <h5 className="mb-3 fw-semibold">Color Scheme</h5>
                            
                            <div className="d-flex flex-column gap-3">
                              {['default', 'purple', 'green', 'orange'].map(scheme => (
                                <div 
                                  key={scheme}
                                  className={`color-option card p-3 cursor-pointer ${appearance.colorScheme === scheme ? 'border-primary' : 'border-0 bg-light'}`}
                                  onClick={() => setAppearance(prev => ({ ...prev, colorScheme: scheme }))}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                      {getColorPreview(scheme)}
                                      <span className="ms-3 fw-medium">{scheme.charAt(0).toUpperCase() + scheme.slice(1)}</span>
                                    </div>
                                    {appearance.colorScheme === scheme && (
                                      <div className="check-icon bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                                        <i className="bi bi-check-lg text-white small"></i>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-body p-4">
                            <h5 className="mb-3 fw-semibold">Font Size</h5>
                            
                            <div className="font-size-options">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-small">Small</span>
                                <span className="text-large">Large</span>
                              </div>
                              <input 
                                type="range" 
                                className="form-range" 
                                min="0" 
                                max="2" 
                                step="1" 
                                id="fontSize" 
                                value={appearance.fontSize === 'small' ? 0 : appearance.fontSize === 'medium' ? 1 : 2} 
                                onChange={(e) => {
                                  const value = parseInt(e.target.value);
                                  const size = value === 0 ? 'small' : value === 1 ? 'medium' : 'large';
                                  setAppearance(prev => ({ ...prev, fontSize: size }));
                                }} 
                              />
                              <div className="d-flex justify-content-between mt-2">
                                <span className={`badge ${appearance.fontSize === 'small' ? 'bg-primary' : 'bg-light text-dark'}`}>Small</span>
                                <span className={`badge ${appearance.fontSize === 'medium' ? 'bg-primary' : 'bg-light text-dark'}`}>Medium</span>
                                <span className={`badge ${appearance.fontSize === 'large' ? 'bg-primary' : 'bg-light text-dark'}`}>Large</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-body p-4">
                            <div className="d-flex justify-content-between align-items-start mb-4">
                              <div>
                                <h5 className="mb-1 fw-semibold">Compact Mode</h5>
                                <p className="text-muted mb-0 small">Use condensed view to show more content on screen</p>
                              </div>
                              <div className="form-switch form-switch-lg">
                                <input 
                                  className="form-check-input" 
                                  type="checkbox" 
                                  id="compactMode" 
                                  name="compactMode"
                                  checked={appearance.compactMode} 
                                  onChange={handleAppearanceChange}
                                />
                              </div>
                            </div>
                            
                            <div className="compact-preview border rounded p-2">
                              <div className={`bg-light rounded p-2 mb-2 ${appearance.compactMode ? 'py-1' : 'py-2'}`}></div>
                              <div className={`bg-light rounded p-2 mb-2 ${appearance.compactMode ? 'py-1' : 'py-2'}`}></div>
                              <div className={`bg-light rounded p-2 ${appearance.compactMode ? 'py-1' : 'py-2'}`}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-end gap-2">
                      <button type="button" className="btn btn-light rounded-pill px-4 shadow-sm">Reset</button>
                      <button type="button" className="btn btn-primary rounded-pill px-4 shadow-sm">
                        <i className="bi bi-check-lg me-2"></i>Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'billing' && (
                <div className="settings-section">
                  <h4 className="card-title mb-1 fw-bold">Billing & Plan</h4>
                  <p className="text-muted mb-4">Manage your subscription and billing information.</p>
                  
                  <div className="billing-plan mb-5">
                    <h5 className="mb-3 fw-bold">Current Plan</h5>
                    <div className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                          <div>
                            <div className="d-flex align-items-center mb-2">
                              <div className="badge bg-primary-subtle text-primary me-2 px-3 py-2">Growth</div>
                              <div className="badge bg-success-subtle text-success px-3 py-2">Active</div>
                            </div>
                            <h5 className="mb-1 fw-bold">Growth Plan</h5>
                            <p className="text-muted mb-0">$49 / month · Next billing on Apr 1, 2025</p>
                          </div>
                          <button className="btn btn-outline-primary rounded-pill px-4 mt-3 mt-md-0">
                            <i className="bi bi-arrow-up-circle me-2"></i>Upgrade Plan
                          </button>
                        </div>
                        <hr />
                        <div className="row g-4">
                          <div className="col-md-6 col-lg-3">
                            <div className="feature-item d-flex align-items-center">
                              <div className="feature-icon bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                <i className="bi bi-people"></i>
                              </div>
                              <span>10 team members</span>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <div className="feature-item d-flex align-items-center">
                              <div className="feature-icon bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                <i className="bi bi-check2-circle"></i>
                              </div>
                              <span>2,000 task credits</span>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <div className="feature-item d-flex align-items-center">
                              <div className="feature-icon bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                <i className="bi bi-infinity"></i>
                              </div>
                              <span>Unlimited projects</span>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-3">
                            <div className="feature-item d-flex align-items-center">
                              <div className="feature-icon bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                                <i className="bi bi-graph-up"></i>
                              </div>
                              <span>Advanced analytics</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="billing-history">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">Billing History</h5>
                      <button className="btn btn-outline-secondary rounded-pill btn-sm px-3">
                        <i className="bi bi-download me-2"></i>Download All
                      </button>
                    </div>
                    <div className="card border-0 shadow-sm">
                      <div className="table-responsive">
                        <table className="table table-hover mb-0">
                          <thead className="table-light">
                            <tr>
                              <th className="border-0">Invoice</th>
                              <th className="border-0">Date</th>
                              <th className="border-0">Amount</th>
                              <th className="border-0">Status</th>
                              <th className="border-0 text-end">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>INV-001-25</td>
                              <td>Mar 01, 2025</td>
                              <td>$49.00</td>
                              <td><span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">Paid</span></td>
                              <td className="text-end">
                                <button className="btn btn-sm btn-light rounded-pill">
                                  <i className="bi bi-file-earmark-text me-1"></i>View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>INV-002-25</td>
                              <td>Feb 01, 2025</td>
                              <td>$49.00</td>
                              <td><span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">Paid</span></td>
                              <td className="text-end">
                                <button className="btn btn-sm btn-light rounded-pill">
                                  <i className="bi bi-file-earmark-text me-1"></i>View
                                </button>
                              </td>
                            </tr>
                            <tr>
                              <td>INV-003-25</td>
                              <td>Jan 01, 2025</td>
                              <td>$49.00</td>
                              <td><span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">Paid</span></td>
                              <td className="text-end">
                                <button className="btn btn-sm btn-light rounded-pill">
                                  <i className="bi bi-file-earmark-text me-1"></i>View
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'integrations' && (
                <div className="settings-section">
                  <h4 className="card-title mb-1 fw-bold">Integrations</h4>
                  <p className="text-muted mb-4">Connect your account with other services.</p>
                  
                  <div className="row g-4">
                    {[
                      { name: 'Slack', icon: 'slack', connected: false, description: 'Receive notifications in your Slack channels' },
                      { name: 'Google Calendar', icon: 'google', connected: true, description: 'Sync task deadlines with your Google Calendar' },
                      { name: 'GitHub', icon: 'github', connected: false, description: 'Link GitHub repositories to your projects' },
                      { name: 'Figma', icon: 'palette2', connected: false, description: 'Integrate design files with your projects' }
                    ].map((integration, index) => (
                      <div className="col-md-6" key={index}>
                        <div className="card border-0 shadow-sm h-100 hover-shadow">
                          <div className="card-body p-4">
                            <div className="d-flex align-items-center mb-3">
                              <div className={`integration-icon ${integration.connected ? 'bg-primary-subtle text-primary' : 'bg-light'} rounded-circle p-3 me-3 d-flex align-items-center justify-content-center`} style={{ width: '60px', height: '60px' }}>
                                <i className={`bi bi-${integration.icon} fs-4`}></i>
                              </div>
                              <div>
                                <h5 className="mb-1 fw-semibold">{integration.name}</h5>
                                <p className="text-muted mb-0 small">{integration.description}</p>
                              </div>
                            </div>
                            {integration.connected ? (
                              <div className="d-flex gap-2">
                                <button className="btn btn-success rounded-pill flex-grow-1">
                                  <i className="bi bi-check-circle me-2"></i>Connected
                                </button>
                                <button className="btn btn-outline-danger rounded-pill">
                                  <i className="bi bi-x-circle"></i>
                                </button>
                              </div>
                            ) : (
                              <button className="btn btn-outline-primary rounded-pill w-100">
                                <i className="bi bi-link-45deg me-2"></i>Connect
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hover-shadow {
          transition: transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        
        .hover-shadow:hover {
          transform: translateY(-3px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1) !important;
        }
        
        .form-switch-lg .form-check-input {
          width: 3em;
          height: 1.5em;
          margin-top: 0;
        }
        
        .form-switch .form-check-input:checked {
          background-color: #0d6efd;
          border-color: #0d6efd;
        }
        
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Settings;