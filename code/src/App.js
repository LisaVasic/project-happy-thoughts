import React, { useState, useEffect } from 'react';
import ThoughtsList from 'components/ThoughtsList';
import ThoughtsForm from 'components/ThoughtsForm';

export const App = () => {
  const [thoughtsList, setThoughtsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newThought, setNewThought] = useState('');

  // Fetches the thought list API
  const fetchThoughts = () => {
    setLoading(true);
    fetch('https://project-happy-thoughts-api-d6aenh5q2a-lz.a.run.app/thoughts')
      .then((res) => res.json())
      .then((data) => setThoughtsList(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchThoughts();
  }, []);

  // Handles the new thought that the user puts in the field and updates the state
  const handleNewThoughtChange = (event) => {
    setNewThought(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST', // sends data to the server
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: newThought
      })
    }

    fetch('https://project-happy-thoughts-api-d6aenh5q2a-lz.a.run.app/thoughts', options)
      .then((res) => res.json())
      .then(() => fetchThoughts())
      .finally(() => setNewThought(''));
  }

  // Handles the likes and updates when user press button
  const onLikesIncrease = (_id) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(`https://project-happy-thoughts-api-d6aenh5q2a-lz.a.run.app/thoughts/${_id}/like`, options)
      .then((res) => res.json())
      .then(() => fetchThoughts())
      .catch((err) => console.error(err));
  }
  // Shows the components the inputfield and the thoughts list
  return (
    <div>
      <ThoughtsForm
        newThought={newThought}
        onNewThoughtChange={handleNewThoughtChange}
        onFormSubmit={onFormSubmit} />
      <ThoughtsList
        loading={loading}
        thoughtsList={thoughtsList}
        setThoughtsList={setThoughtsList}
        onLikesIncrease={onLikesIncrease} />
    </div>
  );
}