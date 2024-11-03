import React from 'react';
import './SearchResults.css';
import { formatDistanceToNow } from 'date-fns';

function SearchResults({ results }) {
  return (
    <ul>
      {results.map((item) => (
        (item.url || item.story_text) && (
          <li key={item.objectID}>
            <div className='rowWise'>
              <a href={item.url || "#"} target="_blank" rel="noopener noreferrer">
                {item.title || item.author}
              </a>
              <div className='resize'>
                <p>
                  <a href={item.url || "#"} className='underLines'>
                  <p>{item.url && `(${item.url})`}</p>
                  </a>
                </p>
              </div>
            </div>

            {item.story_text && (
              <div className="description">
                <p>{item.story_text}</p>
              </div>
            )}

            <div className="wising">
              <p>
                {item.points} Points | {item.author} | 
                {` ${formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}`} | 
                {` ${item.num_comments} Comments`}
              </p>
            </div>
          </li>
        )
      ))}
    </ul>
  );
}

export default SearchResults;

