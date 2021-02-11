import React, { useState } from "react";
import { fetchData, table } from "../index";
const Covid_data = () => {
  const [data, setData] = useState({});

  React.useEffect(() => {
    const fetch = async () => {
      const apidata = await fetchData();
      setData(apidata);
    };
    fetch();
  }, []);

  return (
    <div className="home">
      <table id="simple-board">
        <tbody>{table(data)}</tbody>
      </table>
    </div>
  );
};

export default Covid_data;
