import { useParams } from "react-router-dom";

import HospitalHighlightForm from "../components/HospitalHighlightForm";

const HospitalHighlight = () => {
  const { id } = useParams();

  const isEdit = Boolean(id);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">
            {isEdit ? "Edit Hospital Highlight" : "Add Hospital Highlight"}
          </h3>

          <p className="text-muted mb-0">
            {isEdit
              ? "Update Hospital Highlight details."
              : "Create a new Hospital Highlight."}
          </p>
        </div>
      </div>

      <HospitalHighlightForm hospitalHighlightId={id} />
    </div>
  );
};

export default HospitalHighlight;
