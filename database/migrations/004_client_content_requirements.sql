-- Migration 004: team departments and flexible unit pricing.
-- Run once on existing databases before editing these fields in administration.

ALTER TABLE team_members
  ADD COLUMN department ENUM('DIRECTORS','ARCHITECTS','CONSTRUCTION','ADMINISTRATION')
  NOT NULL DEFAULT 'ADMINISTRATION' AFTER role;

UPDATE team_members
SET department = CASE
  WHEN LOWER(role) LIKE '%direktor%' OR LOWER(role) LIKE '%director%' THEN 'DIRECTORS'
  WHEN LOWER(role) LIKE '%arhitekt%' OR LOWER(role) LIKE '%architect%' THEN 'ARCHITECTS'
  WHEN LOWER(role) LIKE '%građev%' OR LOWER(role) LIKE '%gradjev%' OR LOWER(role) LIKE '%inženjer%' OR LOWER(role) LIKE '%engineer%' THEN 'CONSTRUCTION'
  ELSE 'ADMINISTRATION'
END;

ALTER TABLE units
  ADD COLUMN pricePerSquareMeter DECIMAL(12,2) NULL AFTER price;

ALTER TABLE projects
  ADD COLUMN phase ENUM('DESIGN','CONSTRUCTION','COMPLETED')
  NOT NULL DEFAULT 'CONSTRUCTION' AFTER status;
