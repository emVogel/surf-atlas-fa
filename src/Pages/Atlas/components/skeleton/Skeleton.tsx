import "./Skeleton.scss";

export const Skeleton = (): JSX.Element => {
  const columns = [...Array.from({ length: 12 }, (_, i) => i + 1)];

  return (
    <>
      <div className="skeleton">
        <div className="skeleton__filter-panel">filter panel</div>
        <div className="skeleton__table-container">
          {columns.map((colums, index) => (
            <div
              key={`skeleton-columns-${index}`}
              className="skeleton__table_container-row"
            >
              <div className="skeleton__table_container-cell"></div>
              <div className="skeleton__table_container-cell"></div>
              <div className="skeleton__table_container-cell"></div>
              <div className="skeleton__table_container-cell"></div>
              <div className="skeleton__table_container-cell"></div>
              <div className="skeleton__table_container-cell"></div>
            </div>
          ))}
        </div>
        <div className="skeleton__map-container">map</div>
      </div>
    </>
  );
};
