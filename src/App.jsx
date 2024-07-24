import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [password, setPassword] = useState('');
  const [length, setlength] = useState(8);
  const [lowerContain, setlowerContain] = useState(false);
  const [numberContain, setnumberContain] = useState(false);
  const [symbolContain, setsymbolContain] = useState(false);
  const selectedPassword = useRef();
  const generatePassword = useCallback(()=>{
    let pass="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lower = 'abcdefghijklmnopqrstuvwxyz';
    let number = '0123456789';
    let symbol = '!@#$%^&*()_+';
    if(lowerContain) str+=lower;
    if(numberContain) str+=number;
    if(symbolContain) str+=symbol;
    for(let i=0;i<=length;i++){
      pass+=str.charAt(Math.floor(Math.random()*str.length));
    }
    setPassword(pass);
  },[setPassword,length,lowerContain,numberContain,symbolContain])

    useEffect(()=>{
      generatePassword();
    },[setPassword]);

    const copyPassword = ()=>{
      navigator.clipboard.writeText(password);
      selectedPassword.current?.select();
    }

  return (
    <>
      <div className='bg-[#472056] w-full '>
        <nav className='flex justify-between items-center h-16 px-8 text-white'>
            <div className="logo font-bold text-lg">Password Generator</div>
            <ul className='flex justify-between gap-10 items-center'>
                <li>Home</li>
                <li>About</li>
            </ul>
        </nav>
    </div>
      <div className='bg-[#603270] h-[610px] w-full flex justify-center items-center text-white gap-2'>
        <div className="content bg-[#0d0a31] h-4/5 w-[40%] rounded-3xl py-6 flex flex-col justify-center items-start gap-4">
          <div className="password w-full h-8 flex justify-center items-center">
              <input className="py-[9px] text-black text-[20px] outline-none rounded-s-2xl w-4/5 px-2 font-semibold" type="text" placeholder="Click on the Generate Button" ref={selectedPassword}
              value={password}
              readOnly
              />
              <button className="bg-[#5a2a6a] px-2 py-3 rounded-e-2xl  hover:font-medium" onClick={copyPassword}>Copy</button>
          </div>
          <div className='text-left text-gray-300 px-8'>Number: {length}</div>
          <div className="range w-[90%] mx-auto h-10 bg-[#201d41] rounded-lg flex justify-center items-center gap-2">
            <span>4</span>
            <input type="range" name="" id="" className='accent-[#5a2a6a] w-[85%] cursor-pointer' min={4} max={32} value={length}
            onChange={(e)=>setlength(e.target.value)}/>
            <span>32</span>
          </div>
          <div className='text-left text-gray-300 px-8'>Settings</div>
          <div className="settings flex flex-col justify-center mx-auto items-center gap-2 w-[90%]">
            <div className="w-full mx-auto h-12 bg-[#201d41] px-3 rounded-lg flex justify-between items-center gap-1">
              <span>Include Lowercase</span>
              <input type="checkbox" className='h-6 w-6 rounded-full' name="" id="" checked={lowerContain} onChange={()=>setlowerContain(prev=>!prev)}/>
            </div>
            <div className="w-full mx-auto h-12 bg-[#201d41] px-3 rounded-lg flex justify-between items-center gap-2">
              <span>Include Numbers</span>
              <input type="checkbox" name="" id="" className='h-6 w-6 rounded-full' checked={numberContain} onChange={()=>setnumberContain(prev=>!prev)}/>
            </div>
            <div className="w-full mx-auto h-12 bg-[#201d41] px-3 rounded-lg flex justify-between items-center gap-2">
              <span>Include Symbols</span>
              <input type="checkbox" name="" id="" className='h-6 w-6 rounded-full' checked={symbolContain} onChange={()=>setsymbolContain(prev=>!prev)}/>
            </div>
          </div>
          <button className="bg-[#5a2a6a] px-4 py-2 rounded-lg w-[90%] mx-auto " onClick={generatePassword}>Generate Password</button>
      </div>
       
    </div>
    <div className='bg-[#593c68] w-full h-16 flex justify-center items-center absolute bottom-0'>
        <p>Copyright @ Vinay Yadav | 2024</p>
    </div>
    </>
  )
}

export default App
