-- Update RLS policies for case-videos storage bucket to restrict access to admins only

-- Drop existing policies for case-videos bucket
DROP POLICY IF EXISTS "Anyone can view case videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload case videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update case videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete case videos" ON storage.objects;

-- Create new admin-only policies for case-videos bucket
CREATE POLICY "Anyone can view case videos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'case-videos');

CREATE POLICY "Admins can upload case videos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'case-videos' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update case videos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'case-videos' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete case videos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'case-videos' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);