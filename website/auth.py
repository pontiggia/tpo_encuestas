from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   ##means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        try:
            name = request.form.get('name')
            password = request.form.get('password')

            user = User.query.filter_by(name=name).first()
            if user:
                if check_password_hash(user.password, password):
                    login_user(user, remember=True)
                    if user.admin or user.admin == 1:
                        return redirect(url_for('views.admin'))
                    else:
                        return redirect(url_for('views.selector_encuestas'))
                else:
                    flash('Incorrect password, try again.', category='error')
            else:
                flash('Name does not exist.', category='error')
        except Exception as e:
            return {'Error inesperado (INTENTE DE NUEVO)': str(e)}

    return render_template("index.html", user=current_user)


@auth.route('/logout')
@login_required
def logout():
    try:
        logout_user()
        return redirect(url_for('auth.login'))
    except Exception as e:
        return {'Error inesperado (RECARGUE LA PAGINA)': str(e)}


@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        try:
            name = request.form.get('name')
            email = request.form.get('email')
            password = request.form.get('password')
            admin = request.form.get('admin')

            if admin == 'on':
                admin = True

            new_user = User(name=name, email=email, password=generate_password_hash(
                password, method='sha256'), admin=admin)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            if admin:
                return redirect(url_for('views.admin'))
            else:
                return redirect(url_for('views.selector_encuestas'))
        except Exception as e:
            return {'Error inesperado (INTENTE DE NUEVO)': str(e)}
            

    return render_template("register.html", user=current_user)


# route to go back in selector_encuestas.html
@auth.route('/selector_encuestas', methods=['GET', 'POST'])
@login_required
def selector_encuestas():
    return redirect(url_for('views.selector_encuestas'))


