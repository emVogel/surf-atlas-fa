import { Spot } from "../../../../shared/model/spot.interface";
import "./SpotInfoItem.scss";

export type SpotInfoKey = keyof Spot;

interface ISpotInfoItem {
  spotInfoKey: SpotInfoKey;
  spotInfoValue: string | string[] | Record<string, string>;
}

function SpotInfoItem(props: ISpotInfoItem) {
  const infoKey = props.spotInfoKey;
  const infoValue = props.spotInfoValue;

  const getInfoValueAsString = () => {
    if (typeof infoValue === "string") {
      return (
        <span className="list-item--value">
          {props.spotInfoValue as string}
        </span>
      );
    }

    if (Array.isArray(infoValue)) {
      return <span className="list-item--value">{infoValue.join()}</span>;
    }

    if (typeof infoValue === "object" && !Array.isArray(infoValue)) {
      return (
        <ul>
          {Object.entries(infoValue).map(([key, value]) => {
            return value ? (
              <li key={`${key}-${value}`}>
                <span className="list-item--key"> {key}:</span>
                <span className="list-item--value">{value}</span>
              </li>
            ) : (
              <li key={"empty-object"}>-</li>
            );
          })}
        </ul>
      );
    }
  };

  switch (infoKey) {
    case "access":
      return (
        <li>
          <span className="list-item--key">Access:</span>
          {getInfoValueAsString()}
        </li>
      );
    case "bottom":
      return (
        <li>
          <span className="list-item--key">Bottom: </span>
          {getInfoValueAsString()}
        </li>
      );
    case "swell":
      return (
        <li>
          <span className="list-item--key">Swell:</span>
          {getInfoValueAsString()}
        </li>
      );
    case "direction":
      return (
        <li>
          <span className="list-item--key">Direction: </span>
          {getInfoValueAsString()}
        </li>
      );
    case "tide":
      return (
        <li>
          <span className="list-item--key"> Tide:</span>
          {getInfoValueAsString()}
        </li>
      );
    case "wind":
      return (
        <li>
          <span className="list-item--key">Wind:</span> {getInfoValueAsString()}
        </li>
      );
    case "crowd":
      return (
        <li>
          <span className="list-item--key">Crowd:</span>
          {getInfoValueAsString()}
        </li>
      );
    case "description":
      return (
        <li>
          <span className="list-item--key">Description:</span>
          {getInfoValueAsString()}
        </li>
      );
    case "best_Season":
      return (
        <li>
          <span className="list-item--key">Best season:</span>
          {getInfoValueAsString()}
        </li>
      );
    case "type":
      return (
        <li>
          <span className="list-item--key">Wave type:</span>
          {getInfoValueAsString()}
        </li>
      );
    case "location":
      return (
        <li>
          <span className="list-item--key">Location:</span>
          {getInfoValueAsString()}
        </li>
      );
    case "best_conditions":
      return (
        <li>
          <span className="list-item--key"> Best Comditions: </span>
          {getInfoValueAsString()}
        </li>
      );
    default:
      return null;
  }
}

export default SpotInfoItem;
