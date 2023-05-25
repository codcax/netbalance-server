import { Migration } from '@mikro-orm/migrations';

export class Migration20230524010811_create_plans_table extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "plan" ("id" serial primary key, "name" text check ("name" in (\'FREE\', \'BASIC\', \'PRO\')) not null, "price" int not null default 0, "wallet_limit" int not null default 0, "budget_limit" int not null default 0, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "plan" cascade;');
  }
}
