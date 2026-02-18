🚀 Work Track

A full-stack task management application that allows users to create, update, organize, and track tasks with priority and dynamic status management.

Built with a modern React frontend and a secure ASP.NET Core Web API backend.

✨ Features:

🔐 AUTHENTICATION

📝 User Registration & Login

🔑 JWT-based authentication

💾 Persistent login via localStorage

🛡 Protected routes with route guards

📊 DASHBOARD

📌 Total Tasks counter

✅ Completed Tasks counter

⏳ Pending Tasks counter

📜 Recent activity feed

📱 Fully responsive status cards

🗂 TASK MANAGEMENT

Create Tasks With:    🏷 Title

                      📝 Description (Optional)

                      ⚡ Priority (Low / Medium / High)

                       📅 Due Date

Actions:   ✏ Edit tasks

           🗑 Delete tasks

           🔄 Toggle completion

           📊 Auto-calculated status

Dynamic Status Calculation:    💤 Not Started

                               🚀 In Progress

                               📅 Due Today

                               🔴 Overdue

                               ✅ Completed

Organization

🔝 Priority-based sorting

📆 Grouped by:   Today

                  Yesterday

                  A Week Ago

                  Older

🔎 FILTERING & SEARCH

🔍 Search by title

📂 Filter by:   All

                Active

                Completed

🎯 Filter by priority

📱 RESPONSIVE DESIGN

💻 Desktop → Table-based layout

📱 Mobile → Card-based layout

🔽 Expandable descriptions

🎨 Interactive UI elements

✨ Smooth transitions

🛠 Tech Stack:

🎨 FRONTEND

⚛ React (Vite)

🎨 Tailwind CSS

🎯 Lucide React Icons

🌐 Context API (State Management)

🧠 BACKEND

🟣 ASP.NET Core Web API

🗄 Entity Framework Core

🔐 JWT Authentication

🛢 MySQL (Development)

🐘 PostgreSQL (Production)

🌍 Deployment:

🚀 FRONTEND (Vercel)

Hosted on Vercel

Automatic CI/CD from GitHub

Environment variables configured in Vercel

Production build using Vite

⚙ BACKEND (Render)

Hosted on Render

ASP.NET Core Web API deployment

Connected to managed PostgreSQL database

Secure environment variable configuration

🗄 DATABASE

Entity Framework Core Migrations

Managed PostgreSQL (Production)

Migration-based schema control

⚡ Challenges & Solutions:

1️⃣ 🔐 Authentication State Lost on Refresh

🚧 Challenge

Refreshing the page after login caused loss of authentication state.

✅ Solution

Stored JWT token in localStorage

Implemented auth restoration inside AuthProvider

Created /api/users/me endpoint

Standardized login response:  {

                                "user": { ... },
                                 "token": "..."
                              }


Result: Persistent authentication across refreshes.

2️⃣ 🔄 Frontend–Backend Route Mismatch

🚧 Challenge

