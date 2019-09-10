import React from 'react'
import DayChart from './DayChart'
//import { observe } from './Game'
const containerStyle = {
  ///width: 500,
  //height: 500,
 // border: '1px solid gray',
  className: "WeekBoard"
}
/**
 * The Chessboard Tutorial Application
 */
const WeekBoard = () => {
 // const [knightPos, setKnightPos] = useState([1, 7])
// the observe function will return an unsubscribe callback
 // useEffect(() => observe(newPos => setKnightPos(newPos)))
 const items = []
 for (let i = 0; i < 5; i++) {
    items.push(<DayChart dayindex={i} key={i}/>) 
 }
  return (
    <div className="WeekBoard">
     {items}
    </div>
  )
}
export default WeekBoard
