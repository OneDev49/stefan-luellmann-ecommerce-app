# Full-Stack E-Commerce Platform

This is a complete, feature-rich E-Commerce Application built from the ground up with a modern, type-safe technology stack. The Project serves as a comprehensive demonstration of my Full-Stack Development capabilities, from Database design to a performant, server-rendered Frontend.

---

## Core Features

- **Full-Stack Architecture:** Built with Next.js App Router, leveraging Server Components for data fetching and API Routes for backend logic.
- **User Authentication:** Secure user registration, login and session management implemented with NextAuth.js.
- **Product Catalog:** A complete product system with categories, search and detailed product pages.
- **Presistent Shopping Cart:** Client-side cart state managed with Zustand, synchronized with the database for authenticated users.
- **Complex Business Logic:** Features a custom **PC Builder** interface with real-time component compatibility validation.
- **Database & ORM:** Powered by a PostgreSQL database managed with the type-safe Prisma ORM.

---

## Tech Stack

| Category       | Technology                      |
| -------------- | ------------------------------- |
| **Framework**  | Next.js 14 (App Router)         |
| **Language**   | TypeScript                      |
| **Styling**    | Tailwind CSS                    |
| **Database**   | PostgreSQL (hosted on Supabase) |
| **ORM**        | Prisma                          |
| **Auth**       | NextAuth.js                     |
| **State Mgt.** | Zustand                         |
| **Deployment** | Vercel                          |

---

## Running Locally

To get a local copy up and running, follow these steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A local PostgreSQL database or free Supabase project

### Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/OneDev49/stefan-luellmann-ecommerce-app
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd stefan-luellmann-ecommerce-app
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Set up environment variables:**

    - Create a `.env` file in the project root.
    - Populate the `.env` file with your database connection string (`DATABASE_URL`, `DIRECT_URL`) and NextAuth.js secret.

5.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

6.  **(Optional) Seed the database:**

    ```bash
    npx prisma db seed
    ```

7.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contact

Stefan Lüllmann - [hallo@nordwebtec.com](mailto:hallo@nordwebtec.com)

Project Link: [https://github.com/OneDev49/stefan-luellmann-ecommerce-app](https://github.com/OneDev49/stefan-luellmann-ecommerce-app)

## Licensing

The source code for this project is licensed under the [MIT License](LICENSE).

All other assets, including but not limited to images, logos, and written content (blog posts, case studies), are my personal property.
They are **not** licensed for reuse without my explicit written permission.

### Third-Party Assets

- Technology logos are trademarks of their respective owners.
- Brand logos are trademarks of their respective owners.
- Icons are used from [Font Awesome](https://fontawesome.com/license) and are subject to their respective licenses.

## Disclaimer

This is a non-commercial portfolio project. It is not a real E-Commerce Store and no Products can be purchased.

**All products, brand names (e.g. Zentheon, AetherFlux), descriptions, and prices listed on this website are entirely fictional** and created for demonstration purposes only. They are not affiliated with any real-world companies or products. Product images are AI-generated and used as placeholders. All trademarks are the property of their respective owners.
