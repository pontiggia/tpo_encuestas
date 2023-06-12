from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from . import db
from sqlalchemy.sql import func
from .models import User

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
@login_required
def selector_encuestas():
    # check if user is logged in
    if not current_user.is_authenticated:
        return render_template("index.html", user=current_user)
    return render_template("selector_encuestas.html", user=current_user)


@views.route('/admin', methods=['GET', 'POST'])
@login_required
def admin():
    # check if user is admin
    if not current_user.admin:
        return render_template("index.html", user=current_user)
    random_user = User.query.order_by(func.random()).limit(5).all()
    return render_template("admin.html", user=current_user, random_user=random_user)