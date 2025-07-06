import React from 'react';
import { InlineMath } from 'react-katex';

const IntegrationTopic = () => {
  return (
    <div className="topic-container coming-soon-topic">
      <div className="topic-header">
        <h1>∫ Integration</h1>
        <p className="topic-description">Area under curves, accumulation, and the reverse of differentiation</p>
        <div className="coming-soon-badge">Coming Soon</div>
      </div>

      <div className="coming-soon-content">
        <div className="preview-card">
          <h2>🚀 What You'll Learn</h2>
          <div className="preview-grid">
            <div className="preview-item">
              <h3>📐 The Story</h3>
              <p>Integration as area under curves - from calculating distance traveled to finding total accumulation</p>
            </div>
            <div className="preview-item">
              <h3>👁️ Visual Understanding</h3>
              <p>See integration as the reverse of differentiation with interactive Riemann sums and area calculations</p>
            </div>
            <div className="preview-item">
              <h3>🎮 Interactive Exploration</h3>
              <p>Play with definite and indefinite integrals, substitution, and integration by parts</p>
            </div>
            <div className="preview-item">
              <h3>💡 Real Applications</h3>
              <p>Physics (work, energy), economics (consumer surplus), and probability (continuous distributions)</p>
            </div>
          </div>
        </div>

        <div className="preview-card">
          <h2>🧠 Key Concepts</h2>
          <ul className="concept-list">
            <li><strong>Antiderivatives:</strong> Finding functions whose derivative gives you the original function</li>
            <li><strong>Fundamental Theorem:</strong> The beautiful connection between derivatives and integrals</li>
            <li><strong>Riemann Sums:</strong> How rectangles approximate areas under curves</li>
            <li><strong>Integration Techniques:</strong> Substitution, by parts, partial fractions</li>
            <li><strong>Applications:</strong> Area, volume, work, probability, and more</li>
          </ul>
        </div>

        <div className="preview-card">
          <h2>🎯 Sample Problems</h2>
          <div className="sample-problems">
            <div className="problem">
              <p><strong>Area Problem:</strong> Find the area between <InlineMath math="y = x^2" /> and <InlineMath math="y = 4" /></p>
            </div>
            <div className="problem">
              <p><strong>Physics Problem:</strong> A car accelerates at <InlineMath math="a(t) = 6t" /> m/s². Find the distance traveled in 3 seconds.</p>
            </div>
            <div className="problem">
              <p><strong>Economics Problem:</strong> Calculate consumer surplus when demand is <InlineMath math="p = 100 - q^2" /></p>
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
          <p>Want to be notified when this topic launches? Integration will be the next major addition to Math Kitchen!</p>
        </div>
      </div>
    </div>
  );
};

export default IntegrationTopic; 