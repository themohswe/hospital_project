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