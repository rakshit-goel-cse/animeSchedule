import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Home.css';
import ShowData from './ShowData';

function Home() {

    const [data, setdata] = useState([]);

  useEffect(() => {
    getData();
  }, []); // Adding an empty dependency array to make sure the effect runs only once

  const getData = async () => {
    let nameList=sessionStorage.getItem('animelist');
    if(nameList && nameList.length>0){
    try {
      const url = `http://localhost:5000/api/route?route=${nameList}`;
      console.log("INSIDE HOME URL-", url,nameList);
      const res = await axios.get(url);
      console.log("RESPONSE FROM API CALL-", res);
      console.info("data for home- ", res.data);
    /*  let tempdata=returnData;
      console.info("TEMP data for home- ", tempdata);
    if(tempdata.length>0){
      setdata([...tempdata,res.data]);
    }
    else{
        setdata([res.data]);
    }*/
    setdata(res.data);
      console.log("data set- ", data);
    } catch (error) {
      console.log("RESPONSE FROM API CALL ERROR-", error);
    }
}
  };

  return (
    <div>
        {(data.length > 0) ? (
        <ShowData data={data} setdata={setdata} ishome/>
        ):
        (<div>no data</div>)}
            
    </div>
  );
}

export default Home;
