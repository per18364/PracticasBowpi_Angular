# Practicas Bowpi Jorge Perez 2023

## Description

This project is a web application that allows users to upload images and send them to a web service so that they are processed and the processing information is returned. The project is divided into two parts: the frontend and the backend. The frontend is developed in Angular and the backend in Django. The frontend is responsible for displaying the user interface and sending the images to the backend for processing. The backend is responsible for receiving the images, processing them with webservices and returning the processing information.

## How to run the project

These instructions will allow you to get a copy of the project up and running on your local machine for development and testing purposes.

### Requierements

To run the project you need to have installed:

- [Node.js y npm](https://nodejs.org/es/download/)
- [Angular CLI](https://angular.io/cli)
- [Python](https://www.python.org/downloads/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

Follow these steps to set up your local development environment.

#### Frontend

1. Move to `frontend`:

```bash
cd frontend
```

Install Angular CLI globally (if you haven't already):

```bash
npm i -g @angular/cli
```

2. Install the project dependencies:

```bash
npm i
```

3. Start the development server:

```bash
ng serve
```

4. Open your browser at [http://localhost:4200](http://localhost:4200).

#### Backend

1. Move to `backend`:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv env
```

3. Activate the virtual environment:

On Windows:

```bash
env\Scripts\activate
```

On Linux or Mac:

```bash
source env/bin/activate
```

4. Install the requirements:

```bash
pip install -r requirements.txt
```

5. Move to `angBackend`:

```bash
cd angBackend
```

6. Start the backend server:

```bash
python manage.py runserver
```

7. Open your browser at [http://localhost:8000](http://localhost:8000).
