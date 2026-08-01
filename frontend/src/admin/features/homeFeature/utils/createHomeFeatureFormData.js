export default function createHomeFeatureFormData(values) {
  return {
    title: values.title,
    subtitle: values.subtitle,
    icon: values.icon,
    link: values.link,
    displayOrder: Number(values.displayOrder),
    status: values.status,
  };
}
