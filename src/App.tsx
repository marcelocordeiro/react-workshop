import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import JsxPage from './pages/JsxPage';
import PropsPage from './pages/PropsPage';
import UseStatePage from './pages/UseStatePage';
import UseEffectPage from './pages/UseEffectPage';
import UseContextPage from './pages/UseContextPage';
import ThemeSwitcherPage from './pages/ThemeSwitcherPage';
import SimpleContextPage from './pages/SimpleContextPage';
import UseReducerPage from './pages/UseReducerPage';
import ReactQueryPage from './pages/ReactQueryPage';
import ReactHookFormPage from './pages/ReactHookFormPage';
import UseMemoPage from './pages/UseMemoPage';
import UseCallbackPage from './pages/UseCallbackPage';
import UseRefPage from './pages/UseRefPage';
import CustomHooksPage from './pages/CustomHooksPage';
import MutationsPage from './pages/MutationsPage';
import StylingPage from './pages/StylingPage';
import RoutingPage from './pages/RoutingPage';
import OrderList from './components/15-routing/OrderList';
import OrderDetail from './components/15-routing/OrderDetail';
import ZustandPage from './pages/ZustandPage';
import I18nPage from './pages/I18nPage';

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
          <Route index element={<SimpleContextPage />} />
          <Route path="themeswitcher" element={<ThemeSwitcherPage />} />
          <Route path="simple-example" element={<SimpleContextPage />} />
        </Route>
        <Route path="usereducer" element={<UseReducerPage />} />
        <Route path="usememo" element={<UseMemoPage />} />
        <Route path="usecallback" element={<UseCallbackPage />} />
        <Route path="react-query" element={<ReactQueryPage />} />
        <Route path="react-hook-form" element={<ReactHookFormPage />} />
        <Route path="useref" element={<UseRefPage />} />
        <Route path="custom-hooks" element={<CustomHooksPage />} />
        <Route path="mutations" element={<MutationsPage />} />
        <Route path="styling" element={<StylingPage />} />
        {/* Nested routes: RoutingPage renders whichever child matched
            through its <Outlet />. */}
        <Route path="routing" element={<RoutingPage />}>
          <Route index element={<OrderList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="orders/:orderId" element={<OrderDetail />} />
        </Route>
        <Route path="zustand" element={<ZustandPage />} />
        <Route path="i18n" element={<I18nPage />} />
      </Route>
    </Routes>
  );
};

export default App;
