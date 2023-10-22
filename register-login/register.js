document.getElementById("register-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validasi email dan password sesuai syarat
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
  }

  if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  if (!passwordRegex.test(password)) {
      alert("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
      return;
  }

  // Simpan data pengguna, misalnya dengan mengirimnya ke server

  // Redirect ke halaman login atau ke permainan ONET
});
