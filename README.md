
# TPO - Aplicacion de encuestas

Esta es una aplicación web de encuestas desarrollada con Python(Flask), HTML, CSS y JavaScript. Permite a los usuarios registrarse, iniciar sesión y realizar encuestas.

## Tecnologías utilizadas

- Python: se utiliza el framework Flask para el desarrollo del backend de la aplicación.
- HTML: se utiliza para estructurar y presentar el contenido de las páginas web.
- CSS: se utiliza para dar estilo y diseño a las páginas web.
- JavaScript: se utiliza para agregar interactividad y funcionalidades dinámicas en el frontend.
- MySQL: se utiliza como la base de datos para almacenar la información de los usuarios, encuestas y respuestas.

## Requisitos previos

- Python 3.x: asegúrate de tener Python 3.x instalado en tu entorno de desarrollo. (https://www.python.org/downloads/)
- En caso de no tener instalado, asegurarse de agregarlo al path (checkbox a la hora de instalarlo desde el .exe)

## Setup
Clona el repositorio:
```bash
git clone https://github.com/pontiggia/tpo_encuestas.git
```
Navega hasta la carpeta del proyecto:
```bash
cd tpo_encuestas
```
Crea un entorno virtual (OPCIONAL):
```bash
python3 -m venv venv
```
Y luego:
```bash
Para Command Prompt: venv\Scripts\activate.bat
Para PowerShell: venv\Scripts\Activate.ps1
```

Instala las dependencias:
```bash
pip install -r requirements.txt
```
## Conexion a la base de datos (muestra, no editar nada)

```python
# Muestra de conexión a la base de datos remota MySQL (esto no se mostrará en el repositorio)
db_host = '156.67.73.101'
db_user = 'u119047293_admin'
db_password = '>e*DfT1e'
db_name = 'u119047293_tpo'
db_url = f'mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}'
app.config['SQLALCHEMY_DATABASE_URI'] = db_url

```

## Posibles errores

- BrokenPipeError: se debe a que el servidor se cierra antes de que el navegador termine de enviar los datos. Solo se debe recargar la pagina.
- Si se omite la funcion de login, se debe a que el usuario no existe o la contraseña es incorrecta.


## Usage

Ejecuta el servidor:
```bash
python app.py
```
