import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [newFood, setNewFood] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
    });
  }, []);
  const handleAddFood = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error adding food:", error);
      });
  };

  const handleUpdate = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFood,
    });
  };

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error deleting food:", error);
      });
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label>Food Name:</label>
      <input
        type="text"
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <label>Days Since You Ate It:</label>
      <input
        type="number"
        onChange={(e) => {
          setDays(e.target.value);
        }}
      />
      <button onClick={handleAddFood}>Add to List</button>

      <h1>Food List</h1>
      {foodList?.map((val, key) => {
        return (
          <div className="card" key={key}>
            <h3>
              Food Name: <span>{val?.foodName}</span>
            </h3>
            <h3>
              Days Since Ate: <span>{val?.daysSinceIAte}</span>
            </h3>
            <input
              type="text"
              placeholder="New Food Name..."
              onChange={(e) => {
                setNewFood(e.target.value);
              }}
            />
            <button onClick={() => handleUpdate(val?._id)}>Update</button>
            <button onClick={() => handleDelete(val?._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
