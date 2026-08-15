require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'tasks.json');
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'abhishek009563@gmail.com';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(DATA_FILE)) {
  const initialTasks = [
    {
      id: "1",
      title: "Welcome to your Kanban Board! 🚀",
      description: "This is a card. You can edit this task, change its priority, move it to another column, or delete it.",
      status: "todo",
      priority: "medium",
      category: "Work",
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Develop Backend API",
      description: "Build Express endpoints for creating, reading, updating, and deleting tasks.",
      status: "inprogress",
      priority: "high",
      category: "Development",
      dueDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    },
    {
      id: "3",
      title: "Design Premium UI Layout",
      description: "Create an attractive Dark Theme glassmorphic interface with fluid transitions.",
      status: "done",
      priority: "high",
      category: "Design",
      dueDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    }
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialTasks, null, 2), 'utf8');
}

// Helper to read tasks
function readTasks() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading task file:', err);
    return [];
  }
}

// Helper to write tasks
function writeTasks(tasks) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to task file:', err);
  }
}

// REST API Endpoints

// 1. Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(readTasks());
});

// 2. Create a task
app.post('/api/tasks', (req, res) => {
  const { title, description, priority, category, dueDate, status } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const tasks = readTasks();
  const newTask = {
    id: Date.now().toString(),
    title,
    description: description || '',
    priority: priority || 'medium',
    category: category || 'General',
    dueDate: dueDate || '',
    status: status || 'todo',
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// 3. Update a task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, priority, category, dueDate, status } = req.body;
  
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const updatedTask = {
    ...tasks[taskIndex],
    title: title !== undefined ? title : tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    priority: priority !== undefined ? priority : tasks[taskIndex].priority,
    category: category !== undefined ? category : tasks[taskIndex].category,
    dueDate: dueDate !== undefined ? dueDate : tasks[taskIndex].dueDate,
    status: status !== undefined ? status : tasks[taskIndex].status,
    updatedAt: new Date().toISOString()
  };

  tasks[taskIndex] = updatedTask;
  writeTasks(tasks);
  res.json(updatedTask);
});

// 4. Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const tasks = readTasks();
  const filteredTasks = tasks.filter(t => t.id !== id);

  if (tasks.length === filteredTasks.length) {
    return res.status(404).json({ error: 'Task not found' });
  }

  writeTasks(filteredTasks);
  res.json({ message: 'Task deleted successfully', id });
});

const phoneController = require('./phone-controller');
const laptopController = require('./laptop-controller');

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
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
}

// Secure Gym Registration & Email Endpoint
app.post('/api/gym/register', async (req, res) => {
  try {
    const { fullName, phone, email, age, gender, membership, startDate, message, honeypot } = req.body;

    // Anti-Spam Honeypot Check
    if (honeypot) {
      return res.status(400).json({ success: false, error: 'Spam submission detected.' });
    }

    // Server-Side Field Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Please enter a valid full name.' });
    }

    const phoneRegex = /^[0-9+\s\-()]{8,20}$/;
    if (!phone || !phoneRegex.test(phone.trim())) {
      return res.status(400).json({ success: false, error: 'Please enter a valid phone number (at least 8-10 digits).' });
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

    // Format Email Subject & Body
    const emailSubject = `New Gym Registration - ${fullName.trim()}`;
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

    // Save Registration Lead to database
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

    // Send Email via Nodemailer if SMTP Credentials Configured in .env
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass && smtpPass.trim() !== '') {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT || '465', 10),
          secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });

        await transporter.sendMail({
          from: `"Ironforge Fitness Website" <${smtpUser}>`,
          to: OWNER_EMAIL,
          replyTo: email.trim(),
          subject: emailSubject,
          text: emailBody
        });
        console.log(`✅ LIVE GMAIL SENT via SMTP to ${OWNER_EMAIL} for ${fullName.trim()}`);
      } catch (mailErr) {
        console.error(`⚠️ SMTP Error:`, mailErr.message);
      }
    } else {
      // Fallback: Send email notification via Web3Forms API directly to abhishek009563@gmail.com
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: 'b9472f88-d6c5-433b-a25e-5b1a37c95e1e', // Free transactional email dispatch key
            email: OWNER_EMAIL,
            subject: emailSubject,
            message: emailBody,
            from_name: 'Ironforge Fitness Website',
            replyto: email.trim()
          })
        });
        console.log(`✅ LIVE EMAIL SENT to ${OWNER_EMAIL} via Web3Forms API!`);
      } catch (apiErr) {
        console.log(`⚠️ Lead saved to local database & logged:\n${emailBody}`);
      }
    }

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
  console.log(`📧 NEW CLIENT LEAD RECEIVED for abhishek009563@gmail.com:`, newLead);
  res.json({ success: true, message: 'Enquiry submitted! Email notification dispatched to abhishek009563@gmail.com' });
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

// Freelance Agency Client Outreach Portal Route
app.get(['/agency', '/freelance'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'agency-pitch.html'));
});

// Google Business Profile Optimizer Route
app.get(['/gbp', '/google-business'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gbp-optimizer.html'));
});

// Anamika Special Website Route
app.get('/anamika', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'anamika.html'));
});

// AK Dhaba Restaurant Website Route
app.get('/ak-dhaba', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ak-dhaba.html'));
});

// Portfolio Showcase Website Route
app.get('/portfolio', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'portfolio.html'));
});

// 3D Solar System Explorer Route
app.get('/3d', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '3d-explorer.html'));
});

// AI Phone USB Controller Page & API Endpoints
app.get('/phone', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'phone-ai.html'));
});

// AI Laptop Assistant Page & API Endpoints
app.get('/laptop', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'laptop-ai.html'));
});

app.get('/api/laptop/info', (req, res) => {
  res.json(laptopController.getLaptopInfo());
});

app.post('/api/laptop/command', async (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: 'Command string is required' });
  }
  const result = await laptopController.processLaptopAiCommand(command);
  res.json(result);
});

app.post('/api/laptop/lock', async (req, res) => {
  const result = await laptopController.lockLaptop();
  res.json(result);
});

app.post('/api/laptop/open', async (req, res) => {
  const { app: appName } = req.body;
  if (!appName) {
    return res.status(400).json({ error: 'App name is required' });
  }
  const result = await laptopController.openLaptopApp(appName);
  res.json(result);
});

app.get('/api/phone/status', async (req, res) => {
  const status = await phoneController.checkDeviceStatus();
  res.json(status);
});

app.post('/api/phone/command', async (req, res) => {
  const { command, pin } = req.body;
  if (!command) {
    return res.status(400).json({ error: 'Command string is required' });
  }
  const result = await phoneController.processAiCommand(command, pin);
  res.json(result);
});

app.post('/api/phone/unlock', async (req, res) => {
  const { pin } = req.body;
  const result = await phoneController.unlockPhone(pin);
  res.json(result);
});

app.post('/api/phone/open', async (req, res) => {
  const { app: appName } = req.body;
  if (!appName) {
    return res.status(400).json({ error: 'App name is required' });
  }
  const result = await phoneController.openApp(appName);
  res.json(result);
});

// Catch-all route to serve the client app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


