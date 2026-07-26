import { FaInbox } from "react-icons/fa";

const EmptyState = ({
  title = "No Data Found",

  subtitle = "There are no records.",
}) => {
  return (
    <div className="text-center py-5">
      <FaInbox size={60} color="#CBD5E1" />

      <h4 className="mt-4">{title}</h4>

      <p>{subtitle}</p>
    </div>
  );
};

export default EmptyState;
