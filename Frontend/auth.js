document.addEventListener("DOMContentLoaded", () => {
  const googleBtn = document.getElementById("google-login");
  googleBtn.addEventListener("click", () => {
    // Redirect user to backend Google OAuth endpoint
    window.location.href = "https://turing-web-version.onrender.com/auth/google";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const githubBtn = document.getElementById("github-login");
  githubBtn.addEventListener("click", () => {
    // Redirect user to backend Google OAuth endpoint
    window.location.href = "https://turing-web-version.onrender.com/auth/github";
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("download-btn");
  downloadBtn.addEventListener("click", () => {
    // Redirect user to download endpoint or trigger download
    window.location.href = "https://github.com/Shashank-Tripathi-07/Turing-An_AI_Integrated_Real-time_Assistant/archive/refs/heads/main.zip";
  });
});
