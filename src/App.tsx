import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import JsxPage from './pages/JsxPage';
import PropsPage from './pages/PropsPage';
import UseStatePage from './pages/UseStatePage';
import UseEffectPage from './pages/UseEffectPage';
import UseContextPage from './pages/UseContextPage'; // The new parent page
import ThemeSwitcherPage from './pages/ThemeSwitcherPage'; // The renamed page
import SimpleContextPage from './pages/SimpleContextPage'; // The new simple example page
import UseReducerPage from './pages/UseReducerPage';
import ReactQueryPage from './pages/ReactQueryPage';
import ReactHookFormPage from './pages/ReactHookFormPage';
import UseMemoPage from './pages/UseMemoPage';
import UseCallbackPage from './pages/UseCallbackPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jsx" element={<JsxPage />} />
        <Route path="props" element={<PropsPage />} />
        <Route path="usestate" element={<UseStatePage />} />
        <Route path="useeffect" element={<UseEffectPage />} />
        <Route path="usecontext" element={<UseContextPage />}>
          <Route path="themeswitcher" element={<ThemeSwitcherPage />} />
          <Route path="simple-example" element={<SimpleContextPage />} />
        </Route>
        <Route path="usereducer" element={<UseReducerPage />} />
        <Route path="usememo" element={<UseMemoPage />} />
        <Route path="usecallback" element={<UseCallbackPage />} />
        <Route path="react-query" element={<ReactQueryPage />} />
        <Route path="react-hook-form" element={<ReactHookFormPage />} />
      </Route>
    </Routes>
  );
};

export default App;
