# **Dishcovery: AI-Powered Recipe Suggestion App** 🍽️

Dishcovery is an innovative recipe suggestion platform where users can upload images of ingredients (fruits, vegetables, etc.) along with dietary preferences to generate personalized recipes. Powered by cutting-edge AI and robust backend systems, Dishcovery creates detailed recipes and saves them for users to browse, share, and enjoy.

---

## **Features**

- 📷 **Ingredient Recognition**: Upload photos of ingredients for analysis using AI vision models (Llama Vision from meta-llama/Llama-Vision-Free).
- 🧑‍🍳 **Personalized Recipes**: Generate recipes tailored to dietary preferences and restrictions.
- 📊 **Detailed Recipe Information**: Includes cooking steps, ingredients, calories, cooking time, servings, and dietary suitability.
- 🖼️ **Dish Gallery**: A global showcase of dishes generated by users, viewable in a card-based layout.
- 🛠️ **Dynamic Dish View**: Click on a dish card to see detailed information about that dish.
- 🔁 **Caching with Redis**: Optimized performance for dish gallery and recipe fetching.
- 🔒 **User Authentication**: Login functionality for users (future plans include a profile page to manage dishes).
- 🔗 **Shareable Content**: Dynamic thumbnails and metadata (planned).
- 🚀 **Scalable Architecture**: Optimized for high performance with caching and rate limiting.

---

## **Tech Stack**

### **Frontend**

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [Shadcn Components](https://shadcn.dev/)
- **Global State Management**: Custom React hooks and Zustand

### **Backend**

- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Drizzle ORM](https://orm.drizzle.team/)
- **Caching**: [Redis](https://redis.io/) via [Upstash](https://upstash.com/)
- **AI Vision Models**: [Llama Vision from meta-llama/Llama-Vision-Free](https://example.com/) (by Together.ai)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

### **Package Manager**

- **Bun**: For ultra-fast builds and dependency management ([Why Bun?](https://bun.sh/)).

### **Deployment**

- **Frontend & Server**: [Vercel](https://vercel.com/)
- **Database**: Cloud-hosted PostgreSQL
- **Caching**: Upstash Redis for serverless caching

---

## **How It Works**

1. **Upload**: Users upload an image of ingredients and specify dietary preferences.
2. **AI Analysis**: The image is analyzed by AI, and a recipe prompt is generated.
3. **Recipe Creation**: AI returns a detailed recipe, which is saved to the PostgreSQL database.
4. **Gallery Display**: Recipes are cached in Redis for efficient loading and displayed in a gallery.
5. **Interactive View**: Click on any dish in the gallery to view its full details.

---

## **Setup Instructions**

### Clone this repository

```bash
bun create itsOmSarraf/dishcovery-nextjs
cd dishcovery-nextjs
```

### Install dependencies

```bash
bun install
```

### Configure environment variables

- Copy the `.env.example`

### Run the development server

```bash
bun dev
```

### Access the app

Visit `http://localhost:3000`.

---

## **Contributing**

We welcome contributions to make Dishcovery even better! Here's how you can contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## **Roadmap**

- 🚧 **User Profile Pages**: Allow users to view and manage their generated dishes.
- 📤 **Social Sharing**: Add dynamic thumbnails and metadata for sharing.
- 🕒 **Rate Limiting**: Implement per-user rate limiting for uploads.
- 🌐 **Global Caching**: Optimize gallery performance with Redis caching.
- 🔍 **Search & Filter**: Add functionality to search and filter dishes by cuisine, time, or dietary restrictions.

---

## **License**

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
