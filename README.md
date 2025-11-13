# Entro - A Full-Stack E-Commerce Platform

![Entro Homepage Screenshot](https://qnr34aa1vn.ufs.sh/f/x81VdwhEWe9YvDguviATbYJwVamzLQPW9CSMXylhpfZUndOF)

A feature-rich, Full-Stack E-Commerce Application built with Next.js, TypeScript and Prisma.
The Project showcases a complete shopping experience, from Product discovery to User Account Management and includes a sophisticated "Demo Mode" for a secure and cost-effective portfolio showcase.

**Live Demo**: [https://ecommerce.stefan-luellmann.com/](https://ecommerce.stefan-luellmann.com/)

---

## Key Features

* **Complete Shopping Experience:** Browse products on the homepage, use a detailed search page with multi-faceted filtering (category, brand, price, rating) and view individual product details.
* **Persistent Cart & Wishlist:** Guest users carts and wishlists are saved to `localStorage`. Upon login, this data is seamlessly synced and merged with their account's database records.
* **Secure Authentication:** Full user authentication flow (register, login, logout) implemented with NextAuth.js, including credential validation and session management.
* **Comprehensive User Dashboard:** A client-side rendered dashboard where authenticated users can:
    * View their account homepage.
    * Update their personal profile information.
    * Manage payment methods.
    * View and manage their cart and wishlist.
    * (Coming Soon) View and manage their order history.
* **Architectural Excellence:**
    * **"Demo Mode":** A project-wide flag that switches the application between a "Live Mode" (connected to a real PostgreSQL database) and a "Demo Mode".
    * In Demo Mode, all database writes are intercepted and simulated using client-side state (`localStorage` and in-memory variables), preserving backend resources while providing a fully interactive user experience.
    * **Server-First with Next.js App Router:** Utilizes Server Components for fast initial page loads and data fetching, while isolating interactivity in Client Components for a modern, performant architecture.
    * **Centralized Data Layer:** All server-side Prisma queries are centralized and cached for efficiency.
    * **Component Architecture:** Adheres to the "Server-First" paradigm by using Server Components for data fetching and static content, while cleanly isolating interactive logic into small, performant Client Components.
 
---

## Tech Stack
### Frontend
* **Framework:** [Next.js](https://nextjs.org/) 14 (App Router)
* **Language:** [TypeScript](https://www.typescript.org/)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand) (for global cart/wishlist), React Hooks (`useState`, `useContext`, `useMemo`, etc.)
* **Styling:** [TailwindCSS](https://tailwindcss.com/)
* **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
* **Data Fetching (Client):** [SWR](https://swr.vercel.app/)
* **UI/Animation:** [Embla Carousel](https://www.embla-carousel.com/), [clsx](https://github.com/lukeed/clsx)

### Backend
* **Runtime:** [Node.js](https://nodejs.org/en)
* **API Layer:** Next.js API Routes / Route Handlers
* **ORM:** [Prisma](https://www.prisma.io/)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (hosted on [Supabase](https://supabase.com/))
* **Authentication:** [NextAuth.js](https://next-auth.js.org/)
* **File Storage:** [UploadThing](https://uploadthing.com/) (for Product Images)

---

## Getting Started
To get a local copy up and running, follow these steps.

### Prerequisites
- Node.js v18+
- npm or yarn

### Running Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com/OneDev49/stefan-luellmann-ecommerce-app/
   cd stefan-luellmann-ecommerce-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   Create a `.env.local` file in the root of the project and add the necessary variables (DATABASE_URL, NEXTAUTH_SECRET, etc.). You can use the `.env.example` file as a template.
   ```env
   # Example .env.local
   DATABASE_URL="..."
   NEXTAUTH_SECRET="..."

   # Set bycrypt Hashing Cost Factor
   HASHING_COST_FACTOR=10

   # Set to true to run the app without a database connection for most features
   NEXT_PUBLIC_DEMO_MODE=true
   ```

4. **Push the database schema:**
   ```bash
   npx prisma db push
   ```

5. **Seed the database with initial data:**
   ```bash
   npx prisma db seed
   ```

6. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Folder Structure Overview
* /public - Directory for favicon, project logo and fonts
* /prisma - Prisma Directory with seed.ts and seed-data.ts for products
* /src - Next.js Project Directory
  * /app - Next.js App Router Pages
  * /components - Reusable UI components
  * /config - Project-wide config files
  * /hooks - Custom Project hooks
  * /lib - Helpers for the Project
  * /store - Zustand stores (Cart/Wishlist)
  * /types - Type definitions of the Project

---

## Contact
Stefan Lüllmann - [hallo@stefan-luellmann.com](mailto:hallo@stefan-luellmann.com)

Project Link - [https://github.com/OneDev49/stefan-luellmann-ecommerce-app/](https://github.com/OneDev49/stefan-luellmann-ecommerce-app/)

Personal Portfolio & Website - [https://stefan-luellmann.com/](https://stefan-luellmann.com/)

---

## Future Improvements
* Implement real order history and checkout flow with a payment provider like Stripe.
* Add the ability for users to write and view product reviews.
* Build an admin dashboard for managing products, users and orders.

---

## Licensing
The source code for this project is licensed under the [MIT License](LICENSE)

All other assets, including but not limited to images, logos and written content are my personal property.
They are **not** licensed for reuse without my explicit written permission.

### Third-Party Assets
- Technology logos are trademarks of their respective owners.
- Brand logos are trademarks of their respective owners.
- Icons are used from [Font Awesome](https://fontawesome.com/license) and are subject to their respective licenses.

---

## Disclaimer
This is a non-commercial portfolio project. It is not a real E-Commerce Store and no Products can be purchased.

**All products, brand names (e.g. Zentheon, AetherFlux), descriptions, and prices listed on this website are entirely fictional** and created for demonstration purposes only. 
They are not affiliated with any real-world companies or products. 
Product images are AI-generated and used as placeholders. 
All trademarks are the property of their respective owners.
