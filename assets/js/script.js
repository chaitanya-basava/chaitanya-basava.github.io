'use strict';

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const toggleActive = (element) => {
  if (element) element.classList.toggle('active');
};

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = qs('[data-sidebar]');
  const sidebarBtn = qs('[data-sidebar-btn]');

  sidebarBtn?.addEventListener('click', () => toggleActive(sidebar));

  const testimonialsItem = qsa('[data-testimonials-item]');
  const modalContainer = qs('[data-modal-container]');
  const modalCloseBtn = qs('[data-modal-close-btn]');
  const overlay = qs('[data-overlay]');
  const modalImg = qs('[data-modal-img]');
  const modalTitle = qs('[data-modal-title]');
  const modalText = qs('[data-modal-text]');
  const modalLinkedin = qs('[data-modal-linkedin]');

  const testimonialsModalFunc = () => {
    toggleActive(modalContainer);
    toggleActive(overlay);
  };

  testimonialsItem.forEach((element) => {
    element.addEventListener('click', function () {
      const avatar = qs('[data-testimonials-avatar]', this);
      const title = qs('[data-testimonials-title]', this);
      const text = qs('[data-testimonials-text]', this);
      const linkedin = qs('[data-testimonials-linkedin]', this);

      if (!avatar || !title || !text || !linkedin || !modalImg || !modalTitle || !modalText || !modalLinkedin) {
        return;
      }

      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
      modalTitle.textContent = `${title.textContent} `;

      const linkedinIcon = document.createElement('i');
      linkedinIcon.className = 'fa fa-linkedin-square';
      modalTitle.append(linkedinIcon);

      modalText.replaceChildren(...Array.from(text.children).map((child) => child.cloneNode(true)));
      modalLinkedin.href = `https://www.linkedin.com/in/${linkedin.textContent.trim()}`;

      testimonialsModalFunc();
    });
  });

  modalCloseBtn?.addEventListener('click', testimonialsModalFunc);
  overlay?.addEventListener('click', testimonialsModalFunc);

  const select = qs('[data-select]');
  const selectItems = qsa('[data-select-item]');
  const selectValue = qs('[data-select-value]');
  const filterBtn = qsa('[data-filter-btn]');
  const filterItems = qsa('[data-filter-item]');

  const filterFunc = (selectedValue) => {
    filterItems.forEach((element) => {
      if (selectedValue === 'all' || selectedValue === element.dataset.category) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  };

  select?.addEventListener('click', function () {
    toggleActive(this);
  });

  selectItems.forEach((element) => {
    element.addEventListener('click', function () {
      const selectedValue = this.dataset.filterValue || this.textContent.trim().toLowerCase();
      if (selectValue) selectValue.textContent = this.textContent;
      toggleActive(select);
      filterFunc(selectedValue);
    });
  });

  let lastClickedBtn = filterBtn[0];

  filterBtn.forEach((element) => {
    element.addEventListener('click', function () {
      const selectedValue = this.dataset.filterValue || this.textContent.trim().toLowerCase();
      if (selectValue) selectValue.textContent = this.textContent;
      filterFunc(selectedValue);

      lastClickedBtn?.classList.remove('active');
      this.classList.add('active');
      lastClickedBtn = this;
    });
  });

  const form = qs('[data-form]');
  const formInputs = qsa('[data-form-input]');
  const formBtn = qs('[data-form-btn]');

  if (form && formBtn) {
    formInputs.forEach((element) => {
      element.addEventListener('input', () => {
        if (form.checkValidity()) {
          formBtn.removeAttribute('disabled');
        } else {
          formBtn.setAttribute('disabled', '');
        }
      });
    });
  }

  const navigationLinks = qsa('[data-nav-link]');
  const pages = qsa('[data-page]');

  navigationLinks.forEach((element) => {
    element.addEventListener('click', function () {
      const targetPage = this.dataset.pageLink || this.textContent.trim().toLowerCase();

      pages.forEach((page) => {
        page.classList.toggle('active', page.dataset.page === targetPage);
      });

      navigationLinks.forEach((link) => {
        const linkPage = link.dataset.pageLink || link.textContent.trim().toLowerCase();
        link.classList.toggle('active', linkPage === targetPage);
      });

      window.scrollTo(0, 0);
    });
  });
});
