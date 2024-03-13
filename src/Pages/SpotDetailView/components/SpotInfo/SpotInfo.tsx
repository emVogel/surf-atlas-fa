import { Feature } from "../../../../shared/model/spot.interface";
import SpotInfoItem, { SpotInfoKey } from "../SpotInfoItem/SpotInfoItem";
import "./SpotInfo.scss";
interface ISpotsInfoProps {
  spot: Feature;
}

function SpotInfo(props: ISpotsInfoProps) {
  const { properties } = props.spot;
  return (
    <>
      <h2>{properties.name}</h2>
      {properties?.alternative_name ?? <h3>{properties?.alternative_name}</h3>}
      <ul className="info-list">
        {Object.entries(properties).map(([key, value], index) => (
          <SpotInfoItem
            key={`${key}-${index}`}
            spotInfoKey={key as SpotInfoKey}
            spotInfoValue={value}
          ></SpotInfoItem>
        ))}
      </ul>
    </>
  );
}

export default SpotInfo;
