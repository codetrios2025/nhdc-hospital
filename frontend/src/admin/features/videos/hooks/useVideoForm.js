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

      thumbnail: null,

      videoFile: null,
    },
  });
};

export default useVideoForm;
