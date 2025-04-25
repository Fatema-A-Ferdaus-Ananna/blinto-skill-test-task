import { companyPhotos } from "../data/companyPhoto.js";
import { faqList } from "../data/FAQs.js";
import { primaryFeatures } from "../data/features.js";
import { officeLocations } from "../data/officeLocation.js";
import { testimonialList } from "../data/testimonial.js";

console.log(faqList);

// social proof
const socialProof = document.getElementById("social-proof");

companyPhotos.forEach((src) => {
  const div = document.createElement("div");
  div.className = "item";

  const img = document.createElement("img");
  img.src = src;
  img.alt = "Company Logo";
  img.className = "company-logo";

  div.appendChild(img);
  socialProof.appendChild(div);
});

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
const colCount = 3;
const columns = Array.from({ length: colCount }, () => []);

testimonialList.forEach((testimonial, index) => {
  const colIndex = index % colCount;
  columns[colIndex].push(testimonial);
});
const testimonialContainer = document.getElementById("testimonial-list");

columns.forEach((colData) => {
  const col = document.createElement("div");
  col.className = "testimonial-card-container ";
  colData.forEach(({ name, designation, comment, avater }) => {
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.innerHTML = `
      <div class="testimonial-rating">********</div>

                <div class="paragraph-lg">
                 ${comment}
                </div>

                <div class="testimonial-profile">
                  <span class="profile-img">
                    <img
                      src="${avater}"
                    />
                  </span>

                  <span class="testimonial-profile-detail">
                    <span class="profile-name-text"> ${name}</span>
                    <span class="commenter-info-text">${designation}</span>
                  </span>
                </div>
    `;
    col.appendChild(card);
  });
  testimonialContainer.appendChild(col);
});

// office location
const officeList = document.getElementById("contact-list");

officeLocations.forEach((location) => {
  const contactInfoCard = document.createElement("div");
  contactInfoCard.className = "contact-info-item";

  contactInfoCard.innerHTML = ` 
      <span><img src="/assets/svg/Vector(7).svg" alt="" /></span>
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
          src="/assets/svg/Vector(12).svg"
          alt="question"
          srcset=""
        />
        <h1 class="text-md-extrebold">${faq.question}</h1>
      </span>
      <button class="toggle-btn">
      <img src="/assets/svg/Vector(13).svg" alt="arrow" />
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
