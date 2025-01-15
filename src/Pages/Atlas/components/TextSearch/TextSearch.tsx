import { FormEvent, useCallback, useMemo } from "react";
import "./TextSearch.scss";

import { useMutation } from "@tanstack/react-query";
import { getRequestByUrl } from "../../../../shared/route-loaders/http-fetch";

const SearchNames = () => {
  const { mutate, data } = useMutation(getRequestByUrl);

  if (data && data.length > 0) {
    console.log(data);
  }

  const handleInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const spotName = event.currentTarget.value;
      if (spotName.length < 3) return;

      console.log("name", event.currentTarget.value);
      mutate(`/api/filterspots?name=${spotName}`);
    },
    [mutate]
  );

  const throttled = useCallback(
    (delay: number, fn: (event: FormEvent<HTMLInputElement>) => void) => {
      let lastCall = 0;
      return function wrapper(event: FormEvent<HTMLInputElement>) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          console.log("return it");
          return;
        }
        console.log(now);
        lastCall = now;
        return fn(event);
      };
    },
    []
  );

  const throttledHandler = useMemo(
    () => throttled(500, handleInputChange),
    [throttled, handleInputChange]
  );

  return (
    <div className="name-filter">
      <form className="search-by-name-form">
        <div className="search-by-name">
          <input id="name-search" onChangeCapture={throttledHandler} />
          <label className="search-for-name-label" htmlFor="name-search">
            Search for a spot
          </label>
        </div>
      </form>
      {data && data.length > 0 ? (
        <div className="search-hits-container">
          <ul className="search-hits">
            {data.map((feature) => (
              <li key={feature.properties.id}>
                <a href={`/atlas/spot/${feature.properties.id}`}>
                  {feature.properties.name}
                  {` ${
                    feature.properties.alternative_name
                      ? feature.properties.alternative_name
                      : ""
                  }`}
                  - {feature.properties.province}{" "}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SearchNames;
