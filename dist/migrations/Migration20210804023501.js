"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20210804023501 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20210804023501 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null);');
    }
}
exports.Migration20210804023501 = Migration20210804023501;
//# sourceMappingURL=Migration20210804023501.js.map