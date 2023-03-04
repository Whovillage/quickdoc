import { writeFileSync } from "fs";

const flushtoFile = async (data: any) => {
  writeFileSync(
    "./server/persistence/db.json",
    JSON.stringify(data, null, 2),
    "utf8"
  );
};

export default flushtoFile;
