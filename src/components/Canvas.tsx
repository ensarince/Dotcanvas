import React, { useEffect, useState } from 'react'
import { TPoint } from '../interfaces/point'
import BallComponent from './BallComponent'
import colors from "../colors.json"

type Props = {}

export default function Canvas({}: Props) {
  
  //store points
  const [points, setPoints] = useState<TPoint[]>([])

  //store undoed points to later use them with redo
  const [undoedPoints, setUndoedPoints] = useState<TPoint[]>([])

  //random color storing
  const [randomColor, setRandomCOlor] = useState<string>("")

  useEffect(() => {
    setRandomCOlor(colors[Math.floor(Math.random() * colors.length)])
  }, [points,setPoints])

    //*get the coordinates of click and set the new point object with the coordinate and random color
    const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const {clientX, clientY} = event;
        
        setPoints((prev) => [
          ...prev,
          {x: clientX, y: clientY, color: randomColor}
        ])
    }

    //*reset points array, reset undoed list also
    const resetHandler = () =>{
      setPoints([])
      setUndoedPoints([])
    }
    //*undo points and add them to a list
    const undoHandler = () => {
      setUndoedPoints(undoedPoints.concat(points.slice(-1)))
      setPoints(points.slice(0, -1))
    }

    //*redo point by getting the last undoed point
    const redoHandler = () => {
      setPoints(points.concat(undoedPoints.slice(-1)))
      setUndoedPoints(undoedPoints.slice(0, -1))
    }

  return (
    <>
    <div style={{display:"flex", justifyContent:"flex-end", gap:".5em", marginTop:"5%", marginRight:"5%"}}>
        <button className='btn' onClick={undoHandler} >Undo</button>
        <button className='btn' onClick={redoHandler}>Redo</button>
        <button className='btn' onClick={resetHandler}>Reset</button>
    </div>

    <div style={{display: "flex", height:"100vh"}}  onClick={handleOnClick}>
      {points.map((item, i) => (
        <>
        <BallComponent item={item}/>
        </>
      ))}
    </div>

    </>
  )
}