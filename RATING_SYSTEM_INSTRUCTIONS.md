# Rating System Implementation

## Overview
A complete 5-star rating system has been implemented where clients can rate nunnies and view average ratings.

## Features Implemented

### 1. Database Schema
- **New Rating Model** with fields:
  - `clientId`: Who rated
  - `nunnyUserId`: Who was rated
  - `rating`: 1-5 stars
  - `comment`: Optional text review
  - Unique constraint: One rating per client-nunny pair (can be updated)

### 2. API Routes
- **POST `/api/ratings`**: Submit/update a rating (CLIENT only)
- **GET `/api/nunnies/[id]/ratings`**: Get all ratings for a nunny (includes average)

### 3. Client Dashboard Features
- **Rate Nunny Button**: Alongside "Contact Nunny" button on each nunny card
- **Star Rating Modal**: Interactive 5-star rating interface with hover effects
- **Optional Comment**: Clients can leave written feedback
- **Average Rating Display**: Shows star rating and review count on nunny cards
- **Update Ratings**: Clients can update their previous ratings

### 4. Nunny Dashboard Features
- **Average Rating Badge**: Displayed on profile summary
- **Client Reviews Section**: Shows up to 5 recent reviews with:
  - Client name and profile picture
  - Star rating
  - Comment (if provided)
  - Date posted

## Database Migration

### Step 1: Push Schema Changes
Run this command to update your database:

```bash
npx prisma db push
```

### Step 2: Generate Prisma Client
```bash
npx prisma generate
```

### For Production (Railway)
The migration will be applied automatically on next deployment. Ensure your `DATABASE_URL` environment variable is set correctly.

## Usage

### As a Client:
1. Navigate to your dashboard
2. Browse available nunnies
3. Click "Rate" button on any nunny card
4. Select 1-5 stars
5. (Optional) Add a comment
6. Click "Submit Rating"
7. You can update your rating anytime by clicking "Rate" again

### As a Nunny:
1. View your average rating on your profile summary
2. See client reviews in the "Client Reviews" section
3. Reviews show client names, ratings, comments, and dates

## Technical Details

### Rating Calculation
- Average rating is calculated server-side
- Rounded to 1 decimal place
- Updates in real-time when new ratings are submitted

### Validation
- Only clients can rate nunnies
- Can only rate approved nunnies
- Rating must be between 1-5
- Each client can only have one rating per nunny (upsert logic)

### Security
- JWT authentication required
- Role-based access control
- Unique constraint prevents duplicate ratings

## Files Modified/Created

### New Files:
- `src/app/api/ratings/route.ts`
- `src/app/api/nunnies/[id]/ratings/route.ts`

### Modified Files:
- `prisma/schema.prisma` (Added Rating model)
- `src/app/client/dashboard/page.tsx` (Added rating UI)
- `src/app/nunny/dashboard/page.tsx` (Added reviews display)

## Testing Checklist

- [x] Schema migration applied
- [ ] Client can rate a nunny
- [ ] Rating modal appears with interactive stars
- [ ] Rating submission works
- [ ] Average rating displays on nunny cards
- [ ] Nunny can view their ratings
- [ ] Client can update their rating
- [ ] Only clients can submit ratings
- [ ] Cannot rate unapproved nunnies

## Future Enhancements (Optional)

1. **Email Notifications**: Notify nunnies when they receive a rating
2. **Verification Badge**: Show "Verified Review" for clients who have completed a job
3. **Rating Filters**: Filter nunnies by rating range
4. **Response to Reviews**: Allow nunnies to respond to reviews
5. **Report System**: Flag inappropriate reviews
6. **Rating Analytics**: Show rating trends over time
