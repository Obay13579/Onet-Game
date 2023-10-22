// Example code in login/script.js
document.getElementById('register-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  // Create data object to send to the API
  const userData = {
    username: username,
    email: email,
    password: password,
  };

  try {
    const response = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      // Registration successful, handle the response here
      console.log('Registration successful');
    } else {
      // Registration failed, handle errors here
      console.error('Registration failed');
    }
  } catch (error) {
    console.error('Error contacting the server', error);
  }
});
