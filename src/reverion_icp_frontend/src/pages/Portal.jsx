import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useResponsiveNavigation, useScreenSize } from '../utils/responsive-utils';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/custom.css';

import Dashboard from '../components/dashsection/Dashboard';
import Tasks from '../components/dashsection/Tasks';
import Team from '../components/dashsection/Team';
import Settings from '../components/dashsection/Settings';
import ProjectNotes from '../components/dashsection/ProjectNotes';
import MobileMenuButton from '../components/common/MobileMenuButton';

// Map of routes to component keys - defined outside component to prevent recreating on each render
const ROUTE_MAP = {
  '/portal/tasks': 'tasks',
  '/portal/team': 'team',
  '/portal/settings': 'settings',
  '/portal/project-notes': 'project-notes',
  '/portal': 'dashboard'
};

const Portal = () => {
  const { user, logout } = useAuth();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  
  // Use the responsive navigation hook instead of manually managing sidebar state
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useResponsiveNavigation();
  const { isMobile } = useScreenSize();
  
  // Helper to get canister ID from URL - memoized to prevent recreating on each render
  const getCanisterId = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('canisterId');
  }, []);
  
  // Optimized function to check URL and set component
  const checkUrlAndSetComponent = useCallback(() => {
    const hash = window.location.hash || '#/portal';
    
    // Find matching route from our map instead of multiple if/else checks
    for (const [route, component] of Object.entries(ROUTE_MAP)) {
      if (hash.includes(route)) {
        setActiveComponent(component);
        return;
      }
    }
    
    // Default to dashboard if no match
    setActiveComponent('dashboard');
  }, []);

  // Check URL on component mount and when hash changes
  useEffect(() => {
    // Check immediately on mount
    checkUrlAndSetComponent();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', checkUrlAndSetComponent);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', checkUrlAndSetComponent);
    };
  }, [checkUrlAndSetComponent]);
  
  // Navigate function to handle link clicks - memoized with useCallback
  const navigate = useCallback((component, path) => {
    const canisterId = getCanisterId();
    const url = canisterId ? 
      `/?canisterId=${canisterId}#/portal${path}` : 
      `#/portal${path}`;
    
    // Update URL without causing page refresh
    window.history.pushState(null, '', url);
    
    // Update active component immediately - don't wait for the hashchange
    setActiveComponent(component);
    
    // Close sidebar on mobile after navigation
    if (isMobile) {
      closeSidebar();
    }
  }, [getCanisterId, isMobile, closeSidebar]);
  
  // Handle logout - memoized with useCallback
  const handleLogout = useCallback(() => {
    const canisterId = getCanisterId();
    logout();
    if (canisterId) {
      window.location.href = `/?canisterId=${canisterId}`;
    } else {
      window.location.href = '/';
    }
  }, [getCanisterId, logout]);
  
  // Redirect if no user
  if (!user) {
    const canisterId = getCanisterId();
    window.location.href = canisterId ? `/?canisterId=${canisterId}` : '/';
    return null;
  }

  // Pre-defined components for conditional rendering - prevents unnecessary re-evaluation
  const componentMap = {
    'dashboard': <Dashboard />,
    'tasks': <Tasks />,
    'team': <Team />,
    'settings': <Settings />,
    'project-notes': <ProjectNotes />
  };

  return (
    <div className="portal-wrapper">
      <MobileMenuButton isOpen={isSidebarOpen} toggleMenu={toggleSidebar} />
      {isSidebarOpen && 
        <div className="overlay d-xxl-none show" onClick={closeSidebar}></div>
      }
      
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <div className="logo d-flex align-items-center">
            <div className="logo-text ms-2">
              <h3 className="mb-0">ReverionTech</h3>
              <small>Project Management</small>
            </div>
          </div>
        </div>
        
        <div className="sidebar-content">
          <div className="credits-info p-3 mb-4">
            <div className="credits-title mb-2">Growth Plan</div>
            <div className="credits-remaining d-flex justify-content-between mb-2">
              <span>Credits Remaining:</span>
              <span className="credit-value">1,284</span>
            </div>
            <div className="progress" style={{ height: "8px" }}>
              <div className="progress-bar" style={{ width: '60%' }}></div>
            </div>
          </div>

          <nav className="sidebar-nav">
            <div 
              className={`sidenav-item ${activeComponent === 'dashboard' ? 'active' : ''}`}
              onClick={() => navigate('dashboard', '')}
            >
              <i className="bi bi-grid me-3"></i>
              <span>Dashboard</span>
            </div>
            <div 
              className={`sidenav-item ${activeComponent === 'tasks' ? 'active' : ''}`}
              onClick={() => navigate('tasks', '/tasks')}
            >
              <i className="bi bi-check2-square me-3"></i>
              <span>Tasks</span>
            </div>
            <div 
              className={`sidenav-item ${activeComponent === 'team' ? 'active' : ''}`}
              onClick={() => navigate('team', '/team')}
            >
              <i className="bi bi-people me-3"></i>
              <span>Team</span>
            </div>
            <div 
              className={`sidenav-item ${activeComponent === 'project-notes' ? 'active' : ''}`}
              onClick={() => navigate('project-notes', '/project-notes')}
            >
              <i className="bi bi-journal-text me-3"></i>
              <span>Project Notes</span>
            </div>
            <div 
              className={`sidenav-item ${activeComponent === 'settings' ? 'active' : ''}`}
              onClick={() => navigate('settings', '/settings')}
            >
              <i className="bi bi-gear me-3"></i>
              <span>Settings</span>
            </div>
          </nav>
        </div>
        
        <div className="sidebar-footer">
          <div className="logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-3"></i>
            <span>Log Out</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="content-header">
          <div className="container-fluid px-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h1 className="page-title">Website Redesign Project</h1>
              </div>
              <div className="col-md-6">
                <div className="header-actions d-flex justify-content-end align-items-center">
                  <div className="notifications me-3">
                    <button className="btn btn-light btn-sm position-relative">
                      <i className="bi bi-bell"></i>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        3
                      </span>
                    </button>
                  </div>
                  <div className="user-avatar">
                    <span>{user?.initials || 'JD'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          <div className="container-fluid px-4">
            {/* Directly access the component from the map */}
            {componentMap[activeComponent] || componentMap['dashboard']}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
