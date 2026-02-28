# Mission Malarum Madurai - AI Greeen Madurai Collective 🌿🍀🫧

A modern, full-featured Wix Astro template built with React, TypeScript, and Tailwind CSS. This template provides a solid foundation for building dynamic, interactive websites with Wix's powerful ecosystem.
This web application leverages Gemini AI to streamline waste management. Users upload waste images, which Gemini analyzes to identify the waste type (e.g., plastic, paper) and estimates the quantity. After submission, a verifier uploads a photo of the collected waste to verify the match. If confirmed, the system rewards the waste collector with points, promoting responsible waste disposal and recycling.

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![PostgressSql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Drizzleorm](https://img.shields.io/badge/drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black) ![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) 

## Table of contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features
- **AI-Powered Waste Classification**: Automatically identifies waste type (e.g., plastic, paper, metal) and estimates quantity using Gemini AI.
- **User Submission Portal**: Allows users to upload waste images for analysis and submit them for verification.
- **Verifier Photo Matching**: Enables verifiers to upload a photo of the collected waste for matching with the original submission.
- **Reward Points System**: Awards points to waste collectors upon successful verification, incentivizing waste collection and recycling.
- **Admin Dashboard**: Provides an admin view to manage submissions, verifications, and track reward distributions.

## Getting Started

### Prerequisties
Before you begin please make sure to install this prerequisities
-Node.js (v18 or higher)
-npm or yarn
-neon Database account
-Drizzle orm
-Vs code or similar IDE'S

### Installation
1. Clone the repository
   ```
   git clone https://github.com/SandeepGarikapati/CleanIndia.git

   ```
2. Install the Dependencies
   ```
   npm install
   # or
   yarn install

   ```

### Running the Application
1. Setup the .env.local file with required api keys

```env
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID = WEB3AUTH api for Authentication related services.
DATABASE_URL = Database url from postgress sql.
NEXT_PUBLIC_GEMINI_API_KEY = Gemini API Key
NEXT_PUBLIC_MAPS_API_KEY = Google Maps API Key.
```

2. First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. Login to the Website using WEB3Authentication
   
![Image stating how to login](imagesreadme/login.png)

2. Home Page of the Website.

![Image stating the home page of the website](imagesreadme/Home.png)

3. Waste Report page.

![image showing how to report waste](imagesreadme/Reportwaste.png)

4. Waste Collection Tasks Display page.

![image stating the waste collection](imagesreadme/Collectwaste.png)

5. Waste verification page.

![image stating how to collect the waste](imagesreadme/wasteverification.png)

6. Rewards Page.

![image stating the rewards collection](imagesreadme/rewardspage.png)

7. Leaderboard page

![image showing the leader boards](imagesreadme/LeaderBoard.png)


## Deployment

To deploy the application on Vercel:

1. Push your project to a GitHub repository.
2. Go to the Vercel dashboard and import your repository.
3. Set up your environment variables in the Vercel project settings.
4. Deploy the project. Vercel will automatically build and deploy your application.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shad cn UI](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Speech to text convertor](https://www.npmjs.com/package/react-hook-stt-fork)
- [Drizzle orm](https://www.npmjs.com/package/drizzle-orm)
- [Vercel](https://vercel.com/)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 🚀 Features

- **Astro Framework** - Modern static site generator with server-side rendering
- **React Integration** - Full React support with JSX components
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first CSS framework with custom components
- **Wix Integration** - Seamless integration with Wix services and APIs
- **Modern UI Components** - Radix UI components with custom styling
- **Authentication** - Built-in member authentication and protected routes
- **CMS Integration** - Content management system integration
- **Client-side Routing** - React Router for seamless navigation
- **Responsive Design** - Mobile-first responsive design
- **Testing** - Vitest testing framework setup
- **Development Tools** - ESLint, TypeScript checking, and more

## 🛠️ Tech Stack

- **Framework**: Astro 5.8.0
- **Frontend**: React 18.3.0
- **Styling**: Tailwind CSS 3.4.14
- **Language**: TypeScript 5.8.3
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest
- **Build Tool**: Vite
- **Deployment**: Cloudflare


## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Wix account and site

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   npm run env
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

The development server will start and you can view your site at `http://localhost:4321`.

## 📁 Project Structure

```
main/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── Head.tsx        # Page head component
│   │   └── Router.tsx      # Routing component
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── pages/              # Astro pages
│   └── styles/             # Global styles
├── integrations/           # Wix integrations
│   ├── cms/               # CMS integration
│   └── members/           # Member authentication
├── public/                # Static assets
└── eslint-rules/          # Custom ESLint rules
```

## 🎨 UI Components

This template includes a comprehensive set of UI components built with Radix UI and styled with Tailwind CSS:

- **Layout**: Accordion, Collapsible, Tabs, Sheet
- **Forms**: Input, Select, Checkbox, Radio Group, Switch
- **Navigation**: Navigation Menu, Menubar, Breadcrumb
- **Feedback**: Alert, Toast, Progress, Skeleton
- **Overlays**: Dialog, Popover, Tooltip, Hover Card
- **Data Display**: Table, Card, Badge, Avatar
- **Interactive**: Button, Toggle, Slider, Command

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run release` - Release to Wix
- `npm run env` - Pull environment variables
- `npm run check` - Type check with Astro
- `npm run test:run` - Run tests
- `npm install` - Install dependencies

## 🧪 Testing

The project includes Vitest for testing:

```bash
npm run test:run
```

## 📱 Responsive Design

The template is built with a mobile-first approach and includes:

- Responsive breakpoints
- Touch-friendly interactions
- Optimized images
- Flexible layouts

## 🚀 Deployment

The template is configured for deployment on Cloudflare:

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 🆘 Support

For support and questions:

- Check the [Wix Developer Documentation](https://dev.wix.com/)
- Review the [Astro Documentation](https://docs.astro.build/)


---

Built with ❤️ using Vibe, Authentication, Vision, Integrity, Passion, Precision, Care, Determination and Better future in Mind...!✨
