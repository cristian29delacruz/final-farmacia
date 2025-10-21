# Final - Farmacia (Frontend)

Este repositorio contiene una aplicación frontend para la gestión de una farmacia (clientes, productos, usuarios y ventas) construida con React y Vite, más un servidor falso (json-server) para simular una API REST usando `db.json`.

Contenido principal
- Interfaz web en React (JSX) creada con Vite.
- Estilos con CSS y Bootstrap.
- Comunicación con la API falsa mediante Axios.
- Ruteo con `react-router-dom`.
- Base de datos simulada: `db.json` (json-server).

Tecnologías usadas
- React 19
- Vite
- Bootstrap 5
- Axios
- React Router DOM
- json-server (API REST falsa)
- ESLint (configuración básica)

Instalación y ejecución local

1. Instala dependencias

```powershell
npm install
```

2. Levantar el servidor falso (json-server)

Esto expone la API en el puerto 3001 según el script `server` del `package.json`.

```powershell
npm run server
```

3. Levantar la app en modo desarrollo (Vite)

```powershell
npm run dev
```

Scripts disponibles (en `package.json`)

- `npm run dev` — Inicia Vite en modo desarrollo (HMR).
- `npm run build` — Genera la versión de producción.
- `npm run preview` — Sirve la build localmente para pruebas.
- `npm run lint` — Ejecuta ESLint sobre el proyecto.
- `npm run server` — Inicia `json-server --watch db.json --port 3001`.

API (json-server)

El archivo `db.json` contiene los recursos disponibles y puede consultarse en `http://localhost:3001` cuando el servidor está corriendo.

Rutas principales:

- `GET /usuarios` — listado de usuarios
- `GET /clientes` — listado de clientes
- `GET /productos` — listado de productos
- `GET /ventas` — listado de ventas

Ejemplos de URLs (local):

- http://localhost:3001/usuarios
- http://localhost:3001/productos

Credenciales de ejemplo incluidas en `db.json`

- Administrador:
  - usuario: `admin`
  - password: `1234`
  - rol: `admin`
- Empleado:
  - usuario: `empleado`
  - password: `abcd`
  - rol: `empleado`
- Cliente de ejemplo:
  - usuario: `cliente1`
  - password: `1234`
  - rol: `cliente`

Estructura relevante del proyecto

(`src/` contiene los componentes y páginas principales)

- `src/main.jsx` — punto de entrada de la app.
- `src/App.jsx` — componente raíz y ruteo.
- `src/components/` — componentes reutilizables (Navbar, Footer, tablas, formularios, rutas protegidas, etc.).
- `src/Pages/` — páginas (Home, Productos, Clientes, Ventas, Login, Registro, Usuarios, HistorialClientes).
- `src/Services/` — llamadas a la API usando Axios (`Clientes.js`, `Productos.js`, `Usuarios.js`, `Ventas.js`).
- `db.json` — datos falsos consumidos por `json-server`.
- `public/img/` — imágenes usadas por la app.

Notas de desarrollo

- La API falsa usa identificadores y esquemas sencillos; en un backend real hay que validar y normalizar los datos.
- Algunas rutas o campos en `db.json` pueden tener claves no uniformes (por ejemplo, en algunas ventas se usa `id_producto` o `productoId`); tenlo en cuenta al consumir o migrar datos.
- Las imágenes referenciadas en `db.json` apuntan a `./img/` dentro de la carpeta `public`.

Cómo contribuir

- Abrir un issue describiendo el problema o la mejora.
- Hacer un fork y enviar un PR con una breve descripción de los cambios.

Contacto

Para dudas o mejoras, puedes contactarme abriendo un issue en este repositorio.

Licencia

Incluye la licencia que prefieras aquí (por ejemplo MIT) o elimina esta sección si no aplica.

---

Archivo actualizado automáticamente: documentación del proyecto frontend "Final - Farmacia".
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
