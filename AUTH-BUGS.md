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

## Fixes Applied

### 1. Context Wiring (Bug 1)
Uncommented the `AuthProvider` import in `src/main.jsx` and wrapped the `<App />` component within `<BrowserRouter>` and `<AuthProvider>`. This ensures the entire application can consume the auth context.

### 2. Session Persistence (Bug 3)
Refactored `src/context/AuthContext.jsx` to:
- Sync `user` and `token` to `localStorage` during the `login()` process.
- Clear `localStorage` during the `logout()` process.
- Implement a `useEffect` hook that runs once on mount to restore the user session if valid tokens are found in `localStorage`.

### 3. Protected Routes (Bug 2)
- Created a new `src/components/ProtectedRoute.jsx` component that checks the `isAuthenticated` state from `useAuth()`. It uses the `Navigate` component from `react-router-dom` to redirect unauthenticated users to `/login`.
- Updated `src/App.jsx` to wrap all private routes (`/dashboard`, `/settings`, `/profile`) with the `<ProtectedRoute>` component.

### 4. Auth-Aware UI (Bug 4)
Refactored `src/components/Navbar.jsx` to consume the `useAuth()` hook. The navbar now conditionally renders:
- The user's name and a "Logout" button when the user is logged in.
- A "Login" link when the user is logged out.
- Instant UI updates upon login/logout state changes.

