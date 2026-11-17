from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from . import services

auth_bp = Blueprint("auth", __name__)
@auth_bp.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        ok, message = services.register_patient(
            request.form.get("first_name", "").strip(),
            request.form.get("last_name", "").strip(),
            request.form.get("email", "").strip().lower(),
            request.form.get("patient_id", "").strip(),
            request.form.get("password", ""),
            request.form.get("confirm_password", ""),
        )
        flash(message, "success" if ok else "error")
        if ok:
            return redirect(url_for("auth.login"))
        else:
            return redirect(url_for("auth.register"))
    return render_template("auth/register.html")

@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "").strip().lower()
        password = request.form.get("password", "")

        user = services.authenticate(email, password)
        if user:
            session.clear()
            session["user_id"] = user["user_id"]
            session["patient_id"] = user["patient_id"]
            return redirect(url_for('patient.dashboard'))
        flash("Invalid email or password.", "error")
    return render_template("auth/login.html")

@auth_bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("auth.login"))