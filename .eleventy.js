module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addFilter("categoryLabel", function (categoryId, categories) {
    const category = categories.find((item) => item.id === categoryId);
    return category ? category.label : categoryId;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist"
    },
    htmlTemplateEngine: "njk",
    templateFormats: ["njk"]
  };
};
