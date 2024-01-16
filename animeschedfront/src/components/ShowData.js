import React from "react";
import './ShowData.css';

function ShowData({data,setdata,ishome}) {
    console.log("Inside Show Data-",data);
    console.log("is home-",ishome);
    
    //note note- 1 items not refreshing when item remove button clicked, 2 show some kind of change when item is added

    const englishName = (names) => {
      if(names && 'english' in names){
        return names.english;
      }
      return '';
    }

    const isRouteInAnimeList = (animeList, routeToCheck) => {
      return animeList.some((anime) => anime === routeToCheck);
    };

    const removeItemFromData = (itemRoute) => {
      let newData = data.filter(item=>item.route!==itemRoute);
      setdata(newData);
    }

    const addToList = (route) =>{
      console.log("SAVING ANIME IN SESSION- ",route);
      let storedlist=sessionStorage.getItem('animelist');
      let animelist=[];
      console.log("STORED LIST- ",storedlist);
      if(storedlist){animelist=JSON.parse(storedlist);}
        if(route){
            if(!ishome && isRouteInAnimeList(animelist,route)){return}
            if(ishome){
              animelist=animelist.filter(item=>item!==route);
              sessionStorage.setItem('animelist',JSON.stringify(animelist));
              console.log("REMOVE ITEM FROM LIST-",animelist);
              removeItemFromData(route);
            }
            else{
              animelist=[...animelist,route];
              sessionStorage.setItem('animelist',JSON.stringify(animelist));
            }
            //sessionStorage.setItem('animelist',JSON.stringify(animelist));
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
          <button onClick={()=>{addToList(item.route)}}>{ishome ? "Remove" :"Add to List"}</button>
          </p>
          
          <img src={"https://img.animeschedule.net/production/assets/public/img/"+item.imageVersionRoute}
           alt={item.description}></img>
         </div>
          
        </div>
      ))}
    </div>
    );
}

export default ShowData;