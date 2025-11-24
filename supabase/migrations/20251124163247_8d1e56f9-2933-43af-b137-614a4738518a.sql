-- Add additional_images column to cases table
ALTER TABLE public.cases
ADD COLUMN additional_images text[] DEFAULT ARRAY[]::text[];