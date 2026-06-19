const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const htmlPath = path.join(root, 'dist', 'index.html');

const fail = (message) => {
  throw new Error(message);
};

const html = fs.readFileSync(htmlPath, 'utf8');
const count = (pattern) => (html.match(pattern) || []).length;
const assert = (condition, message) => {
  if (!condition) fail(message);
};

assert(!html.includes('{{') && !html.includes('{%'), 'Generated HTML contains unreplaced template syntax.');
assert(count(/data-nav-link/g) === 5, 'Expected 5 navigation links.');
assert(count(/data-page="/g) === 5, 'Expected 5 page articles.');
assert(count(/class="service-item"/g) === 3, 'Expected 3 service cards.');
assert(count(/data-testimonials-item/g) === 3, 'Expected 3 testimonials.');
assert(count(/class="timeline-item work-item"/g) === 11, 'Expected 11 icon-backed timeline items.');
assert(count(/class="project-item active"/g) === 6, 'Expected 6 project cards.');
assert(count(/class="blog-post-item"/g) === 3, 'Expected 3 blog cards.');
assert(html.includes('data-filter-value="applications"'), 'Expected applications project filter.');
assert(html.includes('data-filter-value="protocols"'), 'Expected protocols project filter.');
assert(html.includes('assets/css/style.css'), 'Expected stylesheet link.');
assert(html.includes('assets/js/script.js'), 'Expected script link.');

console.log('Generated HTML smoke test passed.');
