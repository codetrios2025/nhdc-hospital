import { FaDatabase } from "react-icons/fa";

const NoData = ({
  title = "No Records Found",

  description = "There are no records available.",
}) => {
  return (
    <div className="text-center py-5">
      <FaDatabase size={70} color="#CBD5E1" />

      <h3 className="mt-4">{title}</h3>

      <p>{description}</p>
    </div>
  );
};

export default NoData;
