import {
  IsBooleanString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export class EnvironmentSchema {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsOptional()
  @IsBooleanString()
  FASTIFY_LOGGER: string;

  // Fastify
  @IsNumber()
  FASTIFY_LIMITS_FIELD_SIZE: number;

  @IsNumber()
  FASTIFY_LIMITS_FILE_SIZE: number;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_PORT: string;
  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;

  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsString()
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;

  @IsString()
  JWT_ACCESS_TOKEN_ISSUER: string;
}
