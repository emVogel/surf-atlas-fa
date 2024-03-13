import { useParams } from "react-router-dom";
import { useSpotByIdLoader } from "../../shared/hooks.ts/useSpotByIdLoader";
import SpotInfo from "./components/SpotInfo/SpotInfo";

function SpotDetailView() {
  const { id } = useParams();
  const spots = useSpotByIdLoader(id as string);
  return (
    <section className="spot-detail">
      <SpotInfo spot={spots[0]}></SpotInfo>
    </section>
  );
}

export default SpotDetailView;
