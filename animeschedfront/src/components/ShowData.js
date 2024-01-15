import React, { useState } from "react";
import './ShowData.css';

function ShowData({data}) {
    console.log("Inside Show Data-",data);
    
    const englishName = (names) => {
      if(names && 'english' in names){
        return names.english;
      }
      return '';
    }

    const isRouteInAnimeList = (animeList, routeToCheck) => {
      return animeList.some((anime) => anime === routeToCheck);
    };

    const addToList = (route) =>{
      console.log("SAVING ANIME IN SESSION- ",route);
      let storedlist=sessionStorage.getItem('animelist');
      let animelist=[];
      console.log("STORED LIST- ",storedlist);
      if(storedlist){animelist=JSON.parse(storedlist);}
        if(route){
            if(isRouteInAnimeList(animelist,route)){return}
            animelist=[...animelist,route];
            sessionStorage.setItem('animelist',JSON.stringify(animelist));
        }
    }

    return(
      <div>
      {data.map((item) => (
        <div key={item.id} className="card">
          <div class="content">


          <h5>{item.title}<br></br>{englishName(item.names)}</h5>
          <h6>Dub Time - {item.dubTime}</h6>

          

          <p>
          <b>episode-</b> {item.episodes} <br></br>
          <b>status-</b> {item.status} <br></br>
          <b>release year-</b> {item.year}
          <button onClick={()=>{addToList(item.route)}}>Add to List</button>
          </p>
          </div>
          <img src={"https://img.animeschedule.net/production/assets/public/img/"+item.imageVersionRoute}
           alt={item.description}></img>
         
          
        </div>
      ))}
    </div>
    );
}

export default ShowData;