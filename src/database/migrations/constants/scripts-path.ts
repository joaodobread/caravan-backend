import { join } from 'path';

const SCRIPTS_FOLDER = join(__dirname, '..', 'scripts');

export const SqlScriptPaths = {
  CREATE_SCHEMA_UP: `${SCRIPTS_FOLDER}/1679509394329-create-schema.up.sql`,
  CREATE_SCHEMA_DOWN: `${SCRIPTS_FOLDER}/1679509394329-create-schema.down.sql`,
} as const;
