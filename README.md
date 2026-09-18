# Bagavathy M — Professional Portfolio

A premium, responsive full-stack portfolio built with HTML5, CSS3, Vanilla JavaScript, Node.js, Express.js and MySQL.

## 1. Features

- Premium responsive portfolio UI
- Dynamic projects, experience and certifications from MySQL
- Project category filtering and details modal
- Contact form stored in MySQL
- REST APIs
- Helmet, CORS, rate limiting and parameterized SQL
- Accessibility and reduced-motion support
- SEO metadata, favicon, robots.txt and sitemap
- No fabricated achievements, links or metrics

## 2. Tech Stack

Frontend: HTML, CSS, Vanilla JavaScript  
Backend: Node.js, Express.js  
Database: MySQL / mysql2

## 3. Folder Structure

```text
bagavathy-portfolio/
├── frontend/
├── backend/
├── database/
├── README.md
├── .gitignore
├── .env.example
└── package.json
```

## 4. Requirements

- Node.js 18+ recommended
- MySQL 8+
- VS Code recommended

## 5. MySQL Setup

Open MySQL Workbench or the MySQL CLI.

Run:

```sql
SOURCE /absolute/path/to/bagavathy-portfolio/database/schema.sql;
SOURCE /absolute/path/to/bagavathy-portfolio/database/seed.sql;
```

Or paste both SQL files into MySQL Workbench and execute them.

## 6. Environment Variables

Copy:

```text
backend/.env.example
```

to:

```text
backend/.env
```

Then set your MySQL credentials.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bagavathy_portfolio
CORS_ORIGIN=http://localhost:5500
```

Never commit `.env`.

## 7. Backend Installation

```bash
cd backend
npm install
npm start
```

The API runs at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## 8. Frontend Setup

The simplest beginner-friendly option is VS Code Live Server.

Open the `frontend` folder and launch `index.html` using Live Server. The usual URL is:

```text
http://localhost:5500
```

If your Live Server uses another port, update `CORS_ORIGIN` in `backend/.env`.

## 9. API Endpoints

```text
GET  /api/health
GET  /api/projects
GET  /api/projects/:slug
GET  /api/experiences
GET  /api/certifications
POST /api/contact
```

Successful responses use:

```json
{"success":true,"data":[]}
```

Errors use:

```json
{"success":false,"message":"Something went wrong"}
```

## 10. Add Projects

Insert a row into the `projects` table. Example:

```sql
INSERT INTO projects
(title,slug,short_description,description,category,technologies,featured)
VALUES
('My New Project','my-new-project','Short description','Full description',
'Mini Projects','Python, HTML, CSS',0);
```

Do not add fake metrics or links.

## 11. Change Profile Photo

Put your real profile image here:

```text
frontend/assets/images/profile.jpg
```

The website automatically shows a BM placeholder if the image is missing.

## 12. Replace Resume

Put your PDF here:

```text
frontend/assets/resume.pdf
```

The View Resume and Download buttons will then work.

## 13. Add Certifications

Insert verified certifications into the `certifications` table:

```sql
INSERT INTO certifications (title,issuer,issue_date,credential_url)
VALUES ('Your Real Certification','Issuer','2026','https://verified-url.example');
```

## 14. Add Experience

Insert verified experience into `experiences`. If there is no verified experience, the site shows an honest empty state.

## 15. Add GitHub

The exact GitHub URL was not provided, so no fake GitHub link is displayed. Add your verified URL in:

```text
frontend/js/main.js
```

when ready, and/or add GitHub URLs to project rows.

## 16. Deployment

### Backend

Deploy the Node/Express backend to a Node-compatible service. Set production environment variables and use a managed MySQL database.

### Frontend

Deploy the `frontend` folder to a static hosting provider.

Before production, change:

```env
CORS_ORIGIN=https://your-real-frontend-domain.example
```

and set the frontend API base to your real backend URL in `frontend/js/api.js`.

## 17. Troubleshooting

**Projects do not load**
- Confirm MySQL is running.
- Confirm `backend/.env` values.
- Run `npm start` from `backend`.
- Open `http://localhost:5000/api/health`.
- Check browser console/network errors.

**CORS error**
- Make sure `CORS_ORIGIN` exactly matches the frontend origin.

**Contact form fails**
- Confirm the `contact_messages` table exists.
- Confirm the backend is running.
- Check the browser Network tab.

**Profile image missing**
- Confirm the file is exactly:
  `frontend/assets/images/profile.jpg`

**Resume missing**
- Confirm the file is exactly:
  `frontend/assets/resume.pdf`

## 18. Important Content Policy for the Portfolio

Only publish achievements, certifications, roles, metrics, GitHub links, demos and employment details that are true and verifiable. The seeded content intentionally avoids inventing these details.
