# ConsentShield

> **Imagine Cup 2026 Submission**  
> A machine-readable consent registry and verification system for AI training images.

![ConsentShield Banner](https://via.placeholder.com/1200x300?text=ConsentShield+Banner)

## 🚨 Essential Disclaimer
**ConsentShield does not block AI image generation, prevent deepfakes, or enforce compliance.**  
It provides a machine-readable consent signal for AI training datasets. It enables ethical AI model trainers to respect creator intent, but it cannot physically preventing misuse.

---

## 📖 Problem Statement
AI models consume vast amounts of image data, often without creator consent. Creators lack a standardized way to signal their usage preferences ("Do not train", "Platform only", etc.) in a way that travels with the image content itself, even if metadata is stripped.

## 💡 Solution
ConsentShield creates a **perceptual hash** (visual fingerprint) of an image and stores it in a public registry along with the creator's policy. AI labs and platforms can query this registry using only the image content to verify if it is authorized for training.

### What it DOES:
- ✅ Registers creator intent for AI training usage.
- ✅ Allows verification of visual similar images (robust to resizing/compression).
- ✅ Provides a permanent, public ledger of consent claims.

### What it DOES NOT DO:
- ❌ Block AI image generation (this requires OS/Hardware level controls).
- ❌ Prevent deepfakes.
- ❌ Provide legal guarantees or copyright enforcement.

---

## 🏗 Architecture

```ascii
┌─────────────────────────────────────────────────────────────┐
│                    ConsentShield MVP                         │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React + Vite)     │ Backend (Express.js)         │
│  ┌─────────────────────────┐ │ ┌──────────────────────────┐ │
│  │ Creator Console         │ │ │ API Server               │ │
│  │ - Image Upload         │◄┼►│ - /api/register-consent  │ │
│  │ - Policy Selection      │ │ │ - /api/verify-consent    │ │
│  │                         │ │ │                          │ │
│  │ Verification Lab        │ │ │ Neural/Perceptual Hash   │ │
│  │ - Check Image Status    │ │ │ (Sharp + dHash)          │ │
│  └─────────────────────────┘ │ └──────────────────────────┘ │
│                              │ ┌──────────────────────────┐ │
│                              │ │ SQLite Registry DB       │ │
│                              │ │ {hash, policy, ts}       │ │
│                              │ └──────────────────────────┘ │
└──────────────────────────────┴──────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1.  **Clone the repository** (if applicable) or navigate to the project folder.
2.  **Install dependencies**:
    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```

### Running the App
You need to run both the backend and frontend servers.

1.  **Start Backend** (runs on port 3001):
    ```bash
    cd backend
    npm start
    # or
    node server.js
    ```

2.  **Start Frontend** (runs on port 5173):
    ```bash
    cd frontend
    npm run dev
    ```

3.  Open browser to `http://localhost:5173`

---

## 🛡 Consent Policies
- **AI_ALLOWED**: Image may be freely used for AI training datasets.
- **AI_RESTRICTED**: Image must NOT be used for generative AI training.
- **PLATFORM_ONLY**: Usage limited to the hosting platform's internal non-generative features.

## 🛠 Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, Multer.
- **Core Logic**: Sharp (Image processing), dHash (Perceptual hashing).
- **Database**: SQLite (better-sqlite3).
- **Design System**: IBM Plex Sans + JetBrains Mono.

---

*Verified for Imagine Cup 2026 - Demo Release*
