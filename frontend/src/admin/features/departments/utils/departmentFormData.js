export const getDepartmentDefaultValues = (department = null) => ({
  name: department?.name || "",
  shortDescription: department?.shortDescription || "",
  description: department?.description || "",
  sortOrder: department?.sortOrder ?? 0,
  featured: department?.featured ?? false,
  status: department?.status ?? true,
  seoTitle: department?.seoTitle || "",
  seoDescription: department?.seoDescription || "",
  seoKeywords: Array.isArray(department?.seoKeywords)
    ? department.seoKeywords.join(", ")
    : department?.seoKeywords || "",
});

export const prepareDepartmentPayload = (values) => ({
  ...values,
  sortOrder: Number(values.sortOrder || 0),
  featured: Boolean(values.featured),
  status: Boolean(values.status),

  seoKeywords:
    typeof values.seoKeywords === "string"
      ? values.seoKeywords
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [],
});
