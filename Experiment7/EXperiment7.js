// Best example of asynchronous data fetching using Fetch API
// This demonstrates async/await with proper error handling

async function fetchUserData() {
  try {
    // Fetch data from a public API (JSONPlaceholder)
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

    // Check if the response is ok (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON response
    const userData = await response.json();

    // Log the fetched data
    console.log('Fetched User Data:', userData);
    console.log('User Name:', userData.name);
    console.log('User Email:', userData.email);

    return userData;
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching data:', error.message);
    throw error; // Re-throw if needed for further handling
  }
}

// Call the async function
fetchUserData()
  .then(() => {
    console.log('Data fetching completed successfully.');
  })
  .catch((error) => {
    console.error('Failed to fetch data:', error);
  });
