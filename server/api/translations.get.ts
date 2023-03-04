import memory from "../persistence/memory";

export default defineEventHandler(async () => {
  try {
    console.log("Getting translations");
    const allTranslations = JSON.stringify(memory);
    return allTranslations;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Failed to get translations",
    });
  }
});
