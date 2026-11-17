# hospital_project[Web Programming]
# [CareHub]

Hospital patient portal web application. Patients register using a
Patient ID issued by the hospital, log in, and view their personal
information and medical records.

## Features
-Main Website
-Doctor's Information
- Patient registration (verified against hospital patient records)
- Secure login/logout (password hashing, session-based)
- Patient dashboard showing personal info and medical records
- Login-protected pages

## Tech Stack

| Category | Technology |
|---|---|
| Language | Python 3.13 |
| Backend framework | Flask |
| Database | SQLite 3 |
| Templating | Jinja2 |
| Frontend | HTML, CSS, JavaScript |
| Security | Werkzeug (password hashing) |
| Tools | VS Code, Git, Homebrew, Terminal |

## Project Structure

```
hospital_project/
├── run.py              # Entry point
├── config.py           # App settings
├── requirements.txt
├── database/
│   └── carehub.db
└── app/
    ├── __init__.py     # Application factory (create_app)
    ├── db.py           # Database connection
    ├── main/           # Home page routes
    ├── auth/           # Register, login, logout
    ├── patient/        # Patient dashboard
    ├── templates/
    └── static/         # CSS, images, JS
```
## Database

| Table | Description |
|---|---|
| `patient` | Patient info provided by the hospital |
| `medical_record` | Medical records (many per patient) |
| `user_account` | Login accounts (email, password hash) |

## Installation

```bash
git clone <your-repo-url>
cd hospital_project

python3 -m venv myenv
source myenv/bin/activate        # Windows: myenv\Scripts\activate

pip install -r requirements.txt
```
## Usage

```bash
python run.py
```

Open http://127.0.0.1:5001 in your browser.

**Test flow:**
1. Add a patient to the `patient` table (hospital side)
2. Go to `/register` and sign up using that Patient ID, name and email
3. Log in at `/login`
4. View the dashboard at `/patient/dashboard`

#Author
MOH MOH SWE(Soongsil University)
AYE CHAN MOE(Soongsil University)