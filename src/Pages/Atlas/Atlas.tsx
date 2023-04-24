import { Link, Outlet } from "react-router-dom";
import Map from "../../components/Map";
import { Feature, Request } from "../../model/spot.interface";
import { useEffect, useState } from "react";

function Atlas() {
  const [spots, setSpots] = useState<Feature[] | never[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("api/spots", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((request) => {
        if (request.status > 300) {
          return new Error("", {
            cause: "Server Error",
          });
        }
        console.log(request.status);
        return request.json();
      })
      .then((data: Request) => {
        console.log(data.data.features);
        setSpots(data.data.features);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div>Atlas</div>
      <Map features={spots}></Map>

      <Outlet />
    </>
  );
}

export default Atlas;
