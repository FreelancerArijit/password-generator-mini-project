import './App.css';
import {useState, useCallback, useEffect, useRef} from 'react';

function App() {

  const[length,  setLength] = useState(8);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const[charAllowed, setCharAllowed] = useState(false);
  const[Password, setPassword] = useState('');

  const passwordRef = useRef(null);

  //method to generete password using useCallback hook
  const generetePassword = useCallback(()=>{
    let pass= "";
    let str = "ABCDEFGHIaJbKcLdMeNfOgPhQiRjSkTlUVWXYZ";
    if(numberAllowed) str+= "0123456789";
    if(charAllowed) str+= "@#$%&*_";

    for(let i = 1; i<length; i++){
      const char = Math.floor(Math.random() * str.length  + 1);
      pass += str.charAt(char);      
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed] )


  //method to copy password to clipboard and select it
  const copyPasswordToClipboard = ()=>{
    window.navigator.clipboard.writeText(Password);
    alert("Password is copied to clipboard");
    passwordRef.current?.select();
  }

  
  useEffect(()=>{
    generetePassword();
  }, [length, numberAllowed, charAllowed] )

  
  


  return (
   <>
    <div className="main">
      <div className="heading"><h2>Password Generetor</h2></div>
      <div className="card">
        <div className="top">
          <input ref={passwordRef} type="text" name="" id="text" value={Password} readOnly placeholder="Password" />
          <button onClick={copyPasswordToClipboard} className="btn">Copy</button>         
          
          
          </div>

          <div className="bottom">
            <div className='first-row'>
            <input type="range" value={length} min={6}  max={100} name="" id="" onChange={(e)=>setLength(e.target.value)} />
            <label htmlFor="length">Length: {length}</label>
            </div>

            <div className='second-row'>
            <input type="checkbox" defaultChecked={numberAllowed} onChange={()=> setNumberAllowed((prev)=> !prev)} name="" id="check" />
            <label htmlFor="Number">Number</label>
            </div>

            <div className='second-row'>
            <input type="checkbox" defaultChecked={charAllowed} onChange={()=> setCharAllowed((prev)=> !prev)} name="" id="check" />
            <label htmlFor="Charecter">Charecter</label>
            </div>

          </div>
        
      </div>
    </div>
   
   
   
   </>
  );
}

export default App;
