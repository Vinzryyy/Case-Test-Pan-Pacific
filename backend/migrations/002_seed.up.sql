INSERT INTO hero_slides (spotlight, location, title, tags, image, display_order) VALUES
('February Spotlight', 'Australia', 'Travel guide to Melbourne PARKROYAL Monash',
  ARRAY['Solo Traveller','First-Timer','Lifestyle','Road Trip'], '/HomePage.jpg', 1),
('January Spotlight', 'Singapore', 'A weekend in Sentosa: family food, beach walks and night shows',
  ARRAY['Family','City Break','Food & Drink','Lifestyle'], '/Destination/Singapore.jpg', 2),
('March Spotlight', 'Canada', 'Whistler winter honeymoon and babymoon escape ideas',
  ARRAY['Couple','Winter','Honey Moon','Nature'], '/card-road-trips.png', 3),
('April Spotlight', 'Malaysia', 'Kuala Lumpur skyline, late-night markets and rooftop escapes',
  ARRAY['City','Night Life','Culture','Food & Drink'], '/Destination/Malaysia.jpg', 4)
ON CONFLICT DO NOTHING;

INSERT INTO destinations (name, image) VALUES
('Singapore', '/Destination/Singapore.jpg'),
('Australia', '/Destination/ausie.png'),
('Malaysia',  '/Destination/Malaysia.jpg'),
('China',     '/Destination/China.jpg'),
('Canada',    '/Destination/Canada.jpg')
ON CONFLICT (name) DO NOTHING;

INSERT INTO journeys (category, location, title, image) VALUES
('Road Trips',         'Canada',    'Highway dreaming through the Canadian Rockies', '/card-road-trips.png'),
('Photo Journal',      'Singapore', 'An afternoon photo walk across Sentosa',         '/Istock.jpg'),
('Romantic',           'Canada',    'Whistler candlelit suites for two',              '/Destination/Canada.jpg'),
('Family Bonding',     'Malaysia',  'KL aquarium and tower views with the kids',      '/Destination/Malaysia.jpg'),
('Sustainable Travel', 'Australia', 'Slow-paced eco trails around Melbourne',         '/Destination/ausie.png'),
('Jet Setting',        'Singapore', 'Business-class layover luxury guide',            '/Destination/Singapore.jpg'),
('Photo Journal',      'China',     'Great Wall at sunrise, frame by frame',          '/Destination/China.jpg')
ON CONFLICT DO NOTHING;
