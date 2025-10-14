const form = document.getElementById('newsletterForm');
const emailInput = document.getElementById('newsletterEmail');
const message = document.getElementById('newsletterMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (!validateEmail(email)) {
    message.textContent = '⚠️ Te rugăm să introduci un email valid.';
    message.style.color = '#FF7F11';
    return;
  }

  message.textContent = '✅ Mulțumim pentru abonare!';
  message.style.color = '#28a745';
  form.reset();
});

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
