const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'src', '_data');

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
const fail = (message) => {
  throw new Error(message);
};

const assert = (condition, message) => {
  if (!condition) fail(message);
};

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
const isRemoteUrl = (value) => /^https?:\/\//.test(value);
const isMailTo = (value) => /^mailto:/.test(value);

const localAssetPath = (value) => {
  if (!isNonEmptyString(value) || isRemoteUrl(value) || isMailTo(value)) return null;
  return value.replace(/^\.\//, '');
};

const assertLocalAssetExists = (value, label) => {
  const assetPath = localAssetPath(value);
  if (!assetPath) return;
  assert(fs.existsSync(path.join(root, assetPath)), `${label} points at missing asset: ${value}`);
};

const assertDate = (value, label) => {
  assert(isNonEmptyString(value), `${label} is required`);
  assert(!Number.isNaN(Date.parse(value)), `${label} must be parseable: ${value}`);
};

const assertUniqueIds = (items, label) => {
  const seen = new Set();
  for (const item of items) {
    assert(isNonEmptyString(item.id), `${label} entries must have an id`);
    assert(!seen.has(item.id), `${label} contains duplicate id: ${item.id}`);
    seen.add(item.id);
  }
};

const profile = readJson('profile.json');
const navigation = readJson('navigation.json');
const about = readJson('about.json');
const resume = readJson('resume.json');
const projects = readJson('projects.json');
const blogs = readJson('blogs.json');
const contact = readJson('contact.json');

assert(isNonEmptyString(profile.name), 'profile.name is required');
assert(isNonEmptyString(profile.title), 'profile.title is required');
assertLocalAssetExists(profile.avatar.src, 'profile.avatar.src');
assert(Array.isArray(profile.contacts) && profile.contacts.length > 0, 'profile.contacts must not be empty');
assert(Array.isArray(profile.socialLinks) && profile.socialLinks.length > 0, 'profile.socialLinks must not be empty');
profile.contacts.forEach((item, index) => {
  assert(isNonEmptyString(item.title), `profile.contacts[${index}].title is required`);
  assert(isNonEmptyString(item.icon), `profile.contacts[${index}].icon is required`);
  if (item.time) assertDate(item.time.datetime, `profile.contacts[${index}].time.datetime`);
});

assertUniqueIds(navigation, 'navigation');

assert(Array.isArray(about.paragraphs) && about.paragraphs.length > 0, 'about.paragraphs must not be empty');
assert(Array.isArray(about.services) && about.services.length > 0, 'about.services must not be empty');
assert(Array.isArray(about.testimonials) && about.testimonials.length > 0, 'about.testimonials must not be empty');
about.services.forEach((service, index) => {
  assert(isNonEmptyString(service.title), `about.services[${index}].title is required`);
  assertLocalAssetExists(service.icon.src, `about.services[${index}].icon.src`);
});
about.testimonials.forEach((testimonial, index) => {
  assert(isNonEmptyString(testimonial.name), `about.testimonials[${index}].name is required`);
  assertLocalAssetExists(testimonial.avatar.src, `about.testimonials[${index}].avatar.src`);
});

assert(isNonEmptyString(resume.resumeUrl), 'resume.resumeUrl is required');
assert(Array.isArray(resume.education), 'resume.education must be an array');
assert(Array.isArray(resume.experience), 'resume.experience must be an array');
assert(Array.isArray(resume.publications), 'resume.publications must be an array');
assert(Array.isArray(resume.skills), 'resume.skills must be an array');
resume.education.forEach((item, index) => assertLocalAssetExists(item.icon, `resume.education[${index}].icon`));
resume.experience.forEach((item, index) => assertLocalAssetExists(item.icon, `resume.experience[${index}].icon`));

assertUniqueIds(projects.categories, 'projects.categories');
const categoryIds = new Set(projects.categories.map((item) => item.id));
assert(Array.isArray(projects.items) && projects.items.length > 0, 'projects.items must not be empty');
projects.items.forEach((project, index) => {
  assert(isNonEmptyString(project.title), `projects.items[${index}].title is required`);
  assert(categoryIds.has(project.categoryId), `projects.items[${index}] references unknown category: ${project.categoryId}`);
  assertLocalAssetExists(project.image.src, `projects.items[${index}].image.src`);
  assert(Array.isArray(project.techStack) && project.techStack.length > 0, `projects.items[${index}].techStack must not be empty`);
});

assert(Array.isArray(blogs) && blogs.length > 0, 'blogs must not be empty');
blogs.forEach((post, index) => {
  assert(isNonEmptyString(post.title), `blogs[${index}].title is required`);
  assertDate(post.date.datetime, `blogs[${index}].date.datetime`);
  assertLocalAssetExists(post.image.src, `blogs[${index}].image.src`);
});

assert(isNonEmptyString(contact.map.src), 'contact.map.src is required');
assert(Array.isArray(contact.actions) && contact.actions.length > 0, 'contact.actions must not be empty');

console.log('Content validation passed.');
