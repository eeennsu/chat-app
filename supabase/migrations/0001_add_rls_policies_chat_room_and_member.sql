-- Migration: Add Row Level Security policies for chat_room and chat_room_member
--
-- NOTE: This migration only contains CREATE POLICY statements per the repo's policy
-- guidelines. It assumes RLS has already been enabled on these tables.

-- Allow authenticated users to read public chat rooms
CREATE POLICY "Read public chat rooms" ON public.chat_room
FOR SELECT
TO authenticated
USING ( is_public = true );

-- chat_room_member policies
-- Allow authenticated users to read their own membership rows
CREATE POLICY "Users can select their own chat room membership" ON public.chat_room_member
FOR SELECT
TO authenticated
USING ( (select auth.uid()) = member_id );

-- Allow authenticated users to add themselves to public rooms only
CREATE POLICY "Users can add themselves to public rooms" ON public.chat_room_member
FOR INSERT
TO authenticated
WITH CHECK (
  (select auth.uid()) = member_id
  AND (
    -- Ensure the chat room they are joining is public
    (select is_public from public.chat_room where id = chat_room_id) = true
  )
);

-- Allow authenticated users to remove themselves from rooms
CREATE POLICY "Users can delete their own chat room membership" ON public.chat_room_member
FOR DELETE
TO authenticated
USING ( (select auth.uid()) = member_id );

-- Optional: allow users to update only their own membership rows
CREATE POLICY "Users can update their own chat room membership" ON public.chat_room_member
FOR UPDATE
TO authenticated
USING ( (select auth.uid()) = member_id )
WITH CHECK ( (select auth.uid()) = member_id );
