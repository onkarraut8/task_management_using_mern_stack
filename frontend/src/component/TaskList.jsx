import React, { useState, useEffect } from 'react';
import axios from "axios";


const TaskList = () => {
  const [data, setData] = useState([]);
  const [btn, setBtn] = useState("Save");
  // State to manage form fields
  const [formData, setFormData] = useState({
    id: "",
    taskName: '',
    taskStatus: 'PENDING' // Default status
  });

  // Handle input change
  const handleChange = (event) => {
    //const { name, value } = event.target;
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks/all');
      setData(response.data);
    } catch (err) {
      alert("Error "+err.message);
      console.log(err.message);
    }
  };


  const deleteTask = async (id) => {
    //e.preventDefault();
    console.log("d "+id);
    try {
     const resp = await axios.delete(`http://localhost:5000/tasks/${id}`);
      //navigate(`/item/${id}`); // Redirect to the item detail page or another page
      console.log(resp.data);
      alert("Delete "+resp.data);
      fetchData();
    } catch (err) {
      alert("Delete error"+err.message);
      
    }
  }



  // Use effect to call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchTAskById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/tasks/${id}`);
      alert("Result "+response.data);
    } catch (err) {
      alert("Error "+err.message);
    }
  };

  const updateSetTask = (item) => {
    setBtn("Update");
    console.log(JSON.stringify(item)+" q");
    //console.log(formData.taskStatus+" q "+item.taskStatus);
    setFormData({
      id: item._id,
      taskName: item.taskName,
      taskStatus: item.taskStatus
    });

  };

  const saveTask = (e) => {
     e.preventDefault();
    fetch("http://localhost:5000/tasks/save", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          console.log(response +" 1");
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert("Result "+data);
        //setResponse(data);
        setFormData({
          id: "",
          taskName: "",
          taskStatus: "PENDING"
        });
        fetchData();
        
      }).catch(err => {
        alert("Error "+err.message);
        console.error('Error:', err);
        
      });

  };

  const updateTask = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/tasks/${formData.id}`, formData)
      .then((result) => {
        // Handle success
        alert("Result "+result.data);
        setFormData({
          id: "",
          taskName: "",
          taskStatus: "PENDING"
        });
        setBtn('Save');
        fetchData();
        console.error('Error updating data:', result.data);
      })
      .catch((err) => {
        // Handle error
        alert("Error "+err.message);
        console.error('Error updating data:', err);
      });
  }


  const saveORUpdate =  (e) =>{
      if(btn === "Save"){
        saveTask(e);

      }
      if(btn === "Update"){
        updateTask(e)
      }

  }
  return (

    <div className="container mt-4">
      <h2>Task Form</h2>
      <form onSubmit={saveORUpdate}>
        <div className="mb-3">
          <label htmlFor="taskName" className="form-label">Task Name</label>
          <input
            type="text"
            id="taskName"
            name="taskName"
            className="form-control"
            value={formData.taskName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="taskStatus" className="form-label">Task Status</label>
          <select
            id="taskStatus"
            name="taskStatus"
            className="form-select"
            value={formData.taskStatus}
            onChange={handleChange}
            required
          >
           
            <option value="PENDING">Pending</option>
            <option value="IN PROCESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">{btn}</button>
      </form>

      <table class="table" style={{height:"250px"}}>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Task Name</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item}>
               <td>{item._id}</td>
              <td>{item.taskName}</td>
              <td>{item.taskStatus}</td>
              <td><button className='btn btn-primary' onClick={()=>updateSetTask(item)}>edit</button></td>
              <td><button className='btn btn-primary' onClick={() => deleteTask(item._id)}>Delete</button></td>
            </tr>
          ))}



        </tbody>
      </table>
    </div>

  )
};

export default TaskList;