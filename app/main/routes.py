from flask import Blueprint, render_template
from app.db import get_db

main_bp = Blueprint("main", __name__)

@main_bp.route("/")
def home():
    return render_template("main.html")

@main_bp.route("/db-test")
def db_test():
    tables = get_db().execute(
        "SELECT name from sqlite_master WHERE type='table'"
    ).fetchall()
    return f"Database Connected! Tables: {[t['name'] for t in tables]}"

@main_bp.route("/departments")
def departments():
    return render_template("departments.html")


@main_bp.route("/department-detail")
def department_detail():
    return render_template("department-detail.html")


@main_bp.route("/announcements")
def announcements():
    return render_template("announcements.html")
