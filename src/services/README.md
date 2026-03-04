# API Services Documentation

## Authentication API

### Base URL

Configure in `.env` file:

```env
VITE_API_BASE_URL=http://localhost:50001/api
```

### Endpoints

#### 1. Register User

- **Endpoint**: `POST /auth/register`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "69a5d519aaec1eb7d775f714",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin"
    }
  }
  ```

#### 2. Login User

- **Endpoint**: `POST /auth/login`
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: Similar to register (includes user object and optionally a token)

#### 3. Logout User

- **Endpoint**: `POST /auth/logout`
- **Headers**: `Authorization: Bearer <token>`
- **Response**: Success message

## Usage

### In Components

```jsx
import { useSignUp, useLogin, useLogout } from '../hooks/useAuth';

function SignUpComponent() {
  const { mutate: signup, isPending, isError, error } = useSignUp({
    onSuccess: (response) => {
      console.log('User registered:', response.user);
      // Navigate to home or dashboard
    },
    onError: (error) => {
      console.error('Registration failed:', error.message);
    }
  });

  const handleSubmit = (formData) => {
    signup({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
  };

  return (
    // Your form JSX
  );
}
```

## Local Storage

The authentication system automatically manages localStorage:

- **Token**: Stored as `token` (if provided by backend)
- **User Data**: Stored as `user` (stringified JSON object)

Access user data:

```javascript
const user = JSON.parse(localStorage.getItem("user"));
console.log(user.name, user.email, user.role);
```
