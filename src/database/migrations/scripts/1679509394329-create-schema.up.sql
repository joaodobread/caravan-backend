-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.1
-- PostgreSQL version: 15.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: caravan | type: DATABASE --
-- DROP DATABASE IF EXISTS caravan;
-- CREATE DATABASE caravan;
-- ddl-end --


-- object: public.templates | type: TABLE --
-- DROP TABLE IF EXISTS public.templates CASCADE;
CREATE TABLE public.templates (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__templates PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.templates OWNER TO postgres;
-- ddl-end --

-- object: public.users | type: TABLE --
-- DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	first_name varchar(300) NOT NULL,
	last_name varchar(300) NOT NULL,
	university_registration varchar(50) NOT NULL,
	username varchar(300) NOT NULL,
	password varchar(300) NOT NULL,
	rating_count integer,
	rating_total float,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__users PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.users OWNER TO postgres;
-- ddl-end --

-- object: idx__uq__users__username | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__users__username CASCADE;
CREATE INDEX idx__uq__users__username ON public.users
USING btree
(
	username,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__users__username | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__users__username CASCADE;
CREATE UNIQUE INDEX idx__part__uq__users__username ON public.users
USING btree
(
	username
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: public.ride_types | type: TABLE --
-- DROP TABLE IF EXISTS public.ride_types CASCADE;
CREATE TABLE public.ride_types (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(300) NOT NULL,
	slug varchar(300) NOT NULL,
	description varchar(500),
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__ride_types PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON TABLE public.ride_types IS E'The type of the ride: CARAVAN or NORMAL';
-- ddl-end --
ALTER TABLE public.ride_types OWNER TO postgres;
-- ddl-end --

-- object: idx__uq__name | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__name CASCADE;
CREATE INDEX idx__uq__name ON public.ride_types
USING btree
(
	name
);
-- ddl-end --

-- object: public.rides | type: TABLE --
-- DROP TABLE IF EXISTS public.rides CASCADE;
CREATE TABLE public.rides (
	id uuid NOT NULL,
	id_users uuid,
	id_ride_types uuid,
	id_ride_request_modes uuid,
	id_vehicles uuid,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	start_at timestamptz NOT NULL,
	start_latitude double precision NOT NULL,
	start_longitude double precision NOT NULL,
	end_latitude double precision NOT NULL,
	end_longitude double precision NOT NULL,
	vacancies smallint NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__rides PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.rides OWNER TO postgres;
-- ddl-end --

-- object: users_fk | type: CONSTRAINT --
-- ALTER TABLE public.rides DROP CONSTRAINT IF EXISTS users_fk CASCADE;
ALTER TABLE public.rides ADD CONSTRAINT users_fk FOREIGN KEY (id_users)
REFERENCES public.users (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.ride_passengers | type: TABLE --
-- DROP TABLE IF EXISTS public.ride_passengers CASCADE;
CREATE TABLE public.ride_passengers (
	id uuid NOT NULL,
	id_users uuid,
	id_rides uuid,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__passengers PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.ride_passengers OWNER TO postgres;
-- ddl-end --

-- object: users_fk | type: CONSTRAINT --
-- ALTER TABLE public.ride_passengers DROP CONSTRAINT IF EXISTS users_fk CASCADE;
ALTER TABLE public.ride_passengers ADD CONSTRAINT users_fk FOREIGN KEY (id_users)
REFERENCES public.users (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: rides_fk | type: CONSTRAINT --
-- ALTER TABLE public.ride_passengers DROP CONSTRAINT IF EXISTS rides_fk CASCADE;
ALTER TABLE public.ride_passengers ADD CONSTRAINT rides_fk FOREIGN KEY (id_rides)
REFERENCES public.rides (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.ride_request_modes | type: TABLE --
-- DROP TABLE IF EXISTS public.ride_request_modes CASCADE;
CREATE TABLE public.ride_request_modes (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(300) NOT NULL,
	slug varchar(300) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__ride_request_modes PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON TABLE public.ride_request_modes IS E'the type of the ride request: OFFER or REQUEST';
-- ddl-end --
ALTER TABLE public.ride_request_modes OWNER TO postgres;
-- ddl-end --

-- object: ride_types_fk | type: CONSTRAINT --
-- ALTER TABLE public.rides DROP CONSTRAINT IF EXISTS ride_types_fk CASCADE;
ALTER TABLE public.rides ADD CONSTRAINT ride_types_fk FOREIGN KEY (id_ride_types)
REFERENCES public.ride_types (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: ride_request_modes_fk | type: CONSTRAINT --
-- ALTER TABLE public.rides DROP CONSTRAINT IF EXISTS ride_request_modes_fk CASCADE;
ALTER TABLE public.rides ADD CONSTRAINT ride_request_modes_fk FOREIGN KEY (id_ride_request_modes)
REFERENCES public.ride_request_modes (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: public.vehicles | type: TABLE --
-- DROP TABLE IF EXISTS public.vehicles CASCADE;
CREATE TABLE public.vehicles (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	id_vehicle_types uuid,
	id_users uuid,
	license_plate varchar(20) NOT NULL,
	color varchar(300) NOT NULL,
	model varchar(100) NOT NULL,
	brand varchar(100) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__vehicles PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.vehicles OWNER TO postgres;
-- ddl-end --

-- object: public.vehicle_types | type: TABLE --
-- DROP TABLE IF EXISTS public.vehicle_types CASCADE;
CREATE TABLE public.vehicle_types (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(300) NOT NULL,
	slug varchar(300) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__vehicle_types PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE public.vehicle_types OWNER TO postgres;
-- ddl-end --

-- object: vehicle_types_fk | type: CONSTRAINT --
-- ALTER TABLE public.vehicles DROP CONSTRAINT IF EXISTS vehicle_types_fk CASCADE;
ALTER TABLE public.vehicles ADD CONSTRAINT vehicle_types_fk FOREIGN KEY (id_vehicle_types)
REFERENCES public.vehicle_types (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: users_fk | type: CONSTRAINT --
-- ALTER TABLE public.vehicles DROP CONSTRAINT IF EXISTS users_fk CASCADE;
ALTER TABLE public.vehicles ADD CONSTRAINT users_fk FOREIGN KEY (id_users)
REFERENCES public.users (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: vehicles_fk | type: CONSTRAINT --
-- ALTER TABLE public.rides DROP CONSTRAINT IF EXISTS vehicles_fk CASCADE;
ALTER TABLE public.rides ADD CONSTRAINT vehicles_fk FOREIGN KEY (id_vehicles)
REFERENCES public.vehicles (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


