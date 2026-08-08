import { useForm } from "react-hook-form";

const useVideoForm = () => {
  return useForm({
    defaultValues: {
      title: "",
      category: "",
      sourceType: "youtube",

      youtubeUrl: "",

      embedCode: "",

      externalUrl: "",

      shortDescription: "",

      description: "",

      featured: false,

      isActive: true,

      showOnHome: false,

      displayOrder: 0,

      seoTitle: "",

      seoDescription: "",

      seoKeywords: "",

      thumbnail: null,

      videoFile: null,
    },
  });
};

export default useVideoForm;
