USE storms;

ALTER TABLE projects
  ADD COLUMN titleEn VARCHAR(180) NULL AFTER seoDescription,
  ADD COLUMN subtitleEn VARCHAR(255) NULL AFTER titleEn,
  ADD COLUMN shortDescriptionEn TEXT NULL AFTER subtitleEn,
  ADD COLUMN descriptionEn LONGTEXT NULL AFTER shortDescriptionEn,
  ADD COLUMN locationDescriptionEn TEXT NULL AFTER descriptionEn,
  ADD COLUMN seoTitleEn VARCHAR(190) NULL AFTER locationDescriptionEn,
  ADD COLUMN seoDescriptionEn VARCHAR(320) NULL AFTER seoTitleEn;

UPDATE projects SET
  titleEn = CASE slug
    WHEN 'dobracina-residence' THEN 'Dobračina Residence'
    WHEN 'k-district-office' THEN 'K District Office'
    WHEN 'skyline-penthouse' THEN 'The Belgrade Penthouse'
    WHEN 'vracar-gardens' THEN 'Vračar Gardens' END,
  subtitleEn = CASE slug
    WHEN 'dobracina-residence' THEN 'The contemporary rhythm of Dorćol'
    WHEN 'k-district-office' THEN 'A place for ideas'
    WHEN 'skyline-penthouse' THEN 'A private horizon'
    WHEN 'vracar-gardens' THEN 'Architecture for a quiet street' END,
  shortDescriptionEn = CASE slug
    WHEN 'dobracina-residence' THEN 'Considered living in Belgrade''s historic heart.'
    WHEN 'k-district-office' THEN 'Flexible commercial space designed for a new way of working.'
    WHEN 'skyline-penthouse' THEN 'An exceptional residence with uninterrupted views across the city and its rivers.'
    WHEN 'vracar-gardens' THEN 'A completed urban residence with private gardens.' END;

UPDATE projects SET heroImage='/images/lux/penthouse-blue-hour.webp' WHERE slug='skyline-penthouse';
