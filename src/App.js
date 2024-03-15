import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8080/scraper/data");

      const data = await res.json();

      if (data.statusCode === 200) {
        setData(data.data);
      }
    } catch (error) {
      setData([]);
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ margin: 20 }}>
      <h4>
        Med Gas Prices from{" "}
        <a href="https://snowtrace.io">https://snowtrace.io</a>
      </h4>

      <table border={1}>
        <thead style={{ padding: 10 }}>
          <th style={{ padding: 10 }}>nAVAX Price</th>
          <th style={{ padding: 10 }}>USD Price</th>
          <th style={{ padding: 10 }}>Date</th>
        </thead>
        <tbody>
          {data.map(({ usdPrice, nAVAXPrice, createdAt }) => {
            return (
              <tr>
                <td style={{ padding: 10 }}>{nAVAXPrice}</td>
                <td style={{ padding: 10 }}>{usdPrice}</td>
                <td style={{ padding: 10 }}>{createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