Frontend called /api/auth/* while backend exposed /api/users/*.

✅ Solution

Standardized route naming

Updated frontend API paths

Centralized base URL with:

VITE_API_BASE_URL


Improved deployment flexibility.

3️⃣ 📊 Dashboard Stats Not Updating

🚧 Challenge

Task updates didn’t refresh dashboard counters.

✅ Solution

localStorage.setItem("refreshDashboardStats", Date.now().toString());


Dashboard listens and re-fetches stats automatically.

Result: Real-time UI updates without global state libraries.

4️⃣ 📱 Mobile Responsiveness (Table → Card Conversion)

🚧 Challenge

Desktop table layout broke on mobile screens.

✅ Solution

Created separate mobile card layout

Used Tailwind breakpoints (md:hidden, hidden md:table)

Preserved all desktop functionality

Added visual indicators for expandable descriptions

Result: Fully responsive UI without horizontal scrolling.

5️⃣ 📊 Dynamic Status Calculation

🚧 Challenge

Status needed to update automatically based on:

Due date

Completion state

Current date

✅ Solution

Created centralized helper:

getTaskStatus(task)


Eliminated need to store redundant status in database.

6️⃣ 🛢 Database Migration Error (Production)

🚧 Challenge

Unknown column 'CompletedAt'

✅ Solution

Created EF Core migration

Applied migration to production database

Synced schema before redeployment

7️⃣ 🌍 Deployment Configuration Issues

🚧 Challenge

Environment variables and DB connections differed between local and production.

✅ Solution

Configured .env in Vercel

Set secure environment variables in Render

Enabled CORS for frontend domain

Connected to managed PostgreSQL

8️⃣ ⏳ UX Feedback for Slow API Calls

🚧 Challenge

No user feedback during login or task actions.

✅ Solution

Added button-level loading spinners

Disabled buttons during async actions

Displayed error messages

Prevented duplicate submissions

Result: Improved user experience and perceived performance.

🚀 Work Track

A full-stack task management application that allows users to create, update, organize, and track tasks with priority and dynamic status management.

Built with a modern React frontend and a secure ASP.NET Core Web API backend.

✨ Features
🔐 Authentication

📝 User Registration & Login

🔑 JWT-based authentication

💾 Persistent login via localStorage

🛡 Protected routes with route guards

📊 Dashboard

📌 Total Tasks counter

✅ Completed Tasks counter

⏳ Pending Tasks counter

📜 Recent activity feed

📱 Fully responsive status cards

🗂 Task Management
Create Tasks With:

🏷 Title

📝 Description (Optional)

⚡ Priority (Low / Medium / High)

📅 Due Date

Actions

✏ Edit tasks

🗑 Delete tasks

🔄 Toggle completion

📊 Auto-calculated status

Dynamic Status Calculation

💤 Not Started

🚀 In Progress

📅 Due Today

🔴 Overdue

✅ Completed

Organization

🔝 Priority-based sorting

📆 Grouped by:

Today

Yesterday

A Week Ago

Older

🔎 Filtering & Search

🔍 Search by title

📂 Filter by:

All

Active

Completed

🎯 Filter by priority

📱 Responsive Design

💻 Desktop → Table-based layout

📱 Mobile → Card-based layout

🔽 Expandable descriptions

🎨 Interactive UI elements

✨ Smooth transitions

🛠 Tech Stack
🎨 Frontend

⚛ React (Vite)

🎨 Tailwind CSS

🎯 Lucide React Icons

🌐 Context API (State Management)

🧠 Backend

🟣 ASP.NET Core Web API

🗄 Entity Framework Core

🔐 JWT Authentication

🛢 MySQL (Development)

🐘 PostgreSQL (Production)

🌍 Deployment
🚀 Frontend (Vercel)

Hosted on Vercel

Automatic CI/CD from GitHub

Environment variables configured in Vercel

Production build using Vite

⚙ Backend (Render)

Hosted on Render

ASP.NET Core Web API deployment

Connected to managed PostgreSQL database

Secure environment variable configuration

🗄 Database

Entity Framework Core Migrations

Managed PostgreSQL (Production)

Migration-based schema control

⚡ Challenges & Solutions
1️⃣ 🔐 Authentication State Lost on Refresh
🚧 Challenge

Refreshing the page after login caused loss of authentication state.

✅ Solution

Stored JWT token in localStorage

Implemented auth restoration inside AuthProvider

Created /api/users/me endpoint

Standardized login response:

{
  "user": { ... },
  "token": "..."
}


Result: Persistent authentication across refreshes.

2️⃣ 🔄 Frontend–Backend Route Mismatch
🚧 Challenge

Frontend called /api/auth/* while backend exposed /api/users/*.

✅ Solution

Standardized route naming

Updated frontend API paths

Centralized base URL with:

VITE_API_BASE_URL


Improved deployment flexibility.

3️⃣ 📊 Dashboard Stats Not Updating
🚧 Challenge

Task updates didn’t refresh dashboard counters.

✅ Solution
localStorage.setItem("refreshDashboardStats", Date.now().toString());


Dashboard listens and re-fetches stats automatically.

Result: Real-time UI updates without global state libraries.

4️⃣ 📱 Mobile Responsiveness (Table → Card Conversion)
🚧 Challenge

Desktop table layout broke on mobile screens.

✅ Solution

Created separate mobile card layout

Used Tailwind breakpoints (md:hidden, hidden md:table)

Preserved all desktop functionality

Added visual indicators for expandable descriptions

Result: Fully responsive UI without horizontal scrolling.

5️⃣ 📊 Dynamic Status Calculation
🚧 Challenge

Status needed to update automatically based on:

Due date

Completion state

Current date

✅ Solution

Created centralized helper:

getTaskStatus(task)


Eliminated need to store redundant status in database.

6️⃣ 🛢 Database Migration Error (Production)
🚧 Challenge
Unknown column 'CompletedAt'

✅ Solution

Created EF Core migration

Applied migration to production database

Synced schema before redeployment

7️⃣ 🌍 Deployment Configuration Issues
🚧 Challenge

Environment variables and DB connections differed between local and production.

✅ Solution

Configured .env in Vercel

Set secure environment variables in Render

Enabled CORS for frontend domain

Connected to managed PostgreSQL

8️⃣ ⏳ UX Feedback for Slow API Calls

🚧 Challenge

No user feedback during login or task actions.

✅ Solution

Added button-level loading spinners

Disabled buttons during async actions

Displayed error messages

Prevented duplicate submissions

Result: Improved user experience and perceived performance.

9️⃣ 🌐 CORS Policy Error (Production)

🚧 Challenge

After deploying:

Frontend (Vercel)

Backend (Render)

The browser blocked API requests with a CORS error:

Access to fetch at 'https://api...' from origin 'https://your-vercel-app.vercel.app' 
has been blocked by CORS policy


This happened because the backend did not allow requests from the frontend production domain.

✅ Solution

Configured CORS properly inside ASP.NET Core:

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://localhost:5173",                 // local dev
                "https://your-vercel-app.vercel.app"     // production
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

app.UseCors("AllowFrontend");

🔒 Improvements Made

Allowed specific origins instead of AllowAnyOrigin()

Enabled headers & methods

Ensured UseCors() was placed before UseAuthorization()

🎯 Result

API calls worked correctly in production

No more browser CORS blocks

Secure cross-origin configuration.

👨‍💻 Author

Anjum S
