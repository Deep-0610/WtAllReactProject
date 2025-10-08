import React, { useState, useEffect } from 'react';

function Experiment7() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 600, margin: '20px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h1>Asynchronous Data Fetching with Fetch API</h1>
      <p>This example demonstrates how to fetch data asynchronously using the Fetch API with React hooks.</p>

      {loading && <p style={{ color: 'blue' }}>Loading user data...</p>}

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {userData && (
        <div style={{ marginTop: 20 }}>
          <h2>User Information</h2>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Website:</strong> {userData.website}</p>
          <p><strong>Company:</strong> {userData.company.name}</p>
          <p><strong>Address:</strong> {userData.address.street}, {userData.address.city}</p>
        </div>
      )}

      <hr style={{ marginTop: 40, marginBottom: 20 }} />

      <h3>How it works:</h3>
      <ol>
        <li>The <code>useEffect</code> hook runs once when the component mounts.</li>
        <li>Inside it, an async function <code>fetchUser</code> is defined and called.</li>
        <li><code>fetchUser</code> uses <code>fetch</code> to request user data from a public API.</li>
        <li>Loading state is set to true before the request and false after it completes.</li>
        <li>If the request is successful, the JSON data is saved to state and displayed.</li>
        <li>If an error occurs, it is caught and displayed to the user.</li>
      </ol>
    </div>
  );
}

export default Experiment7;
