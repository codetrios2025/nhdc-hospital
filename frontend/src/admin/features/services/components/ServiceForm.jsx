import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import useServiceForm from "../hooks/useServiceForm";

import ServiceBasicInfo from "./ServiceBasicInfo";
import ServiceContent from "./ServiceContent";
import ServiceFeatures from "./ServiceFeatures";
import ServiceImage from "./ServiceImage";
import ServiceSeo from "./ServiceSeo";
import ServiceSettings from "./ServiceSettings";
import ServiceGallery from "./ServiceGallery";

import {
  createService,
  updateService,
} from "../../../redux/thunks/serviceThunk";

import createServiceFormData from "../utils/createServiceFormData";
import updateServiceFormData from "../utils/updateServiceFormData";

import { deleteServiceGalleryImage } from "../../../redux/thunks/serviceThunk";

const ServiceForm = ({ serviceId = null }) => {
  const methods = useServiceForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, service } = useSelector((state) => state.service);
  const [gallery, setGallery] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  /*
  --------------------------------------------------
  Edit Mode
  --------------------------------------------------
  */

  useEffect(() => {
    if (!serviceId || !service) return;

    reset({
      title: service.title || "",

      department: service.department?._id || service.department || "",

      themeColor: service.themeColor || "#0d6efd",

      displayOrder: service.displayOrder || 1,

      icon: service.icon || "",

      shortDescription: service.shortDescription || "",

      description: service.description || "",

      seoTitle: service.seoTitle || "",

      seoDescription: service.seoDescription || "",

      seoKeywords: Array.isArray(service.seoKeywords)
        ? service.seoKeywords.join(", ")
        : "",

      features: service.features?.length ? service.features : [""],

      status: service.status ?? true,

      showOnHome: service.showOnHome ?? true,

      isFeatured: service.isFeatured ?? false,
    });

    setExistingGallery(service.gallery || []);
  }, [serviceId, service, reset]);

  /*
  --------------------------------------------------
  Submit
  --------------------------------------------------
  */

  const onSubmit = async (data) => {
    try {
      let response;

      if (serviceId) {
        //const formData = updateServiceFormData(data);
        const formData = updateServiceFormData(data, gallery);

        response = await dispatch(updateService(serviceId, formData));

        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Service updated successfully",
        });
      } else {
        //const formData = createServiceFormData(data);
        const formData = createServiceFormData(data, gallery);

        response = await dispatch(createService(formData));

        Swal.fire({
          icon: "success",
          title: "Created",
          text: "Service created successfully",
        });
      }

      console.log(response);

      navigate("/services");
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Unable to save service",
      });
    }
  };

  const handleDeleteGallery = async (image) => {
    const result = await Swal.fire({
      title: "Delete Image?",
      text: "This image will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(deleteServiceGalleryImage(service._id, image._id));

      setExistingGallery((prev) =>
        prev.filter((item) => item._id !== image._id),
      );

      Swal.fire("Deleted!", "Gallery image deleted.", "success");
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Unable to delete image.",
        "error",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-8">
          <ServiceBasicInfo register={register} errors={errors} />

          <ServiceContent
            register={register}
            control={control}
            errors={errors}
          />

          <ServiceFeatures control={control} register={register} />

          <ServiceSeo register={register} />
        </div>

        <div className="col-lg-4">
          <ServiceImage service={service} watch={watch} setValue={setValue} />

          <ServiceGallery
            gallery={gallery}
            setGallery={setGallery}
            existingGallery={existingGallery}
            onDeleteExisting={handleDeleteGallery}
          />

          <ServiceSettings register={register} />
        </div>
      </div>

      <div className="text-end mt-4">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading
            ? serviceId
              ? "Updating..."
              : "Saving..."
            : serviceId
              ? "Update Service"
              : "Save Service"}
        </button>
      </div>
    </form>
  );
};

export default ServiceForm;
