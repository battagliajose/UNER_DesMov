# Arquitectura de Navegación y Autenticación

Este documento describe la estructura de navegación de la aplicación y cómo se maneja la autenticación (actualmente mockeada).

## 1. Navegación Principal (`app/root.tsx`)

La navegación de más alto nivel está controlada por el componente `Root`. Utiliza un `createNativeStackNavigator` para decidir qué flujo mostrar al usuario:

- **Flujo de Autenticación**: Si el usuario **no** está autenticado.
- **Flujo Principal (Tabs)**: Si el usuario **sí** está autenticado.

El estado de autenticación se determina verificando la presencia del objeto `user` en el `AuthContext`.

```tsx
// app/root.tsx

//...
{isSignedIn ? (
  <Stack.Screen
    name={ROOT_ROUTES.TABS}
    component={TabsScreen}
    //...
  />
) : (
  <Stack.Screen
    name={ROOT_ROUTES.AUTH}
    component={AuthStackScreen}
    options={{ headerShown: false }}
  />
)}
//...
```

## 2. Flujo de Autenticación (`app/auth/Index.tsx`)

Este flujo también es un `NativeStackNavigator` que contiene las pantallas de `Login` y `Register`. Es la primera vista que el usuario ve si no ha iniciado sesión.

## 3. Navegación por Pestañas (`app/tabs/index.tsx`)

Una vez que el usuario está autenticado, se le presenta la navegación principal, que es un `createBottomTabNavigator`. Este navegador contiene tres pestañas principales:

- **Home**: La pantalla de inicio.
- **Settings**: La pantalla de configuración.
- **Perfil**: La pantalla para ver el perfil del usuario.

Es importante destacar que cada una de estas pestañas es, a su vez, un `StackNavigator` independiente. Esto permite que cada sección tenga su propio flujo de navegación anidado. Por ejemplo, desde "Home" se puede navegar a "Fichar" y luego a "Confirmación Facial", todo dentro de la misma pestaña.

```tsx
// app/tabs/index.tsx

//...
<Tab.Navigator>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
    //...
  />
  <Tab.Screen
    name="Settings"
    component={Settings}
    //...
  />
  <Tab.Screen
    name="Perfil"
    component={Perfil}
    //...
  />
</Tab.Navigator>
//...
```

## 4. Mockeo de Seguridad y Autenticación

La autenticación se gestiona a través de un `AuthContext` de React.

### `shared/context/authContext/auth-provider.tsx`

Este provider maneja el estado de la autenticación (`user`, `token`, etc.) a través de un `useReducer`.

- **`AUTH_ACTIONS.LOGIN`**: Cuando se despacha esta acción, el `provider` guarda la información del usuario utilizando la función `setUser` y actualiza su estado interno.
- **`AUTH_ACTIONS.LOGOUT`**: Llama a `deleteUser` y limpia el estado de autenticación.

### `utils/secure-store.ts`

Este módulo es una abstracción sobre `expo-secure-store`. **Actualmente, actúa como un mock**, ya que `expo-secure-store` se comporta como `localStorage` cuando la aplicación se ejecuta en la web o en un emulador sin un almacenamiento seguro configurado.

- **`setUser(user)`**: Serializa el objeto `user` a un string JSON y lo "almacena" bajo la clave `Fich.Ar_user`.
- **`getUser()`**: Recupera el string JSON, lo parsea y lo devuelve como un objeto `IUser`.
- **`deleteUser()`**: Elimina la clave del usuario del almacenamiento.

Este enfoque permite simular un flujo de autenticación completo, guardando la sesión del usuario de forma persistente en el dispositivo (o en el `localStorage` del navegador durante el desarrollo) sin necesidad de un backend real.
