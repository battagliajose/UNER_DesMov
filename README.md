<img src="https://secretariaextension.uner.edu.ar/wp-content/uploads/2021/04/logo-original-maschico.png" alt="">

# Tecnicatura Universitaria en Desarrollo Web - 2025 - 2do cuatrimestre

## Trabajo Práctico de la materia "Desarrollo para Móviles"

### ACTIVIDAD N° 3 - Entrega Final Aplicación React Native Expo

#### Grupo '9'

#### Integrantes:

- Luis Sanchez
- José Battaglia
- Cristian Seltenreich

### Agregar dependencias

```bash
$ npm install
```

### Archivo .env.local

```bash

EXPO_PUBLIC_SUPABASE_URL=https://xpwfynlnbpbszpflcrih.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhwd2Z5bmxuYnBic3pwZmxjcmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NjI2NzAsImV4cCI6MjA3NjEzODY3MH0.Fp6OFNW4kXbeH0qJzkogIG_Bs8_UJQhm8KZyU9-UMtE

```

## Ejecutar con:

```bash
$ npm run start
```

![LOGO](./README.img/logo.png)

# Fich.Ar

“Control de Fichadas” es una aplicación móvil desarrollada con React Native + Expo que permite registrar fichadas de ingreso y salida mediante una foto y la ubicación GPS, validando así la presencia real del empleado en su puesto de trabajo.

La app está pensada especialmente para empleados que trabajan fuera de la empresa o en ubicaciones cambiantes, donde instalar un reloj físico de marcación no es posible o no resulta práctico. Es ideal para tareas como mantenimiento, vigilancia, limpieza, soporte técnico y otras actividades que requieren movilidad.

Cada fichada registra:

📸 Fotografía del empleado

📍 Coordenadas GPS

🗺️ Dirección geocodificada del lugar

Además, la aplicación permite visualizar el historial completo de fichadas, incluyendo foto, ubicación y horarios, y envía notificaciones locales como recordatorios cercanos al horario de salida.

Para el backend se optó por Supabase, centralizando allí:

🔐 Autenticación de usuarios

🗄️ Base de datos para el registro de fichadas

☁️ Storage para almacenar las fotos

A parte de Supabase, también se accedió a la api _api.open-meteo.com_ para datos del clima del lugar donde se encuentra el usuario.
La aplicación también utiliza funcionalidades nativas del dispositivo como cámara, geolocalización, mapas, sistema de archivos (exportación de PDF) y notificaciones, cumpliendo con todos los requisitos mínimos establecidos para el trabajo práctico.

Como funcionalidades extra tenemos: Exportación a PDF, Vibración y Sonido en confirmación de fichadas.

## LOGIN

![LOGIN](./README.img/login.png)

Pantalla de Login para autenticación.

Login de usuarios vía Supabase Auth.

Manejo de sesión persistente.

Validación de correo y estados.

### Registro

![Registro](./README.img/register.png)

Registro de usuarios vía Supabase Auth.

Registro de usuario nuevo.

### Home

![Home](./README.img/home.png)

Pantalla principal donde el usuario accede a las acciones de fichada.

Mapa mostrando la posición actual del usuario.

Información del Clima. (api.open-meteo.com)

### Fichada

![Fichada](./README.img/fichada.png)

Toma de fotografía.

Obtención de ubicación GPS.

Vista previa de foto antes de confirmar.

Envío de datos a Supabase Storage + Base de Datos.

### Dashboard

![Dashboard](./README.img/dashboard.png)

Dashboard para visualización de estadisticas y acceso a listados.

### Ingresos y Egresos

![Ingresos](./README.img/ing_y_egr.png)

Listado de Ingresos y Egresos.

Lista ordenada por fecha.

Muestra miniatura de la foto y detalle de ubicación.

Acceso rápido a la imagen almacenada.

Exportación a PDF

### Perfil

![Perfil](./README.img/perfil.png)

Perfil de usuario y personalización.

Cierre de sesión.

### Detalles del Usuario

![Detalles del Usuario](./README.img/detallesUsuario.png)

Datos del usuario obtenidos desde Supabase.
