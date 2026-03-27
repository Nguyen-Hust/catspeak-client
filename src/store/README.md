# Store Structure với RTK Query

## Cấu trúc thư mục

```
src/store/
├── index.js              # Store configuration với RTK
├── hooks.js              # Custom hooks cho components
├── api/                  # RTK Query API slices
│   ├── baseApi.js       # Base API configuration
│   └── authApi.js       # Auth API endpoints
└── slices/              # Redux Toolkit slices
    └── authSlice.js     # Auth state management
```

## RTK Query vs Redux cũ

### ✅ Lợi ích của RTK Query:
- **Tự động cache**: Tự động cache và invalidate data
- **Loading states**: Tự động quản lý loading, error states
- **Less boilerplate**: Ít code hơn, dễ maintain
- **TypeScript support**: Type-safe out of the box
- **DevTools**: Tích hợp Redux DevTools

## Usage

### 1. Sử dụng trong Component

```jsx
import { useAuthState } from '@store/hooks'

const MyComponent = () => {
  const { 
    user, 
    isAuthenticated, 
    login, 
    loginResult 
  } = useAuthState()

  const handleLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap()
      // result chứa { user, token }
    } catch (error) {
      // Handle error
      console.error(error)
    }
  }

  return (
    <div>
      {loginResult.isLoading && <p>Loading...</p>}
      {loginResult.isError && <p>Error: {loginResult.error}</p>}
      {isAuthenticated && <p>Welcome {user?.name}</p>}
    </div>
  )
}
```

### 2. Sử dụng RTK Query hooks trực tiếp

```jsx
import { 
  useLoginMutation, 
  useGetCurrentUserQuery 
} from '@store/api/authApi'

const LoginComponent = () => {
  const [login, { isLoading, error }] = useLoginMutation()
  const { data: user } = useGetCurrentUserQuery()

  const handleSubmit = async (credentials) => {
    try {
      const result = await login(credentials).unwrap()
      // Success
    } catch (err) {
      // Error handling
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {isLoading && <p>Logging in...</p>}
      {error && <p>Error: {error.data?.message}</p>}
      {/* Form fields */}
    </form>
  )
}
```

### 3. Sử dụng selectors

```jsx
import { useSelector } from 'react-redux'
import { selectIsAuthenticated, selectUser } from '@store/hooks'

const MyComponent = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  return (
    <div>
      {isAuthenticated ? `Hello ${user?.name}` : 'Please login'}
    </div>
  )
}
```

## Thêm API endpoint mới

### 1. Thêm vào authApi.js hoặc tạo API mới

```js
// src/store/api/userApi.js
import { baseApi } from './baseApi'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: ({ userId, ...data }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} = userApi
```

### 2. Sử dụng trong component

```jsx
import { useGetUserProfileQuery, useUpdateProfileMutation } from '@store/api/userApi'

const ProfileComponent = () => {
  const { data: profile, isLoading } = useGetUserProfileQuery(userId)
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

  // ...
}
```

## Migration từ Redux cũ

### Trước (Redux):
```jsx
const dispatch = useDispatch()
dispatch(loginRequest())
// Manual async handling
```

### Sau (RTK Query):
```jsx
const [login] = useLoginMutation()
await login(credentials).unwrap()
// Automatic state management
```

## Best Practices

1. **Sử dụng `unwrap()`** để handle errors dễ dàng
2. **Tag-based cache invalidation** để tự động refetch
3. **Skip queries** khi không cần thiết (ví dụ: khi chưa có token)
4. **Error handling** với try/catch và `.unwrap()`
