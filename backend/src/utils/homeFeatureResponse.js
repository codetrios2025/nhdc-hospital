const homeFeatureResponse = (feature) => {
  if (Array.isArray(feature)) {
    return feature.map(homeFeatureResponse);
  }

  if (!feature) {
    return null;
  }

  return {
    _id: feature._id,

    title: feature.title,

    subtitle: feature.subtitle,

    icon: feature.icon,

    link: feature.link,

    displayOrder: feature.displayOrder,

    status: feature.status,

    createdAt: feature.createdAt,

    updatedAt: feature.updatedAt,
  };
};

module.exports = homeFeatureResponse;
