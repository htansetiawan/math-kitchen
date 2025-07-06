import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { BlockMath } from 'react-katex';

const InteractiveChapter = () => {
  const [h, setH] = useState(0.5);
  const [x, setX] = useState(2);
  const [stepIndex, setStepIndex] = useState(0);
  
  // Refs for plots to force proper sizing
  const limitPlotRef = useRef(null);
  const convergencePlotRef = useRef(null);

  // Force plot resize on mount and window resize
  useEffect(() => {
    const resizePlots = () => {
      setTimeout(() => {
        // Check if Plotly is available on window before using it
        if (window.Plotly && window.Plotly.Plots) {
          if (limitPlotRef.current) {
            window.Plotly.Plots.resize(limitPlotRef.current);
          }
          if (convergencePlotRef.current) {
            window.Plotly.Plots.resize(convergencePlotRef.current);
          }
        }
      }, 200);
    };

    // Initial resize with longer delay to ensure Plotly is loaded
    setTimeout(resizePlots, 500);

    // Add window resize listener
    window.addEventListener('resize', resizePlots);
    
    return () => window.removeEventListener('resize', resizePlots);
  }, []);

  // Force resize when data changes
  useEffect(() => {
    setTimeout(() => {
      if (window.Plotly && window.Plotly.Plots) {
        if (limitPlotRef.current) {
          window.Plotly.Plots.resize(limitPlotRef.current);
        }
        if (convergencePlotRef.current) {
          window.Plotly.Plots.resize(convergencePlotRef.current);
        }
      }
    }, 100);
  }, [h, x]);

  // Calculate secant slope
  const secantSlope = ((x + h) * (x + h) - x * x) / h;
  const actualDerivative = 2 * x;

  // Generate data for the limit demonstration
  const generateLimitData = () => {
    const hValues = [];
    const slopeValues = [];
    
    for (let i = 0.001; i <= 2; i += 0.01) {
      hValues.push(i);
      slopeValues.push(((x + i) * (x + i) - x * x) / i);
    }
    
    return { hValues, slopeValues };
  };

  const { hValues, slopeValues } = generateLimitData();

  // Step-by-step derivation
  const derivationSteps = [
    {
      title: "1. Start with the Definition",
      content: (
        <div>
          <p>The derivative is defined as:</p>
          <BlockMath math="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" />
          <p>For f(x) = x², we substitute:</p>
          <BlockMath math="f'(x) = \lim_{h \to 0} \frac{(x+h)^2 - x^2}{h}" />
        </div>
      )
    },
    {
      title: "2. Expand the Numerator",
      content: (
        <div>
          <p>Let's expand (x+h)²:</p>
          <BlockMath math="(x+h)^2 = x^2 + 2xh + h^2" />
          <p>So our expression becomes:</p>
          <BlockMath math="f'(x) = \lim_{h \to 0} \frac{x^2 + 2xh + h^2 - x^2}{h}" />
        </div>
      )
    },
    {
      title: "3. Simplify the Numerator",
      content: (
        <div>
          <p>Notice that x² cancels out:</p>
          <BlockMath math="x^2 + 2xh + h^2 - x^2 = 2xh + h^2" />
          <p>So we have:</p>
          <BlockMath math="f'(x) = \lim_{h \to 0} \frac{2xh + h^2}{h}" />
        </div>
      )
    },
    {
      title: "4. Factor Out h",
      content: (
        <div>
          <p>Factor h from the numerator:</p>
          <BlockMath math="f'(x) = \lim_{h \to 0} \frac{h(2x + h)}{h}" />
          <p>Cancel the h terms:</p>
          <BlockMath math="f'(x) = \lim_{h \to 0} (2x + h)" />
        </div>
      )
    },
    {
      title: "5. Take the Limit",
      content: (
        <div>
          <p>As h approaches 0:</p>
          <BlockMath math="f'(x) = 2x + 0 = 2x" />
          <p><strong>Therefore, if f(x) = x², then f'(x) = 2x</strong></p>
          <p>We've proven why the derivative of x² is 2x.</p>
        </div>
      )
    }
  ];

  return (
    <div className="chapter-content">
      <h2>Play With It: The Mathematical Machinery</h2>
      
      <div className="interactive-explanation">
        <h3>Building the Derivative from Scratch</h3>
        <p>
          Let's discover how the derivative formula actually works by building it step by step. 
          We'll use the formal definition and see how the magic happens.
        </p>
        <ul>
          <li><strong>Start with the definition:</strong> What does "instantaneous rate of change" mean?</li>
          <li><strong>Use secant lines:</strong> Approximate the slope with nearby points</li>
          <li><strong>Take the limit:</strong> See what happens as the points get infinitely close</li>
        </ul>
      </div>

      <div className="plot-section">
        <h4>Interactive Limit Demonstration</h4>
        <p>Watch how the secant line approaches the tangent line as h gets smaller:</p>
        
        <div className="plot-controls">
          <label>
            h value: {h.toFixed(3)}
            <input
              type="range"
              min="0.001"
              max="2"
              step="0.001"
              value={h}
              onChange={(e) => setH(parseFloat(e.target.value))}
            />
          </label>
          
          <label>
            x position: {x.toFixed(1)}
            <input
              type="range"
              min="0"
              max="4"
              step="0.1"
              value={x}
              onChange={(e) => setX(parseFloat(e.target.value))}
            />
          </label>
          
          <div className="slope-info">
            <strong>Secant slope:</strong> {secantSlope.toFixed(4)}<br/>
            <strong>True derivative:</strong> {actualDerivative.toFixed(4)}<br/>
            <strong>Difference:</strong> {Math.abs(secantSlope - actualDerivative).toFixed(4)}
          </div>
        </div>
        
        <div className="plot-container">
          <Plot
            ref={limitPlotRef}
            data={[
              {
                x: [-1, 0, 1, 2, 3, 4, 5],
                y: [1, 0, 1, 4, 9, 16, 25],
                type: 'scatter',
                mode: 'lines',
                line: { color: '#667eea', width: 3 },
                name: 'f(x) = x²'
              },
              {
                x: [x, x + h],
                y: [x * x, (x + h) * (x + h)],
                type: 'scatter',
                mode: 'markers+lines',
                marker: { color: '#ff6b6b', size: 10 },
                line: { color: '#4ecdc4', width: 3 },
                name: 'Secant Line'
              },
              {
                x: [x - 0.5, x + 0.5],
                y: [x * x + actualDerivative * (-0.5), x * x + actualDerivative * 0.5],
                type: 'scatter',
                mode: 'lines',
                line: { color: '#ffd700', width: 2, dash: 'dash' },
                name: 'True Tangent'
              }
            ]}
            layout={{
              title: `Secant vs Tangent at x = ${x}`,
              xaxis: { title: 'x', range: [-1, 5] },
              yaxis: { title: 'f(x)', range: [-1, 16] },
              showlegend: true,
              autosize: true,
              margin: { l: 60, r: 60, t: 60, b: 60 }
            }}
            config={{ 
              responsive: true,
              displayModeBar: false,
              scrollZoom: false,
              doubleClick: 'reset+autosize'
            }}
            className="plot"
            useResizeHandler={true}
            style={{width: "100%", height: "400px"}}
          />
        </div>
      </div>

      <div className="plot-section">
        <h4>Convergence Visualization</h4>
        <p>See how the secant slope converges to the true derivative as h → 0:</p>
        
        <div className="plot-controls">
          <label>
            h value: {h.toFixed(3)}
            <input
              type="range"
              min="0.001"
              max="2"
              step="0.001"
              value={h}
              onChange={(e) => setH(parseFloat(e.target.value))}
            />
          </label>
          
          <label>
            x position: {x.toFixed(1)}
            <input
              type="range"
              min="0"
              max="4"
              step="0.1"
              value={x}
              onChange={(e) => setX(parseFloat(e.target.value))}
            />
          </label>
          
          <div className="slope-info">
            <strong>Current h:</strong> {h.toFixed(4)}<br/>
            <strong>Secant slope:</strong> {secantSlope.toFixed(4)}<br/>
            <strong>Target derivative:</strong> {actualDerivative.toFixed(4)}
          </div>
        </div>
        
        <div className="plot-container">
          <Plot
            ref={convergencePlotRef}
            data={[
              {
                x: hValues,
                y: slopeValues,
                type: 'scatter',
                mode: 'lines',
                line: { color: '#4ecdc4', width: 3 },
                name: 'Secant Slope'
              },
              {
                x: [0, 2],
                y: [actualDerivative, actualDerivative],
                type: 'scatter',
                mode: 'lines',
                line: { color: '#ffd700', width: 2, dash: 'dash' },
                name: 'True Derivative'
              },
              {
                x: [h],
                y: [secantSlope],
                type: 'scatter',
                mode: 'markers',
                marker: { color: '#ff6b6b', size: 12 },
                name: 'Current h'
              }
            ]}
            layout={{
              title: `Convergence to f'(${x}) = ${actualDerivative}`,
              xaxis: { title: 'h', range: [0, 2] },
              yaxis: { title: 'Slope', range: [actualDerivative - 2, actualDerivative + 4] },
              showlegend: true,
              autosize: true,
              margin: { l: 60, r: 60, t: 60, b: 60 }
            }}
            config={{ 
              responsive: true,
              displayModeBar: false,
              scrollZoom: false,
              doubleClick: 'reset+autosize'
            }}
            className="plot"
            useResizeHandler={true}
            style={{width: "100%", height: "400px"}}
          />
        </div>
      </div>

      <div className="interactive-explanation">
        <h3>Step-by-Step Derivation</h3>
        <p>
          Now let's see the algebraic steps that prove why the derivative of x² is 2x. 
          Follow along as we work through the limit definition:
        </p>
        
        <div className="newton-derivation">
          <img 
            src="/newton-comic-2.png" 
            alt="Newton comic strip showing the step-by-step derivation process"
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '10px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              margin: '20px auto',
              display: 'block'
            }}
          />
        </div>
        
        <p>
          Newton's method was ingenious: he used the power of limits to make the "impossible" calculation possible. 
          Let's follow his reasoning step by step.
        </p>
      </div>

      <div className="math-steps">
        <h4>Mathematical Proof: f'(x) = 2x when f(x) = x²</h4>
        
        <div className="modern-stepper">
          <div className="stepper-header">
            {/* Desktop stepper */}
            <div className={`progress-line step-${stepIndex}`}>
              {derivationSteps.map((step, index) => (
                <div key={index} className="step-indicator-wrapper">
                  <button
                    className={`step-indicator ${index === stepIndex ? 'active' : ''} ${index < stepIndex ? 'completed' : ''}`}
                    onClick={() => setStepIndex(index)}
                  >
                    <span className="step-number">{index + 1}</span>
                    {index < stepIndex && <span className="checkmark">✓</span>}
                  </button>
                  <div className="step-label">{step.title.replace(/^\d+\.\s*/, '')}</div>
                </div>
              ))}
            </div>
            
            {/* Mobile stepper */}
            <div className="mobile-progress-bar">
              <div 
                className="mobile-progress-fill" 
                style={{ width: `${(stepIndex / (derivationSteps.length - 1)) * 100}%` }}
              ></div>
            </div>
            
            <div className="mobile-step-list">
              {derivationSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`mobile-step-item ${index === stepIndex ? 'active' : ''} ${index < stepIndex ? 'completed' : ''}`}
                  onClick={() => setStepIndex(index)}
                >
                  <div className="mobile-step-indicator">
                    <span className="step-number">{index + 1}</span>
                    {index < stepIndex && <span className="checkmark">✓</span>}
                  </div>
                  <div className="mobile-step-label">{step.title.replace(/^\d+\.\s*/, '')}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="step-content-modern">
            <div className="step-card">
              <div className="step-badge">Step {stepIndex + 1}</div>
              <h3 className="step-title">{derivationSteps[stepIndex].title}</h3>
              <div className="step-body">
                {derivationSteps[stepIndex].content}
              </div>
            </div>
          </div>
          
          <div className="step-controls">
            <button 
              className="control-btn prev-btn"
              onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
              disabled={stepIndex === 0}
            >
              <span className="btn-icon">←</span>
              Previous
            </button>
            
            <span className="step-counter">
              {stepIndex + 1} of {derivationSteps.length}
            </span>
            
            <button 
              className="control-btn"
              onClick={() => setStepIndex(Math.min(derivationSteps.length - 1, stepIndex + 1))}
              disabled={stepIndex === derivationSteps.length - 1}
            >
              Next
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      </div>

      <div className="interactive-explanation">
        <h3>Key Insights</h3>
        <p>
          From this interactive exploration, you can see that:
        </p>
        <ul>
          <li><strong>Limits are about approach:</strong> We don't divide by zero, we see what happens as we approach zero</li>
          <li><strong>Secant lines converge:</strong> As h gets smaller, the secant slope approaches the tangent slope</li>
          <li><strong>Algebra reveals the pattern:</strong> The limit process eliminates the h term, leaving us with 2x</li>
          <li><strong>Numbers tell the story:</strong> You can see the convergence happening in real time</li>
        </ul>
        
        <div className="math-explanation">
          <p>
            <strong>The Beautiful Connection:</strong>
          </p>
          <p>
            What we've done is connect the <em>geometric</em> idea of slope with the <em>algebraic</em> process of taking limits. 
            This is the heart of calculus - turning visual intuition into precise mathematical tools.
          </p>
        </div>
      </div>

      <div className="interactive-explanation">
        <h3>What's Next?</h3>
        <p>
          You've now seen both the visual intuition and the mathematical rigor behind derivatives. 
          In the final chapter, we'll explore how this powerful tool applies to real-world problems.
        </p>
      </div>
    </div>
  );
};

export default InteractiveChapter; 