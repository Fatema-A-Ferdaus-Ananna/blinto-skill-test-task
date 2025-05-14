import { companyPhotos } from "../data/companyPhoto.js";
import { faqList } from "../data/FAQs.js";
import { primaryFeatures } from "../data/features.js";
import { footerData } from "../data/footerData.js";
import { officeLocations } from "../data/officeLocation.js";
import { emptyStar, fullStar, halfStar } from "../data/star.js";
import { testimonialList } from "../data/testimonial.js";
import { whoIsItFor } from "../data/whoIsItFor.js";

// Screen size
const isMobile = window.innerWidth < 767;

// social proof
const socialProof1 = document.getElementById("social-proof-1");
const socialProof2 = document.getElementById("social-proof-2");

const halfway = Math.ceil(companyPhotos.length / 2);
const firstHalf = companyPhotos.slice(0, halfway);
const secondHalf = companyPhotos.slice(halfway);

function appendLogos(container, photos, direction) {
  photos.forEach((src, index) => {
    const div = document.createElement("div");
    div.classList.add(`item${direction}`, `item${index + 1}`);

    console.log(`item${direction}`, `item${index + 1}`);

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Company Logo ${index + 1}`;
    img.className = "company-logo";

    div.appendChild(img);
    container.appendChild(div);
  });
}

appendLogos(socialProof1, firstHalf, "Left");
appendLogos(socialProof2, secondHalf, "Right");

// primary feature
const featuresList = document.getElementById("features-list");

primaryFeatures.forEach((feature) => {
  const card = document.createElement("div");
  card.className = "main-feature-card";

  card.innerHTML = `
    <div class="main-feature-icon">
      <img src="${feature.thumbnail}" alt="${feature.title}" />
    </div>
    <div class="main-feature-detail">
      <span class="feature-card-title">${feature.title}</span>
      <p class="feature-card-description">${feature.description}</p>
    </div>
  `;

  featuresList.appendChild(card);
});

// testimonilas
const testimonialContainer = document.getElementById("testimonial-list");
const loadMoreBtn = document.getElementById("more-testimonial-btn");

const colCount = 3; // 3 columns layout on desktop

let visibleCount = isMobile ? 4 : testimonialList.length; //mobile show 4 cards intialy

function renderTestimonials(limit) {
  testimonialContainer.innerHTML = "";
  const columns = Array.from({ length: colCount }, () => []);

  testimonialList.slice(0, limit).forEach((testimonial, index) => {
    const colIndex = index % colCount;
    columns[colIndex].push(testimonial);
  });

  columns.forEach((colData) => {
    const col = document.createElement("div");
    col.className = "testimonial-card-container";

    colData.forEach(({ name, designation, comment, avater, rating }) => {
      const card = document.createElement("div");
      card.className = "testimonial-card";
      const ratingHTML = renderRating(rating); //star render

      card.innerHTML = `
        <div class="testimonial-rating">${ratingHTML}</div>
        <div class="paragraph-lg">${comment}</div>

        <div class="testimonial-profile">
          <span class="profile-img">
            <img src="${avater}" />
          </span>
          <span class="testimonial-profile-detail">
            <span class="profile-name-text">${name}</span>
            <span class="commenter-info-text">${designation}</span>
          </span>
        </div>
      `;
      col.appendChild(card);
    });

    testimonialContainer.appendChild(col);
  });

  // hide button if no card
  if (limit >= testimonialList.length) {
    loadMoreBtn.style.display = "none";
  }
}
renderTestimonials(visibleCount); // 1st time render

// load more click
loadMoreBtn.addEventListener("click", () => {
  visibleCount += 3;
  renderTestimonials(visibleCount);
});

// rating star
function renderRating(rating) {
  let starsHTML = "";
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const total = 5;

  // full stars
  for (let i = 0; i < full; i++) {
    starsHTML += fullStar;
  }

  //half star (only one)
  if (hasHalf) {
    starsHTML += halfStar;
  }

  // empty stars
  const empty = total - full - (hasHalf ? 1 : 0);
  for (let i = 0; i < empty; i++) {
    starsHTML += emptyStar;
  }

  return starsHTML;
}

// office location
const officeList = document.getElementById("contact-list");

officeLocations.forEach((location) => {
  const contactInfoCard = document.createElement("div");
  contactInfoCard.className = "contact-info-item";

  contactInfoCard.innerHTML = ` 
      <span><img src="assets/svg/Vector(7).svg" alt="" /></span>
      <div class="location">
        <h2 class="contact-info-title-text">${location.conutry}</h2>
        <span class="contact-info-sub-text">
          <p>${location.address}</p>
          <p>${location.city}</p>
        </span>
      </div>`;

  officeList.appendChild(contactInfoCard);
});

// faq
const faqListContainer = document.getElementById("faq-list");

faqList.forEach((faq) => {
  const faqCard = document.createElement("div");
  faqCard.className = "faq-card";

  faqCard.innerHTML = `
    <div class="question-container">
      <span class="question">
        <img
          src="assets/svg/Vector(12).svg"
          alt="question"
          srcset=""
        />
        <h1 class="text-md-extrebold">${faq.question}</h1>
      </span>
      <button class="toggle-btn">
      <img src="assets/svg/Vector(13).svg" alt="arrow" />
      </button>
    </div>
     <p class="paragraph-sm answer-visible">${faq.answer}</p>
  `;

  faqListContainer.appendChild(faqCard);

  // hide-show faq answer
  const toggleBtn = faqCard.querySelector(".toggle-btn");
  const answerPara = faqCard.querySelector(".answer-visible");
  const alignStart = faqCard.querySelector(".question-container");

  toggleBtn.addEventListener("click", () => {
    answerPara.classList.toggle("show");
    alignStart.classList.toggle("align-start");
    toggleBtn.classList.toggle("rotate");
  });
});

// footer links
const renderLinks = (list, containerId) => {
  const container = document.getElementById(containerId);
  list.forEach((item) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.link;
    a.textContent = item.title;
    li.appendChild(a);
    container.appendChild(li);
  });
};

// Render the lists dynamically
document.addEventListener("DOMContentLoaded", () => {
  renderLinks(footerData.siteMap, "siteMap-list"); // Site Map
  renderLinks(footerData.services, "services-list"); // Services
  renderLinks(footerData.products, "products-list"); // Product
  renderLinks(footerData.helpAndSupport, "help-support-list"); // Help & Support
  renderLinks(footerData.legal, "legal-list"); // Legal
  renderLinks(footerData.pricing, "pricing-list"); // Pricing
});

// interactive behaviours
// scroll to top
document.getElementById("bottom-btn").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling effect
  });
});

// mobile nav modal
const menuBtn = document.getElementById("mobile-menu-btn");
const modal = document.querySelector(".mobile-menu-modal");
const closeBtn = document.getElementById("modal-close-btn");

menuBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

const navLinks = document.querySelectorAll(".mobile-nav-menu a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});

const cardList = document.getElementById("who-is-it-for-list");
let activeIndex = 0;
const selectedThumbnail = document.getElementById("selected-thumbnail");

function renderCardList() {
  whoIsItFor.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("who-is-it-for-card");
    card.onclick = () => handleCardClick(index);

    card.innerHTML = `
      <span class="bar"></span>
      <div class="who-is-it-for-content">
        <h2 class="who-is-it-for-title">${item.title}</h2>
        <p class="who-is-it-for-detail">${item.description}</p>
      </div>
    `;

    cardList.appendChild(card);
  });

  handleCardClick(activeIndex);
}

function handleCardClick(index) {
  activeIndex = index;
  const thumbnail = whoIsItFor[index].thumnail;

  selectedThumbnail.src = thumbnail;

  const cards = document.querySelectorAll(".who-is-it-for-card");
  cards.forEach((card, i) => {
    if (i === index) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

renderCardList();
