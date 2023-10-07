import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [passwordLength, setPasswordLength] = useState<number>(6);
  const [addNumber, setAddNumber] = useState<boolean>(false);
  const [addCharacter, setAddCharacter] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  // useRef hook
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";

    const capLetterStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const smallLetterstr = "abcdefghijklmnopqrstuvwxyz";
    str = capLetterStr + smallLetterstr;

    if (addNumber) str += "0123456789";
    if (addCharacter) str += "!@#$%^&*()-_+={}[]|:<>?/.`,;";

    for (let i = 1; i <= passwordLength; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass);

  }, [passwordLength, addNumber, addCharacter, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 30)
      window.navigator.clipboard.writeText(password)
    }
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [passwordLength, addNumber, addCharacter, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800'>
        <h1 className='text-4xl text-center text-white py-10'>Password Generator</h1>
      </div>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
              type="range"
              min={6}
              max={30}
              value={passwordLength}
              className='cursor-pointer'
              onChange={(e) => setPasswordLength(Number(e.target.value))}
            />
            <label>Length: {passwordLength}</label>
          </div>
          <div className='flex items-center gap-x-1 pl-3'>
            <input
              type='checkbox'
              defaultChecked={addNumber}
              id='numberInput'
              onChange={() => setAddNumber(prev => !prev)}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={addCharacter}
              id='numberInput'
              onChange={() => setAddCharacter(prev => !prev)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
