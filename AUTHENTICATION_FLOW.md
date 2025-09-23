## Flujo de Autenticación y Navegación

Este documento detalla el flujo de la aplicación desde su inicio hasta que se muestra la pantalla principal después de que un usuario inicie sesión.

### 1. Punto de Inicio: `App.tsx`

Todo comienza en el archivo `App.tsx`. Este es el componente raíz de toda la aplicación.

Su función principal es configurar el entorno:

- **`AuthProvider`**: Envuelve toda la aplicación en un "proveedor de contexto de autenticación". Esto permite que cualquier componente dentro de la app pueda saber si el usuario está logueado o no.
- **`Root`**: Es el componente que contiene la lógica principal de navegación.

```tsx
// App.tsx
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <Root />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
```

### 2. ¿Qué sucede al ingresar usuario y contraseña?

Esto ocurre en la pantalla de Login (`app/auth/screens/Login.tsx`).

1.  **Captura de datos**: Los `TextInput` para el email y la contraseña actualizan las variables de estado `email` y `pass`.
2.  **Acción de Login**: Al presionar "Ingresar", se llama a la función `handleLogin`.
3.  **Dispatch al Contexto**: Dentro de `handleLogin`, se despacha (envía) una acción al `AuthContext`. En este caso, es una acción de tipo `LOGIN` que lleva consigo datos *mockeados* (simulados) del usuario.

```tsx
// app/auth/screens/Login.tsx
const handleLogin = () => {
    // ...
    dispatch({
      type: AUTH_ACTIONS.LOGIN,
      payload: {
        toke: 'TOKEN',
        refreshToken: 'REFRESH_TOKEN',
        user: {
          id: 'ID',
          nombre: 'Nombre',
          apellido: 'Apellido',
          email: email,
        },
      },
    });
    // ...
};
```

### 3. ¿Dónde se almacenan los datos?

Aquí intervienen dos archivos:

1.  **`shared/context/authContext/auth-provider.tsx`**:
    - Este "proveedor" está escuchando las acciones que se le envían.
    - Cuando recibe la acción `AUTH_ACTIONS.LOGIN`, ejecuta el código asociado, que llama a la función `setUser` y actualiza su propio estado con la información del usuario.

2.  **`utils/secure-store.ts`**:
    - La función `setUser` que fue llamada en el paso anterior se encuentra aquí.
    - Esta función toma el objeto del usuario, lo convierte en un string con formato JSON y lo guarda en el almacenamiento persistente del dispositivo usando `SecureStore.setItemAsync`.

```typescript
// utils/secure-store.ts
const setUser = (user: IUser) =>
  _setItem(STORAGE_KEYS.USER, JSON.stringify(user));
```

### 4. Archivos y Métodos para decidir mostrar la Home

El cerebro de esta decisión es el componente `app/root.tsx`.

1.  **Escucha de cambios**: `Root` está conectado al `AuthContext`, por lo que sabe si el objeto `user` en el estado global existe o es nulo.
2.  **`useEffect`**: Un hook `useEffect` se ejecuta cada vez que el estado de autenticación (`state`) cambia. Si `state.user` tiene datos, actualiza una variable local llamada `isSignedIn` a `true`.

    ```tsx
    // app/root.tsx
    useEffect(() => {
        if (state?.user) {
        setIsSignedIn(true);
        } else {
        setIsSignedIn(false);
        }
    }, [state]);
    ```
3.  **Renderizado Condicional**: El componente `StackNavigator` dentro de `Root` usa la variable `isSignedIn` para decidir qué pantalla mostrar.
    - Si `isSignedIn` es `true`, renderiza el componente `TabsScreen` (que es la pantalla principal con las pestañas de Home, Perfil, etc.).
    - Si `isSignedIn` es `false`, renderiza el `AuthStackScreen` (las pantallas de Login y Registro).

    ```tsx
    // app/root.tsx
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
            //...
        />
    )}
    ```

### Resumen del Flujo

**Login.tsx** (Input del usuario) **->** `handleLogin` dispara una acción **->** **auth-provider.tsx** (recibe la acción, llama a `setUser`) **->** **secure-store.ts** (guarda los datos) **->** **root.tsx** (detecta el cambio en el estado, cambia `isSignedIn` a `true` y muestra la `TabsScreen`).
