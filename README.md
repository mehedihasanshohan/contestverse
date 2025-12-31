# ContestHub - Frontend (Client)

Live Site: [https://contestverse-shohan.netlify.app](#)

ContestHub is a modern, user-friendly contest management platform frontend built with **React**, **TailwindCSS,DaisyUI** , and **TanStack Query** for data fetching. Users can browse, join, and participate in creative contests. This frontend works seamlessly with our Node.js backend and supports authentication, payments, and role-based dashboards.

---

## **Features**

1. Fully responsive UI (mobile, tablet, desktop)
2. Role-based dashboards for **Admin**, **Contest Creator**, and **Normal User**
3. Browse all contests and filter by type
4. Private contest details pages with secure access
5. Search contests by type with backend integration
6. Payment integration for contest registration
7. Submit tasks directly through the contest page
8. Dashboard charts and statistics for win/participation percentage
9. Dark/Light theme toggle saved in `localStorage`
10. Sweet alerts & toasts for all CRUD operations
11. Leaderboard page dynamically ranking users by contest wins
12. Extra creative pages/routes (mention your custom ones)
13. Clean, modular, and reusable React components
14. JWT-based secure API access
15. Pagination for tables (10 items per page)

---

## **Tech Stack**

- **React** (frontend framework)
- **TailwindCSS & DaisyUI** (UI/Styling)
- **React Router DOM** (Routing)
- **TanStack Query** (Data fetching & caching)
- **React Hook Form** (Form handling)
- **Axios** (API requests)
- **JWT** (Authentication)
- **Sweet Alert / Toast** (Notifications)
- **LocalStorage** (Theme preference persistence)
- **Vercel  & Netlify** (Hosting)

---

## **Dependencies**
- axios
- react-router-dom
- react-hook-form
- sweetalert2
- react-hot-toast
- framer-motion
- lucide-react
- react-datepicker

---

## **Setup & Installation**

1. Clone the repository:

```bash
git clone https://github.com/mehedihasanshohan/contestverse.git
cd contestverse
npm install
npm run dev
