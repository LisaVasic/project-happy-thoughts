/* eslint-disable no-underscore-dangle */
import React from 'react';
import { formatDistance } from 'date-fns';

// eslint-disable-next-line no-unused-vars
const ThoughtsList = ({ loading, thoughtsList, onLikesIncrease }) => {
  if (loading) {
    return <h1>Loading in progress...</h1>
  }

  return (
    <section className="thoughtWrapper">
      <div>
        {thoughtsList.map((thought) => (
        // eslint-disable-next-line no-underscore-dangle
          <div className="thoughtContainer" key={thought._id}>
            <h4>{thought.message}</h4>
            <div className="cardFooter">
              <div className="heartCount">
                <button
                  className={thought.hearts === 0 ? 'emptyBtn' : 'likeBtn'}
                  type="button"
                  onClick={() => onLikesIncrease(thought._id)}>❤️
                </button>
                <p>x {thought.hearts}</p>
              </div>
              <p className="createdAt">{formatDistance(new Date(thought.createdAt), Date.now(), { addSuffix: true })}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ThoughtsList;

/*
<button
type="button"
className={thought.hearts === 0 ? 'empty-btn' : 'like-btn'}
onClick={() => onThoughtLikeChange(thought._id)}>
<span className="heart" role="img" aria-label="heart symbol">
❤️
</span>
</button> */