/* ==========================================================================
   ByteLevel - Main Script (script.js)
   Interactive Features, Estimator Logic, & Animations
   ========================================================================== */

// Service Data Matrix
const servicesData = {
  chip: [
    { label: "Dead Laptop / No Power (Motherboard Diagnostic)", standardPrice: "₹1,499 - ₹2,999", proPrice: "₹2,499 - ₹4,499" },
    { label: "Short Circuit / Liquid Spillage Recovery", standardPrice: "₹1,999 - ₹3,499", proPrice: "₹2,999 - ₹5,499" },
    { label: "GPU / BGA Chip Reballing & Micro-Soldering", standardPrice: "₹2,499 - ₹4,999", proPrice: "₹3,999 - ₹7,499" },
    { label: "BIOS Corrupt / Clean ME Region Reprogramming", standardPrice: "₹999 - ₹1,800", proPrice: "₹1,499 - ₹2,500" }
  ],
  automation: [
    { label: "Smart Lighting & Smart Relays (1-2 Rooms)", standardPrice: "₹9,999 - ₹19,999", proPrice: "₹19,999 - ₹29,999" },
    { label: "Complete IoT Hub & Sensor-Driven Automation", standardPrice: "₹99,999 - ₹9,99,999", proPrice: "₹9,99,999 - ₹29,99,999" },
    { label: "Automated Climate, Curtains & Mood Scene Setup", standardPrice: "₹19,999 - ₹99,999", proPrice: "₹99,999 - ₹9,99,000" }
  ]
};

// DOM Elements
const serviceTypeSelect = document.getElementById("serviceType");
const issueDetailSelect = document.getElementById("issueDetail");
const deviceTypeSelect = document.getElementById("deviceType");
const priceDisplay = document.getElementById("priceDisplay");
const mobileToggle = document.getElementById("mobileToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");

// 1. Populate Dropdown Options
function populateIssues() {
  const currentCategory = serviceTypeSelect.value;
  issueDetailSelect.innerHTML = "";

  servicesData[currentCategory].forEach((item, index) => {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = item.label;
    issueDetailSelect.appendChild(opt);
  });

  calculatePrice();
}

// 2. Dynamic Price Calculation
function calculatePrice() {
  const category = serviceTypeSelect.value;
  const issueIdx = parseInt(issueDetailSelect.value, 10) || 0;
  const isPro = deviceTypeSelect.value === "pro";

  const selectedItem = servicesData[category][issueIdx];
  if (selectedItem) {
    priceDisplay.textContent = isPro ? selectedItem.proPrice : selectedItem.standardPrice;
  }
}

// 3. Mobile Menu Toggle
if (mobileToggle) {
  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// 4. Counter Animation for Stats
function runCounters() {
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const speed = 40;
    const increment = target / speed;

    const updateCount = () => {
      const current = +counter.innerText;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// 5. Form Submission Handler
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! A ByteLevel technician will contact you shortly.");
    contactForm.reset();
  });
}

// Event Listeners
serviceTypeSelect.addEventListener("change", populateIssues);
issueDetailSelect.addEventListener("change", calculatePrice);
deviceTypeSelect.addEventListener("change", calculatePrice);

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  populateIssues();
  runCounters();
});
