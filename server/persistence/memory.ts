import fs from "fs";

const memory = JSON.parse(
  fs.readFileSync(process.cwd() + "/server/persistence/db.json", "utf8")
);

export default memory;
