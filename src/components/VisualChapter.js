import React, { useState, useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { InlineMath } from 'react-katex';

const VisualChapter = () => {
  const [x, setX] = useState(2);
  const [showDerivative, setShowDerivative] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Refs for plots to force proper sizing
  const slopeExplorerRef = useRef(null);
  const zoomPlotRef = useRef(null);

  // Force plot resize on mount and window resize
  useEffect(() => {
    const resizePlots = () => {
      setTimeout(() => {
        // Check if Plotly is available on window before using it
        if (window.Plotly && window.Plotly.Plots) {
          if (slopeExplorerRef.current) {
            window.Plotly.Plots.resize(slopeExplorerRef.current);
          }
          if (zoomPlotRef.current) {
            window.Plotly.Plots.resize(zoomPlotRef.current);
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
        if (slopeExplorerRef.current) {
          window.Plotly.Plots.resize(slopeExplorerRef.current);
        }
        if (zoomPlotRef.current) {
          window.Plotly.Plots.resize(zoomPlotRef.current);
        }
      }
    }, 100);
  }, [x, zoomLevel, showDerivative]);

  // Generate data for plotting
  const generateData = () => {
    const xValues = [];
    const yValues = [];
    const derivativeValues = [];
    
    for (let i = -5; i <= 5; i += 0.1) {
      xValues.push(i);
      yValues.push(i * i);
      derivativeValues.push(2 * i);
    }
    
    return { xValues, yValues, derivativeValues };
  };

  const { xValues, yValues, derivativeValues } = generateData();
  
  // Current point and slope
  const y = x * x;
  const slope = 2 * x;
  
  // Tangent line data
  const tangentX = [x - 1, x + 1];
  const tangentY = [y + slope * (-1), y + slope * 1];
  
  // Secant line for zoom demo
  const h = 0.5 / zoomLevel;
  const secantX = [x - h, x + h];
  const secantY = [(x - h) * (x - h), (x + h) * (x + h)];

  return (
    <>
      <h2>See It: Derivatives as Slopes</h2>
      
      <div className="visual-explanation">
        <h3>The Core Insight</h3>
        <p>
          Here's the fundamental secret: <strong>derivatives are slopes.</strong> When you hear "the derivative of x² is 2x," 
          you can think: "at any point on the x² curve, the slope of the tangent line is 2x."
        </p>
        <ul>
          <li><strong>Steep upward slope:</strong> Large positive derivative</li>
          <li><strong>Steep downward slope:</strong> Large negative derivative</li>
          <li><strong>Flat horizontal:</strong> Derivative equals zero</li>
          <li><strong>The steeper the curve, the larger the derivative</strong></li>
        </ul>
      </div>

      <div className="plot-container">
        <h4>Interactive Slope Explorer</h4>
        <p>Move the slider to see how the slope changes at different points on <InlineMath math="y = x^2" />:</p>
        
        <Plot
          ref={slopeExplorerRef}
          data={[
            {
              x: xValues,
              y: yValues,
              type: 'scatter',
              mode: 'lines',
              line: { color: '#667eea', width: 3 },
              name: 'y = x²'
            },
            {
              x: [x],
              y: [y],
              type: 'scatter',
              mode: 'markers',
              marker: { color: '#ff6b6b', size: 12 },
              name: 'Current Point'
            },
            {
              x: tangentX,
              y: tangentY,
              type: 'scatter',
              mode: 'lines',
              line: { color: '#4ecdc4', width: 3, dash: 'dash' },
              name: 'Tangent Line'
            },
            ...(showDerivative ? [{
              x: xValues,
              y: derivativeValues,
              type: 'scatter',
              mode: 'lines',
              line: { color: '#ffd700', width: 2 },
              name: "y' = 2x",
              yaxis: 'y2'
            }] : [])
          ]}
          layout={{
            title: 'Slope of y = x² at Different Points',
            xaxis: { title: 'x', range: [-5, 5] },
            yaxis: { title: 'y', range: [-2, 25] },
            ...(showDerivative && {
              yaxis2: {
                title: "y' (derivative)",
                overlaying: 'y',
                side: 'right',
                range: [-10, 10]
              }
            }),
            showlegend: true,
            height: 400,
            width: null,
            autosize: true,
            margin: { l: 50, r: 50, t: 50, b: 50 }
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
            x position: {x.toFixed(2)}
            <input
              type="range"
              min="-4"
              max="4"
              step="0.1"
              value={x}
              onChange={(e) => setX(parseFloat(e.target.value))}
            />
          </label>
          
          <button onClick={() => setShowDerivative(!showDerivative)}>
            {showDerivative ? 'Hide' : 'Show'} Derivative Function
          </button>
          
          <div className="slope-info">
            <strong>Point:</strong> ({x.toFixed(2)}, {y.toFixed(2)})<br/>
            <strong>Slope at this point:</strong> {slope.toFixed(2)}<br/>
            <strong>Interpretation:</strong> Rising {slope.toFixed(2)} units vertically per 1 unit horizontally
          </div>
        </div>
      </div>

      <div className="visual-explanation">
        <h3>The Zoom-In Revelation</h3>
        <p>
          Here's a profound mathematical truth: if you zoom in far enough on <em>any</em> smooth curve, it starts to look like a straight line. 
          This is the foundation of why derivatives work:
        </p>
        <ul>
          <li><strong>Zoom out:</strong> See the complete curve</li>
          <li><strong>Zoom in:</strong> The curve becomes nearly straight</li>
          <li><strong>Measure the slope:</strong> That's your derivative</li>
        </ul>
      </div>

      <div className="plot-container">
        <h4>Zoom-In Demonstration</h4>
        <p>Watch how the curve becomes a straight line as we zoom in around x = {x.toFixed(2)}:</p>
        
        <Plot
          ref={zoomPlotRef}
          data={[
            {
              x: xValues.filter(val => Math.abs(val - x) <= 3/zoomLevel),
              y: yValues.filter((val, i) => Math.abs(xValues[i] - x) <= 3/zoomLevel),
              type: 'scatter',
              mode: 'lines',
              line: { color: '#667eea', width: 4 },
              name: 'y = x²'
            },
            {
              x: [x],
              y: [y],
              type: 'scatter',
              mode: 'markers',
              marker: { color: '#ff6b6b', size: 15 },
              name: 'Point of Interest'
            },
            {
              x: secantX,
              y: secantY,
              type: 'scatter',
              mode: 'lines',
              line: { color: '#4ecdc4', width: 2, dash: 'dot' },
              name: 'Secant Line'
            }
          ]}
          layout={{
            title: `Zoomed View Around x = ${x.toFixed(2)} (Zoom Level: ${zoomLevel}x)`,
            xaxis: { 
              title: 'x', 
              range: [x - 3/zoomLevel, x + 3/zoomLevel] 
            },
            yaxis: { 
              title: 'y', 
              range: [y - 3*slope/zoomLevel, y + 3*slope/zoomLevel] 
            },
            showlegend: true,
            height: 350,
            width: null,
            autosize: true,
            margin: { l: 50, r: 50, t: 50, b: 50 }
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
            x position: {x.toFixed(2)}
            <input
              type="range"
              min="-3"
              max="3"
              step="0.1"
              value={x}
              onChange={(e) => setX(parseFloat(e.target.value))}
            />
          </label>
          
          <label>
            Zoom level: {zoomLevel}x
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseInt(e.target.value))}
            />
          </label>
          
          <div className="slope-info">
            <strong>At {zoomLevel}x zoom:</strong> Notice how the curve looks more like a straight line<br/>
            <strong>Estimated slope:</strong> {slope.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="visual-explanation">
        <h3>Key Visual Insights</h3>
        <p>
          By exploring these interactive graphs, you can see that:
        </p>
        <ul>
          <li><strong>Derivatives are visual:</strong> They're literally the slope you can see</li>
          <li><strong>Location matters:</strong> The slope changes at different points</li>
          <li><strong>Zoom reveals truth:</strong> Every smooth curve is "locally linear"</li>
          <li><strong>Numbers have meaning:</strong> Slope = 4 means "rising 4 units per 1 unit"</li>
        </ul>
        
        <div className="math-explanation">
          <p>
            <strong>The Mathematical Connection:</strong>
          </p>
          <p>
            When you see <InlineMath math="f'(x) = 2x" />, think: "At any point <InlineMath math="x" />, 
            the curve has a slope of <InlineMath math="2x" />."
          </p>
          <p>
            At x = 3, slope = 6 (steep upward)<br/>
            At x = 0, slope = 0 (flat)<br/>
            At x = -2, slope = -4 (steep downward)
          </p>
        </div>
      </div>

      <div className="visual-explanation">
        <h3>What's Next?</h3>
        <p>
          Now you've <em>seen</em> what derivatives look like. Ready to dive deeper? 
          In the next chapter, we'll explore the mathematical machinery that makes this all work.
        </p>
      </div>
    </>
  );
};

export default VisualChapter; 