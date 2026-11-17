from flask import Blueprint, render_template, session
from app.auth.utils import login_required
from app.db import get_db

patient_bp = Blueprint("patient", __name__, url_prefix="/patient")


@patient_bp.route("/dashboard")
@login_required
def dashboard():
    db = get_db()

    patient = db.execute(
        "SELECT * FROM patient WHERE patient_id = ?",
        (session["patient_id"],),
    ).fetchone()

    records = db.execute(
        "SELECT test_name, department, record_date, diagnosis, notes "
        "FROM medical_record WHERE patient_id = ? "
        "ORDER BY record_date DESC",
        (session["patient_id"],),
    ).fetchall()

    return render_template("patient/patient_dashboard.html",
                           patient=patient, records=records)