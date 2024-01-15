import React, { useState } from "react";
import './ShowData.css';

function ShowData({data}) {
    console.log("Inside Show Data-",data);
    
    const englishName = (names) => {
      return names.english;
    }

    return(
      <div>
      {data.map((item) => (
        <div key={item.id} className="card">

          <h5>{item.title}<br></br>{englishName(item.names)}</h5>
          <h6>Dub Time - {item.dubTime}</h6>

          <p>
          <b>episode-</b> {item.episodes} <br></br>
          <b>status-</b> {item.status} <br></br>
          <b>release year-</b> {item.year}
          </p>
          
          <img src={"https://img.animeschedule.net/production/assets/public/img/"+item.imageVersionRoute}
           alt={item.description}></img>
          
        </div>
      ))}
    </div>
    );
}

export default ShowData;