import AppConfig from "../AppConfig";

export default defineEventHandler(async () => {
  try {
    console.log("Getting translations");
    const db = AppConfig.db;

    let { data: translations, error } = await db
      .from("translations")
      .select("*");

    if (error) {
      console.log("Database error", error);
      throw createError({
        statusCode: 500,
        message: "Failed to get translations",
      });
    }

    return translations;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Failed to get translations",
    });
  }
});
