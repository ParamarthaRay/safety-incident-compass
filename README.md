
# AI Safety Incident Dashboard

A real-time dashboard for tracking and managing AI safety incidents, built with modern web technologies.

## 🚀 Technologies Used

- **React** - Frontend framework
- **TypeScript** - For type-safe code
- **Vite** - Build tool and development server
- **Tailwind CSS** - For styling
- **shadcn/ui** - UI component library
- **React Query** - For data fetching and state management
- **React Router** - For routing

## 🛠️ Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/ParamarthaRay/safety-incident-compass.git
cd safety-incident-compass
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🎨 Design Decisions

- **Theme Support**: Implemented a dark/light mode toggle with persistent user preferences
- **Color Scheme**:
  - Light mode: Grey background with blue navbar and green incident cards
  - Dark mode: Orange background with dark blue navbar and dark green cards
- **Severity Indicators**: Color-coded for quick visual identification
  - High: Red
  - Medium: Yellow
  - Low: Green
- **Responsive Design**: Fully responsive layout that works across all device sizes

## 🔧 Technical Challenges

1. **Theme Implementation**: Created a custom hook (useTheme) to manage theme state and persistence
2. **Color Management**: Implemented a comprehensive color system using CSS variables and Tailwind for consistent theming
3. **Component Architecture**: Organized components to be modular and reusable while maintaining clean separation of concerns

## 🌟 Features

- Real-time incident tracking
- Severity-based filtering
- Chronological sorting (newest/oldest)
- Dark/Light mode toggle
- Responsive design
- Interactive incident cards with expandable details



