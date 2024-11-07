# willinn-frontend-next-template

Willinn Front-End Template desarrollada en Next.js para la interfaz de gestión de usuarios en conjunto con [willinn-backend-template](https://github.com/jgnacio/Willinn-backend-api-template/tree/develop "willinn-backend-template"). Como parte de la
prueba técnica para Trainee, esta aplicación web conecta la sesión de usuarios administrada por el RESTfull API de Backend y provee una solucion practica e intuitiva para el uso del mismo, además de aplicar los principios de **Clean Architecture**, se usaron Librerías como **Shadcn** para componentes reutilizables de UI, **ReactQuery(TankStack4)** para la gestion de stados y peticiones en Caché de la REST API, **Axios** para el fetching de datos, **framer-motion** para algunas animaciones, **lucide-react** para los iconos y **svgr/Webpack** para los iconos Custom.

## Estructura General

La estructura sigue un patrón común en aplicaciones Next.js de mediana a gran escala. Se divide en las siguientes secciones principales:

- **src**: Contiene el código fuente de la aplicación.
  - **app**: Es la nueva forma de organizar aplicaciones en Next.js 13+, proporcionando una estructura más flexible y escalable.
  - **components**: Almacena componentes reutilizables de la interfaz de usuario.
  - **domain**: Contiene la lógica de negocio de la aplicación, como entidades, repositorios.
  - **resources**: Gestiona recursos externos como APIs.
  - **Icons**: Carpeta con iconos Custom en SVG.
  - **Lib/Functions**: Funciones Auxiliares.
- **pages**: Contiene una API como backend Interno
  - **Api**: Contiene las funciones para la obtencion del Token como Credencial

## Ejecución de la Aplicación

### Requisitos Previos

- **Nodejs** ([Descargar Node](https://nodejs.org/en/)
- **Docker Desktop** ([Descargar Docker](https://www.docker.com/)) (opcional, si prefieres usar Docker)

1. Clona el repositorio:

   ```bash
   git clone https://github.com/jgnacio/willinn-frontend-next-template.git
   ```

2. Abre una terminal en el directorio del proyecto.

3. Crea un archivo para las variables de entorno `.env.local`

### Configuracion Inicial (Recomendada Docker):

1. Iniciar Contenedor Docker de willinn-backend-template
2. Configurar como Localhost y en el puerto del contenedor docker `5001` en la variable de entorno `WILLIN_REST_API_URL`
   ```bash
   WILLIN_REST_API_URL="http://localhost:5001"
   ```

### Configuracion Inicial (Manual):

2. Configurar como Localhost y en el puerto `5000` en la variable de entorno `WILLIN_REST_API_URL`
   ```bash
   WILLIN_REST_API_URL="http://localhost:5000"
   ```

#### Ejecucion Manual

1. Instala los paquetes de Node

```bash
npm i
```

2. Ejecuta la aplicación
   Opcion1:
   ```bash
   npm run dev
   ```
   Opcion2(HTTPS Experimental):
   ```bash
   npm run devhttps
   ```

#### Usando Docker

Construye la imagen:

```bash
docker build -t willinn-frontend-next-template .
```

Ejecuta un Contenedor con la imagen creada y con el puerto mapeado:

```bash
docker run -d -p 3000:3000 willinn-frontend-next-template
```

### Usuario de Prueba

En el entorno de desarrollo de [willinn-backend-template](https://github.com/jgnacio/Willinn-backend-api-template/tree/develop "willinn-backend-template") se proporciona un usuario de prueba para Iniciar sesión:

```bash
User="WillinUserGuest"
Email="WillinnGuest@gmail.com"
Passwd="Guest"
```
