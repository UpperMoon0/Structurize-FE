import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../header';

function Favourite() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <Header />
        <h1 className="text-center">Favourite</h1>
      </div>
    </>
  )
}

export default Favourite
