import React, { useEffect, useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonButton, IonBadge, IonSpinner, IonGrid, IonRow, IonCol
} from '@ionic/react';
import axios from 'axios';

type EstadoMesa = 'DISPONIBLE' | 'NO DISPONIBLE' | 'OCUPADO';

interface Mesa {
  id: number;
  nombre: string;
  estado: EstadoMesa;
}

const estadoColor = {
  DISPONIBLE: 'success',
  'NO DISPONIBLE': 'medium',
  OCUPADO: 'danger',
};

const Mesas: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const fetchMesas = () => {
    setLoading(true);
    setError(null);
    axios.get('http://tu-backend.com/mesas', { withCredentials: true })
      .then(res => {
        setMesas(res.data.mesas);
      })
      .catch(e => {
        setError('Error al cargar mesas');
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMesas();
  }, []);

  const cambiarEstado = (mesaId: number, nuevoEstado: EstadoMesa) => {
    setUpdatingId(mesaId);
    axios.put(`http://tu-backend.com/mesas/${mesaId}/estado`, { estado: nuevoEstado }, { withCredentials: true })
      .then(() => {
        setMesas(prev =>
          prev.map(m => (m.id === mesaId ? { ...m, estado: nuevoEstado } : m))
        );
      })
      .catch(e => {
        alert('Error al actualizar estado');
        console.error(e);
      })
      .finally(() => {
        setUpdatingId(null);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mesas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading && <IonSpinner name="crescent" />}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <IonList>
          {mesas.map((mesa) => (
            <IonItem key={mesa.id}>
              <IonLabel>
                {mesa.nombre}
                <IonBadge color={estadoColor[mesa.estado]} style={{ marginLeft: 10 }}>
                  {mesa.estado}
                </IonBadge>
              </IonLabel>

              {/* Botones según estado */}
              {mesa.estado === 'DISPONIBLE' && (
                <IonButton
                  size="small"
                  color="primary"
                  disabled={updatingId === mesa.id}
                  onClick={() => cambiarEstado(mesa.id, 'OCUPADO')}
                >
                  {updatingId === mesa.id ? '...' : 'Ocupar'}
                </IonButton>
              )}
              {mesa.estado === 'OCUPADO' && (
                <IonButton
                  size="small"
                  color="success"
                  disabled={updatingId === mesa.id}
                  onClick={() => cambiarEstado(mesa.id, 'DISPONIBLE')}
                >
                  {updatingId === mesa.id ? '...' : 'Desocupar'}
                </IonButton>
              )}
              {/* Si está NO DISPONIBLE no mostramos botón */}
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Mesas;
