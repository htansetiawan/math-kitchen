import React, { useState, useEffect, useMemo } from 'react';
import './styles/App.css';

// Initialize Firebase (for future auth features)
import './firebase';

// Topic Components
import DerivativesTopic from './topics/DerivativesTopic';
import IntegrationTopic from './topics/IntegrationTopic';
import MatricesTopic from './topics/MatricesTopic';
import LimitsTopic from './topics/LimitsTopic';

function App() {
  const [activeTopic, setActiveTopic] = useState('derivatives');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => window.innerWidth <= 768);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Auto-collapse sidebar on mobile
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      } else if (!mobile && sidebarCollapsed) {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarCollapsed]);

  const mathTopics = useMemo(() => [
    { 
      id: 'derivatives', 
      title: 'Limits & Derivatives', 
      component: DerivativesTopic,
      description: 'Understanding rates of change and slopes',
      completed: true
    },
    { 
      id: 'integration', 
      title: 'Integration', 
      component: IntegrationTopic,
      description: 'Area under curves and accumulation',
      completed: false
    },
    { 
      id: 'limits', 
      title: 'Limits', 
      component: LimitsTopic,
      description: 'Approaching values and continuity',
      completed: false
    },
    { 
      id: 'matrices', 
      title: 'Matrices', 
      component: MatricesTopic,
      description: 'Linear algebra and transformations',
      completed: false
    }
  ], []);

  useEffect(() => {
    // Add keyboard navigation
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        const currentIndex = mathTopics.findIndex(topic => topic.id === activeTopic);
        if (event.key === 'ArrowUp' && currentIndex > 0) {
          setActiveTopic(mathTopics[currentIndex - 1].id);
        } else if (event.key === 'ArrowDown' && currentIndex < mathTopics.length - 1) {
          setActiveTopic(mathTopics[currentIndex + 1].id);
        }
      }
      // Toggle sidebar with 'S' key
      if (event.key === 's' || event.key === 'S') {
        setSidebarCollapsed(!sidebarCollapsed);
      }
      // Close sidebar with Escape key on mobile
      if (event.key === 'Escape' && isMobile) {
        setSidebarCollapsed(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeTopic, sidebarCollapsed, mathTopics, isMobile]);

  const handleTopicChange = (topicId) => {
    setActiveTopic(topicId);
  };

  const handleBackdropClick = () => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  const renderActiveTopic = () => {
    const activeTopicData = mathTopics.find(topic => topic.id === activeTopic);
    if (activeTopicData) {
      const Component = activeTopicData.component;
      return <Component />;
    }
    return null;
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? '☰' : '×'}
          </button>
          <h1>Math Kitchen</h1>
          <p className="subtitle">Interactive Math Learning Platform</p>
        </div>
      </header>

      <div className="app-body">
        {/* Mobile backdrop */}
        {!sidebarCollapsed && isMobile && (
          <div className="mobile-backdrop" onClick={handleBackdropClick} />
        )}
        
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <h2>Math Topics</h2>
            <p className="sidebar-subtitle">Choose your adventure</p>
          </div>
          
          <nav className="topic-nav">
            {mathTopics.map(topic => (
              <button
                key={topic.id}
                className={`topic-btn ${activeTopic === topic.id ? 'active' : ''} ${topic.completed ? 'completed' : 'upcoming'}`}
                onClick={() => handleTopicChange(topic.id)}
                aria-label={`Go to ${topic.title}`}
              >
                <div className="topic-content">
                  <div className="topic-title">{topic.title}</div>
                  <div className="topic-description">{topic.description}</div>
                  {!topic.completed && <div className="coming-soon">Coming Soon</div>}
                </div>
              </button>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="progress-summary">
              <h3>Your Progress</h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(mathTopics.filter(t => t.completed).length / mathTopics.length) * 100}%` }}
                ></div>
              </div>
              <p>{mathTopics.filter(t => t.completed).length} of {mathTopics.length} topics mastered</p>
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="topic-content">
            {renderActiveTopic()}
          </div>
        </main>
      </div>

      <footer className="app-footer">
        <p>Built to make math intuitive | Math Kitchen</p>
        <p className="keyboard-hint">Tip: Use ↑↓ arrows to navigate topics, 'S' to toggle sidebar</p>
      </footer>
    </div>
  );
}

export default App; 