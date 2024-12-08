import React, { useContext, useEffect, useState } from "react";
import Splash from "../components/Splash";
import { UtilContext } from "../contexts/UtilContext";
import { useNavigate } from "react-router-dom";
import socket from "../utilities/socketConnection";

function Home() {
  const { loading, setRoom } = useContext(UtilContext);
  const navigate= useNavigate();
  const [roomFull,setRoomFull]= useState(false);

  useEffect(()=>{
    socket.on("room joined", ({room_id})=>{
      console.log(room_id);
      setRoom(room_id);
      navigate("/configure");
    });

    socket.on("full room", ()=>{
      setRoomFull(true);
      setTimeout(()=>{
        setRoomFull(false);
      },2000)
    })

    return ()=>{

    }

  },[])

  if (loading)
    return (
      <div className="container">
        <Splash />
      </div>
    );

  return (
    <div className="page">
      <h1 style={{ margin: 0 }}>Pokemon battle</h1>
      <div className="room-form">
        <button className="button btn-create" onClick={()=>{
          console.log("clickedddd")
          socket.emit("create room");
        }}>Create Room</button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form= document.querySelector("form");
            const formData= new FormData(form);
            const room_id= formData.get("room");
            console.log(room_id);
            socket.emit("join room",room_id);
          }}
          id="room-id-form"
        >
          <label htmlFor="room" style={{display:"block"}}>Enter Room by code</label>
          <input placeholder="room code" type="text" name="room" id="room" required />
          {roomFull && <p>This room is full!</p>}
        </form>
      </div>
    </div>
  );
}

export default Home;
