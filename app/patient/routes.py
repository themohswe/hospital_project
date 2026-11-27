from flask import Blueprint, render_template, session
from app.auth.utils import login_required
from app.db import get_db

patient_bp = Blueprint("patient", __name__, url_prefix="/patient")


@patient_bp.route("/dashboard")
@login_required
def dashboard():
    db = get_db()
    pid = session["patient_id"]

    patient = db.execute(
        "SELECT * FROM patient WHERE patient_id = ?", (pid,)
    ).fetchone()

    health = db.execute(
        "SELECT * FROM health_information WHERE patient_id = ?", (pid,)
    ).fetchone()

    appointments = db.execute(
        """
        SELECT appointment_date, appointment_time, title, doctor_name
        FROM appointment
        WHERE patient_id = ? AND appointment_date >= date('now')
        ORDER BY appointment_date, appointment_time
        LIMIT 3
        """,
        (pid,),
    ).fetchall()

    records = db.execute(
        """
        SELECT test_name, department, record_date, diagnosis, notes
        FROM medical_record
        WHERE patient_id = ?
        ORDER BY record_date DESC
        """,
        (pid,),
    ).fetchall()

    prescription_count = db.execute(
        "SELECT COUNT(*) FROM prescription WHERE patient_id = ?", (pid,)
    ).fetchone()[0]

    total_records = len(records)
    lab_count = sum(1 for r in records if r["department"] == "Laboratory")

    return render_template(
        "patient/patient_dashboard.html",
        patient=patient,
        health=health,
        appointments=appointments,
        records=records,
        total_records=total_records,
        lab_count=lab_count,
        prescription_count=prescription_count,
    )


@patient_bp.route("/history")
@login_required
def history():
    db = get_db()
    pid = session["patient_id"]

    patient = db.execute(
        "SELECT * FROM patient WHERE patient_id = ?", (pid,)
    ).fetchone()

    records = db.execute(
        """
        SELECT test_name, department, record_date, diagnosis, notes
        FROM medical_record
        WHERE patient_id = ?
        ORDER BY record_date DESC
        """,
        (pid,),
    ).fetchall()

    return render_template(
        "patient/medical_record.html",
        patient=patient,
        records=records,
    )


@patient_bp.route("/appointments")
@login_required
def appointments():
    db = get_db()
    pid = session["patient_id"]

    patient = db.execute(
        "SELECT * FROM patient WHERE patient_id = ?", (pid,)
    ).fetchone()

    upcoming = db.execute(
        """
        SELECT appointment_date, appointment_time, title, doctor_name, status
        FROM appointment
        WHERE patient_id = ? AND appointment_date >= date('now')
        ORDER BY appointment_date, appointment_time
        """,
        (pid,),
    ).fetchall()

    past = db.execute(
        """
        SELECT appointment_date, appointment_time, title, doctor_name, status
        FROM appointment
        WHERE patient_id = ? AND appointment_date < date('now')
        ORDER BY appointment_date DESC, appointment_time DESC
        """,
        (pid,),
    ).fetchall()

    return render_template(
        "patient/appointments.html",
        patient=patient,
        upcoming=upcoming,
        past=past,
    )


@patient_bp.route("/prescriptions")
@login_required
def prescriptions():
    db = get_db()
    pid = session["patient_id"]

    patient = db.execute(
        "SELECT * FROM patient WHERE patient_id = ?", (pid,)
    ).fetchone()

    prescriptions = db.execute(
        """
        SELECT medicine_name, dosage, frequency, duration,
               doctor_name, prescribed_date, status
        FROM prescription
        WHERE patient_id = ?
        ORDER BY prescribed_date DESC
        """,
        (pid,),
    ).fetchall()

    return render_template(
        "patient/prescriptions.html",
        patient=patient,
        prescriptions=prescriptions,
    )