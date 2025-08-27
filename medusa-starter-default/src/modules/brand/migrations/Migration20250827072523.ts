import { Migration } from '@mikro-orm/migrations';

export class Migration20250827072523 extends Migration {

  override async up(): Promise<void> {
    // Add columns as nullable first
    this.addSql(`alter table if exists "brand" add column if not exists "description" text null;`);
    this.addSql(`alter table if exists "brand" add column if not exists "logo" text null;`);
    this.addSql(`alter table if exists "brand" add column if not exists "website" text null;`);
    this.addSql(`alter table if exists "brand" add column if not exists "slug" text null;`);
    this.addSql(`alter table if exists "brand" add column if not exists "active" boolean null;`);
    
    // Update existing records with default values
    this.addSql(`update "brand" set "description" = '' where "description" is null;`);
    this.addSql(`update "brand" set "logo" = '' where "logo" is null;`);
    this.addSql(`update "brand" set "website" = '' where "website" is null;`);
    this.addSql(`update "brand" set "slug" = '' where "slug" is null;`);
    this.addSql(`update "brand" set "active" = true where "active" is null;`);
    
    // Make columns NOT NULL
    this.addSql(`alter table "brand" alter column "description" set not null;`);
    this.addSql(`alter table "brand" alter column "logo" set not null;`);
    this.addSql(`alter table "brand" alter column "website" set not null;`);
    this.addSql(`alter table "brand" alter column "slug" set not null;`);
    this.addSql(`alter table "brand" alter column "active" set not null;`);
    
    // Set default value for active column
    this.addSql(`alter table "brand" alter column "active" set default true;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "brand" drop column if exists "description";`);
    this.addSql(`alter table if exists "brand" drop column if exists "logo";`);
    this.addSql(`alter table if exists "brand" drop column if exists "website";`);
    this.addSql(`alter table if exists "brand" drop column if exists "slug";`);
    this.addSql(`alter table if exists "brand" drop column if exists "active";`);
  }
}
