"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210804040116 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210804040116 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "password" text not null);');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    }
}
exports.Migration20210804040116 = Migration20210804040116;
//# sourceMappingURL=Migration20210804040116.js.map