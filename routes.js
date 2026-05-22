/**
 * ============================================================
 * Carr Legal Nurse Consulting, PLLC — Express Routes
 * ============================================================
 * File: routes.js
 * Description: Defines all Express route handlers and exports
 *   them as a function that receives the app instance.
 *   Currently serves only the main index.html page.
 *   Future API routes (e.g. contact form handling) can be
 *   added here.
 *
 * Usage in server.js:
 *   require("./routes")(app);
 * ============================================================
 */

const path = require("path");

/**
 * Registers all routes on the provided Express app instance.
 * @param {import('express').Application} app - The Express app
 */
module.exports = function (app) {

  /**
   * GET /
   * Serves the main single-page HTML file.
   */
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  /**
   * Future route placeholder — Contact Form Handler
   * If you switch from mailto: to a server-side handler,
   * add a POST /contact route here that processes the form
   * data and sends an email via Nodemailer or a mail API.
   *
   * Example:
   *   app.post("/contact", function (req, res) {
   *     const { "Contact-Name": name, "Contact-Email": email, "Contact-Message": message } = req.body;
   *     // ... send email logic ...
   *     res.json({ success: true });
   *   });
   */

};