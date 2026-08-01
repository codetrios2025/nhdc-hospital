import { useDispatch } from "react-redux";

import ToggleSwitch from "../../../components/common/ToggleSwitch";

import HomeFeatureActionButtons from "./HomeFeatureActionButtons";

import {
  changeHomeFeatureStatus,
  updateHomeFeatureOrder,
} from "../../../redux/thunks/homeFeatureThunk";

const HomeFeatureTable = ({
  homeFeatures,
  loading,
  reloadHomeFeatures,
  deleteHomeFeature,
  page,
  limit,
}) => {
  const dispatch = useDispatch();

  const handleStatus = async (item) => {
    await dispatch(changeHomeFeatureStatus(item._id, !item.status));

    reloadHomeFeatures();
  };

  const handleDisplayOrder = async (item, value) => {
    await dispatch(updateHomeFeatureOrder(item._id, Number(value)));

    reloadHomeFeatures();
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th width="70">#</th>

              <th>Icon</th>

              <th>Title</th>

              <th>Subtitle</th>

              <th width="120">Order</th>

              <th width="100">Status</th>

              <th width="150">Action</th>
            </tr>
          </thead>

          <tbody>
            {homeFeatures.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-5">
                  <div className="py-5 text-center">
                    <i
                      className="bi bi-grid-3x3-gap"
                      style={{ fontSize: "45px" }}
                    ></i>

                    <h5 className="mt-3">No Home Features Found</h5>

                    <p className="text-muted">
                      Click "Add Home Feature" to create your first feature.
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {homeFeatures.map((item, index) => (
              <tr key={item._id}>
                <td>{(page - 1) * limit + index + 1}</td>

                <td>
                  <i
                    className={item.icon}
                    style={{
                      fontSize: "24px",
                    }}
                  ></i>
                </td>

                <td>
                  <strong>{item.title}</strong>
                </td>

                <td>{item.subtitle}</td>

                <td style={{ width: "120px" }}>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    defaultValue={item.displayOrder}
                    min={0}
                    onBlur={async (e) => {
                      const newValue = Number(e.target.value);

                      if (newValue === item.displayOrder) return;

                      try {
                        await dispatch(
                          updateHomeFeatureOrder(item._id, newValue),
                        );

                        reloadHomeFeatures();
                      } catch (error) {
                        e.target.value = item.displayOrder;
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.target.blur();
                      }
                    }}
                  />
                </td>

                <td>
                  <ToggleSwitch
                    checked={item.status}
                    onChange={() => handleStatus(item)}
                  />
                </td>

                <td>
                  <HomeFeatureActionButtons
                    homeFeature={item}
                    onDelete={deleteHomeFeature}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeFeatureTable;
