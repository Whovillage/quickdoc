import AppConfig from "../AppConfig";

export default defineEventHandler(async (event) => {
  try {
    console.log("Adding corrected summary");
    const db = AppConfig.db;
    const { id, text } = await readBody(event);

    const { error } = await db
      .from("translations")
      .update([{ corrected_summary: text }])
      .eq("string_id", id);

    if (error) {
      console.log("Database error", error);
      throw createError({
        statusCode: 500,
        message: "Failed to add corrected summary",
      });
    }
    console.log("Successfully added corrected summary for entry: ", id);
    return "Successfully added corrected summary";
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Failed to add corrected summary",
    });
  }
});
