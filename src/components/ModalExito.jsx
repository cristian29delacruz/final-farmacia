import { useEffect } from 'react';
import './ModalExito.css';

const ModalExito = ({ mostrar, onCerrar, mensaje, titulo = "¡Venta Exitosa!" }) => {
  useEffect(() => {
    if (mostrar) {
      // Auto cerrar después de 3 segundos
      const timer = setTimeout(() => {
        onCerrar();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mostrar, onCerrar]);

  if (!mostrar) return null;

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-exito-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-exito-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2"/>
            <path d="M8 12L11 15L16 9" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2>{titulo}</h2>
        <p>{mensaje}</p>
        <div className="modal-exito-progress">
          <div className="progress-bar"></div>
        </div>
        <button className="modal-exito-btn" onClick={onCerrar}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default ModalExito;
