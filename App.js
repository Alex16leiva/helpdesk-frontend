import { ToastContainer } from 'react-toastify';
import { store } from "./app/stores/store";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import LoadingOverlay from './components/Controls/WaitControl/LoadingOverlay';

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LoadingOverlay />
        <ToastContainer position="top-right" autoClose={3000} />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};