import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { initialize, pageview } from 'react-ga';
import axios from 'axios';
import Cookies from 'js-cookie';

import Error404 from '../pages/common/Error404';
import Wallet from '../pages/client/Wallet';
import Dashboard from '../pages/admin/dashboard';
import Home from '../pages/common/Home';
import Login from '../pages/common/Login';
import SignUp from '../pages/client/Signup';
import SiderMenu from '../client/sider';
import Header from '../Common/Header';
import Loading from '../Common/Loading';
import './style.css';

const checkAdmin = async () => {
  const clients = await axios.get('/api/v1/admin/clients');
  const transactions = await axios.get('/api/v1/admin/transactions');
  return { clients, transactions };
};

const checkClient = async () => {
  const data = await axios.get('/api/v1/client');
  return data;
};

const LogOut = async () => {
  const data = await axios.post('/api/v1/logout');
  return data;
};

const App = () => {
  const [client, setClient] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ClientData, setClientData] = useState();
  const [Clients, setClients] = useState();
  const [Transactions, setTransactions] = useState();
  const history = useHistory();
  const { pathname } = window.location;
  useEffect(() => {
    if (Cookies.get('client')) {
      checkClient()
        .then(({ data: { clientData } }) => {
          setClient(true);
          setClientData(clientData);
          setLoading(false);
        })
        .catch(() => {
          setClient(false);
          setLoading(false);
        });
    } else if (Cookies.get('admin')) {
      checkAdmin()
        .then(({ clients, transactions }) => {
          setClients(clients);
          setTransactions(transactions.data.data);
          setAdmin(true);
          setLoading(false);
        })
        .catch(() => {
          setAdmin(false);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    initialize('UA-171542498-1');
    pageview(pathname);
  }, [pathname]);
  const logoutHandler = () => {
    LogOut().then(() => {
      setAdmin(false);
      setClient(false);
      history.push('/');
    });
  };

  const Routes = ['/wallet', '/bank', '/setting'];
  const staticRoutes = ['/login', '/signup'];

  if (loading) {
    return <Loading />;
  }
  if (client) {
    return (
      <>
        <Header
          isAdmin={admin}
          isClient={client}
          logoutHandler={logoutHandler}
        />
        <Switch>
          <Route exact path="/404" render={() => <Error404 />} />
          <Route
            exact
            path="/"
            render={() => (
              <Home
                MainBalance={ClientData ? ClientData.mainBalance : {}}
                isClient={client}
              />
            )}
          />
          <Route
            path={['/wallet', '/bank', '/settings']}
            render={() => (
              <SiderMenu content={Wallet} ClientData={ClientData} />
            )}
          />

          {staticRoutes.includes(pathname) && (
            // when we finish the alert component
            // we will tell the Client you already login and the redirect their to wallet
            <>{window.location.replace('/')}</>
          )}
          {pathname === '/dashboard' ? ( // when we finish the alert component
            // we will tell the client you can't see this routes
            <>{window.location.replace('/wallet')}</>
          ) : (
            <Redirect to="/404" />
          )}
        </Switch>
      </>
    );
  }

  if (admin) {
    return (
      <>
        <Header
          isAdmin={admin}
          isClient={client}
          logoutHandler={logoutHandler}
        />
        <Switch>
          <Route exact path="/404" render={() => <Error404 />} />
          <Route
            exact
            path="/"
            render={() => (
              <Home
                MainBalance={ClientData ? ClientData.mainBalance : {}}
                isClient={client}
              />
            )}
          />
          <Route
            exact
            path="/dashboard"
            render={() => (
              <Dashboard Clients={Clients} Transactions={Transactions} />
            )}
          />
          {staticRoutes.includes(pathname) && (
            // when we finish the alert component
            // we will tell the admin you already login and the redirect their to dashboard
            <>{window.location.replace('/dashboard')}</>
          )}
          {Routes.includes(pathname) ? ( // when we finish the alert component
            // we will tell the admin you can't see this routes
            <>{window.location.replace('/dashboard')}</>
          ) : (
            <Redirect to="/404" />
          )}
        </Switch>
      </>
    );
  }
  return (
    <Switch>
      <Route exact path="/404" render={() => <Error404 />} />
      <Route
        exact
        path="/"
        render={() => (
          <>
            <Header
              isAdmin={admin}
              isClient={client}
              logoutHandler={logoutHandler}
            />

            <Home
              MainBalance={ClientData ? ClientData.mainBalance : {}}
              isClient={client}
            />
          </>
        )}
      />
      <Route exact path="/login" render={() => <Login />} />
      <Route exact path="/signup" render={() => <SignUp />} />
      {Routes.includes(pathname) || pathname === '/dashboard' ? (
        // when we finish the alert component
        // we will add alert to tell the client, you are unauthorized, you must to signup or login
        // and redirect there to signup page
        <>{window.location.replace('/signup')}</>
      ) : (
        <Redirect to="/404" />
      )}
    </Switch>
  );
};

export default App;
