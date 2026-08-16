/* ==========================================================================
   IRONFORGE FITNESS — JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Set default date to today in registration form
  const startDateInput = document.getElementById('reg-startdate');
  if (startDateInput) {
    startDateInput.valueAsDate = new Date();
  }
});

// Lightbox Modal Controls
function openLightbox(src) {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightbox = document.getElementById('lightbox');
  if (lightboxImg && lightbox) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
  }
}

// Registration Modal Controls
function openJoinModal(planName = 'PRO Plan - ₹2,499 / mo') {
  const select = document.getElementById('reg-membership');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value.toLowerCase().includes(planName.toLowerCase().split(' ')[0])) {
        select.selectedIndex = i;
        break;
      }
    }
  }
  const modal = document.getElementById('register-modal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeRegisterModal() {
  const modal = document.getElementById('register-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Secure Registration Form Submission with Web3Forms
async function handleGymRegister(e) {
  e.preventDefault();

  const btn = document.getElementById('reg-btn-submit');
  const originalText = btn ? btn.innerText : 'SUBMIT REGISTRATION';

  // Client-Side Field Extraction
  const fullName = document.getElementById('reg-name').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const age = document.getElementById('reg-age').value.trim();
  const gender = document.getElementById('reg-gender').value;
  const membership = document.getElementById('reg-membership').value;
  const startDate = document.getElementById('reg-startdate').value;
  const message = document.getElementById('reg-message').value.trim();
  const honeypotInput = document.querySelector('input[name="honeypot"]');
  const honeypot = honeypotInput ? honeypotInput.value : '';

  // Spam Check
  if (honeypot) {
    alert("Spam submission detected.");
    return;
  }

  // Input Validations
  if (!fullName || fullName.length < 2) {
    alert("Please enter a valid full name.");
    return;
  }

  if (!phone || phone.replace(/[^0-9]/g, '').length < 8) {
    alert("Please enter a valid phone number (at least 8-10 digits).");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!age || parseInt(age, 10) < 10 || parseInt(age, 10) > 100) {
    alert("Please enter a valid age between 10 and 100.");
    return;
  }

  // UI Loading State & Prevent Duplicate Submissions
  if (btn) {
    btn.innerText = "Sending Registration... ⏳";
    btn.disabled = true;
  }

  const emailSubject = `New Ironforge Fitness Registration - ${fullName}`;
  const emailBody = `NEW GYM REGISTRATION
====================

Full Name:
${fullName}

Phone:
${phone}

Email:
${email}

Age:
${age}

Gender:
${gender}

Membership Plan:
${membership}

Preferred Start Date:
${startDate}

Additional Message:
${message || 'None'}

====================
Submitted from:
Ironforge Fitness Website`;

  try {
    const web3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '77490d4b-8c81-4d1c-927e-3447016bf3f7',
        subject: emailSubject,
        name: fullName,
        email: email,
        phone: phone,
        age: age,
        gender: gender,
        membership: membership,
        startDate: startDate,
        message: emailBody,
        from_name: 'Ironforge Fitness Website',
        replyto: email
      })
    });

    const web3Result = await web3Res.json();

    if (web3Res.ok && web3Result.success) {
      alert("Registration submitted successfully! 🎉\nThank you for choosing Ironforge Fitness. We will contact you shortly.");
      const form = document.getElementById('gym-register-form');
      if (form) form.reset();
      const startDateInput = document.getElementById('reg-startdate');
      if (startDateInput) startDateInput.valueAsDate = new Date();
      closeRegisterModal();
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (err) {
    console.error("Registration submit error:", err);
    alert("Something went wrong. Please try again.");
  } finally {
    if (btn) {
      btn.innerText = originalText;
      btn.disabled = false;
    }
  }
}

// Contact Form Handler (Fills Modal and Opens Registration)
function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const inputs = form.querySelectorAll('input, textarea');
  openJoinModal('General Enquiry');
  if (inputs[0]) document.getElementById('reg-name').value = inputs[0].value;
  if (inputs[1]) document.getElementById('reg-phone').value = inputs[1].value;
  if (inputs[2]) document.getElementById('reg-email').value = inputs[2].value;
  if (inputs[3]) document.getElementById('reg-message').value = inputs[3].value;
}

// Mobile Navigation Toggle
function toggleMobileNav() {
  const links = document.querySelector('.nav-links');
  if (links) {
    links.style.display = (links.style.display === 'flex') ? 'none' : 'flex';
  }
}
