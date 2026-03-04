# Authentication System Documentation

## Overview

Complete authentication system with JWT token management using cookies and admin role checking.

## Features

- ✅ JWT token stored in secure HTTP-only cookies
- ✅ Token decoding and role validation
- ✅ Admin role detection
- ✅ Token expiration checking
- ✅ Automatic session cleanup

## API Endpoints

### 1. Register

```
POST /auth/register
Body: { name, email, password }
Response: { message, user }
```

### 2. Login

```
POST /auth/login
Body: { email, password }
Response: { message, user, token }
```

## Usage Examples

### Check if User is Admin

```javascript
import { isAdmin } from "../utils/auth";

// In a component
const userIsAdmin = isAdmin();
if (userIsAdmin) {
  console.log("User has admin privileges");
}
```

### Get Current User Data

```javascript
import { getUserData, getUserRole } from "../utils/auth";

const user = getUserData(); // { id, name, email, role }
const role = getUserRole(); // 'admin' or other role
```

### Check Authentication Status

```javascript
import { isAuthenticated } from "../utils/auth";

if (isAuthenticated()) {
  // User is logged in and token is valid
}
```

### Using Authentication Hook

```javascript
import { useAuthState } from "../hooks/useAuthState";

function MyComponent() {
  const { isAuthenticated, isAdmin, role, user } = useAuthState();

  return (
    <div>
      {isAuthenticated && (
        <div>
          <p>Welcome, {user?.name}!</p>
          {isAdmin && <p>You have admin access</p>}
        </div>
      )}
    </div>
  );
}
```

### Protected Route Example

```javascript
import { Navigate } from "react-router-dom";
import { isAuthenticated, isAdmin } from "../utils/auth";

function ProtectedRoute({ children, requireAdmin = false }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" />; // Redirect non-admins
  }

  return children;
}

// Usage in routes
<Route
  path="/admin"
  element={
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>;
```

## Token Structure

The JWT token contains:

```json
{
  "id": "user_id",
  "role": "admin",
  "iat": 1772511356,
  "exp": 1772597756
}
```

## Cookie Configuration

- **Name**: `auth_token`
- **Expiration**: 7 days (default)
- **Secure**: true (in production)
- **SameSite**: strict

## Console Logs

After successful login, check browser console for:

- Decoded token payload
- User role
- Admin status
- Token expiration time

## Security Notes

1. Token is stored in cookies (more secure than localStorage)
2. Token expiration is validated before use
3. Admin role is checked by decoding JWT
4. All auth data is cleared on logout
