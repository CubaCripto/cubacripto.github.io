function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const menuBtn = document.querySelector(".menu-btn");

  sidebar.classList.toggle("show");
  overlay.classList.toggle("show");
  menuBtn.classList.toggle("active");
}

function closeMenu() {
  document.getElementById("sidebar").classList.remove("show");
  document.getElementById("overlay").classList.remove("show");
  document.querySelector(".menu-btn").classList.remove("active");
}

const menuLinks = document.querySelectorAll(".menu-items a");

menuLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    if (this.classList.contains("active")) {
      e.preventDefault();
      return;
    }

    menuLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

function setupInfinite(track) {
  const banner = track.parentElement;

  while (track.scrollWidth < banner.offsetWidth * 2) {
    track.innerHTML += track.innerHTML;
  }

  return track.scrollWidth / 2;
}

function animate(track, direction = 1) {
  let pos = 0;
  const speed = 0.2;
  const limit = setupInfinite(track);
  let paused = false;

  track.parentElement.addEventListener("mouseenter", () => paused = true);
  track.parentElement.addEventListener("mouseleave", () => paused = false);

  function frame() {
    if (!paused) {
      pos += speed * direction;

      if (pos >= limit) pos = 0;
      if (pos <= 0) pos = limit;

      track.style.transform = `translateX(${-pos}px)`;
    }
    requestAnimationFrame(frame);
  }

  frame();
}

document.addEventListener("DOMContentLoaded", function () {
  animate(document.getElementById("track1"), 1);
  animate(document.getElementById("track2"), -1);
  animate(document.getElementById("track3"), 1);
  animate(document.getElementById("track4"), -1);
});