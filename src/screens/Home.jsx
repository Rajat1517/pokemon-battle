import React, { useContext } from "react";
import Splash from "../components/Splash";
import { UtilContext } from "../contexts/UtilContext";
function Home() {
  const { loading } = useContext(UtilContext);

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
        <button className="button btn-create">Create Room</button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e.target.room.value);
          }}
          id="room-id-form"
        >
          <label htmlFor="room" style={{display:"block"}}>Enter Room by code</label>
          <input placeholder="abcd" type="text" name="room" id="room" />
        </form>
      </div>
    </div>
  );
}

export default Home;
