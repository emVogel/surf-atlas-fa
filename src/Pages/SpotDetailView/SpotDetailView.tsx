import { useParams } from "react-router-dom";

function SpotDetailView() {
  const { id } = useParams();
  return (
    <>
      <h2>detail</h2>
      <div>Detail: {id}</div>
    </>
  );
}

export default SpotDetailView;
