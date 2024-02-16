import './App.css'; 
import AddNew from './Components/AddNew';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="dashboard">
      <div className='container'>
        <div className='row'>
        <BrowserRouter> 
          <div className='data-content col-md-9'>
              <AddNew />
          </div>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
