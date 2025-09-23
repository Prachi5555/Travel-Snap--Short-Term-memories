# TravelSnaps Documentation

## Overview

This documentation provides information about the components and API endpoints in the TravelSnaps application, which was transformed from a Travel Diary application.

## Components

### TravelSnapsHome

**Path:** `frontend/src/pages/Home/TravelSnapsHome.jsx`

**Description:**
The main component for displaying and managing travel snaps. It includes functionality for:

- Listing all travel snaps
- Searching travel snaps
- Filtering travel snaps by date range
- Adding, editing, and deleting travel snaps

**Usage:**

```jsx
<TravelSnapsHome />
```

### ViewTravelSnap

**Path:** `frontend/src/pages/Home/ViewTravelSnap.jsx`

**Description:**
Displays detailed information about a specific travel snap, including:

- Title
- Date
- Location
- Image (if available)
- Description

**Usage:**

```jsx
<ViewTravelSnap
  travelSnapInfo={travelSnapData}
  onClose={handleClose}
  onEditClick={handleEdit}
  onDeleteClick={handleDelete}
/>
```

### AddEditTravelSnap

**Path:** `frontend/src/components/AddEditTravelSnap.jsx`

**Description:**
A form component for adding new travel snaps or editing existing ones. Features include:

- Input fields for title, description, and location
- Date selector
- Image upload and preview

**Usage:**

```jsx
// For adding a new travel snap
<AddEditTravelSnap
  type="add"
  onClose={handleClose}
  getAllTravelSnaps={fetchTravelSnaps}
/>

// For editing an existing travel snap
<AddEditTravelSnap
  type="edit"
  travelSnapInfo={travelSnapData}
  onClose={handleClose}
  getAllTravelSnaps={fetchTravelSnaps}
/>
```

### TravelSnapCard

**Path:** `frontend/src/components/TravelSnapCard.jsx`

**Description:**
A card component that displays a summary of a travel snap in the list view, showing:

- Title
- Date
- Location
- Image thumbnail (if available)

**Usage:**

```jsx
<TravelSnapCard
  imageUrl={travelSnap.imageUrl}
  title={travelSnap.title}
  description={travelSnap.description}
  date={travelSnap.snapDate}
  location={travelSnap.location}
  onViewClick={() => handleViewTravelSnap(travelSnap)}
/>
```

## API Services

### travelSnapsService.js

**Path:** `frontend/src/services/travelSnapsService.js`

**Description:**
A service module that handles all API calls related to travel snaps. It includes methods for:

#### `getAllTravelSnaps()`

Fetches all travel snaps from the backend.

#### `addTravelSnap(travelSnapData)`

Adds a new travel snap with the provided data.

#### `updateTravelSnap(travelSnapId, travelSnapData)`

Updates an existing travel snap with the provided data.

#### `deleteTravelSnap(travelSnapId)`

Deletes a travel snap by its ID.

#### `searchTravelSnaps(query)`

Searches for travel snaps matching the provided query.

#### `filterTravelSnapsByDate(fromDate, toDate)`

Filters travel snaps within the specified date range.



#### `uploadImage(imageFile)`

Uploads an image for a travel snap.

#### `deleteImage(imageUrl)`

Deletes an image associated with a travel snap.

## API Endpoints

### Backend Routes

**Path:** `backend/routes/travelSnap.route.js`

#### Image Upload

- **Endpoint:** `POST /travelSnap/upload-image`
- **Description:** Uploads an image for a travel snap.

#### Image Deletion

- **Endpoint:** `DELETE /travelSnap/delete-image`
- **Description:** Deletes an image associated with a travel snap.

#### Add Travel Snap

- **Endpoint:** `POST /travelSnap/add`
- **Description:** Adds a new travel snap.

#### Get All Travel Snaps

- **Endpoint:** `GET /travelSnap/all`
- **Description:** Retrieves all travel snaps.

#### Update Travel Snap

- **Endpoint:** `PUT /travelSnap/update/:id`
- **Description:** Updates a specific travel snap by ID.

#### Delete Travel Snap

- **Endpoint:** `DELETE /travelSnap/delete/:id`
- **Description:** Deletes a specific travel snap by ID.

#### Search Travel Snaps

- **Endpoint:** `GET /travelSnap/search`
- **Description:** Searches for travel snaps based on a query parameter.



#### Filter Travel Snaps by Date

- **Endpoint:** `GET /travelSnap/filter-by-date`
- **Description:** Filters travel snaps within a specified date range.

## Admin Access

### Admin Authentication

**Description:**
The application supports admin authentication using an admin key. Admins have additional privileges such as viewing all user posts and controlling which posts appear on the main page.

### Admin Login

1. Go to the login page at `/login`
2. Enter your email and password
3. Check the "Admin Login" checkbox (indicated by a lock icon)
4. Enter the admin key in the provided field
5. Click "Sign In"

### Admin Key

- The admin key is set in the backend `.env` file as `ADMIN_KEY`
- Default value: `admin123` (change this in production)

### Admin API Endpoints

#### Verify Admin Key

- **Endpoint:** `POST /auth/verify-admin`
- **Description:** Verifies if the provided admin key is valid.

#### Get All Travel Snaps (Admin)

- **Endpoint:** `GET /travelSnap/admin/all`
- **Description:** Retrieves all travel snaps across all users (admin only).

#### Approve Travel Snap

- **Endpoint:** `PUT /travelSnap/admin/approve/:id`
- **Description:** Toggles the approval status of a travel snap for display on the main page.
