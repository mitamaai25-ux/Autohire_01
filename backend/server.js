import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// In-memory store for demo purposes.
const users = [];

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ message: 'AutoHire API is running' });
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const existingUser = users.find((user) => user.email === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    return res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during registration.' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = users.find((item) => item.email === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during login.' });
  }
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: `Welcome back, ${req.user.name}!`,
    stats: {
      jobsApplied: 12,
      interviewsScheduled: 3,
      profileStrength: '82%',
    },
  });
});



app.post('/api/resume-score', (req, res) => {
  try {
    const {
      skills = [],
      experienceYears = 0,
      educationLevel = 'other',
      projectsCount = 0,
      keywordsMatched = 0,
    } = req.body;

    const normalizedSkills = Array.isArray(skills)
      ? skills.filter((skill) => typeof skill === 'string' && skill.trim())
      : [];

    const safeExperience = Number.isFinite(Number(experienceYears)) ? Number(experienceYears) : 0;
    const safeProjects = Number.isFinite(Number(projectsCount)) ? Number(projectsCount) : 0;
    const safeKeywords = Number.isFinite(Number(keywordsMatched)) ? Number(keywordsMatched) : 0;

    const skillScore = Math.min(normalizedSkills.length * 6, 30);
    const experienceScore = Math.min(Math.max(safeExperience, 0) * 4, 25);
    const projectScore = Math.min(Math.max(safeProjects, 0) * 3, 20);
    const keywordScore = Math.min(Math.max(safeKeywords, 0) * 5, 15);

    const educationMap = {
      phd: 10,
      masters: 8,
      bachelors: 6,
      diploma: 4,
      other: 2,
    };

    const educationScore = educationMap[(educationLevel || 'other').toLowerCase()] || 2;

    const totalScore = Math.min(
      Math.round(skillScore + experienceScore + projectScore + keywordScore + educationScore),
      100
    );

    const recommendations = [];
    if (normalizedSkills.length < 5) recommendations.push('Add more relevant technical and domain skills.');
    if (safeExperience < 2) recommendations.push('Highlight internships, freelance work, or measurable impact projects.');
    if (safeProjects < 3) recommendations.push('Include additional portfolio projects with outcomes.');
    if (safeKeywords < 2) recommendations.push('Align resume keywords with the target job description.');

    return res.json({
      message: 'Resume scored successfully.',
      score: totalScore,
      breakdown: {
        skills: skillScore,
        experience: experienceScore,
        projects: projectScore,
        keywords: keywordScore,
        education: educationScore,
      },
      recommendations,
    });
  } catch {
    return res.status(500).json({ message: 'Server error while scoring resume.' });
  }
});
app.listen(PORT, () => {
  console.log(`AutoHire backend listening on port ${PORT}`);
});
