# Día 40

## Enlaces

- Frontend React: https://full-junio-2026-emja.vercel.app/
- Cliente HTML y API: https://dia40.onrender.com
- Repo: https://github.com/adamadarmes-svg/FULL-JUNIO-2026/tree/main/dia40

## Tecnologías

- Frontend: React, Vite, React Router v7, Tailwind CSS v4, Context API y WebSocket
- Backend: Node.js, Express y ws
- Despliegue: Vercel para el front y Render para el back

## Qué hace

- Los mensajes llegan a todos al instante
- Eliges un nombre y no te deja repetir uno que ya está en uso
- Ves quién está conectado en todo momento
- Avisa cuando alguien entra o sale
- Al entrar te carga los últimos mensajes
- Si se cae la conexión vuelve a intentarlo solo
- El servidor detecta y saca a los clientes muertos con ping y pong
- El cliente HTML y el de React se pueden usar juntos en la misma sala

## Protocolo

Todo va en JSON con `tipo`, `id` y `timestamp`

- Cliente a servidor
  - `ENTRAR` manda el `nombre`
  - `MENSAJE` manda el `texto`
- Servidor a cliente
  - `HISTORIAL` con los `mensajes` anteriores
  - `MENSAJE` con `usuario` y `texto`
  - `SISTEMA` para avisos con `texto`
  - `USUARIOS` con la lista de `usuarios`
  - `ERROR` con el `texto` del error

## Estructura

```
dia40/
├── backend/
│   ├── public/index.html      cliente HTML
│   ├── index.js
│   └── src/
│       ├── config/            constantes
│       ├── controllers/       envío de mensajes
│       ├── models/            estado de la sala
│       ├── utils/             mensajes y validaciones
│       ├── websocket/         server y handlers
│       └── app.js
└── frontend/
    └── src/
        ├── components/chat/   ChatRoom, MessageList, UserList, MessageForm
        ├── components/ui/
        ├── context/           ChatContext
        ├── hooks/             useWebSocket, useAutoScroll
        ├── lib/               constantes y formato
        ├── pages/
        └── router/
```

## Correrlo en local

- Backend

```bash
cd dia40/backend
npm install
npm run dev
```

- `backend/.env`

```
PORT=8080
FRONTEND_URL=http://localhost:5173
```

- El cliente HTML queda en `http://localhost:8080`

- Frontend

- `frontend/.env`

