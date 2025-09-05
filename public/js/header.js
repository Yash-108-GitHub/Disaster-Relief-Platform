document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  if (!hamburger || !sidebar) {
    console.error("❌ Navbar elements not found!");
    return;
  }

  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("show");
    console.log("✅ Sidebar toggled");
  });
});
