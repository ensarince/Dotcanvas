import React, { useState } from 'react'
import { TPoint } from '../interfaces/point'

type Props = {
    item: TPoint
}

export default function BallComponent({item}: Props) {

    return (
    <div style={{position:"absolute", left:item.x, top:item.y}}>
        <div style={{position:"relative", display:"flex", height:"5vh", justifyContent:"center", alignItems:"center"}}>
        <div style={{position:"absolute", background: item.color, height:"50px", width:"50px", borderRadius:"100px"}} />
        <div style={{position:"absolute", background: "white", height:"20px", width:"20px", borderRadius:"100px"}} />
        </div>      
    </div>
    )}