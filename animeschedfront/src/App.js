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
    if(UserName===''){
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
    <div >
    <div className='body'>
      <header>
          <h1>Anime Schedules</h1>
      </header>
      <nav>
        <ul>
          <li>
            <a href='' onClick={(event)=>{
            event.preventDefault()
            setpage('Home')}}>Home</a>
          </li>
          <li>
            <a href='' onClick={(event)=>{
              event.preventDefault()
              setpage('Search')}}>Search</a>
          </li>
          <li>
            <a href='' onClick={(event)=>{
              event.preventDefault()
              setpage('About')}}>About</a>
          </li>
        </ul>
        <p >{UserName}</p>
        {UserName!=='' &&(
        <button className='button' onClick={()=>{ logout() }}>LogOut</button>
        )}
      </nav>
      </div>
      <div>
        {showPage()}
      </div>
    </div>
  )
}

export default App;