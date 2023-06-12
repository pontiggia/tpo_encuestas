from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hjshjhdjah kjshkjdhjs'
    # fix broken pipe error
    app.config['SQLALCHEMY_POOL_RECYCLE'] = 2999

    # Conexión a la base de datos remota MySQL
    db_host = '156.67.73.101'
    db_user = 'u119047293_admin'
    db_password = '>e*DfT1e'
    db_name = 'u119047293_tpo'
    db_url = f'mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}'
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url

    db.init_app(app)

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))

    # Descomenta esta sección para crear las tablas en la base de datos
    with app.app_context():
        db.create_all()

    return app
