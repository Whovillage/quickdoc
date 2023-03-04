import memory from "../persistence/memory";

export default defineEventHandler(async () => {
  try {
    console.log("Getting translations");
    return memory.translations;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Failed to get translations",
    });
  }
});
