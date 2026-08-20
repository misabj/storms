-- Migration 003: per-unit media + per-room area breakdown
-- Ensures units can store 2D/3D images and adds a table for room-by-room areas.

-- units.image (3D/foto) and units.floorPlanImage (2D osnova) already exist in schema.sql.
-- If an older database is missing them, run the two ALTER statements below manually:
-- ALTER TABLE units ADD COLUMN image VARCHAR(500) NULL AFTER description;
-- ALTER TABLE units ADD COLUMN floorPlanImage VARCHAR(500) NULL AFTER image;

CREATE TABLE IF NOT EXISTS unit_rooms (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  unitId BIGINT UNSIGNED NOT NULL,
  name VARCHAR(160) NOT NULL,
  area DECIMAL(10,2) NOT NULL,
  sortOrder INT NOT NULL DEFAULT 0,
  CONSTRAINT fk_unit_rooms_unit FOREIGN KEY (unitId) REFERENCES units(id) ON DELETE CASCADE,
  INDEX idx_unit_rooms_order (unitId, sortOrder)
) ENGINE=InnoDB;
