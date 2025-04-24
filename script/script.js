import { companyPhotos } from "../date/companyPhoto.js";
import { primaryFeatures } from "../date/features.js";
console.log(primaryFeatures);

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
