# API Documentation

This document outlines the API routes for Coffee Spot

---

# Table Of Contents
- [Folder Structure & Endpoints Overview](#folder-structure--endpoints-overview)
1. [Analytics Endpoints](#analytics-endpoint)
    1. [Get Analytics](#get-analytics)
2. [Bookmark Endpoints](#bookmark-endpoints)
    1. [Get All Bookmarks](#get-all-bookmarks)
    2. [Create a Bookmark](#create-a-bookmark)
    3. [Get Bookmarks for Location](#get-all-bookmarks-for-a-specific-location)
    4. [Get Bookmarks for User](#get-all-bookmarks-for-a-specific-user)
3. [Location Endpoints](#location-endpoints)
    1. [Get All Locations](#get-all-locations)
    2. [Create A Location](#create-a-location)
    3. [Get A Specific Location](#get-specific-location)
    4. [Delete A Specific Location](#delete-a-specific-location)
    5. [Search for Locations](#search-for-locations)
4. [Review Endpoints](#review-endpoints)
    1. [Get All Reviews](#get-all-reviews)
    2. [Get Specific Review using reviewId](#get-specific-review-using-reviewid)
    3. [Create a Review for a Location](#create-a-review-for-a-location)
    4. [Get All Reviews for a Location](#get-all-reviews-for-a-location)
    5. [Get All Reviews made by a User](#get-all-reviews-made-by-a-specific-user) 
5. [Upload Endpoints](#upload-endpoint)
    1. [Upload Location thumbnail](#upload-location-thumbnail)
6. [User Endpoints](#user-endpoints)
    1. [Get All Users](#get-all-users)
    2. [Create User](#create-user)
    3. [Update User Settings](#update-user-settings)

--- 

## Folder Structure & Endpoints Overview
In Nextjs 14 the api endpoints defined through the folder structure the `/api/` folder

The `/api/` is structured as follows:

- `/api/analytics`
- `/api/auth/[...nextauth]`
- `/api/bookmarks`
  - `/api/bookmarks/createBookmark/[locationId]`
  - `/api/bookmarks/locationBookmarks/[locationId]`
  - `/api/bookmarks/userBookmarks/[userId]`
- `/api/locations`
  - `/api/locations/[locationId]`
  - `/api/locations/search`
- `/api/reviews`
  - `/api/reviews/[reviewId]`
  - `/api/reviews/createReview/[locationId]`
  - `/api/reviews/locationReviews/[locationId]`
  - `/api/reviews/userReviews/[userId]`
- `/api/upload`
- `/api/users`

---

### Analytics Endpoint

#### Get Analytics
- **Endpoint:** `/api/analytics`
- **Method:** `GET`
- **Description:** Get Number of: Locations, Users, Reviews, Bookmarks
- **Response Body:**
```json
{
  "numOfLocations": 1,
  "numOfUsers": 3,
  "numOfReviews": 3,
  "numOfBookmarks": 7
}
```

---

### Bookmark Endpoints

#### Get All Bookmarks
- **Endpoint:** `/api/bookmarks`
- **Method:** `GET`
- **Description:** Get all the bookmarks from the database
- **Response Body:**
```json
[
  {
    "id": "bookmark-id",
    "user": {
      "id": "user-id",
      "username": "username",
      "email": "example@example.com"
    }
    "creationDate": "2024-10-08T18:58:32.977Z"
  },
  ...
]
```

#### Create a Bookmark
- **Endpoint:** `/api/bookmarks/createBookmark/${locationId}`
- **Method:** `POST`
- **Description:** Create a bookmark when signed in.
- **Authentication**: REQUIRED
- **Authorization**: MUST BE CUSTOMER OR HIGHER ROLE
- **Request Body:**
```json
{
  "userId": session.user.id
}
```

#### Get all Bookmarks for a specific Location
- **Endpoint:** `/api/bookmarks/locationBookmarks/${locationId}`
- **Method:** `GET`
- **Description:** Get all bookmarks for a given location with its id.
- **Response Body:**
```json
[
  {
    "id": "bookmark-id",
    "user": {
      "id": "user-id",
      "username": "username",
      "email": "example@example.com"
    }
    "creationDate": "2024-10-08T18:58:32.977Z"
  },
  ...
]
```

#### Get all Bookmarks for a specific User
- **Endpoint:** `/api/bookmarks/userBookmarks/${userId}`
- **Method:** `GET`
- **Description:** Get all bookmarks that belong to a user.
- **Response Body:**
```json
[
  {
    "id": "bookmark-id",
    "location": {
      "id": "location-id",
      "name": "location-name",
      "category": "LIBRARY | CAFE| PARK"
    }
    "creationDate": "2024-10-08T18:58:32.977Z"
  },
  ...
]
```

---

### Location Endpoints

#### Get all Locations
- **Endpoint:** `/api/locations`
- **Method:** `GET`
- **Description:** Get all the locations from the database.
- **Response Body:**
```json
[
  {
    "id": "location-id",
    "name": "San Francisco State University J. Paul Leonard Library",
    "address": "1630 Holloway Ave, San Francisco, CA 94132",
    "phoneNumber": "(415) 338-1854",
    "hasWifi": true,
    "seatingCapacity": 648,
    "rating": 4.5,
    "busynessStatus": 4,
    "imageWebLink": "imageLink.com",
    "locationWebsiteLink": "https://library.sfsu.edu/",
    "animalFriendliness": false,
    "latitude": 37.7217004864258,
    "longitude": -122.47805057249,
    "operatingHours": [
      {
        "day": "MONDAY",
        "openTime": "09:00",
        "closeTime": "18:00"
      },
      {
        "day": "TUESDAY",
        "openTime": "09:00",
        "closeTime": "20:00"
      },
      {
        "day": "WEDNESDAY",
        "openTime": "09:00",
        "closeTime": "20:00"
      },
      {
        "day": "THURSDAY",
        "openTime": "09:00",
        "closeTime": "20:00"
      },
      {
        "day": "FRIDAY",
        "openTime": "12:00",
        "closeTime": "18:00"
      },
      {
        "day": "SATURDAY",
        "openTime": "10:00",
        "closeTime": "18:00"
      },
      {
        "day": "SUNDAY",
        "openTime": "12:00",
        "closeTime": "18:00"
      }
    ]
  },
  ...
]
```

#### Create a Location
- **Endpoint:** `/api/locations`
- **Method:** `POST`
- **Description:** Create a location
- **Authentication**: REQUIRED
- **Authorization**: MUST BE ADMIN ROLE
- **Request Body:**
```json
{
  "id": "location-id",
  "name": "San Francisco State University J. Paul Leonard Library",
  "address": "1630 Holloway Ave, San Francisco, CA 94132",
  "phoneNumber": "(415) 338-1854",
  "hasWifi": true,
  "seatingCapacity": 648,
  "rating": 4.5,
  "busynessStatus": 4,
  "imageWebLink": "imageLink.com",
  "locationWebsiteLink": "https://library.sfsu.edu/",
  "animalFriendliness": false,
  "latitude": 37.7217004864258,
  "longitude": -122.47805057249,
  "operatingHours": [
    {
      "day": "MONDAY",
      "openTime": "09:00",
      "closeTime": "18:00"
    },
    {
      "day": "TUESDAY",
      "openTime": "09:00",
      "closeTime": "20:00"
    },
    {
      "day": "WEDNESDAY",
      "openTime": "09:00",
      "closeTime": "20:00"
    },
    {
      "day": "THURSDAY",
      "openTime": "09:00",
      "closeTime": "20:00"
    },
    {
      "day": "FRIDAY",
      "openTime": "12:00",
      "closeTime": "18:00"
    },
    {
      "day": "SATURDAY",
      "openTime": "10:00",
      "closeTime": "18:00"
    },
    {
      "day": "SUNDAY",
      "openTime": "12:00",
      "closeTime": "18:00"
    }
  ]
}
```

#### Get Specific Location
- **Endpoint:** `/api/locations/${locationId}`
- **Method:** `GET`
- **Description:** Get a Location's data given its id.
- **Response Body:**
```json
{
  "id": "location-id",
  "name": "San Francisco State University J. Paul Leonard Library",
  "address": "1630 Holloway Ave, San Francisco, CA 94132",
  "phoneNumber": "(415) 338-1854",
  "hasWifi": true,
  "seatingCapacity": 648,
  "rating": 4.5,
  "busynessStatus": 4,
  "imageWebLink": "imageLink.com",
  "locationWebsiteLink": "https://library.sfsu.edu/",
  "animalFriendliness": false,
  "latitude": 37.7217004864258,
  "longitude": -122.47805057249,
  "operatingHours": [
    {
      "day": "MONDAY",
      "openTime": "09:00",
      "closeTime": "18:00"
    },
    {
      "day": "TUESDAY",
      "openTime": "09:00",
      "closeTime": "20:00"
    },
    {
      "day": "WEDNESDAY",
      "openTime": "09:00",
      "closeTime": "20:00"
    },
    {
      "day": "THURSDAY",
      "openTime": "09:00",
      "closeTime": "20:00"
    },
    {
      "day": "FRIDAY",
      "openTime": "12:00",
      "closeTime": "18:00"
    },
    {
      "day": "SATURDAY",
      "openTime": "10:00",
      "closeTime": "18:00"
    },
    {
      "day": "SUNDAY",
      "openTime": "12:00",
      "closeTime": "18:00"
    }
  ]
}
```

#### Delete a Specific Location
- **Endpoint:** `/api/locations/${locationId}`
- **Method:** `DELETE`
- **Description:** Delete a location given its id
- **Authentication**: REQUIRED
- **Authorization**: MUST BE ADMIN ROLE

#### Search for Locations
- **Endpoint:** `/api/locations/search`
- **Method:** `GET`
- **Description:** Get locations matching a criteria
- **Query Parameters:**
  - `name`
  - `category`
  - `hasWifi`
  - `busynessStatus`
  - `radius`

---

#### Review Endpoints

#### Get all Reviews
- **Endpoint:** `/api/reviews`
- **Method:** `GET`
- **Description:** Get all reviews from database
- **Response Body:**
```json
[
	{
		"id": "review-id",
		"rating": 3,
		"description": "Place isn't great",
		"creationDate": "2024-10-08T18:58:32.977Z"
	},
	{
		"id": "review-id",
		"rating": 5,
		"description": "I like this library to study",
		"creationDate": "2024-10-08T18:58:32.977Z"
	}
]
```

#### Get Specific Review using reviewId
- **Endpoint:** `/api/reviews/${reviewId}`
- **Method:** `GET`
- **Description:** Get a review using reviewId
- **Response Body:**
```json
{
	"id": "review-id",
	"rating": 3,
	"description": "Place isn't great",
	"creationDate": "2024-10-08T18:58:32.977Z"
}
```

#### Create a Review for a Location
- **Endpoint:** `/api/reviews/createReview/${locationId}`
- **Method:** `POST`
- **Description:** Create a review for a given location
- **Authentication**: REQUIRED
- **Authorization**: MUST BE CUSTOMER OR HIGHER ROLE
- **Request Body:**
```json
{
  "rating": 5,
  "content": "Good place to study"
}
```

#### Get all Reviews for a Location
- **Endpoint:** `/api/reviews/locationReviews/${locationId}`
- **Method:** `GET`
- **Description:** Get all the reviews for a given location
- **Response Body:**
```json
[
  {
	  "id": "review-id",
	  "rating": 3,
	  "description": "Place isn't great",
	  "creationDate": "2024-10-08T18:58:32.977Z"
  },
  ...
]
```

#### Get all Reviews made by a Specific User
- **Endpoint:** `/api/reviews/userReviews/${userId}`
- **Method:** `GET`
- **Description:** Get all the reviews made by a specified user, using the user's id.
- **Response Body:**
```json
[
  {
	  "id": "review-id",
	  "rating": 3,
	  "description": "Place isn't great",
	  "creationDate": "2024-10-08T18:58:32.977Z"
  },
  ...
]
```

---

### Upload Endpoint

#### Upload Location Thumbnail
- **Endpoint:** `/api/upload`
- **Method:** `POST`
- **Description:** Upload a single image which will be used as the thumbnail of a location.
- **Search Parameters:** `/api/upload?filename={file.png}`
- **Authentication**: REQUIRED
- **Authorization**: MUST BE ADMIN ROLE

---

### User Endpoints

#### Get all Users
- **Endpoint:** `/api/users`
- **Method:** `GET`
- **Description:** Get all users from the database
- **Response Body:**
```json
[
  {
    "id": "user-id",
    "username": "username",
    "email": "example@example.com",
    "role": "CUSTOMER",
    "creationDate": "2024-10-08T18:58:32.977Z"
  },
  ...
]
```

#### Create User
- **Endpoint:** `/api/users`
- **Method:** `POST`
- **Description:** Create a user
- **Request Body:**
```json
{
  "username": "username",
  "email": "email",
  "password": "password"
}
```

#### Update User settings
- **Endpoint:** `/api/users`
- **Method:** `PATCH`
- **Description:** Update a user's email and password
- **Authentication**: REQUIRED
- **Authorization**: MUST BE CUSTOMER OR HIGHER ROLE
- **Request Body:**
```json
{
  "email": "example@example.com",
  "password": "newpassword"
}
```