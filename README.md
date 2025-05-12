https://www.figma.com/design/IGQeCdz8lHMRz5m5xteLCr/AFS---Test-Assignment?node-id=8724-571&p=f&t=wcKpxpab9gQ2tpwH-0

# Oak Tree Project

## Technologies

- **React**  
- **TypeScript**  
- **MobX**  
- **SASS**  
- **BEM**

## Features

### Architecture and Styles

- BEM methodology is used for organizing CSS classes, which ensures:
  - Component modularity
  - Reusability of styles
  - Ease of maintenance and scalability

- All color constants are extracted into a separate `variables.sass` file:
  - Taken from Figma to match the design precisely
  - Grouped by categories (brand colors, monochrome, UI colors)
  - Ensure consistent color scheme across the application

### UI Components

A set of reusable UI components was created:

- **Button**
  - Variants: filled, outline, flattened
  - Icon support
  - States: hover, active, disabled

- **IconButton**
  - Circular button for icons
  - States: hover, active, disabled

- **Input**
  - States: focus, hover, disabled

- **Modal**
  - Smooth show/hide animations
  - Customizable title and content
  - Closes when clicking outside the modal (overlay)
  - Closes on Esc key press

- **Select**
  - Customizable dropdown
  - Supports single and multiple selection
  - Closes when clicking outside the component

- **Sidebar**
  - Expandable sidebar
  - Closes extended menu when clicking outside the area

### State Handling

- All UI component states are implemented according to the Figma design
- Loading indicators added for async operations
- Error handling and display implemented

## Project Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
  api/                # API
  constants/          # Constants
  icons/              # Icons
  components/         # UI Components
    common/          # Reusable components
    company/         # Components for working with companiesи
  stores/            # MobX stores
  styles/            # Global styles and variables
```

## Future Improvements

### Configuration and Typing

- ESLint setup
- TypeScript configuration improvements

### Validation

- Add validation for input data

### Testing

- Add unit tests
- Add E2E tests

### UX Improvements

- Add skeleton loader
- Dark mode support
