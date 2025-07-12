import { Route, Routes, Navigate } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

//if user is authenticated, we'll check if they're onboarded, if they are not, navigate them to onboard page, if they are onboarded, they can go to whatever page they want. if they're not authenticated, we'll navigate them to login page. 
const App = () => {

  const {isLoading, authUser} = useAuthUser();
  const { theme } = useThemeStore();
 

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;


  if (isLoading) return <PageLoader/>;

  return (
  <div className="h-screen" data-theme={theme}>
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated && isOnboarded ? ( 
            <Layout showSidebar>
              <HomePage />
            </Layout>

          ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
      )
    } 
  />  //if user is authenticated and onboarded, take them to the home page, but if theyre not authenticated take them to the login page, else take them to the onboarding page
      <Route path="/signup" element={!isAuthenticated ? <SignUpPage />: <Navigate to ={isOnboarded ? "/" : "/onboarding"} />} />
      //if user is authenticated, show them the login page, else take them to the homepage or the onboarding page
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to ={isOnboarded ? "/" : "/onboarding"} />} />
      <Route path="/notifications" element={isAuthenticated && isOnboarded ? (
        <Layout showSidebar>
          <NotificationsPage />
        </Layout>
      ) : (
        <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
      )  } />
      <Route path="/call/:id" element={isAuthenticated && isOnboarded ? (
        <CallPage />
      ) : (
        <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
      )  
    } />
      <Route path="/chat/:id" element={isAuthenticated && isOnboarded ? (
        <Layout showSidebar={false}>
          <ChatPage />
        </Layout>
      ) : (
        <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
      )  
    } />
      <Route path="/onboarding" element={isAuthenticated ? ( !isOnboarded ? (<OnboardingPage />):(
        <Navigate to="/" />)
      ): (<Navigate to="/login" /> )} />
    </Routes>

    <Toaster />
  </div>
)};

export default App