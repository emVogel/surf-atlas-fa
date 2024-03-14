import { useParams } from "react-router-dom";
import { useSpotByIdLoader } from "../../shared/hooks.ts/useSpotByIdLoader";
import SpotInfo from "./components/SpotInfo/SpotInfo";
import "./SotDetailView.scss";

function SpotDetailView() {
  const { id } = useParams();
  const spots = useSpotByIdLoader(id as string);
  return (
    <section className="spot-detail">
      <section className="spot-detail--info">
        <SpotInfo spot={spots[0]}></SpotInfo>
      </section>
      <section className="spot-detail-map"></section>
    </section>
  );
}

export default SpotDetailView;
