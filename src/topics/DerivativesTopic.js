import React, { useState } from 'react';
import StoryChapter from '../components/StoryChapter';
import VisualChapter from '../components/VisualChapter';
import InteractiveChapter from '../components/InteractiveChapter';
import ExamplesChapter from '../components/ExamplesChapter';

const DerivativesTopic = () => {
  const [activeChapter, setActiveChapter] = useState('story');

  const chapters = [
    { id: 'story', title: 'The Story', component: StoryChapter },
    { id: 'visual', title: 'See It', component: VisualChapter },
    { id: 'interactive', title: 'Play With It', component: InteractiveChapter },
    { id: 'examples', title: 'Examples', component: ExamplesChapter }
  ];

  const handleChapterChange = (chapterId) => {
    console.log('Changing chapter to:', chapterId);
    setActiveChapter(chapterId);
  };

  return (
    <div className="topic-container">
      <div className="topic-header">
        <h1>Limits & Derivatives</h1>
        <p className="topic-description">Understanding rates of change and slopes through stories, visuals, and interactive exploration</p>
      </div>

      <nav className="chapter-nav">
        {chapters.map(chapter => (
          <button
            key={chapter.id}
            className={`chapter-btn ${activeChapter === chapter.id ? 'active' : ''}`}
            onClick={() => handleChapterChange(chapter.id)}
            aria-label={`Go to ${chapter.title}`}
          >
            {chapter.title}
          </button>
        ))}
      </nav>

      <div className="chapter-content">
        {chapters.map(chapter => {
          const Component = chapter.component;
          return (
            <div 
              key={chapter.id}
              className={`chapter ${activeChapter === chapter.id ? 'active' : ''}`}
            >
              <Component />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DerivativesTopic; 