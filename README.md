# 💸 Kiiro | Control de Gastos

![Kiiro App](image.png)

Aplicación web para **gestionar tus gastos personales** de manera simple, visual y moderna.  
Desarrollada con ❤️ usando **React** y **Supabase**.

---

## 🚀 Descripción

**Kiiro** es una app full stack pensada para ayudarte a **organizar tus finanzas diarias**, con funciones que hacen más fácil visualizar y controlar tus gastos.

Incluye:

- 📊 **Gráficas interactivas** para analizar tus movimientos.
- 🌗 **Modo oscuro y claro** según tu preferencia.
- ⚙️ **Funciones personalizadas** con Supabase para reportes y consultas.
- 🗂️ **Storage / Bucket** para manejo de archivos e imágenes.
- 🔐 **Autenticación de usuarios** y base de datos en tiempo real.

Ideal para aprender sobre integración entre frontend y backend moderno.

---

## 🧠 Tecnologías usadas

| Frontend        | Backend                                               | Estilos              | Otras              |
| --------------- | ----------------------------------------------------- | -------------------- | ------------------ |
| ⚛️ React + Vite | 🟩 Supabase (PostgreSQL + Auth + Storage + Functions) | 💅 styled-components | 📦 react-hook-form |
| Zustand         | Supabase JS Client                                    | React Icons          | React Router DOM   |
| Recharts        |                                                       |                      |                    |

---

## 🧩 Estructura general del proyecto

```

src/
├─ components/
├─ pages/
├─ hooks/
├─ store/
├─ supabase/
├─ styles/
├─ App.jsx
└─ main.jsx

```

---

## ⚙️ Cómo levantar el proyecto localmente

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tuusuario/kiiro.git
   cd kiiro
   ```

````

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Crea un archivo `.env`** en la raíz con tus claves de Supabase:

   ```bash
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_clave_anon
   ```

4. **Levanta el servidor de desarrollo**

   ```bash
   npm run dev
   ```

5. Abre en tu navegador:

   ```
   http://localhost:5173
   ```

---

## 🧪 Funcionalidades destacadas

* ✅ Autenticación con Supabase Auth
* 💾 Persistencia de datos en tiempo real
* 📈 Gráficas con Recharts
* 💡 Modo oscuro / claro dinámico
* 🗂️ Manejo de archivos en Storage
* 🧮 Cálculo automático de totales

---

## 🧰 Scripts útiles

| Comando           | Descripción                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo |
| `npm run build`   | Genera la build de producción    |
| `npm run preview` | Previsualiza la build localmente |

---

## 🌟 Demo

🎥 Puedes ver un video demo del proyecto [aquí](https://youtube.com/shorts/MrzQ0dgHOEM)
(o búscame en LinkedIn, lo compartí recientemente 😉)

---

## 💬 Sobre el proyecto

Este proyecto nació como parte de mi aprendizaje **Full Stack con React y Supabase**.
Fue un reto integrar todas las piezas: autenticación, funciones, reportes, modo oscuro y manejo de archivos,
pero sin duda, fue la mejor forma de afianzar mi conocimiento y construir algo útil.

---

## 🤝 Conecta conmigo

Si te gustó el proyecto o tienes ideas para mejorarlo, ¡me encantaría conectar contigo!
📫 [LinkedIn](https://www.linkedin.com/in/jimmyegc/) | 💻 [GitHub](https://github.com/jimmyegc)

---

> “La mejor forma de aprender es construyendo.” 🚀
> — *Kiiro Team*

```

---

¿Quieres que te genere también una **versión en inglés** para hacer el repo más internacional o prefieres mantenerlo en español?
```
````
