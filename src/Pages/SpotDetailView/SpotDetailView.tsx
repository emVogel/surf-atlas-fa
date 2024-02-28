import { useParams } from "react-router-dom";

function SpotDetailView() {
  const { id } = useParams();
  return (
    <section className="spot-detail">
      <h2>detail</h2>
      <div>Detail: {id}</div>
    </section>
  );
}

export default SpotDetailView;
