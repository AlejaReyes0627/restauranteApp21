import { Redirect, Route } from 'react-router-dom';
import React, { useState } from 'react';
import { home, person } from 'ionicons/icons';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Login from './pages/Login';
import Mesas from './pages/Mesas';
import Pago from './pages/Pago';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
//import '@ionic/react/css/palettes/high-contrast.system.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';
//import '@ionic/react/css/palettes/high-contrast-dark.system.css';


/* Theme variables */
import './theme/variables.css';
import api from './services/api';

setupIonicReact();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Error en logout', error);
  } finally {
    setIsLoggedIn(false);
  }
};

return (
    <IonApp>
      <IonReactRouter>
        {isLoggedIn ? (
          <>
            {/* Header con botón cerrar sesión */}
            <IonHeader>
              <IonToolbar>
                <IonTitle>Arepas 21</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={logout}>Cerrar sesión</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>

            {/* Contenido principal: tabs */}
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home" component={Mesas} />
                <Route exact path="/perfil" component={Pago} />
                <Redirect exact from="/" to="/home" />
              </IonRouterOutlet>

              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon icon={home} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="perfil" href="/perfil">
                  <IonIcon icon={person} />
                  <IonLabel>Perfil</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </>
        ) : (
          <IonRouterOutlet>
            <Route exact path="/login">
              <Login onLogin={() => setIsLoggedIn(true)} />
            </Route>
            <Redirect to="/login" />
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
