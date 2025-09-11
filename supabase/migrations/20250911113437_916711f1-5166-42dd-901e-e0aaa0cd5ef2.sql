-- Create tourists table
CREATE TABLE public.tourists (
    id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    tourist_id text NOT NULL UNIQUE,
    name text NOT NULL,
    citizenship text NOT NULL,
    passport_number text,
    aadhaar_number text,
    phone text NOT NULL,
    emergency_contact text NOT NULL,
    entry_point text NOT NULL,
    purpose text NOT NULL,
    trip_start_date date NOT NULL,
    trip_end_date date NOT NULL,
    current_lat numeric(10, 8),
    current_lng numeric(11, 8),
    safety_score integer DEFAULT 5,
    risk_level text DEFAULT 'LOW' CHECK (risk_level IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    is_active boolean DEFAULT true,
    is_tracked boolean DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tourists ENABLE ROW LEVEL SECURITY;

-- Create policies for tourist access
CREATE POLICY "Authenticated users can view all tourists" 
ON public.tourists 
FOR SELECT 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert tourists" 
ON public.tourists 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update tourists" 
ON public.tourists 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_tourists_updated_at
BEFORE UPDATE ON public.tourists
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_tourists_tourist_id ON public.tourists(tourist_id);
CREATE INDEX idx_tourists_citizenship ON public.tourists(citizenship);
CREATE INDEX idx_tourists_risk_level ON public.tourists(risk_level);
CREATE INDEX idx_tourists_location ON public.tourists(current_lat, current_lng);
CREATE INDEX idx_tourists_active ON public.tourists(is_active);

-- Insert sample tourist data
INSERT INTO public.tourists (
    tourist_id, name, citizenship, passport_number, aadhaar_number, phone, emergency_contact, 
    entry_point, purpose, trip_start_date, trip_end_date, current_lat, current_lng, 
    safety_score, risk_level, is_active, is_tracked
) VALUES 
-- Tourist 1: American in city center
('0x1a2b3c4d5e6f7890abcdef1234567890abcdef12', 'John Smith', 'American', 'US123456789', NULL, '+1-555-0123', '+1-555-0124', 'Dimapur Airport', 'Adventure Tourism', '2024-01-15', '2024-01-25', 25.6751, 94.1086, 8, 'LOW', TRUE, TRUE),

-- Tourist 2: Indian near heritage site
('0x2b3c4d5e6f7890abcdef1234567890abcdef123', 'Priya Patel', 'Indian', NULL, '123456789012', '+91-9876543210', '+91-9876543211', 'Kohima Railway Station', 'Cultural Tourism', '2024-01-14', '2024-01-20', 25.6740, 94.1095, 7, 'LOW', TRUE, TRUE),

-- Tourist 3: British near market
('0x3c4d5e6f7890abcdef1234567890abcdef1234', 'Emily Johnson', 'British', 'GB987654321', NULL, '+44-7890-123456', '+44-7890-123457', 'Dimapur Airport', 'Nature Photography', '2024-01-16', '2024-01-28', 25.6755, 94.1070, 9, 'LOW', TRUE, TRUE),

-- Tourist 4: German near border (higher risk area)
('0x4d5e6f7890abcdef1234567890abcdef12345', 'Hans Mueller', 'German', 'DE456789123', NULL, '+49-30-12345678', '+49-30-12345679', 'Dimapur Airport', 'Trekking', '2024-01-12', '2024-01-22', 25.6920, 94.0820, 5, 'MEDIUM', TRUE, TRUE),

-- Tourist 5: Japanese in safe zone
('0x5e6f7890abcdef1234567890abcdef123456', 'Yuki Tanaka', 'Japanese', 'JP789123456', NULL, '+81-90-1234-5678', '+81-90-1234-5679', 'Kohima Bus Station', 'Cultural Exchange', '2024-01-17', '2024-01-24', 25.6730, 94.1100, 8, 'LOW', TRUE, TRUE),

-- Tourist 6: Australian near war memorial
('0x6f7890abcdef1234567890abcdef1234567', 'Sarah Wilson', 'Australian', 'AU321654987', NULL, '+61-4-1234-5678', '+61-4-1234-5679', 'Dimapur Airport', 'Historical Tourism', '2024-01-13', '2024-01-23', 25.6762, 94.1088, 7, 'LOW', TRUE, TRUE),

-- Tourist 7: Canadian exploring outskirts
('0x7890abcdef1234567890abcdef12345678', 'Michael Brown', 'Canadian', 'CA654987321', NULL, '+1-416-123-4567', '+1-416-123-4568', 'Dimapur Airport', 'Adventure Sports', '2024-01-18', '2024-01-30', 25.6810, 94.1050, 6, 'MEDIUM', TRUE, TRUE),

-- Tourist 8: French near restricted zone
('0x890abcdef1234567890abcdef123456789', 'Marie Dubois', 'French', 'FR147258369', NULL, '+33-6-12-34-56-78', '+33-6-12-34-56-79', 'Kohima Railway Station', 'Research', '2024-01-11', '2024-01-21', 25.6880, 94.0850, 4, 'HIGH', TRUE, TRUE),

-- Tourist 9: Indian from Mumbai
('0x90abcdef1234567890abcdef1234567890', 'Rajesh Kumar', 'Indian', NULL, '987654321098', '+91-9123456789', '+91-9123456790', 'Dimapur Airport', 'Business Tourism', '2024-01-19', '2024-01-26', 25.6745, 94.1080, 8, 'LOW', TRUE, TRUE),

-- Tourist 10: South Korean in city center
('0xabcdef1234567890abcdef1234567890ab', 'Kim Min-jun', 'South Korean', 'KR963852741', NULL, '+82-10-1234-5678', '+82-10-1234-5679', 'Dimapur Airport', 'Cultural Tourism', '2024-01-20', '2024-01-27', 25.6748, 94.1092, 9, 'LOW', TRUE, TRUE);