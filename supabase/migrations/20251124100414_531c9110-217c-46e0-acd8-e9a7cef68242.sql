-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create cases table
CREATE TABLE public.cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  tags TEXT[] DEFAULT '{}',
  date TEXT NOT NULL,
  link TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on cases
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

-- Anyone can view cases
CREATE POLICY "Anyone can view cases"
ON public.cases
FOR SELECT
TO authenticated, anon
USING (true);

-- Only admins can insert cases
CREATE POLICY "Admins can insert cases"
ON public.cases
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update cases
CREATE POLICY "Admins can update cases"
ON public.cases
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete cases
CREATE POLICY "Admins can delete cases"
ON public.cases
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cases_updated_at
BEFORE UPDATE ON public.cases
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();