document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("mainContent");
  const sidebarNav = document.getElementById("sidebarNav");
  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const sidebar = document.querySelector(".sidebar");

  const loadContent = async (pageUrl) => {
    mainContent.innerHTML =
      '<div class="spinner-wrapper"><div class="spinner"></div></div>';
    try {
      const response = await fetch(pageUrl);
      if (!response.ok) throw new Error(`Halaman ${pageUrl} tidak ditemukan`);
      const content = await response.text();
      mainContent.innerHTML = content;
      window.scrollTo(0, 0);
    } catch (error) {
      mainContent.innerHTML = `<h1>Error</h1><p>${error.message}</p>`;
    }
  };

  const setActiveLink = (hash) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.hash === hash);
    });
  };

  const handleRouteChange = () => {
    let hash = window.location.hash || "#auth";
    const activeLink = document.querySelector(`.nav-link[href="${hash}"]`);

    if (activeLink) {
      setActiveLink(hash);
      loadContent(activeLink.dataset.page);
    } else {
      const defaultLink = navLinks[0];
      setActiveLink(defaultLink.hash);
      loadContent(defaultLink.dataset.page);
    }
  };

  menuToggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-open");
  });

  sidebarNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      // Tutup sidebar setelah link di-klik pada tampilan mobile
      sidebar.classList.remove("sidebar-open");
    }
  });

  window.addEventListener("hashchange", handleRouteChange);
  handleRouteChange();
});
