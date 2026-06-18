const form   = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  const data   = new FormData(form);
  const action = "https://formspree.io/f/manjpoeo";

  try {
    const response = await fetch(action, {
      method: "POST",
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      status.innerText = "✅ Thank you! Your message has been sent.";
      form.reset();
    } else {
      status.innerText = "❌ Oops! There was a problem submitting your form.";
    }
  } catch (error) {
    status.innerText = "⚠️ Network error. Please try again later.";
  }
});