import flushtoDB from "~~/utils/flushToDB";
import memory from "../persistence/memory";

export default defineEventHandler(async (event) => {
  try {
    console.log("Adding corrected summary");
    const { id, text } = await readBody(event);
    const index = memory.translations.findIndex((translation: any) => {
      return translation.id === id;
    });
    memory.translations[index].correctedSummary = text;
    flushtoDB(memory);
    return "Successfully added corrected summary";
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Failed to add corrected summary",
    });
  }
});