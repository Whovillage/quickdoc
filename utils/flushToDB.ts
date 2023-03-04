import { writeFileSync } from "fs";

const flushtoDB = async (data: any) => {
  writeFileSync(
    process.cwd() + "/server/persistence/db.json",
    JSON.stringify(data, null, 2),
    "utf8"
  );
};

export default flushtoDB;
