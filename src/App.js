import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [timeData, setTimeData] = useState([]);
  const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Hanoi'];

  useEffect(() => {
    const fetchTime = async () => {
      const promises = cities.map(city => 
        axios.get(`http://worldtimeapi.org/api/timezone/${city}`)
      );
      const results = await Promise.all(promises);
      setTimeData(results.map(result => result.data));
    };
    fetchTime();
  }, []);

  return (
    <div className="App">
      <h1>Thời Gian Thực</h1>
      <ul>
        {timeData.map((data, index) => (
          <li key={index}>{data.timezone}: {new Date(data.datetime).toLocaleTimeString()}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;