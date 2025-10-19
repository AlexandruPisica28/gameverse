
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const formMessage = document.getElementById('formMessage');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const messageText = messageInput.value.trim();

    if (name === '' || email === '' || messageText === '') {
      formMessage.textContent = '⚠️ Te rugăm să completezi toate câmpurile.';
      formMessage.style.color = '#FF7F11';
      formMessage.style.display = 'block';
      return;
    }

    if (!validateEmail(email)) {
      formMessage.textContent = '⚠️ Te rugăm să introduci un email valid.';
      formMessage.style.color = '#FF7F11';
      formMessage.style.display = 'block';
      return;
    }

    formMessage.textContent = '✅ Mesajul tău a fost trimis cu succes!';
    formMessage.style.color = '#28a745';
    formMessage.style.display = 'block';
    contactForm.reset();

    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 4000);
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }


  //  // === Trimitem datele în db.json (prin json-server)
  // await fetch("http://localhost:4000/messages", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ name, email, message }),
  // });

  // formMessage.textContent = "✅ Mesaj trimis cu succes!";
  // formMessage.style.color = "#28a745";
  // formMessage.style.display = "block";
  // form.reset();

  // setTimeout(() => {
  //   formMessage.style.display = "none";
  // }, 3000);
