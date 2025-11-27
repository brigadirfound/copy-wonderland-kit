-- Create storage bucket for case images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('case-images', 'case-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for case images
CREATE POLICY "Anyone can view case images"
ON storage.objects FOR SELECT
USING (bucket_id = 'case-images');

CREATE POLICY "Admins can upload case images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'case-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update case images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'case-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete case images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'case-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);