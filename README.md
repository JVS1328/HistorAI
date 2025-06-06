
# HistorAI - AI Historical Military Portrait Generator

Transform your photo into a stunning historical military portrait using AI. HistorAI allows users to upload their images and customize historical details to create authentic period military portraits in oil painting or watercolor styles.

## Overview

HistorAI is a web application that leverages OpenAI's latest image generation models to transform modern photos into historically accurate military portraits. Users can specify the time period, military branch, rank, and artistic style to create personalized historical artwork.

### Key Features

- **Photo Upload**: Drag-and-drop or click-to-upload interface with image preview
- **Historical Customization**: Specify war/time period, military side/faction, rank, and branch of service
- **Artistic Styles**: Choose between oil painting and watercolor portrait styles
- **AI-Powered Generation**: Uses OpenAI's GPT-Image-1 model for high-quality results
- **Instant Download**: Download your generated portrait in high resolution
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **TanStack Query** - Server state management and caching
- **Wouter** - Lightweight client-side routing
- **Lucide React** - Beautiful SVG icons
- **Framer Motion** - Smooth animations and transitions

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **OpenAI API** - AI image generation and editing
- **Multer** - File upload handling
- **Sharp** - High-performance image processing
- **Zod** - Runtime type validation and schema definition

### Development & Build Tools
- **ESBuild** - Fast JavaScript bundler for production
- **PostCSS** - CSS processing with Autoprefixer
- **tsx** - TypeScript execution for development

## How It Works

1. **Image Upload**: Users upload a photo of themselves
2. **Historical Settings**: Configure the military context (war period, side, rank, branch)
3. **Style Selection**: Choose between oil painting or watercolor artistic styles
4. **AI Generation**: OpenAI's GPT-Image-1 model transforms the photo into a historical military portrait
5. **Download & Share**: Users can download their generated portrait or create additional variations

## AI Model

HistorAI uses OpenAI's `gpt-image-1` model, which provides:
- High-quality image editing and transformation capabilities
- Understanding of historical military uniforms and period-appropriate styling
- Artistic style rendering (oil painting vs watercolor techniques)
- Facial feature preservation while applying historical context

## Architecture

The application follows a modern full-stack architecture:

- **Frontend**: Single-page React application with TypeScript
- **Backend**: RESTful API built with Express.js
- **Image Processing**: Sharp for optimization and OpenAI for AI generation
- **State Management**: TanStack Query for server state, React hooks for local state
- **Styling**: Tailwind CSS with custom components and dark mode support

## Deployment

Built for deployment on Replit with:
- Automatic dependency management
- Environment variable configuration for OpenAI API keys
- Single-port serving (port 5000) for both API and frontend
- Production-optimized builds with ESBuild and Vite
