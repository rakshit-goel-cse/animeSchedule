import {React,useState} from 'react';
import About from './components/About.js';
import Home from './components/Home.js';
import Search from './components/Search.js';
import Login from './components/Login.js';
import './App.css';

function App() {
  console.log("indide app");

  const [page, setpage] = useState('Home');
  const [UserName, setUserName] = useState(sessionStorage.getItem('user'));
  
  const showPage = () =>{
    console.log("SHOW PAGE");
    if(null===UserName || UserName.length===0){
      return <Login setpage={setpage} setUser={setUserName}/> ;
    }
    switch(page){
      case 'Home' :
        return <Home/> ;
      case 'Search' :
        return <Search/> ;
      case 'About' :
        return <About/> ;
    }
  }

  const logout = () => {
    //updating the anime list in storage
    let rawList=localStorage.getItem('animelist');
    if(rawList){
        let animeListUser = JSON.parse(rawList);
        let animelist = sessionStorage.getItem('animelist');
        if(animeListUser.hasOwnProperty(UserName) && animelist && animelist.length!==0){
            animeListUser[UserName]=JSON.parse(animelist);
            localStorage.setItem('animelist',JSON.stringify(animeListUser));
        }
      }
    sessionStorage.setItem('user','');
    sessionStorage.setItem('animelist',[]);
    setUserName('');
  }
  
  return(
    < >
    <div className='body'>
      <header>
          <h1 className='headtext'>Anime Schedules</h1>
      </header>
      <nav>
        <ul>
          <li onClick={(event)=>{
            event.preventDefault();
            setpage('Home');}}>Home
          </li>
          <li onClick={(event)=>{
              event.preventDefault();
              setpage('Search');}}>Search
          </li>
          <li onClick={(event)=>{
              event.preventDefault();
              setpage('About');}}>About
          </li>
        </ul>
        <p >{UserName}</p>
        {(null!==UserName && UserName.length>0) &&(
        <button className='button' onClick={()=>{ logout() }}>LogOut</button>
        )}
      </nav>
      </div>
      <div>
        {showPage()}
      </div>
    </>
  )
}

export default App;
