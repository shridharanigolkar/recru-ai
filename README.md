# Recru AI

Recru AI is an intelligent platform designed to assist recruiters in conducting AI-powered interviews for students. By leveraging advanced AI models and modern backend technology, Recru AI streamlines the recruitment process, making interviews more efficient and insightful.

## Features

- Conduct AI-driven interviews for students using the Gemini Pro model.
- Manage interview data and candidate profiles seamlessly.
- Real-time interview interaction powered by VAPI.
- Secure and scalable database management with Supabase.

## Tech Stack

- **Next.js** — Frontend framework
- **Supabase** — Backend database and authentication
- **VAPI** — AI interview handling interface
- **Gemini Pro Model** — AI model powering interviews

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Git
- Supabase account and project setup
- VAPI credentials for AI interview integration

### Installation

1. Install dependencies:

```bash
npm install
Create a .env.local file in the root directory and add the following environment variables:

ini
Copy
Edit
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
VAPI_API_KEY=your-vapi-api-key
GEMINI_PRO_MODEL_KEY=your-gemini-pro-model-key
Run the development server:

bash
Copy
Edit
npm run dev
Open http://localhost:3000 to view the app.

Usage
Register or log in as a recruiter.

Create or schedule AI-powered interviews.

Review student responses and interview analytics.

Contributing
Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

License
This project is licensed under the MIT License.