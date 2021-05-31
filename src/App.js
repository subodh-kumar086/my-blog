import React, { useEffect, useState } from "react";
import Weather from './components/Weather';
export default function App() {
  
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [search,setSearch]=useState("Dhanbad");

 const handleChange = (event)=>setSearch(event.target.value);
 

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

     await fetch(`${process.env.REACT_APP_API_URL}/weather?q=${search}&APPID=${process.env.REACT_APP_API_KEY}`)
      //await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setData(result);
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long,search])
  
  return (
    <>
    <div className="main">
    <div className="inputdata"><input type="text" className="inputfield" placeholder="Enter City Name " onChange={handleChange}/></div>
      
      {(typeof data.main !== 'undefined') ? (
        <Weather weatherData={data} />
      ): (
        <div></div>
      )}
      
    </div>
    </>
  );
}
