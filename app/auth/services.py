from werkzeug.security import generate_password_hash, check_password_hash
from app.db import get_db

def register_patient(first_name, last_name, email, patient_id, password, confirm_password):
    if not all([first_name, last_name, email, patient_id, password, confirm_password]):
        return False, "Please fill in all fields."
    if password != confirm_password:
        return False, "Passwords do not match."
    try:
        patient_id = int(patient_id)
    except ValueError:
        return False, "Invalid Patient ID."
    db = get_db()

    patient = db.execute(
        """
        SELECT patient_id
        FROM patient
        WHERE patient_id = ? AND registered_email= ?
        """, (patient_id, email)
    ).fetchone()
    if patient is None:
        return False, "Patient information does not match."

    existing = db.execute(
        "SELECT user_id FROM user_account WHERE patient_id = ? OR email = ?",
        (patient_id, email),
    ).fetchone()

    if existing:
        return False, "Account Already exists."

    db.execute(
        "INSERT INTO user_account (patient_id, email, password_hash) VALUES (?, ?, ?)",
        (patient_id, email, generate_password_hash(password)),
    )
    db.commit()
    return True, "Registration successful!"

def authenticate(email, password):
        """Return user row if valid, otherwise None"""
        user = get_db().execute(
            "SELECT user_id, patient_id, email, password_hash "
            "FROM user_account WHERE email = ?",
            (email,),
        ).fetchone()

        if user and check_password_hash(user["password_hash"], password):
            return user
        return None