const SkeletonTable = () => {
  return (
    <div className="table-skeleton">
      {Array.from({
        length: 8,
      }).map((_, i) => (
        <div className="skeleton-row" key={i} />
      ))}
    </div>
  );
};

export default SkeletonTable;
