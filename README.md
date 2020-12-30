# In Progress

# Static Site Starter basado en [HTML5 Boilerplate](https://h5bp.org/)

Esto es plantilla para generar sitios web estáticos con las siguientes características:

- Lo sitios web estan preparados para desplegarse en **Netlify** (se puede evaluar en el futuro algun servicio similar dependiendo de los costos)
- Diseño basado en Mobile First, semantic HTML, mínimo uso de clases
- Generar páginas web estaticas a partir de un archivo de configuración o datos
- Inyectar un **tema css** predefinido y compilarlo en un solo archivo css minificado
- Inyectar archivos js "type=modules"
- Las **fonts** se obtienen de _google fonts_ o de otro servicio _open source_
- Las imágenes y videos se obtienen de **Cloudinary** o de algun otro servicio gratuito
- Utilizar servicios como, reserva de mesas, calendario de eventos, conectarse a tripadvisor, etc.

## Consideraciones a tener en cuenta mientras se desarrolla este proyecto

- Todos los scripts se desarrollan **en un solo archivo JS** _(/scripts.min.js)_
- Todos los estilos se exportan **en un solo archivo css** _(/styles.min.js)_ y usando variables css (no sass)

## Links de interes

### Checklist

- [3 años de antiguedad](https://github.com/thedaviddias/Front-End-Checklist)
- [Otro checklist](https://frontendchecklist.io/)

### .env

```bash
  DIR_DIST=dist
  DIR_SRC=src

  NETLIFY_AUTH_TOKEN=

  CLOUDINARY_ACCOUNT=
  CLOUDINARY_MEDIA_DIR=
```

### Netlify

Para conectar a un sitio web se debe hacer lo siguiente:

#### Si no existe

```bash
netlify init
```

#### Si ya existe

```bash
netlify link
```
