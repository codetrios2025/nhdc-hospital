const createDiagnosticFormData = (values) => ({
  title: values.title,
  shortDescription: values.shortDescription,
  icon: values.icon,
  iconColor: values.iconColor,
  link: values.link,
  displayOrder: Number(values.displayOrder),
  status: values.status,
});

export default createDiagnosticFormData;
