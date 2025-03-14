# Order Management Frontend

This frontend application provides an interface for managing orders, interacting directly with the backend API. It allows users to **create, update, and filter** orders efficiently. The project was developed as part of a technical assessment and is not intended for professional or commercial use.

---

## Running the Project  

The frontend is already deployed and running in the cloud, making it easy to use without any setup.  
You can access it at:

**Live URL:** [`https://order-system-front.vercel.app`](https://order-system-front.vercel.app)

If you prefer to run the application locally, follow the steps below:

### 1. Clone the repository
```sh
git clone https://github.com/GutiCrespo/orderSystemFront
cd orderSystemFront
```

### 2. Install dependencies
```sh
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory based on `.env.example`.  
Make sure to set `NEXT_PUBLIC_API_BASE_URL` to the correct backend URL.

- If using the cloud API:
```ini
NEXT_PUBLIC_API_BASE_URL="https://order-system-api.vercel.app"
```
- If running the API locally:
```ini
NEXT_PUBLIC_API_BASE_URL="http://localhost:4444"
```

### 4. Start the frontend
```sh
npm run dev
```
The application will be available at [`http://localhost:3000`](http://localhost:3000).

---

## Tools Used

### Next.js
Next.js is a React framework that enables server-side rendering (SSR) and static site generation (SSG). It simplifies routing, improves performance, and enhances SEO. It was chosen for its scalability and industry adoption.

### React
A JavaScript library for building interactive UIs. It provides a component-based architecture, making the frontend modular and maintainable.

### TypeScript
TypeScript is a superset of JavaScript that adds static typing. It helps catch errors early and improves code maintainability.

### Tailwind CSS
A utility-first CSS framework that simplifies styling with pre-defined classes. It speeds up development and ensures a consistent design without requiring custom stylesheets.

---

## Potential Improvements

This frontend was designed to be simple, focusing on core functionalities. However, there are several improvements that could be implemented:

### Additional Features
- Implementing **gamification elements**, such as rewarding users for frequent order creation.
- Adding **hidden buttons** for experimental or extended functionalities beyond "Create, Update, and Filter."

### Deployment
Currently, the frontend runs only locally. Deploying it on **Vercel**, just like the backend, would make it easier to access and test.

---

## Backend Repository

If you want to check out the backend implementation of this project, visit the repository:  
**[Order System API](https://github.com/GutiCrespo/orderSystemAPI.git)**

---

## Alternative Technologies

Initially, the project was developed in **Ruby on Rails** due to its **MVC structure, rapid CRUD development, and maintainability**. However, since I was unfamiliar with it, I decided to switch to **Next.js and React** to ensure I could deliver a functional frontend within the available time frame.  
If you are interested, you can check out the initial Ruby on Rails implementation here:  
**[Ruby on Rails Version](https://github.com/GutiCrespo/orderSystem.git)**
