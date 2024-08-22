import TaskList from "./component/TaskList";
import { Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TaskList/>} />
      </Routes>
    </div>
  );
}

export default App;
