
import './App.css';
import AppRouter from "./Router/AppRouter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastProvider } from "./components/Toast/Toast";
import { ConfirmProvider } from "./components/ConfirmModal/ConfirmModal";


function App() {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <AppRouter />
      </ConfirmProvider>
    </ToastProvider>
  );
}

export default App;
