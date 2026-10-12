// مهم: اكتب رقم واتساب بصيغة دولية من غير + أو مسافات أو شرطات.
// مثال لمصر: 2010XXXXXXX (استبدل X بأرقامك الحقيقية).
const WHATSAPP_NUMBER = "201022405158";

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
});

mainNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

function openWhatsApp(message) {
  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    alert("رقم واتساب غير مضبوط. راجع الرقم في ملف script.js.");
    return;
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.getElementById("whatsappLink")?.addEventListener("click", (event) => {
  event.preventDefault();
  openWhatsApp("أهلًا OL Design، عايز أستفسر عن خدمات التصميم.");
});

document.querySelectorAll("[data-service]").forEach((link) => {
  link.addEventListener("click", () => {
    const serviceSelect = document.getElementById("service");
    const wanted = link.dataset.service;
    if (serviceSelect && [...serviceSelect.options].some(option => option.value === wanted || option.text === wanted)) {
      serviceSelect.value = wanted;
    }
  });
});

document.getElementById("orderForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const service = document.getElementById("service").value;
  const details = document.getElementById("details").value.trim();
  const budget = document.getElementById("budget").value.trim();

  if (!name || !service || !details) {
    alert("من فضلك املأ الاسم والخدمة وتفاصيل الطلب.");
    return;
  }

  const message = [
    "أهلًا OL Design، عندي طلب تصميم جديد.",
    `الاسم: ${name}`,
    `الخدمة: ${service}`,
    `تفاصيل الطلب: ${details}`,
    budget ? `الميزانية: ${budget}` : ""
  ].filter(Boolean).join("\n");

  openWhatsApp(message);
});
