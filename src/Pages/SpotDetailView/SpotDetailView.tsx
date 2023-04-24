import { useParams } from "react-router-dom";

function SpotDetailView() {
  const { id } = useParams();
  return (
    <>
      <div>Detail: {id}</div>
    </>
  );
}

export default SpotDetailView;
