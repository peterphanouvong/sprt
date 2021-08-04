import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { MikroORM } from "@mikro-orm/core";
import path from "path";

export default {
  entities: [Post, User],
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  dbName: "booking",
  type: "postgresql",
  debug: !__prod__,
  user: "peterphanouvong",
  password: "",
} as Parameters<typeof MikroORM.init>[0];
