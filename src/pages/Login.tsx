import { useState } from "react";
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonImg,
  IonText,
  IonSpinner,
  IonIcon
} from "@ionic/react";
import { eye, eyeOff, lockClosed, personCircle } from "ionicons/icons";
import { loginUser } from "../services/authService";
import "./Login.css";

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await loginUser(username, password);
      // No guardar tokens en localStorage porque ya están en cookie HttpOnly
      onLogin();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      {/* fullscreen para ocupar toda la pantalla */}
      <IonContent fullscreen className="login-content">
        {/* wrapper que asegura min-height:100vh y centra */}
        <div className="login-wrapper">
          <div className="login-card">
            <IonImg src="/logo.png" className="login-logo" />

            <h2 className="login-title">Bienvenido</h2>
            <p className="login-subtitle">Ingresa tus credenciales para continuar</p>

            <IonItem className="login-input">
              <IonIcon icon={personCircle} slot="start" />
              <IonInput
                placeholder="Usuario"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
              />
            </IonItem>

            <IonItem className="login-input">
              <IonIcon icon={lockClosed} slot="start" />
              <IonInput
                placeholder="Contraseña"
                type={showPassword ? "text" : "password"}
                value={password}
                onIonInput={(e) => setPassword(e.detail.value!)}
              />
              <IonButton fill="clear" slot="end" onClick={() => setShowPassword(s => !s)}>
                <IonIcon icon={showPassword ? eyeOff : eye} />
              </IonButton>
            </IonItem>

            {error && <IonText color="danger" className="error-text">{error}</IonText>}

            <IonButton
              expand="block"
              className="login-button"
              onClick={handleLogin}
              disabled={loading || !username || !password}
            >
              {loading ? <IonSpinner name="crescent" /> : "Ingresar"}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;