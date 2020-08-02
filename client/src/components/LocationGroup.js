import React from "react";

const LocationGroup = ({ location, children }) => {
  return (
    <div className="LocationGroup">
      <ul>
        <h3 className="location">{location}</h3>

        {children}
      </ul>
    </div>
  );
};

export default LocationGroup;
