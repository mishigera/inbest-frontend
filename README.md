# Inbest Image App (Frontend)

Frontend en Next.js + TailwindCSS para consumir el backend de procesamiento de imágenes. Permite registro, login, subir imágenes con efectos (resize, greyscale, calidad) y visualizar la galería.

## 🚀 Tecnologías

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- React Hooks
- Context / LocalStorage
- JWT Authentication
- React Hot Toast (para notificaciones)

---

## 🧑‍💻 Instalación

```bash
npm install
npm run dev




📁 Estructura del proyecto

/pages
  └── index.tsx        → Login
  └── register.tsx     → Registro
  └── dashboard.tsx    → Dashboard privado

/services/api.ts       → Funciones fetch (login, register, upload, get)
/styles/globals.css    → Tailwind base




🖼 Funcionalidad del dashboard
Subir imagen (image/jpeg o image/png)

Seleccionar efectos (resize, greyscale, quality)

Galería de imágenes propias

Mostrar toasts de éxito/error con react-hot-toast





📦 Scripts

npm run dev        # Levanta frontend en localhost:3000
npm run build      # Compila el proyecto para producción
📌 Requisitos
Tener el backend corriendo en http://localhost:5050

Usuario debe estar registrado con email/password



Desarrollado por Gerardo Melgoza 👨‍💻