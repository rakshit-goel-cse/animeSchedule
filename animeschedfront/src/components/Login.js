import React, { useState } from 'react';
import './Login.css';

function Login({setpage,setUser}) {

    const [username, setUsername] = useState('');

    const handleAnimeList = (rawList) => {
        let animeList=[];
        let animeListUser ={};
        if(rawList){
            animeListUser = JSON.parse(rawList);
            if(animeListUser.hasOwnProperty(username)){
                animeList=animeListUser[username];
            }
            else{
                //when anime list does not have user
                animeListUser[username] = [];
                localStorage.setItem('animelist',JSON.stringify(animeListUser));
            }
        }
        else{
            //when there is no anime list in storage
            animeListUser[username] = [];
            localStorage.setItem('animelist',JSON.stringify(animeListUser));
        }
        sessionStorage.setItem('animelist',JSON.stringify(animeList));
    }

    const handleLogin = () => {
        // Simulate a login check (you can add actual authentication logic here)
        if (username.trim() !== '') {
          //alert('Login successful!');
          const namesRaw=localStorage.getItem('username');
          let names=[];
          if(namesRaw){
            names=JSON.parse(namesRaw);
            if(names.includes(username)){
                //when user names have user
            }
            else{
                //when the user is new asking to add it
                if(window.confirm("User does not exist, do you want to create one?")){
                    //add username
                    names=[...names, username];
                    localStorage.setItem('username',JSON.stringify(names));
                }
                else{return;}
            }
            handleAnimeList(localStorage.getItem('animelist'));
        }
        else{
            //when there is no user list
            if(window.confirm("User does not exist, do you want to create one?")){
                localStorage.setItem('username',JSON.stringify([username]));
            }
            else{return;}
        }
            sessionStorage.setItem('user',username);
            setUser(username);
            setpage('Home');
        }
        else {
          alert('Please enter a username.');
        }
      };

    return (
    <div className='body_home'>
    <div className='container'>
    
          <label>
            Username:
            <input
              type="text"
              placeholder='Case Sensitive'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <button onClick={handleLogin}>Login</button>
    </div>
    </div>
    );
}

export default Login;