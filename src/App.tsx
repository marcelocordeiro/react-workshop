import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import JsxPage from './pages/JsxPage';
import PropsPage from './pages/PropsPage';
import UseStatePage from './pages/UseStatePage';
import UseEffectPage from './pages/UseEffectPage';
import UseContextPage from './pages/UseContextPage';
import UseReducerPage from './pages/UseReducerPage';
import ReactQueryPage from './pages/ReactQueryPage';
import ReactHookFormPage from './pages/ReactHookFormPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jsx" element={<JsxPage />} />
        <Route path="props" element={<PropsPage />} />
        <Route path="usestate" element={<UseStatePage />} />
        <Route path="useeffect" element={<UseEffectPage />} />
        <Route path="usecontext" element={<UseContextPage />} />
        <Route path="usereducer" element={<UseReducerPage />} />
        <Route path="react-query" element={<ReactQueryPage />} />
        <Route path="react-hook-form" element={<ReactHookFormPage />} />
      </Route>
    </Routes>
  );
}

export default App;
