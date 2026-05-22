/**
 * ============================================================
 * Carr Legal Nurse Consulting, PLLC — Express Server
 * ============================================================
 * File: server.js
 * Description: Minimal Express.js server to serve the static
 *   website files. Run with:  node server.js
 *   or in development with:   npx nodemon server.js
 * ============================================================
 */

const express = require("express");
const path    = require("path");

/* ── App Initialization ── */
const app  = express();

/**
 * PORT — uses the environment variable PORT if set (e.g. on Heroku,
 * Render, or Railway), otherwise defaults to 3000 for local dev.
 */
const PORT = process.env.PORT || 3000;


/* ── Middleware ── */

// Parse incoming JSON request bodies (available for future API routes)
app.use(express.json());

// Parse URL-encoded form data (e.g. standard HTML form submissions)
app.use(express.urlencoded({ extended: true }));

/**
 * Serve all files in the "assets" folder as static assets.
 * e.g. /assets/css/style.css → served from ./assets/css/style.css
 */
app.use(express.static(path.join(__dirname, "assets")));

/**
 * Serve the root of the project as static too, so index.html
 * and any top-level files (favicon, robots.txt, etc.) are accessible.
 */
app.use(express.static(path.join(__dirname)));


/* ── Routes ── */

/**
 * GET /
 * Serves the main single-page HTML file for all root requests.
 */
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});


/* ── Start Server ── */

app.listen(PORT, function () {
  console.log(`✅ Carr Legal Nurse Consulting is running at http://localhost:${PORT}`);
});