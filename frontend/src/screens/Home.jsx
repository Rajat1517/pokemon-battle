import React, { useContext } from "react";
import Splash from "../components/Splash";
import { UtilContext } from "../contexts/UtilContext";
import { useNavigate } from "react-router-dom";
function Home() {
  const { loading } = useContext(UtilContext);
  const navigate= useNavigate();
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
          navigate("/configure");
        }}>Create Room</button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/configure");
          }}
          id="room-id-form"
        >
          <label htmlFor="room" style={{display:"block"}}>Enter Room by code</label>
          <input placeholder="room code" type="text" name="room" id="room" />
        </form>
      </div>
    </div>
  );
}

export default Home;
