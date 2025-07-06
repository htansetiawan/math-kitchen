import React from 'react';
import { InlineMath } from 'react-katex';

const MatricesTopic = () => {
  return (
    <div className="topic-container coming-soon-topic">
      <div className="topic-header">
        <h1>⬜ Matrices</h1>
        <p className="topic-description">Linear algebra, transformations, and the language of modern mathematics</p>
        <div className="coming-soon-badge">Coming Soon</div>
      </div>

      <div className="coming-soon-content">
        <div className="preview-card">
          <h2>What You'll Learn</h2>
          
          <div className="preview-grid">
            <div className="preview-item">
              <h3>Matrix Fundamentals</h3>
              <p>Understanding what matrices are and how they represent data and transformations</p>
            </div>
            
            <div className="preview-item">
              <h3>Operations</h3>
              <p>Addition, multiplication, and other essential matrix operations</p>
            </div>
            
            <div className="preview-item">
              <h3>Linear Transformations</h3>
              <p>How matrices transform space: rotations, scaling, and projections</p>
            </div>
            
            <div className="preview-item">
              <h3>Applications</h3>
              <p>Computer graphics, machine learning, and solving systems of equations</p>
            </div>
          </div>
        </div>

        <div className="preview-card">
          <h2>Key Concepts</h2>
          <div className="concept-list">
            <li>Matrix notation and terminology</li>
            <li>Determinants and their geometric meaning</li>
            <li>Eigenvalues and eigenvectors</li>
            <li>Matrix inverses and their applications</li>
            <li>Geometric interpretations of matrix operations</li>
          </div>
        </div>

        <div className="preview-card">
          <h2>Sample Problems</h2>
          <div className="sample-problems">
            <div className="problem">
              <h3>🎮 Computer Graphics</h3>
              <p>How to rotate a 3D object using rotation matrices</p>
            </div>
            
            <div className="problem">
              <h3>🤖 Machine Learning</h3>
              <p>Using matrices to represent and process data in neural networks</p>
            </div>
            
            <div className="problem">
              <h3>🔧 Engineering</h3>
              <p>Solving systems of linear equations for structural analysis</p>
            </div>
          </div>
        </div>

        <div className="development-status">
          <h2>Development Progress</h2>
          <div className="status-grid">
            <div className="status-item planned">
              <div className="status-icon">📋</div>
              <h3>Content Planning</h3>
              <p>Curriculum design and learning objectives</p>
            </div>
            
            <div className="status-item planned">
              <div className="status-icon">🎨</div>
              <h3>Visualizations</h3>
              <p>Interactive matrix transformations and 3D graphics</p>
            </div>
            
            <div className="status-item planned">
              <div className="status-icon">💻</div>
              <h3>Implementation</h3>
              <p>Coding the interactive components and examples</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatricesTopic; 