# Hooks Documentation

## Overview

This folder contains CUSTOM React hooks. These hooks serves as a way to abstract away a lot of the boilerplate when it comes to safely fetching data from the backend api.

---

## Hook Details

### `useCreateBookmark.ts`
- **Purpose:** Handles creation of a bookmark for a location assuming the user is logged in.
- **Parameters:**
  - `locationId`: The id of the given location to bookmark
  - `session`: The session object from useSession()
- **Special Note:** This uses window.location.reload()
- **Usage Example:**
```typescript
const { createBookmark, loading } = useCreateBookmark();

const handleClick = async () => {
    if (session) {
        await createBookmark(locationId, session);
    }
}
```

### `useCreateLocation.ts`
- **Purpose:** Handles the creation of a location
- **Parameters:**
  - `formData`: Data that conforms to Backend API /api/locations 
  - `session`: The session object from useSession() | Must be ADMIN role
- **Usage Example:**
```typescript
const { createLocation, loading } = useCreateLocation();
...
await createLocation(formData, session);
```

### `useCreateReview.ts`
- **Purpose:** Handles the creation of a review for a given location
- **Parameters:**
  - `locationId`: The id of the given location
  - `content`: The comment / users thoughts
  - `rating`: A float between 1 - 5 Inclusive
  - `session`: The session object from useSession()
- **Usage Example:**
```typescript
const { createReview } = useCreateReview();
...
await createReview(locationId, review, rating, session);
```

### `useCreateUser.ts`
- **Purpose:** Handles the creation of a new user
- **Parameters:**
  - `formData`: Data that conforms to Backend API /api/users
- **Return Value**: Returns True if able to create user, false if fail to create new user
- **Usage Example:**
```typescript
const { createUser, loading } = useCreateUser();
...
const success = await createUser(userInfo);
```

### `useDeleteBookmark.ts`
- **Purpose:**: Handles the deletion of a bookmark
- **Parameters:**
  - `locationId`: The id of location to which the bookmark is addressed to.
  - `session`: The session object from useSession()
- **Special Note:** This uses window.location.reload()
- **Usage Example:**
```typescript
const { deleteBookmark, loading } = useDeleteBookmark();
...
await deleteBookmark(locationId, session);
```

### `useDeleteLocation.ts`
- **Purpose:**: Handles the deletion of a location
- **Parameters:**
  - `locationId`: The id of the location to be deleted
  - `session`: The session object from useSession() | Must be ADMIN role
- **Usage Example:**
```typescript
const { deleteLocation } = useDeleteLocation();
...
await deleteLocation(locationId, session);
```

### `useGetAnalytics.ts`
- **Purpose:** Handle getting the number of Users, Locations, Reviews and Bookmarks in the database
- **Usage Example:**
```typescript
const { analytics, loading, error } = useGetAnalytics();
...
console.log(analytics.numOfLocations);
console.log(analytics.numOfUsers);
console.log(analytics.numOfReviews);
console.log(analytics.numOfBookmarks);
```

### `useGetLocationData.ts`
- **Purpose:** Handles getting all the locations from the database with their full data.
- **Usage Example:**
```typescript
const { locations, loading, error } = useGetLocationData();
```

### `useGetSpecificLocation.ts`
- **Purpose:** Handles getting a singular location given a location id
- **Parameters:**
  - `locationId`: The id of the location
- **Usage Example:**
```typescript
const { specificLocation, fetchSpecificLocation, loading } = useGetSpecificLocation();
...
fetchSpecificLocation(locationId);
```

### `useGetUserData.ts`
- **Purpose:** Handles getting all users from the database
- **Usage Example:**
```typescript
const { users, loading, error } = useGetUserData();
...
console.log(users);
```

### `useGetUserBookmarks.ts`
- **Purpose:** Handles getting all the bookmark for a specific user.
- **Parameters:**
  - `userId`: The id of the user
- **Usage Example:**
```typescript
const { usersBookmarks, fetchUsersBookmarks, loading } = useGetUsersBookmarks();
...
if(session) {
  fetchUsersBookmarks(session.user.id);
}
```

### `useLocationSearch.ts`
- **Purpose:** Handles getting all locations that match the given query parameters.
- **Parameters:**
  - `queryParams`: A string representing the query params in the URL
- **Usage Example:**
```typescript
const [query, setQuery] = useState('name=');
const { locations, loading, error } = useLocationSearch(query);
 
const handleSearch = (query: string) => {
  setQuery(`name=${query}`);
}
```

### `useUpdateUserData.ts`
- **Purpose:**
- **Parameters:**
  - `formData`: The data that conforms to the backend API /api/users
  - `session`: The session object from useSession()
- **Usage Example:**
```typescript
const { updateUserData, loading } = useUpdateUserData();
...
await updateUserData(formData, session);
```
