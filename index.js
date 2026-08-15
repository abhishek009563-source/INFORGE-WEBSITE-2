const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'abhishek009563@gmail.com';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

function readLeads() {
  if (!fs.existsSync(LEADS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
  } catch (e) {
    return [];
  }
}

function saveLead(leadData) {
  const leads = readLeads();
  leads.unshift(leadData);
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (e) {}
}

// Secure Gym Registration & Email Endpoint
app.post('/api/gym/register', async (req, res) => {
  try {
    const { fullName, phone, email, age, gender, membership, startDate, message, honeypot } = req.body;

    if (honeypot) {
      return res.status(400).json({ success: false, error: 'Spam submission detected.' });
    }

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter a valid full name.' });
    }

    const phoneRegex = /^[0-9+\s\-()]{8,20}$/;
    if (!phone || !phoneRegex.test(phone.trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid phone number.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    const parsedAge = parseInt(age, 10);
    if (!age || isNaN(parsedAge) || parsedAge < 10 || parsedAge > 100) {
      return res.status(400).json({ success: false, error: 'Please enter a valid age between 10 and 100.' });
    }

    const validPlan = membership || 'Starter Plan - ₹1,499';
    const validGender = gender || 'Not Specified';
    const validStartDate = startDate || 'Immediate';
    const validMessage = message ? message.trim() : 'None';

    const emailSubject = `New Ironforge Fitness Registration - ${fullName.trim()}`;
    const emailBody = `NEW GYM REGISTRATION
====================

Full Name:
${fullName.trim()}

Phone:
${phone.trim()}

Email:
${email.trim()}

Age:
${parsedAge}

Gender:
${validGender}

Membership Plan:
${validPlan}

Preferred Start Date:
${validStartDate}

Additional Message:
${validMessage}

====================
Submitted from:
Ironforge Fitness Website`;

    const leadData = {
      id: Date.now().toString(),
      name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      age: parsedAge,
      gender: validGender,
      membership: validPlan,
      startDate: validStartDate,
      message: validMessage,
      source: 'Ironforge Fitness Registration Form',
      date: new Date().toISOString()
    };
    saveLead(leadData);

    // Fallback: Send email notification via Web3Forms API directly to abhishek009563@gmail.com
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '77490d4b-8c81-4d1c-927e-3447016bf3f7',
          email: OWNER_EMAIL,
          subject: emailSubject,
          message: emailBody,
          from_name: 'Ironforge Fitness Website',
          replyto: email.trim()
        })
      });
    } catch (apiErr) {}

    return res.json({
      success: true,
      message: "Registration submitted successfully! 🎉\nThank you for choosing Ironforge Fitness. We will contact you shortly."
    });

  } catch (err) {
    console.error('❌ Registration Server Error:', err);
    return res.status(500).json({
      success: false,
      error: "Something went wrong. Please try again or contact us directly."
    });
  }
});

// Client Enquiry API Endpoint
app.post('/api/send-enquiry', (req, res) => {
  const { name, phone, email, message, source } = req.body;
  const newLead = {
    id: Date.now().toString(),
    name: name || 'Anonymous Client',
    phone: phone || 'N/A',
    email: email || 'N/A',
    message: message || '',
    source: source || 'Website Form',
    date: new Date().toISOString()
  };
  saveLead(newLead);
  res.json({ success: true, message: 'Enquiry submitted!' });
});

app.get('/api/leads', (req, res) => {
  res.json(readLeads());
});

// Live Inbox Dashboard Route
app.get(['/inbox', '/leads'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'inbox.html'));
});

// Ironforge Fitness Gym Website Route (Root & Aliases)
app.get(['/', '/ironforge', '/gym', '/ironforge-fitness'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ironforge.html'));
});

// Hairable Salon Commercial Website Route
app.get(['/hairable', '/hairable-salon'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'hairable.html'));
});

// Barber & Hair Salon Website Demo Route
app.get(['/barber', '/salon'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'barber.html'));
});

// AK Dhaba Punjabi Restaurant Website Route
app.get(['/ak-dhaba', '/dhaba', '/restaurant'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ak-dhaba.html'));
});

// Freelance Agency Outreach Portal Route
app.get(['/agency', '/freelance', '/outreach'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'agency-pitch.html'));
});

// Google Business Profile Optimizer Route
app.get(['/gbp', '/google-business'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gbp-optimizer.html'));
});

// Developer Portfolio Route
app.get(['/portfolio', '/3d'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portfolio.html'));
});

// Romantic Surprise Website Route
app.get(['/anamika', '/anamika-abhishek'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'anamika.html'));
});

// Catch-all route to serve the Ironforge Gym website
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ironforge.html'));
});

// Start Server locally if run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
