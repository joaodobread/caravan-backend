import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedSchema1679793846396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.vehicle_types (id,name,slug,created_date,updated_date,deleted_date) VALUES
            ('85441097-eb0e-49d9-9f1a-3c34b7cc7b55','Carro','car','2023-03-25 22:25:43.967',NULL,NULL),
            ('a01a320b-8e34-4523-a433-2ff8990ccd97','Ônibus','bus','2023-03-25 22:25:43.973',NULL,NULL),
            ('3ca6d418-bd4b-4c06-b617-8f128cf55894','Van','van','2023-03-25 22:25:43.974',NULL,NULL);

        INSERT INTO public.ride_request_modes (id,"name",slug,created_date,updated_date,deleted_date) VALUES
            ('0e865883-655e-4030-b090-b2cc5d18ab19','Pedido','request','2023-03-25 22:29:39.305',NULL,NULL),
            ('69e8c3ce-839e-4ca2-b617-806587aea627','Oferta','offer','2023-03-25 22:29:39.309',NULL,NULL);

        INSERT INTO public.ride_types (id,"name",slug,description,created_date,updated_date,deleted_date) VALUES
            ('c91df18c-5ee3-42ec-bb36-d45688e9f744','Normal','normal','Corrida em carros particulares para distâncias curtas e viagens rápidas. Recomendado para viagens entre cidades onde não há compromisso de volta.','2023-03-25 22:33:07.623',NULL,NULL),
            ('9b9fd3a2-8fc3-49bf-82b0-f7089a380a8a','Caravana','caravan','Corrida em carros com maior porte, ideal para viagens de eventos entre faculdades, palestras e conferências.','2023-03-25 22:33:07.625',NULL,NULL);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM public.vehicle_types WHERE id='85441097-eb0e-49d9-9f1a-3c34b7cc7b55'::uuid;
      DELETE FROM public.vehicle_types WHERE id='a01a320b-8e34-4523-a433-2ff8990ccd97'::uuid;
      DELETE FROM public.vehicle_types WHERE id='3ca6d418-bd4b-4c06-b617-8f128cf55894'::uuid;

      DELETE FROM public.ride_request_modes WHERE id='0e865883-655e-4030-b090-b2cc5d18ab19'::uuid;
      DELETE FROM public.ride_request_modes WHERE id='69e8c3ce-839e-4ca2-b617-806587aea627'::uuid;

      DELETE FROM public.ride_types WHERE id='c91df18c-5ee3-42ec-bb36-d45688e9f744'::uuid;
      DELETE FROM public.ride_types WHERE id='9b9fd3a2-8fc3-49bf-82b0-f7089a380a8a'::uuid;
    `);
  }
}
