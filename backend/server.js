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


const tokenize = (text = '') =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2);

const toFrequencyMap = (tokens) => {
  const map = new Map();
  tokens.forEach((token) => {
    map.set(token, (map.get(token) || 0) + 1);
  });
  return map;
};

const cosineSimilarity = (aMap, bMap) => {
  const vocab = new Set([...aMap.keys(), ...bMap.keys()]);
  let dot = 0;
  let magA = 0;
  let magB = 0;

  vocab.forEach((word) => {
    const a = aMap.get(word) || 0;
    const b = bMap.get(word) || 0;
    dot += a * b;
    magA += a * a;
    magB += b * b;
  });

  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  if (!denom) return 0;
  return dot / denom;
};

const inferExperienceWeight = (years) => {
  if (years >= 8) return 'High';
  if (years >= 4) return 'Medium';
  return 'Low';
};

const inferConfidence = (score) => {
  if (score >= 85) return 'Strong Fit';
  if (score >= 70) return 'Good Fit';
  if (score >= 55) return 'Moderate Fit';
  return 'Needs Review';
};

const demoFreelancers = [
  {
    id: 'f1',
    name: 'Nina George',
    skills: ['React', 'Node.js', 'TypeScript', 'REST APIs'],
    experienceYears: 7,
    clientRating: 4.8,
    projectHistory: 42,
    profileText:
      'Senior full-stack engineer focused on React architecture, Node APIs, and scalable SaaS delivery.',
  },
  {
    id: 'f2',
    name: 'Arjun Menon',
    skills: ['Python', 'NLP', 'Data modeling', 'FastAPI'],
    experienceYears: 5,
    clientRating: 4.7,
    projectHistory: 31,
    profileText:
      'AI engineer building semantic ranking systems, recommendation pipelines, and data-heavy backend services.',
  },
  {
    id: 'f3',
    name: 'Leah Torres',
    skills: ['UI/UX', 'Figma', 'Design Systems', 'Frontend'],
    experienceYears: 6,
    clientRating: 4.9,
    projectHistory: 38,
    profileText:
      'Product designer collaborating with engineering teams to ship intuitive interfaces and reusable design systems.',
  },
  {
    id: 'f4',
    name: 'Victor Shah',
    skills: ['Node.js', 'PostgreSQL', 'API design', 'System design'],
    experienceYears: 9,
    clientRating: 4.6,
    projectHistory: 55,
    profileText:
      'Backend specialist with deep experience in APIs, database optimization, and distributed service reliability.',
  },
];

app.post('/api/job-matching', (req, res) => {
  try {
    const {
      jobDescription = '',
      requiredSkills = [],
      freelancers = demoFreelancers,
      filters = {},
      realtime = false,
    } = req.body || {};

    const safeFreelancers = Array.isArray(freelancers) && freelancers.length ? freelancers : demoFreelancers;

    const reqSkills = Array.isArray(requiredSkills)
      ? requiredSkills.map((skill) => String(skill).trim().toLowerCase()).filter(Boolean)
      : [];

    const jobTokens = tokenize(`${jobDescription} ${reqSkills.join(' ')}`);
    const jobVec = toFrequencyMap(jobTokens);

    const minRating = Number(filters.minRating || 0);
    const minExperience = Number(filters.minExperience || 0);
    const minProjects = Number(filters.minProjects || 0);

    const ranked = safeFreelancers
      .map((freelancer, index) => {
        const fSkills = Array.isArray(freelancer.skills)
          ? freelancer.skills.map((skill) => String(skill).trim().toLowerCase()).filter(Boolean)
          : [];

        const overlap = reqSkills.length
          ? reqSkills.filter((skill) => fSkills.includes(skill)).length / reqSkills.length
          : 0;

        const profileTokens = tokenize(
          `${freelancer.profileText || ''} ${fSkills.join(' ')} ${freelancer.experienceYears || 0}`
        );
        const profileVec = toFrequencyMap(profileTokens);
        const semanticScore = Math.round(cosineSimilarity(jobVec, profileVec) * 100);

        const skillMatch = Math.round(overlap * 100);
        const expYears = Number(freelancer.experienceYears || 0);
        const expNormalized = Math.min(expYears / 10, 1);
        const ratingNormalized = Math.min(Number(freelancer.clientRating || 0) / 5, 1);
        const projectsNormalized = Math.min(Number(freelancer.projectHistory || 0) / 50, 1);

        const liveBoost = realtime ? (Math.sin(Date.now() / 1800 + index) + 1) * 1.3 : 0;

        const total = Math.min(
          100,
          Math.round(
            semanticScore * 0.45 +
              skillMatch * 0.2 +
              expNormalized * 100 * 0.15 +
              ratingNormalized * 100 * 0.1 +
              projectsNormalized * 100 * 0.1 +
              liveBoost
          )
        );

        return {
          id: freelancer.id,
          name: freelancer.name,
          role: freelancer.role || 'Freelancer',
          matchScore: total,
          semanticMatchScore: semanticScore,
          skillMatch,
          experienceWeight: inferExperienceWeight(expYears),
          confidenceLevel: inferConfidence(total),
          clientRating: Number(freelancer.clientRating || 0),
          projectHistory: Number(freelancer.projectHistory || 0),
          skills: fSkills,
        };
      })
      .filter(
        (item) =>
          item.clientRating >= minRating &&
          (item.experienceWeight === 'High' || minExperience < 8
            ? true
            : item.experienceWeight === 'Medium' || minExperience < 4) &&
          item.projectHistory >= minProjects
      )
      .sort((a, b) => b.matchScore - a.matchScore);

    const suggestions = ranked.slice(0, 3).map((item) => `${item.name} (${item.matchScore}%)`);

    return res.json({
      message: 'Job matching completed.',
      sampleOutput: {
        matchScore: '87%',
        skillMatch: '92%',
        experienceWeight: 'High',
        confidenceLevel: 'Strong Fit',
      },
      suggestions,
      rankings: ranked,
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return res.status(500).json({ message: 'Server error during job matching.' });
  }
});
app.listen(PORT, () => {
  console.log(`AutoHire backend listening on port ${PORT}`);
});
