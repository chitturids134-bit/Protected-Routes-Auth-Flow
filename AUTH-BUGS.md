# Auth Bugs Analysis — Secure the App

## Observed Behaviours

1. **Direct Access**: Navigating to `/dashboard`, `/settings`, or `/profile` directly without logging in shows the respective components. There is no redirect to the login page.
2. **Session Loss**: After successfully logging in, refreshing the page causes the application to log the user out immediately. The dashboard becomes inaccessible or renders empty states due to missing auth data, and the state resets.
3. **Navbar State**: The Navbar always shows the "Login" button, even after a successful login. It never displays the user's name or a "Logout" button.

## Root Cause Analysis

### Bug 1: Context Provider Missing
The `AuthProvider` is imported in `src/main.jsx` but it is commented out and not wrapping the `<App />` component. Consequently, the `AuthContext` returns `null` or `undefined` to consumers.

### Bug 2: No Route Protection
In `src/App.jsx`, the private routes (`/dashboard`, `/settings`, `/profile`) are directly mapped to their components. There is no higher-order component checking if `isAuthenticated` is true before rendering the page.

### Bug 3: Token Does Not Persist
In `src/context/AuthContext.jsx`, the `login` function updates React state (`setUser`, `setToken`) but fails to sync these values to `localStorage`. Furthermore, there is no `useEffect` hook to read the token from `localStorage` and restore the user's session on initial app load (refresh).

### Bug 4: Navbar Does Not Respond
In `src/components/Navbar.jsx`, the component entirely ignores the auth state. It does not call the `useAuth()` hook, and the "Login" link is hardcoded instead of conditionally rendering a "Logout" button and greeting.
