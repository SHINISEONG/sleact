import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Router,
} from 'react-router-dom';
import LogIn from '@pages/LogIn';
import SignUp from '@pages/SignUp';
import Workspace from './layouts/Workspace/workspace';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/workspace/*" element={<Workspace />} />
        <Route path="/workspace/:workspace/*" element={<Workspace />} />
      </Routes>
    </>
  );
}

export default App;
