import React from 'react';
import { InlineMath } from 'react-katex';

const LimitsTopic = () => {
  return (
    <div className="topic-container coming-soon-topic">
      <div className="topic-header">
        <h1>→ Limits</h1>
        <p className="topic-description">Approaching values, continuity, and the foundation of calculus</p>
        <div className="coming-soon-badge">Coming Soon</div>
      </div>

      <div className="coming-soon-content">
        <div className="preview-card">
          <h2>🚀 What You'll Learn</h2>
          <div className="preview-grid">
            <div className="preview-item">
              <h3>📐 The Story</h3>
              <p>Limits as "getting really close" - understanding what happens as we approach a value</p>
            </div>
            <div className="preview-item">
              <h3>👁️ Visual Understanding</h3>
              <p>See limits through graph zooming, table values, and interactive approaching animations</p>
            </div>
            <div className="preview-item">
              <h3>🎮 Interactive Exploration</h3>
              <p>Play with one-sided limits, infinite limits, and limits at infinity</p>
            </div>
            <div className="preview-item">
              <h3>💡 Real Applications</h3>
              <p>Continuity, asymptotes, and setting up derivatives and integrals</p>
            </div>
          </div>
        </div>

        <div className="preview-card">
          <h2>🧠 Key Concepts</h2>
          <ul className="concept-list">
            <li><strong>Intuitive Limits:</strong> What does "approaching" really mean?</li>
            <li><strong>Formal Definition:</strong> The epsilon-delta definition made simple</li>
            <li><strong>Limit Laws:</strong> Rules for calculating limits algebraically</li>
            <li><strong>Continuity:</strong> When functions have no "breaks" or "jumps"</li>
            <li><strong>Infinite Limits:</strong> Understanding asymptotes and unbounded behavior</li>
            <li><strong>Limits at Infinity:</strong> What happens as x gets very large?</li>
          </ul>
        </div>

        <div className="preview-card">
          <h2>🎯 Sample Problems</h2>
          <div className="sample-problems">
            <div className="problem">
              <p><strong>Classic Limit:</strong> <InlineMath math="\lim_{x \to 0} \frac{\sin x}{x}" /></p>
            </div>
            <div className="problem">
              <p><strong>Rational Function:</strong> <InlineMath math="\lim_{x \to 2} \frac{x^2 - 4}{x - 2}" /></p>
            </div>
            <div className="problem">
              <p><strong>Infinite Limit:</strong> <InlineMath math="\lim_{x \to \infty} \frac{3x^2 + 1}{x^2 - 5}" /></p>
            </div>
          </div>
        </div>

        <div className="preview-card development-status">
          <h2>🛠️ Development Status</h2>
          <div className="status-grid">
            <div className="status-item planned">
              <div className="status-icon">📋</div>
              <div>Content Planning</div>
            </div>
            <div className="status-item planned">
              <div className="status-icon">🎨</div>
              <div>Interactive Design</div>
            </div>
            <div className="status-item planned">
              <div className="status-icon">⚡</div>
              <div>Visualization Engine</div>
            </div>
            <div className="status-item planned">
              <div className="status-icon">🧪</div>
              <div>Testing & Polish</div>
            </div>
          </div>
          <p>Limits are the foundation of calculus - this topic will help you truly understand what derivatives and integrals are built on!</p>
        </div>
      </div>
    </div>
  );
};

export default LimitsTopic; 