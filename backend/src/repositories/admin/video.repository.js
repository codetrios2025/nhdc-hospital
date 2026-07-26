const Video = require("../../models/Video");

class VideoRepository {
  create(data) {
    return Video.create(data);
  }

  findBySlug(slug) {
    return Video.findOne({
      slug,
      isDeleted: false,
    });
  }

  findById(id) {
    return Video.findOne({
      _id: id,
      isDeleted: false,
    });
  }

  update(id, data) {
    return Video.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  softDelete(id, adminId) {
    return Video.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: adminId,
      },
      {
        returnDocument: "after",
      },
    );
  }

  changeStatus(id, isActive) {
    return Video.findByIdAndUpdate(
      id,
      { isActive },
      {
        returnDocument: "after",
      },
    );
  }

  toggleFeatured(id, featured) {
    return Video.findByIdAndUpdate(
      id,
      { featured },
      {
        returnDocument: "after",
      },
    );
  }

  async getList(filters) {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      status,
      featured,
      sort = "displayOrder",
      order = "asc",
    } = filters;

    const query = {
      isDeleted: false,
    };

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (status !== undefined && status !== "") {
      query.isActive = status === "true";
    }

    if (featured !== undefined && featured !== "") {
      query.featured = featured === "true";
    }

    const total = await Video.countDocuments(query);

    const videos = await Video.find(query)
      .sort({
        [sort]: order === "asc" ? 1 : -1,
      })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return {
      videos,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    };
  }
}

module.exports = new VideoRepository();
