/**
 * ============================================================
 * Carr Legal Nurse Consulting, PLLC — Site JavaScript
 * ============================================================
 * File: assets/js/script.js
 * Description: Handles all client-side interactivity:
 *   1. Navbar scroll behavior (background + shrink)
 *   2. Hamburger menu toggle (mobile)
 *   3. Active nav-link highlighting on scroll
 *   4. Back-to-top button visibility + smooth scroll
 *   5. Scroll-reveal animations (IntersectionObserver)
 *   6. Contact form basic validation
 *   7. Footer: auto-update copyright year
 * ============================================================
 */

"use strict";  // Enable strict mode to catch common JS mistakes early


/* ============================================================
   1. NAVBAR — SCROLL BEHAVIOR
   Adds/removes the "scrolled" CSS class on the navbar element
   when the user scrolls past the top of the page. The "scrolled"
   class applies a solid background color (see style.css).
============================================================ */

/** Reference to the main <nav> element */
const navbar = document.getElementById("navbar");

/**
 * Updates the navbar's appearance based on scroll position.
 * Called on every scroll event and once on page load.
 */
function updateNavbar() {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// Run once immediately so the navbar is correct even if the page loads mid-scroll
updateNavbar();

// Listen for scroll events to keep navbar state current
window.addEventListener("scroll", updateNavbar, { passive: true });


/* ============================================================
   2. HAMBURGER MENU TOGGLE (Mobile)
   Toggles the nav-menu open/closed and animates the hamburger
   icon into an X via CSS classes.
============================================================ */

/** The hamburger <button> element */
const navToggle = document.getElementById("navToggle");

/** The <ul> nav menu */
const navMenu = document.getElementById("navMenu");

/**
 * Toggles the mobile navigation open and closed.
 * Updates aria-expanded for screen-reader accessibility.
 */
navToggle.addEventListener("click", function () {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.classList.toggle("active", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

/**
 * Close the mobile menu when any nav link is clicked.
 * This gives a smooth single-page-app feel — the menu
 * collapses after the user makes a selection.
 */
navMenu.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("open");
    navToggle.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  });
});


/* ============================================================
   3. ACTIVE NAV LINK HIGHLIGHTING
   Uses IntersectionObserver to track which section is currently
   visible, then highlights the matching nav link.
============================================================ */

/** All navigable sections that have an id matching a nav link */
const sections = document.querySelectorAll("section[id], header[id]");

/** All nav anchor links */
const navLinks = document.querySelectorAll(".nav-link[href^='#']");

/**
 * Marks the nav link that corresponds to the currently visible section
 * with an "active" class for styling.
 * @param {string} activeId - The id of the section in view
 */
function setActiveLink(activeId) {
  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === "#" + activeId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// IntersectionObserver watches each section and fires when
// at least 30% of it enters the viewport
const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach(function (section) {
  sectionObserver.observe(section);
});


/* ============================================================
   4. BACK-TO-TOP BUTTON
   Shows the button after the user scrolls down 300px.
   topFunction() smoothly returns the user to the top of the page.
============================================================ */

/** Reference to the back-to-top <button> */
const backToTopBtn = document.getElementById("backToTop");

/**
 * Toggles the "visible" class on the back-to-top button based
 * on how far the user has scrolled. Called on every scroll event.
 */
function scrollFunction() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
}

// Attach to the same scroll listener via a unified handler
window.addEventListener("scroll", scrollFunction, { passive: true });

/**
 * Smoothly scrolls the page back to the very top.
 * Called by the onclick attribute on the back-to-top button (index.html).
 */
function topFunction() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}


/* ============================================================
   5. SCROLL-REVEAL ANIMATIONS
   Watches elements with class "reveal" and adds the "visible"
   class when they enter the viewport, triggering a CSS fade-up
   animation defined in style.css.
============================================================ */

/** All elements marked for reveal animation */
const revealElements = document.querySelectorAll(".reveal");

/**
 * IntersectionObserver for scroll-reveal.
 * Triggers when at least 12% of the element is visible.
 * Once revealed, the element is unobserved (animation runs once).
 */
const revealObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);  // Animate only once
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(function (el) {
  revealObserver.observe(el);
});


/* ============================================================
   6. CONTACT FORM — NETLIFY FORMS SUBMISSION
   Handles client-side validation and submits the form data
   to Netlify's form handling service via fetch (AJAX).
 
   Why fetch instead of a normal form submit?
     A normal submit would navigate the user to a Netlify
     confirmation page. Using fetch keeps them on the site
     and lets us show a friendly inline success message.
 
   How Netlify receives the data:
     Netlify detects the "data-netlify" attribute on the <form>
     at deploy time and sets up a handler. The fetch POST sends
     the field values URL-encoded to "/" — Netlify intercepts
     that request and stores the submission, then emails it to
     you based on the notification you configured in the dashboard.
 
   Field names must match exactly:
     The keys in formData below ("Contact-Name", "Contact-Email",
     "Contact-Message") must match the "name" attributes on the
     HTML inputs, and "form-name" must match the form's name
     attribute ("contact"). Netlify uses these to map submissions.
============================================================ */
 
/** Reference to the contact form */
const contactForm = document.getElementById("contactForm");
 
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    // Always prevent default — we handle submission via fetch
    event.preventDefault();
 
    const name    = document.getElementById("contactName").value.trim();
    const email   = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();
 
    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 
    if (!name || !email || !message) {
      showFormMessage("Please fill out all fields before sending.", "error");
      return;
    }
    if (!emailPattern.test(email)) {
      showFormMessage("Please enter a valid email address.", "error");
      return;
    }
 
    // Build URL-encoded body — the format Netlify Forms expects.
    // "form-name" tells Netlify which registered form this belongs to.
    const formData = new URLSearchParams({
      "form-name":       "contact",
      "Contact-Name":    name,
      "Contact-Email":   email,
      "Contact-Message": message
    });
 
    // POST to "/" — Netlify intercepts this on the CDN edge,
    // stores the submission, and triggers your email notification.
    fetch("/", {
      method:  "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:    formData.toString()
    })
    .then(function () {
      // Success — show confirmation and clear the form
      showFormMessage("Message sent! I'll be in touch soon.", "success");
      contactForm.reset();
    })
    .catch(function () {
      // Network or server error — give the user an alternative
      showFormMessage("Something went wrong. Please email melinda@carrlegalnurse.com directly.", "error");
    });
  });
}
 
/**
 * Displays a temporary status message below the contact form.
 * Creates the message element if it doesn't exist yet.
 *
 * @param {string} text  - The message to display
 * @param {string} type  - "success" (green) or "error" (red)
 */
function showFormMessage(text, type) {
  // Reuse existing message element, or create one
  let msg = document.getElementById("formMessage");
  if (!msg) {
    msg = document.createElement("p");
    msg.id = "formMessage";
    contactForm.appendChild(msg);
  }
 
  msg.textContent = text;
  msg.style.cssText = [
    "margin-top: 0.75rem",
    "font-weight: 600",
    "font-size: 0.9rem",
    "color: " + (type === "success" ? "#2e7d32" : "#c62828")
  ].join(";");
 
  // Auto-clear the message after 6 seconds
  setTimeout(function () {
    msg.textContent = "";
  }, 6000);
}


/* ============================================================
   7. FOOTER — AUTO-UPDATE COPYRIGHT YEAR
   Reads the <span id="currentYear"> in the footer and sets it
   to the current year automatically — no manual update needed.
============================================================ */

const yearSpan = document.getElementById("currentYear");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}