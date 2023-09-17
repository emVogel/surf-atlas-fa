import "./Skeleton.scss";

export const Skeleton = (): JSX.Element => {
  return (
    <>
      <div className="skeleton">
        <div className="skeleton__filter-panel">filter panel</div>
        <div className="skeleton__table-container">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
          <div>11</div>
        </div>
        <div className="skeleton__map-container">map</div>
        <div className="skeleton__footer">footer</div>
      </div>
    </>
  );
};
