import React from 'react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const StoryChapter = () => {
  return (
    <>
      <h2>The Story Behind Derivatives</h2>
      
      <div className="story-card">
        <h3>Imagine You're Driving...</h3>
        <p>
          You're on a road trip, and you want to know how fast you're going <em>right now</em>. Your speedometer tells 
          you "60 mph" - but what does that really mean?
        </p>
        <p>
          If you think about it, speed is really about <strong>change</strong>:
        </p>
        <ul>
          <li><strong>Position:</strong> Where you are</li>
          <li><strong>Time:</strong> When you are there</li>
          <li><strong>Speed:</strong> How your position changes over time</li>
        </ul>
        
        <div className="math-explanation">
          <p>
            <strong>But Here's the Puzzle...</strong>
          </p>
          <p>
            Speed is "distance divided by time" - but what happens when the time gets really, really small?
          </p>
          <p>
            Average speed = <InlineMath math="\frac{\text{change in position}}{\text{change in time}} = \frac{\Delta s}{\Delta t}" />
          </p>
          <p>
            But what about <em>instantaneous</em> speed? That's when <InlineMath math="\Delta t" /> approaches 0...
          </p>
          <p>
            Instantaneous speed = <InlineMath math="\lim_{\Delta t \to 0} \frac{\Delta s}{\Delta t} = \frac{ds}{dt}" />
          </p>
          <p>
            <strong>This is exactly what a derivative is!</strong> It's the rate of change at a single instant.
          </p>
        </div>
      </div>

      <div className="story-card">
        <h3>Newton's Original Problem</h3>
        <p>
          This exact puzzle troubled the greatest minds of the 17th century. Sir Isaac Newton himself wrestled with this question 
          when studying planetary motion and the physics of moving objects.
        </p>
        
        <div className="newton-comic">
          <img 
            src="/newton-comic-1.png" 
            alt="Newton comic strip showing him discussing instantaneous velocity computation with colleagues"
            style={{
              width: '100%',
              maxWidth: '600px',
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
          Just like Newton realized, the key insight is that we can't just divide by zero - but we can see what happens 
          as we approach zero. This became the foundation of calculus and revolutionized how we understand motion, 
          forces, and change itself.
        </p>
      </div>

      <div className="story-card">
        <h3>From Cars to Curves</h3>
        <p>
          Now imagine your position follows a curved path, like <InlineMath math="s = t^2" />. As time progresses, you're not moving 
          at a constant speed - you're <em>accelerating</em>!
        </p>
        <p>
          The derivative <InlineMath math="\frac{d}{dt}(t^2) = 2t" /> tells us that at time <InlineMath math="t" />, your speed is <InlineMath math="2t" />.
        </p>
        <p>
          <strong>Why <InlineMath math="2t" /> and not something else?</strong> Let's find out visually...
        </p>
      </div>

      <div className="story-card">
        <h3>The Big Picture</h3>
        <p>
          Derivatives weren't invented by mathematicians sitting in ivory towers. They were created to solve 
          real problems:
        </p>
        <ul>
          <li><strong>Physics:</strong> How fast is this rocket accelerating?</li>
          <li><strong>Economics:</strong> What price maximizes profit?</li>
          <li><strong>Biology:</strong> How quickly is this population growing?</li>
          <li><strong>Medicine:</strong> How does temperature change affect enzyme activity?</li>
        </ul>
        <p>
          Every time you see something changing - whether it's speed, growth, cost, or temperature - 
          derivatives help us understand <strong>how fast that change is happening</strong>.
        </p>
      </div>

      <div className="story-card">
        <h3>The Mental Model</h3>
        <p>
          Think of a derivative as your "mathematical speedometer" for any changing quantity:
        </p>
        
        <div className="math-explanation">
          <p>
            <strong>If you have a function <InlineMath math="f(x)" /></strong>
          </p>
          <p>
            <strong>Its derivative <InlineMath math="f'(x)" /> tells you:</strong>
          </p>
          <ul>
            <li>How quickly <InlineMath math="f(x)" /> is changing</li>
            <li>The slope of the curve at point <InlineMath math="x" /></li>
            <li>Whether <InlineMath math="f(x)" /> is increasing or decreasing</li>
            <li>How sensitive <InlineMath math="f(x)" /> is to changes in <InlineMath math="x" /></li>
          </ul>
          <p>
            So when we say the derivative of <InlineMath math="x^2" /> is <InlineMath math="2x" />, we're saying: 
            "At any point <InlineMath math="x" />, the function <InlineMath math="x^2" /> is changing at a rate of <InlineMath math="2x" />."
          </p>
        </div>
      </div>

      <div className="story-card">
        <h3>What's Next?</h3>
        <p>
          Now that you understand the <em>why</em> behind derivatives, let's explore the <em>how</em>. In the next chapters, 
          we'll:
        </p>
        <ul>
          <li><strong>See derivatives as slopes and visual patterns</strong></li>
          <li><strong>Play with the mathematical machinery</strong></li>
          <li><strong>Explore real-world applications</strong></li>
        </ul>
        <p>
          By the end, you'll not only know <em>how</em> to compute derivatives, but you'll understand <em>why</em> they work 
          and <em>when</em> to use them!
        </p>
      </div>
    </>
  );
};

export default StoryChapter; 