import React, { useState } from "react";
import ShowData from "./ShowData";
import axios from "axios";
import './Search.css';

function Search() {
  const [animename, setanimename] = useState("");
  const [searched, setsearched] = useState(false);
  const [data, setdata] = useState([]);
  const [error, seterror] = useState('');

  const search = async () => {
    if (animename !== "") {
      seterror("Searching");
      try {
        const urrl = "http://localhost:5000/api/anime?q=" + animename;
        //const urrl = "/api/anime?q=" + animename;
        console.log("URL ", urrl);

        const res = await axios.get(urrl);
        console.log("RESPONSE FROM API CALL-", res.data);
        setdata(res.data.anime);
        setsearched(true);
        setanimename('');
        //console.log("DATA FROM API CALL-",data);
      } catch (error) {
        setanimename('');
        seterror("Search issue try again");
        console.error("Error during search:", error);
      }
    }
  };
  
  const showList = () => {
    
    console.log("anime search "+data);
    return(
      ""
    );
    /*let storedlist=sessionStorage.getItem('animelist');
        if(storedlist){
            let animelist=JSON.parse(storedlist);
            animelist=[...animelist,animename];
            sessionStorage.setItem('animelist',JSON.stringify(animelist));
        }
        return setanimename('');*/
        //console.log("SEARCH init-",search());
  };

  return (
    <>
      {
      (searched && data.length > 0) ? (
        <ShowData data={data} />
      ) : (
        <div className="body_home">
          <div className="container">
            <label>
              Anime name:
              <input className="input"
                type="text"
                placeholder="Case Sensitive"
                value={animename}
                onChange={(e) => {setanimename(e.target.value)}}
              />
              <h6 style={{textcolor:'red'}}>{error}</h6>
            
            <button 
              onClick={(e) => {
                search(e);
              }}>
              Search
            </button>
            </label>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
