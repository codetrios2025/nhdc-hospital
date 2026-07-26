import { FaSyncAlt } from "react-icons/fa";

import AppButton from "../AppButton/AppButton";

const RefreshButton = ({ onRefresh }) => {
  return (
    <AppButton variant="outline" icon={<FaSyncAlt />} onClick={onRefresh}>
      Refresh
    </AppButton>
  );
};

export default RefreshButton;
