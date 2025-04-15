# 🩺 HealthSync

<div align="center">
  <h3>🚀 A Next-Generation Healthcare Management Platform</h3>
  <p>
💡 Revolutionizing patient-doctor interactions, 🏥 optimizing hospital operations, and ❤️ enhancing patient care through AI-powered intelligence.
</p>
  
  [![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=flat-square&logo=next.js)](https://nextjs.org/)

 
</div>

---

## 📋 Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [AI-Powered Capabilities](#ai-powered-capabilities)
- [Patient-Centered Tools](#patient-centered-tools)
- [Hospital Management](#hospital-management)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


---

## 🔍 Overview

HealthSync is a comprehensive healthcare platform built with modern web technologies, designed to connect patients with healthcare providers seamlessly while providing powerful tools for hospitals to manage their operations efficiently.

---

## 💫 Core Features

### 🏥 Doctor-Patient Consultation Booking
- *Online & Offline Appointments*: Schedule both in-person and virtual consultations
- *Video Call Integration*: Secure, HIPAA-compliant video consultations
- *Smart Scheduling*: AI-powered appointment suggestions based on urgency and availability

![Video Call](https://github.com/DHRUVKANDPAL/srmXhealthsync/blob/main/images/video_call.jpg)
Secure video consultation interface

### 📌 OPD Queuing System
- *Real-time Queue Updates*: Live tracking of outpatient department waiting times
- *Digital Queue Management*: Paperless queue system with SMS notifications
- *Priority-based Sorting*: Emergency cases automatically prioritized

<div style="display: flex; gap: 10px;">
  <div style="flex: 1;">
    <img src="https://github.com/DHRUVKANDPAL/srmXhealthsync/blob/main/images/OPD_queue.jpg" alt="OPD Queue (Hospitals)">
    <p><em>Hospital queue management dashboard</em></p>
  </div>
  <div style="flex: 1;">
    <img src="https://github.com/DHRUVKANDPAL/srmXhealthsync/blob/main/images/OPD_queue_2.jpg" alt="OPD Queue (Doctors)">
    <p><em>Doctor's queue management interface</em></p>
  </div>
</div>

---

## 🤖 AI-Powered Capabilities

### 🔎 Semantic Search
- *Multilingual Symptom Search*: Search medical conditions in any language
- *Natural Language Processing*: AI interprets symptoms and suggests relevant results
- *Context-Aware Results*: Personalized search results based on patient history

<div style="display: flex; gap: 10px;">
  <div style="flex: 1;">
    <img src="https://github.com/DHRUVKANDPAL/srmXhealthsync/blob/main/images/english_symptom.jpg" alt="English Symptom Search">
    <p><em>Symptom search in English</em></p>
  </div>
  <div style="flex: 1;">
    <img src="https://github.com/DHRUVKANDPAL/srmXhealthsync/blob/main/images/tamil_symptom.jpg" alt="Tamil Symptom Search">
    <p><em>Symptom search in Tamil</em></p>
  </div>
</div>

### 🤖 Curo AI - Medical Assistant

Intelligent healthcare assistance available in two tiers:

| *CuroBeat* (Premium) | *CuroFlash* (Free) |
|------------------------|----------------------|
| ✅ Structured medical data generation | ✅ Real-time medical information stream |
| ✅ Personalized health insights | ✅ General health education |
| ✅ Integration with medical records | ✅ Basic symptom assessment |
| ✅ Advanced analytics and trends | ✅ Public health resources |

![CuroBeat](https://github.com/DHRUVKANDPAL/srmXhealthsync/blob/main/images/curo_beat.jpg)
CuroBeat interface for structured medical data analysis

![CuroFlash](https://github.com/DHRUVKANDPAL/srmXhealthsync/blob/main/images/curo_flash.jpg)
CuroFlash providing real-time streaming medical information

### 🏅 CuroHero (Coming Soon)
- *Human Medical Assistants*: Connect with trained healthcare professionals
- *Specialized Support*: Assistance for elderly, chronic conditions, and post-surgery recovery
- *24/7 Availability*: Round-the-clock access to medical guidance

---

## 👤 Patient-Centered Tools

### 📂 Patient History & Digital Records
- *Unified Medical Records*: Comprehensive storage of medical history
- *Prescription Management*: Digital generation and delivery of prescriptions
- *Document Sharing*: Secure sharing of reports with authorized healthcare providers

![Patient Profile](https://github.com/DHRUVKANDPAL/srmXhealthsync/blob/main/images/patient_profile.jpg)
Patient profile showing comprehensive medical history and records

### ⏰ Appointment & Medicine Reminders
- *Smart Notifications*: Timely reminders for appointments and medications
- *Dosage Tracking*: Monitor medication adherence and schedule
- *Follow-up Reminders*: Automated follow-up scheduling suggestions

### 🌎 Multilingual Support
- *Google Translate Integration*: Platform available in multiple languages
- *Cultural Adaptations*: Region-specific health information and guidance
- *Voice Input*: Multilingual voice recognition for accessibility

![Multilingual Dashboard](https://github.com/DHRUVKANDPAL/srmXhealthsync/blob/main/images/multilingual_dashboard_main_2.jpg)
Main dashboard with multilingual support enabled

---

## 🏨 Hospital Management

### 🚨 Emergency Notification System (Coming Soon)
- *Critical Alerts*: Instant notifications for emergencies
- *Family Coordination*: Automated updates to designated family members
- *First Responder Integration*: Direct communication with emergency services

### 🏨 Bed Allocation & Management
- *Real-time Availability*: Live tracking of hospital bed occupancy
- *Optimized Allocation*: AI-driven bed assignment based on patient needs
- *Predictive Occupancy*: Forecasting of bed requirements for better planning

![Room & Bed Availability](https://github.com/DHRUVKANDPAL/srmXhealthsync/blob/main/images/room%20and%20bed%20availability.jpg)
Hospital room and bed availability management dashboard

### 💳 Integrated Billing System
- *Transparent Pricing*: Clear breakdown of medical costs
- *Multiple Payment Options*: Online, offline, and insurance processing
- *Automated Insurance Claims*: Streamlined submission to insurance providers

---

## 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| *Frontend* | Next.js, TypeScript, ShadCN UI |
| *UI/UX* | Framer Motion, Lucide React |
| *Backend* | Node.js, Express.js |
| *Database* | PostGreSql |
| *Authentication* | Lucia-Auth |
| *AI/ML* | Gemini API, Python |
| *DevOps* | Vercel |

---

## 🚀 Installation

### Prerequisites
- Node.js (v16+)
- Yarn or npm
- Environment variables (see .env.example)

### Setup Instructions

1. *Clone the repository*
   bash
   git clone https://github.com/your-repo/healthsync.git
   cd healthsync
   

2. *Install dependencies*
   bash
   yarn install
   # or
   npm install
   

3. *Configure environment variables*
   bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   

4. *Run the development server*
   bash
   yarn dev
   # or
   npm run dev
   

5. *Open your browser*
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🤝 Contributing

We welcome contributions to HealthSync! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

HealthSync is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤ for healthcare professionals and patients worldwide</p>
  <p>© 2025 HealthSync Team</p>
</div>
