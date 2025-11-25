-- Migration: Add INSERT policy to allow users to create their own profile
-- Note: Only CREATE POLICY statements are included in this migration per guidelines.

CREATE POLICY "User's can create themselves" ON public.user_profile
FOR INSERT
TO authenticated
WITH CHECK ( (select auth.uid()) = id );
