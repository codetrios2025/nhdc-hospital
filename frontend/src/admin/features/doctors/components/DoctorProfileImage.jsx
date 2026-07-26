import { useEffect, useState } from "react";

const DoctorProfileImage = ({ doctor, setValue }) => {
  const [preview, setPreview] = useState("/default-doctor.webp");

  /*
  ---------------------------------------------------------
  Existing Image (Edit Mode)
  ---------------------------------------------------------
  */

  useEffect(() => {
    if (doctor?.profileImageUrl) {
      setPreview(doctor.profileImageUrl);
    }
  }, [doctor]);

  /*
  ---------------------------------------------------------
  Upload New Image
  ---------------------------------------------------------
  */

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setValue("profileImage", file, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  };

  /*
  ---------------------------------------------------------
  Cleanup
  ---------------------------------------------------------
  */

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">Profile Image</h5>
      </div>

      <div className="card-body text-center">
        <img
          src={preview}
          alt="Doctor"
          className="img-thumbnail rounded-circle mb-3"
          style={{
            width: "180px",
            height: "180px",
            objectFit: "cover",
          }}
        />

        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleImage}
        />
      </div>
    </div>
  );
};

export default DoctorProfileImage;
