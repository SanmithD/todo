# Employee Dashboard Management

A full‑stack **MERN** employee management dashboard styled with **Tailwind CSS** and **daisyUI**, global state with **Zustand**, and secure auth using **JWT** + **bcrypt**.

<p align="center">
  <img width="1340" height="621" alt="Image" src="https://github.com/user-attachments/assets/75b68056-a589-4695-b04e-d9a15fe24ac4" />
</p>

---

## Repository

* GitHub: [https://github.com/SanmithD/CODECRAFT\_FS\_2.git](https://github.com/SanmithD/CODECRAFT_FS_2.git)

## Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, daisyUI, Zustand
* **Backend:** Node.js, Express.js, MongoDB (Atlas), Mongoose
* **Auth & Security:** JWT (access tokens), bcrypt (password hashing), CORS
* **HTTP:** Axios

## Features

* 🔒 **Secure Auth with JWT** (register, login, protected routes)
* 👤 **Create** employee
* ✏️ **Update** employee
* 📄 **Get** employees (list)
* 🗑️ **Delete** employee
* 💾 Persisted data in MongoDB Atlas

---

## Project Structure (suggested)

```
CODECRAFT_FS_2/
├─ client/                # React + Vite app
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ store/          # Zustand stores
│  │  ├─ lib/axios.js    # axiosInstance
│  │  └─ main.jsx
│  └─ index.html
└─ server/                # Express API
   ├─ src/
   │  ├─ models/         # Mongoose schemas
   │  ├─ routes/         # /auth, /employee
   │  ├─ controllers/
   │  ├─ middleware/     # auth middleware (JWT verify)
   │  ├─ config/ 
   │  ├─ utils/ 
   │  └─ server.js
   └─ package.json
```

---

## Getting Started

### Prerequisites

* Node.js ≥ 18
* MongoDB Atlas connection string

### 1) Clone

```bash
git clone https://github.com/SanmithD/CODECRAFT_FS_2.git
cd CODECRAFT_FS_2
```

### 2) Install & Run

#### Server

```bash
cd server
npm install
npm run dev   # or: npm start
```

#### Client

```bash
cd ../client
npm install
npm run dev
```
---

## Frontend Notes

* **Zustand** manages global UI + data state (loading flags, lists, etc.).
* **daisyUI** components for tables, modals, buttons; Tailwind for utility classes.
* **Loader** component uses lucide‑react icon + Tailwind `animate-spin`.
* **Responsive table:** sticky header, scrollable body.

---

## Security

* Passwords hashed with **bcrypt** before storing.
* JWT signed with **JWT\_SECRET**; verify in auth middleware.
* Set **CORS** to only allow your client origin.
* Consider **Helmet** & **rate limiting** in production.
---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/awesome`
3. Commit changes: `git commit -m "feat: add awesome"`
4. Push and open a PR
