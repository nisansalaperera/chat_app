import postgres from "https://deno.land/x/postgresjs@v3.4.4/mod.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({
    host: "localhost:5432",
    database: "database",
    username: "username",
    password: "password",
    port: 5432,
    max: 2,
  });
}

export { sql };
