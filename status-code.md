# Qué son los HTTP Status Code

Los Status Codes nos dan información cuando nos comunicamos
con nuestras API.

Los HTTP Status Codes son respuestas que un servidor web envía al navegador para indicar el resultado de una solicitud. Están organizados en grupos como:

## 1xx: Información
## 2xx: Éxito (e.g., 200 OK)
## 3xx: Redirección
## 4xx: Error del cliente (e.g., 404 Not Found)
## 5xx: Error del servidor (e.g., 500 Internal Server Error).

# ¿Qué son los Métodos HTTP?

#### - GET 👀
#### - POST 🍧
#### - PUT and PATCH 📝
#### - DELETE❗️

# ¿Qué son los Headers HTTP?

Los headers HTTP son parámetros que se envían en una transacción HTTP, que contienen información del estado de la transacción en curso.

- Content Type
- Authorization
- Cookies
- Location

## API KEY

- Query Parameter:
?api_key=ABC123

- Authorization Header:
X-API-KEY: ABC123

# Header de Content-Type

#### Application

- application/json
- application/xml
- application/zip

#### Audio

- audio/mpeg
- audio/x-ms-wma
- audio/vnd.rn-realaudio
- audio/x-wav

#### Image

- image/png
- image/gif
- image/jpeg
- image/svg+xml
- image/x-icon

#### Text

- text/css
- text/csv
- text/html
- text/plain
- text/xml

#### Video

- video/mpeg
- video/mp4
- video/quicktime
- video/webm

# FormData

`FormData` en JavaScript se usa para construir un conjunto de pares clave/valor que puedes enviar fácilmente mediante `fetch` o `XMLHttpRequest` en solicitudes HTTP (como `POST`), especialmente para enviar archivos o formularios.

### Pasos simples:

1. **Crear un objeto `FormData`:**

   ```javascript
   const formData = new FormData();
   ```
2. #### Agregar datos al FormData: Puedes agregar cualquier valor (texto, números, archivos):

    ```javascript
    formData.append('username', 'JohnDoe');
    formData.append('file', fileInput.files[0]);
    ```
3. #### Enviar FormData con fetch:

    ```javascript
    fetch('https://example.com/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    ```

### En resumen:
`FormData` simplifica el envío de formularios, especialmente para subir archivos. 
Usas `.append()` para añadir datos.
Lo envías en la propiedad body de fetch (o XMLHttpRequest).

# Axios: librerías de JavaScript para consumir APIs



