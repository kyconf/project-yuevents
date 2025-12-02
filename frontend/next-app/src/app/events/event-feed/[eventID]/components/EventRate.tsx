"use client"
import Rating from "@mui/material/Rating"
import {useState, useEffect} from "react"

interface EventRating{
    rate: number,
    onChange: (field: string, value: number) => void

}
export default function EventRating({rate, onChange}:EventRating){
    return (
    <div className="">
    <Rating
      name="event-rating"
      value={rate}
      precision={0.5}
      onChange={(event, newValue) => {
        if(newValue !== null) {
            onChange("rate", newValue)
        }}}
      sx={{ fontSize: '1cm',
            color: '#facc15',        
          '& .MuiRating-iconHover': { color: '#f59e0b', }}
      }/>
    </div>
  );
}