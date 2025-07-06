import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { InlineMath } from 'react-katex';

const ExamplesChapter = () => {
  const [selectedFunction, setSelectedFunction] = useState('x^2');
  const [playgroundX, setPlaygroundX] = useState(2);
  
  // Ref for plot to force proper sizing
  const playgroundPlotRef = useRef(null);

  // Force plot resize on mount and window resize
  useEffect(() => {
    const resizePlots = () => {
      setTimeout(() => {
        // Check if Plotly is available on window before using it
        if (window.Plotly && window.Plotly.Plots) {
          if (playgroundPlotRef.current) {
            window.Plotly.Plots.resize(playgroundPlotRef.current);
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
        if (playgroundPlotRef.current) {
          window.Plotly.Plots.resize(playgroundPlotRef.current);
        }
      }
    }, 100);
  }, [selectedFunction, playgroundX]);

  const functions = {
    'x^2': {
      func: (x) => x * x,
      derivative: (x) => 2 * x,
      formula: 'x²',
      derivFormula: '2x',
      description: 'Quadratic function - creates parabolas'
    },
    'x^3': {
      func: (x) => x * x * x,
      derivative: (x) => 3 * x * x,
      formula: 'x³',
      derivFormula: '3x²',
      description: 'Cubic function - S-shaped curves'
    },
    'sqrt(x)': {
      func: (x) => Math.sqrt(Math.max(0, x)),
      derivative: (x) => x > 0 ? 1 / (2 * Math.sqrt(x)) : 0,
      formula: '√x',
      derivFormula: '1/(2√x)',
      description: 'Square root function - grows slower as x increases'
    },
    'sin(x)': {
      func: (x) => Math.sin(x),
      derivative: (x) => Math.cos(x),
      formula: 'sin(x)',
      derivFormula: 'cos(x)',
      description: 'Sine function - periodic oscillations'
    }
  };

  const currentFunc = functions[selectedFunction];

  // Generate data for playground
  const generatePlaygroundData = () => {
    const xValues = [];
    const yValues = [];
    const derivativeValues = [];
    
    const start = selectedFunction === 'sqrt(x)' ? 0.1 : -5;
    const end = 5;
    
    for (let i = start; i <= end; i += 0.1) {
      xValues.push(i);
      yValues.push(currentFunc.func(i));
      derivativeValues.push(currentFunc.derivative(i));
    }
    
    return { xValues, yValues, derivativeValues };
  };

  const { xValues, yValues, derivativeValues } = generatePlaygroundData();

  const examples = [
    {
      title: "Physics: Rocket Acceleration",
      scenario: "A rocket's height follows h(t) = 5t² meters",
      question: "How fast is the rocket moving at t = 3 seconds?",
      solution: (
        <div>
          <p>Given: <InlineMath math="h(t) = 5t^2" /></p>
          <p>Find velocity: <InlineMath math="v(t) = h'(t) = 10t" /></p>
          <p>At t = 3: <InlineMath math="v(3) = 10(3) = 30" /> m/s</p>
          <div className="math-expression">
            The rocket is moving upward at 30 m/s after 3 seconds.
          </div>
        </div>
      ),
      interpretation: "Velocity is the derivative of position. The rocket accelerates because its velocity increases over time."
    },
    {
      title: "Economics: Profit Maximization",
      scenario: "Company profit: P(x) = -x² + 100x - 1200 dollars",
      question: "At what production level is profit maximized?",
      solution: (
        <div>
          <p>Given: <InlineMath math="P(x) = -x^2 + 100x - 1200" /></p>
          <p>Find critical points: <InlineMath math="P'(x) = -2x + 100 = 0" /></p>
          <p>Solve: <InlineMath math="x = 50" /> units</p>
          <div className="math-expression">
            Maximum profit occurs at 50 units of production.
          </div>
        </div>
      ),
      interpretation: "Profit is maximized when its derivative equals zero. This is where the slope of the profit curve is flat."
    },
    {
      title: "Biology: Population Growth",
      scenario: "Bacteria population: N(t) = 1000e^(0.5t) bacteria",
      question: "How fast is the population growing at t = 2 hours?",
      solution: (
        <div>
          <p>Given: <InlineMath math="N(t) = 1000e^{0.5t}" /></p>
          <p>Find growth rate: <InlineMath math="N'(t) = 1000 \cdot 0.5 \cdot e^{0.5t} = 500e^{0.5t}" /></p>
          <p>At t = 2: <InlineMath math="N'(2) = 500e^{0.5(2)} = 500e^1 \approx 1359" /></p>
          <div className="math-expression">
            The population is growing at ≈1359 bacteria per hour.
          </div>
        </div>
      ),
      interpretation: "Growth rate is the derivative of population. Exponential growth means the rate itself grows exponentially."
    },
    {
      title: "Chemistry: Reaction Rates",
      scenario: "Concentration: C(t) = 10/(1+t²) mol/L",
      question: "How fast is concentration changing at t = 1 minute?",
      solution: (
        <div>
          <p>Given: <InlineMath math="C(t) = \frac{10}{1+t^2}" /></p>
          <p>Using quotient rule: <InlineMath math="C'(t) = \frac{-20t}{(1+t^2)^2}" /></p>
          <p>At t = 1: <InlineMath math="C'(1) = \frac{-20(1)}{(1+1^2)^2} = \frac{-20}{4} = -5" /></p>
          <div className="math-expression">
            Concentration is decreasing at 5 mol/L per minute.
          </div>
        </div>
      ),
      interpretation: "Negative derivative means decreasing concentration. The reaction is consuming the reactant."
    }
  ];

  return (
    <>
      <h2>Examples: Derivatives in Action</h2>
      
      <div className="visual-explanation">
        <h3>Real-World Applications</h3>
        <p>
          Derivatives aren't just abstract math - they're everywhere. From the speed of your car to the growth of your investments, 
          derivatives help us understand and predict how things change in the real world.
        </p>
        <ul>
          <li><strong>Physics:</strong> Velocity, acceleration, and force</li>
          <li><strong>Economics:</strong> Marginal costs, profit optimization</li>
          <li><strong>Biology:</strong> Population dynamics, drug metabolism</li>
          <li><strong>Chemistry:</strong> Reaction rates, concentration changes</li>
        </ul>
      </div>

      <div className="examples-grid">
        {examples.map((example, index) => (
          <div key={index} className="example-card">
            <h3>{example.title}</h3>
            <p><strong>Scenario:</strong> {example.scenario}</p>
            <p><strong>Question:</strong> {example.question}</p>
            
            <div className="solution">
              <h4>Solution:</h4>
              {example.solution}
            </div>
            
            <div className="interpretation">
              <strong>Why this matters:</strong> {example.interpretation}
            </div>
          </div>
        ))}
      </div>

      <div className="playground">
        <h3>Function Playground</h3>
        <p>
          Explore different functions and their derivatives. See how the shape of the function 
          relates to its derivative.
        </p>
        
        <div className="function-selector">
          {Object.keys(functions).map(key => (
            <button
              key={key}
              className={`func-btn ${selectedFunction === key ? 'active' : ''}`}
              onClick={() => setSelectedFunction(key)}
            >
              {functions[key].formula}
            </button>
          ))}
        </div>

        <div className="plot-container">
          <Plot
            ref={playgroundPlotRef}
            data={[
              {
                x: xValues,
                y: yValues,
                type: 'scatter',
                mode: 'lines',
                line: { color: '#667eea', width: 3 },
                name: `f(x) = ${currentFunc.formula}`
              },
              {
                x: xValues,
                y: derivativeValues,
                type: 'scatter',
                mode: 'lines',
                line: { color: '#4ecdc4', width: 3 },
                name: `f'(x) = ${currentFunc.derivFormula}`,
                yaxis: 'y2'
              },
              {
                x: [playgroundX],
                y: [currentFunc.func(playgroundX)],
                type: 'scatter',
                mode: 'markers',
                marker: { color: '#ff6b6b', size: 12 },
                name: 'Current Point'
              }
            ]}
            layout={{
              title: `${currentFunc.formula} and its derivative`,
              xaxis: { title: 'x', range: selectedFunction === 'sqrt(x)' ? [0, 5] : [-5, 5] },
              yaxis: { title: 'f(x)', side: 'left' },
              yaxis2: {
                title: "f'(x)",
                overlaying: 'y',
                side: 'right'
              },
              showlegend: true,
              height: 400,
              width: null,
              autosize: true,
              margin: { l: 60, r: 60, t: 60, b: 60 }
            }}
            config={{ 
              responsive: true,
              displayModeBar: window.innerWidth > 768,
              modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d', 'autoScale2d'],
              scrollZoom: false,
              doubleClick: 'reset+autosize'
            }}
            className="plot"
            useResizeHandler={true}
            style={{width: "100%", height: "100%"}}
          />
          
          <div className="plot-controls">
            <label>
              Explore at x = {playgroundX.toFixed(2)}
              <input
                type="range"
                min={selectedFunction === 'sqrt(x)' ? "0.1" : "-4"}
                max="4"
                step="0.1"
                value={playgroundX}
                onChange={(e) => setPlaygroundX(parseFloat(e.target.value))}
              />
            </label>
          </div>
        </div>

        <div className="function-info">
          <h4>Function Analysis</h4>
          <p><strong>Function:</strong> <InlineMath math={`f(x) = ${currentFunc.formula}`} /></p>
          <p><strong>Derivative:</strong> <InlineMath math={`f'(x) = ${currentFunc.derivFormula}`} /></p>
          <p><strong>At x = {playgroundX.toFixed(2)}:</strong></p>
          <p>Function value: <span>{currentFunc.func(playgroundX).toFixed(3)}</span></p>
          <p>Derivative value: <span>{currentFunc.derivative(playgroundX).toFixed(3)}</span></p>
          <p className="interpretation">{currentFunc.description}</p>
        </div>
      </div>

      <div className="visual-explanation">
        <h3>Pattern Recognition</h3>
        <p>
          As you explore different functions, notice these patterns:
        </p>
        <ul>
          <li><strong>Steep upward slopes:</strong> Large positive derivatives</li>
          <li><strong>Steep downward slopes:</strong> Large negative derivatives</li>
          <li><strong>Flat regions:</strong> Derivative near zero</li>
          <li><strong>Curves vs. lines:</strong> Functions curve where derivatives change</li>
        </ul>
        
        <div className="math-explanation">
          <p>
            <strong>Key Insight:</strong> The derivative tells you the <em>slope</em> of the function at every point. 
            When you see a steep part of the graph, the derivative is large. When you see a flat part, 
            the derivative is small.
          </p>
        </div>
      </div>

      <div className="visual-explanation">
        <h3>Advanced Applications</h3>
        <p>
          Ready to see derivatives in more complex scenarios? Here are some advanced applications:
        </p>
        <ul>
          <li><strong>Machine Learning:</strong> Gradient descent uses derivatives to optimize models</li>
          <li><strong>Finance:</strong> Black-Scholes equation for option pricing</li>
          <li><strong>Engineering:</strong> Fluid dynamics and heat transfer</li>
          <li><strong>Computer Graphics:</strong> Smooth animations and realistic lighting</li>
          <li><strong>Signal Processing:</strong> Audio and image enhancement</li>
        </ul>
      </div>

      <div className="visual-explanation">
        <h3>What You've Learned</h3>
        <p>
          Congratulations! You've now seen derivatives from multiple perspectives:
        </p>
        <ul>
          <li><strong>The Story:</strong> Why derivatives exist and what they represent</li>
          <li><strong>The Visuals:</strong> How derivatives appear as slopes and patterns</li>
          <li><strong>The Math:</strong> How to calculate derivatives using limits</li>
          <li><strong>The Applications:</strong> How derivatives solve real-world problems</li>
        </ul>
        
        <div className="math-explanation">
          <p>
            <strong>Remember:</strong> Every time you see something changing - whether it's speed, temperature, 
            population, or profit - derivatives help you understand <em>how fast</em> that change is happening. 
            That's the power of calculus.
          </p>
        </div>
      </div>
    </>
  );
};

export default ExamplesChapter; 