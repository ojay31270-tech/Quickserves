# QuickServe Architectural Blueprint

## 1. Entity Relationship Diagram (ERD)

### Entities

1. **Users**:
   - `id` (UUID, Primary Key)
   - `email` (Unique)
   - `role` (Enum: `consumer`, `vendor`, `rider`, `admin`)
   - `created_at`
   - `updated_at`

2. **Profiles**:
   - `id` (UUID, Primary Key, FK to `Users.id`)
   - `name`
   - `phone_number`
   - `address` (JSON for flexibility)
   - `avatar_url`
   - `created_at`
   - `updated_at`

3. **Subscriptions**:
   - `id` (UUID, Primary Key)
   - `user_id` (FK to `Users.id`)
   - `plan` (Enum: `weekly`, `monthly`)
   - `status` (Enum: `active`, `paused`, `cancelled`)
   - `start_date`
   - `end_date`
   - `created_at`
   - `updated_at`

4. **Orders**:
   - `id` (UUID, Primary Key)
   - `user_id` (FK to `Users.id`)
   - `vendor_id` (FK to `Vendors.id`)
   - `status` (Enum: `pending`, `in_progress`, `completed`, `cancelled`)
   - `total_price`
   - `created_at`
   - `updated_at`

5. **Vendors**:
   - `id` (UUID, Primary Key)
   - `user_id` (FK to `Users.id`)
   - `name`
   - `menu` (JSON for menu items)
   - `created_at`
   - `updated_at`

6. **Riders**:
   - `id` (UUID, Primary Key)
   - `user_id` (FK to `Users.id`)
   - `current_location` (JSON: latitude, longitude)
   - `assigned_orders` (Array of UUIDs, FK to `Orders.id`)
   - `wallet_balance`
   - `created_at`
   - `updated_at`

### Relationships

- **Users** are the central entity, with `Profiles`, `Subscriptions`, `Orders`, `Vendors`, and `Riders` branching out.
- **Subscriptions** are tied to `Users` (consumers only).
- **Orders** link `Users` (consumers), `Vendors`, and `Riders`.
- **Vendors** and **Riders** are specialized roles of `Users`.

---

## 2. State Management Strategy

### Supabase Realtime Across 3 Client Environments

1. **Consumer App**:
   - **State Management**: Use `React Context` or `Zustand` for local state, and Supabase Realtime for syncing subscription and order updates.
   - **Realtime Channels**:
     - `subscriptions:user_id`: Consumers subscribe to their own subscription updates.
     - `orders:user_id`: Consumers subscribe to their own order updates.

2. **Vendor App**:
   - **State Management**: Use `React Query` for data fetching and caching, and Supabase Realtime for live updates.
   - **Realtime Channels**:
     - `orders:vendor_id`: Vendors subscribe to incoming orders in real time.
     - `menu:vendor_id`: Vendors subscribe to menu updates.

3. **Rider App**:
   - **State Management**: Use `Zustand` for local state and Supabase Realtime for live GPS updates and assigned orders.
   - **Realtime Channels**:
     - `orders:rider_id`: Riders subscribe to their assigned orders.
     - `riders:rider_id`: Riders broadcast their GPS location.

4. **Admin Panel**:
   - **State Management**: Use `Redux` for global state and Supabase Realtime for finance and logistics updates.
   - **Realtime Channels**:
     - `orders`: Admins monitor all orders.
     - `riders`: Admins monitor rider locations.
     - `finance`: Admins track commission and revenue.

---

## 3. Security Policy (RLS) Strategy

### Row-Level Security (RLS) Policies

Supabase RLS ensures data isolation and security. Below are the policies for each role:

1. **Consumers**:
   - **Policy**: Consumers can only access their own data.

   ```sql
   CREATE POLICY "Consumers can access their data"
   ON profiles
   FOR SELECT USING (auth.uid() = id);
   ```

2. **Vendors**:
   - **Policy**: Vendors can only access their menu and orders.

   ```sql
   CREATE POLICY "Vendors can access their data"
   ON orders
   FOR SELECT USING (auth.uid() = vendor_id);
   ```

3. **Riders**:
   - **Policy**: Riders can only access assigned orders.

   ```sql
   CREATE POLICY "Riders can access assigned orders"
   ON orders
   FOR SELECT USING (auth.uid() = ANY(assigned_orders));
   ```

4. **Admins**:
   - **Policy**: Admins have unrestricted access.

   ```sql
   CREATE POLICY "Admins can access all data"
   ON ALL TABLES
   FOR ALL USING (auth.role() = 'admin');
   ```

---

## 4. Vercel Deployment Strategy

### Environment Variables

- Use Vercel’s environment variable management to handle `NEXT_PUBLIC_SITE_URL` for each app.
- Define separate environments for `development`, `preview`, and `production`.

### Domains

- **Consumer App**: `consumer.quickserve.com`
- **Vendor App**: `vendor.quickserve.com`
- **Rider App**: `rider.quickserve.com`
- **Admin Panel**: `admin.quickserve.com`

### Configuration

1. **Environment-Specific Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL`

2. **Vercel Project Settings**:
   - Link each app to its respective Git branch.
   - Use Vercel’s `rewrites` and `redirects` for subdomain routing.

3. **Build Optimization**:
   - Use TurboRepo to optimize builds across the monorepo.
   - Cache shared libraries (e.g., `ui`, `hooks`) to speed up deployments.

4. **Monitoring**:
   - Use Vercel Analytics to monitor performance.
   - Integrate Sentry for error tracking.

---

This blueprint provides a scalable architecture for your QuickServe Monorepo. Let me know if you need further details or implementation assistance!
