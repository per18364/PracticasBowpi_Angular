# Practicas Bowpi Jorge Perez 2023

## Descripción

Este proyecto es una aplicación web que permite a los usuarios subir imágenes y enviarlas a un web service para que sean procesadas y se devuelva la información del procesamiento de estas. El proyecto está dividido en dos partes: el frontend y el backend. El frontend está desarrollado en Angular y el backend en Django. El frontend se encarga de mostrar la interfaz de usuario y enviar las imágenes al backend para que sean procesadas. El backend se encarga de recibir las imágenes, procesarlas con webservices y devolver la información del procesamiento.

## Comenzando

Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Pre-requisitos

Qué cosas necesitas para instalar el software y cómo instalarlas:

- [Node.js y npm](https://nodejs.org/es/download/)
- [Angular CLI](https://angular.io/cli)
- [Python](https://www.python.org/downloads/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Instalación

Sigue estos pasos para configurar tu entorno de desarrollo local.

#### Frontend

1. Navega a la carpeta `frontend`:

```bash
cd frontend
```

Instala Angular CLI globalmente (si aún no lo has hecho):

```bash
npm i -g @angular/cli
```

2. Instala las dependencias del proyecto:

```bash
npm i
```

3. Inicia el servidor de desarrollo:

```bash
ng serve
```

4. Abre tu navegador en [http://localhost:4200](http://localhost:4200).

#### Backend

1. Navega a la carpeta `backend`:

```bash
cd backend
```

2. Crear un entorno virtual:

```bash
python -m venv env
```

3. Activa el entorno virtual:

En Windows:

```bash
env\Scripts\activate
```

En Linux o Mac:

```bash
source env/bin/activate
```

4. Instala los requerimientos:

```bash
pip install -r requirements.txt
```

5. Nadvega a la carpeta `angBackend`:

```bash
cd angBackend
```

6. Inicia el servidor de backend:

```bash
python manage.py runserver
```

7. Abre tu navegador en [http://localhost:8000](http://localhost:8000).
