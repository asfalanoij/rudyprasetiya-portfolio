```markdown
# rudyprasetiya-portfolio Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill covers the development patterns, coding conventions, and common workflows for contributing to the `rudyprasetiya-portfolio` repository. The codebase is a personal portfolio site built with JavaScript (no framework detected), featuring both frontend and backend components. It includes dynamic content sections, visual styling, and a contact form with backend support. This guide documents how to maintain, extend, and enhance the project following its established conventions.

## Coding Conventions

- **File Naming:**  
  Use camelCase for JavaScript files and folders.  
  _Example:_  
  ```
  js/main.js
  css/style.css
  ```

- **Import Style:**  
  Use relative imports for JavaScript modules.  
  _Example:_  
  ```js
  import { myFunction } from './utils.js';
  ```

- **Export Style:**  
  Use named exports in JavaScript files.  
  _Example:_  
  ```js
  // utils.js
  export function myFunction() { ... }
  ```

- **Commit Messages:**  
  Follow the Conventional Commits specification.  
  Prefixes: `feat` (feature), `fix` (bug fix).  
  _Example:_  
  ```
  feat: add typing animation to About section
  fix: correct email validation in contact form
  ```

## Workflows

### Content Section Update
**Trigger:** When adding or updating major content sections (Experience, Projects, Skills, Certifications, About).  
**Command:** `/update-section`

1. Edit `index.html` to add or update the relevant section.
2. Optionally, update `js/main.js` for interactive or dynamic behavior (e.g., expandable cards, typing animation).

_Example:_  
```html
<!-- Add new project -->
<section id="projects">
  <div class="project-card">
    <h3>My New Project</h3>
    <p>Description of the project.</p>
  </div>
</section>
```
```js
// js/main.js
export function expandProjectCard(cardId) {
  // logic to expand/collapse project card
}
```

---

### Visual Style Enhancement
**Trigger:** When improving or refactoring the site's visual appearance (moving inline styles to CSS, adding classes, updating animations).  
**Command:** `/restyle`

1. Edit `css/style.css` to add or update styles, animations, or classes.
2. Edit `index.html` to remove inline styles, apply new classes, or update structure for styling.
3. Optionally, update `js/main.js` if script-driven visual effects are involved.

_Example:_  
```css
/* css/style.css */
.project-card {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.project-card:hover {
  transform: scale(1.05);
}
```
```html
<!-- index.html -->
<div class="project-card">...</div>
```

---

### Security Hardening and Metadata Update
**Trigger:** When applying security improvements or updating metadata (favicons, counters, contact info).  
**Command:** `/harden-security`

1. Edit `.htaccess` to update security headers or server settings.
2. Edit `index.html` to update favicon, contact info, or add metadata (e.g., visitor counter).
3. Optionally, update `js/main.js` for dynamic metadata or counters.
4. Optionally, update backend files (e.g., `contact.php`) for sanitization or validation.

_Example:_  
```apache
# .htaccess
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "DENY"
```
```html
<!-- index.html -->
<link rel="icon" href="favicon.ico">
<meta name="description" content="Rudy Prasetiya's Portfolio">
```
```php
// contact.php
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
```

---

### Backend Feature Addition or Fix
**Trigger:** When adding or fixing backend features for forms (validation, rate-limiting, etc.).  
**Command:** `/add-backend-feature`

1. Edit `contact.php` to add new logic, validation, or fix bugs.
2. Edit `js/main.js` to update frontend logic for the backend feature.
3. Optionally, update `index.html` to connect frontend to backend.

_Example:_  
```php
// contact.php
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo "Invalid email address.";
  exit;
}
```
```js
// js/main.js
export function validateContactForm() {
  // client-side validation logic
}
```

## Testing Patterns

- **Test Framework:** Unknown (not detected).
- **Test File Pattern:** Files are named with `.test.` in the filename.
  _Example:_  
  ```
  js/main.test.js
  ```
- **How to Write Tests:**  
  Place test files alongside source files using the `.test.` pattern. Use assertions to verify expected behavior.

## Commands

| Command               | Purpose                                                           |
|-----------------------|-------------------------------------------------------------------|
| /update-section       | Add or update content sections (Experience, Projects, etc.)        |
| /restyle              | Enhance or refactor the site's visual appearance                  |
| /harden-security      | Apply security improvements and update site metadata               |
| /add-backend-feature  | Add or fix backend features (contact form, validation, etc.)       |
```