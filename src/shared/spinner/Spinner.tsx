import "./Spinner.scss";

function Spinner(props: { size: number }) {
  return (
    <div className="spinner">
      <div
        style={{ width: `${props.size}px`, height: `${props.size}px` }}
        id="spin-1"
      ></div>
      <div
        style={{ width: `${props.size}px`, height: `${props.size}px` }}
        id="spin-2"
      ></div>
      <div
        style={{ width: `${props.size}px`, height: `${props.size}px` }}
        id="spin-3"
      ></div>
      <div
        style={{ width: `${props.size}px`, height: `${props.size}px` }}
        id="spin-4"
      ></div>
    </div>
  );
}

export default Spinner;
