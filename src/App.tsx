// Main Application Component
import { Routes, Route, useLocation } from 'react-router-dom';
import Index from './pages/indexPage/Index';
import CartPage from './pages/cartPage/CartPage';
import NavigationBar from './components/navigationBar/NavigationBar';
import LoginPage from './pages/loginPage/LoginPage';
import GeneratePinPage from './pages/generatePinPage/GeneratePinPage';
import OrderForm from './components/orderForm/OrderForm';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const location = useLocation();

  // Hide navigation on auth pages
  const isAuthPage = location.pathname === '/' || location.pathname === '/login';

  return (
    <div className="App">
      <ErrorBoundary>
        {!isAuthPage && <NavigationBar />}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<GeneratePinPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <OrderForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
