function login() {
    // Placeholder for login functionality
    console.log("Login button clicked. Implement login logic here.");
  }
  
  function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
  // login.js

// login.js

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Logged in:", userCredential.user.uid);
      window.location.href = 'homescreen.html'; // ✅ Redirect to your Home Screen after login
    })
    .catch((error) => {
      alert(error.message); // Show error if login fails
    });
}
