# Sidebar Components

This directory contains various sidebar component implementations with menu and submenu functionality for the Turf Owner Panel.

## Components

### 1. AppSidebar (app-sidebar.tsx)
The main sidebar component that serves as the entry point. It currently uses the AdvancedSidebar implementation.

### 2. EnhancedSidebar (enhanced-sidebar.tsx)
A clean, enhanced version of the sidebar with:
- Organized menu groups
- Expandable submenus with smooth animations
- Active state management
- Better visual hierarchy
- Support for "Coming Soon" and "New" badges

### 3. AdvancedSidebar (advanced-sidebar.tsx)
The most feature-rich sidebar implementation with:
- Built-in search functionality
- Quick action buttons
- User profile section
- Notification badges
- Smooth hover animations
- Responsive design
- Enhanced UX features

### 4. SidebarDemo (sidebar-demo.tsx)
A demo component that showcases all three sidebar variations with tabbed interface.

## Features

### Menu Structure
- **Main Navigation**: Core application features
- **Communication**: Notifications and support
- **System**: System health and admin management

### Submenu Support
Each main menu item can have submenus with:
- Individual icons
- Active state tracking
- Expandable/collapsible behavior
- Smooth animations

### Visual Enhancements
- **Badges**: "Coming Soon" and "New" indicators
- **Icons**: Lucide React icons throughout
- **Animations**: Smooth transitions and hover effects
- **Active States**: Clear indication of current page
- **Responsive**: Works on all screen sizes

### Accessibility
- Keyboard navigation support
- ARIA labels and roles
- Screen reader friendly
- Focus management

## Usage

### Basic Usage
```tsx
import { AppSidebar } from "./app-sidebar";

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        {/* Your content */}
      </main>
    </SidebarProvider>
  );
}
```

### With Search
```tsx
import { AdvancedSidebar } from "./advanced-sidebar";

export function Layout() {
  const handleSearch = (query: string) => {
    // Handle search logic
    console.log("Search:", query);
  };

  return (
    <SidebarProvider>
      <AdvancedSidebar onSearch={handleSearch} />
      <main>
        {/* Your content */}
      </main>
    </SidebarProvider>
  );
}
```

## Configuration

The sidebar menu structure is defined in `src/navigation/sidebar/sidebar-items.ts`. You can:

1. **Add new menu items**: Add to the `items` array in any group
2. **Create submenus**: Add a `subItems` array to any menu item
3. **Add badges**: Use `comingSoon: true` or `isNew: true`
4. **Customize icons**: Import from Lucide React and assign to the `icon` property
5. **Add new groups**: Create new objects in the `sidebarItems` array

### Example Configuration
```tsx
{
  title: "New Feature",
  url: "/dashboard/new-feature",
  icon: Star,
  isNew: true,
  subItems: [
    {
      title: "Sub Feature 1",
      url: "/dashboard/new-feature/sub1",
      icon: Star,
    },
    {
      title: "Sub Feature 2",
      url: "/dashboard/new-feature/sub2",
      icon: Star,
      comingSoon: true,
    },
  ],
}
```

## Styling

The sidebar uses Tailwind CSS classes and follows the design system defined in the UI components. Key styling features:

- **Dark/Light mode support**
- **Consistent spacing and typography**
- **Hover and focus states**
- **Smooth transitions**
- **Responsive breakpoints**

## State Management

The sidebar manages its own state for:
- Open/closed submenus
- Active menu items
- Search queries
- User interactions

State is automatically synchronized with the current route using Next.js `usePathname()` hook.

## Performance

- **Optimized rendering**: Only renders visible menu items
- **Efficient state updates**: Uses React's built-in state management
- **Minimal re-renders**: Proper memoization and state structure
- **Fast navigation**: Instant route changes with Next.js Link

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Touch-friendly interactions
- Keyboard navigation support
