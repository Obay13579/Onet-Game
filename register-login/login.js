document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validasi email dan password sesuai syarat
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Proses otentikasi pengguna, misalnya dengan mengirimnya ke server

    // Redirect ke permainan ONET jika otentikasi berhasil
});
