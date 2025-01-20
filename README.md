# Quiz Application

A modern, responsive quiz application built with React, TypeScript, and Tailwind CSS. This application fetches trivia questions from the Open Trivia Database and provides an interactive quiz-taking experience with a timer and question navigation.

## Features

- **User Authentication**: Simple email-based entry system
- **Dynamic Quiz Interface**: 15 questions fetched from Open Trivia DB
- **Timer**: 30-minute countdown with auto-submit
- **Navigation System**: 
  - Question overview panel
  - Previous/Next navigation
  - Direct question access
  - Visual indicators for visited and answered questions
- **Results Page**: 
  - Detailed score report
  - Question-by-question review
  - Retry option
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Enhanced user experience with fade transitions

## Technology Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Vite (build tool)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/           # React components
│   ├── EmailForm.tsx    # Initial email input form
│   ├── Timer.tsx        # Countdown timer
│   ├── QuizQuestion.tsx # Individual question display
│   ├── QuizReport.tsx   # Results page
│   └── QuestionNavigation.tsx # Question overview panel
├── types.ts             # TypeScript interfaces
├── App.tsx              # Main application component
└── main.tsx            # Application entry point
```

## Implementation Details

### State Management
- Used React's useState for managing quiz state
- Centralized state in App component includes:
  - Questions array
  - Current question index
  - User answers
  - Visited questions tracking
  - Timer state
  - Quiz completion status

### API Integration
- Fetches questions from Open Trivia DB
- Handles HTML entities in questions and answers
- Randomizes answer options for each question

### User Experience
- Smooth transitions between questions
- Clear visual feedback for navigation
- Intuitive progress tracking
- Responsive design for all screen sizes

## Challenges and Solutions

1. **HTML Entities in API Response**
   - Challenge: Questions and answers contained HTML entities
   - Solution: Used dangerouslySetInnerHTML with proper security considerations

2. **Answer Randomization**
   - Challenge: Needed to combine and randomize correct and incorrect answers
   - Solution: Implemented a shuffle algorithm while maintaining answer integrity

3. **Timer Management**
   - Challenge: Accurate countdown with auto-submit
   - Solution: Used useEffect with interval, cleanup on component unmount

4. **State Persistence**
   - Challenge: Maintaining quiz state during navigation
   - Solution: Centralized state management in App component

## Assumptions

1. Users have stable internet connection for API calls
2. Email validation is basic (format check only)
3. Quiz session is single-attempt (until manual retry)
4. Browser supports modern JavaScript features

## Future Improvements

1. Add offline support
2. Implement more robust email validation
3. Add category selection for questions
4. Include difficulty levels
5. Add progress saving functionality
6. Implement user authentication
7. Add a leaderboard system

## Browser Support

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
