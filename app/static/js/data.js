// =====================================================
// CareHub shared sample data
// All doctors and schedules are fictional.
// =====================================================


// ===== 1. Category names =====

// Each department includes three sample doctor specialties.
//department data pr tl array and {} htl ka har ka department 1 khu yae object 
//const means Variable ကို array/object အသစ်နဲ့ ပြန်အစားထိုးမရတာ
const categoryNames = {
    primary: "Primary & Emergency Care",
    medical: "Medical Specialties",
    surgical: "Surgical & Related Specialties",
    "women-children": "Women & Children",
    "skin-mental-rehab": "Skin, Mental Health & Rehabilitation"
};


// ===== 2. Departments: 20 departments =====

const departments = [
    {
        id: "cardiology",
        name: "Cardiology",
        categoryId: "medical",
        category: categoryNames.medical,
        icon: "fa-heart-pulse",
        description : "Cardiology is a branch of medicine that deals with disorders of the heart as well as parts of the circulatory system. The field includes medical diagnosis and treatment of congenital heart defects, coronary artery disease, heart failure, valvular heart disease and electrophysiology.",
        specialties: [
            "General cardiology",
            "Heart rhythm disorders",
            "Preventive cardiology"
        ]
    },
    {
        id: "dermatology",
        name: "Dermatology",
        categoryId: "skin-mental-rehab",
        category: categoryNames["skin-mental-rehab"],
        icon: "fa-hand",
        description:
            "Explore care for skin, hair and nail concerns, including " +
            "general consultations and follow-up appointments.",
        specialties: [
            "General dermatology",
            "Acne and inflammatory skin conditions",
            "Hair and nail conditions"
        ]
    },
    {
        id: "emergency-medicine",
        name: "Emergency Medicine",
        categoryId: "primary",
        category: categoryNames.primary,
        icon: "fa-truck-medical",
        description:
            "This demo department introduces emergency assessment and " +
            "acute care services. Listed times are sample staff shifts, " +
            "not appointment slots or hospital opening hours.",
        specialties: [
            "Acute medical assessment",
            "Emergency injury assessment",
            "Emergency care coordination"
        ]
    },
    {
        id: "endocrinology",
        name: "Endocrinology",
        categoryId: "medical",
        category: categoryNames.medical,
        icon: "fa-dna",
        description:
            "Our sample endocrinology team provides consultations " +
            "for hormone-related and metabolic health concerns.",
        specialties: [
            "Diabetes and metabolic health",
            "Thyroid conditions",
            "Hormonal disorders"
        ]
    },
    {
        id: "ent",
        name: "ENT",
        categoryId: "surgical",
        category: categoryNames.surgical,
        icon: "fa-ear-listen",
        description:
            "The ear, nose and throat department offers sample services " +
            "covering hearing, nasal, sinus and throat concerns.",
        specialties: [
            "Ear and hearing conditions",
            "Nasal and sinus conditions",
            "Voice and throat conditions"
        ]
    },
    {
        id: "family-medicine",
        name: "Family Medicine",
        categoryId: "primary",
        category: categoryNames.primary,
        icon: "fa-house-medical",
        description:
            "Our sample family medicine department provides general " +
            "health consultations, preventive care and ongoing care coordination.",
        specialties: [
            "Primary care",
            "Preventive health assessments",
            "Chronic condition follow-up"
        ]
    },
    {
        id: "gastroenterology",
        name: "Gastroenterology",
        categoryId: "medical",
        category: categoryNames.medical,
        icon: "fa-stethoscope",
        description:
            "Explore sample consultations for digestive health, " +
            "including stomach, intestinal and liver-related concerns.",
        specialties: [
            "Stomach and intestinal conditions",
            "Liver health",
            "Digestive endoscopy"
        ]
    },
    {
        id: "general-surgery",
        name: "General Surgery",
        categoryId: "surgical",
        category: categoryNames.surgical,
        icon: "fa-user-doctor",
        description:
            "Our sample surgical team provides surgical assessments, " +
            "procedure planning and postoperative follow-up.",
        specialties: [
            "Abdominal surgery",
            "Hernia surgery",
            "Minimally invasive surgery"
        ]
    },
    {
        id: "internal-medicine",
        name: "Internal Medicine",
        categoryId: "primary",
        category: categoryNames.primary,
        icon: "fa-stethoscope",
        description:
            "This department focuses on general adult medical care, " +
            "health assessments and coordination of specialist consultations.",
        specialties: [
            "General adult medicine",
            "Complex medical assessments",
            "Long-term medical care"
        ]
    },
    {
        id: "nephrology",
        name: "Nephrology",
        categoryId: "medical",
        category: categoryNames.medical,
        icon: "fa-droplet",
        description:
            "Our sample nephrology team focuses on kidney health, " +
            "kidney-related medical conditions and ongoing monitoring.",
        specialties: [
            "Chronic kidney disease",
            "Dialysis care",
            "Kidney-related blood pressure care"
        ]
    },
    {
        id: "neurology",
        name: "Neurology",
        categoryId: "medical",
        category: categoryNames.medical,
        icon: "fa-brain",
        description:
            "Explore sample services for conditions affecting " +
            "the brain, nerves and nervous system.",
        specialties: [
            "Headache disorders",
            "Epilepsy",
            "Movement disorders"
        ]
    },
    {
        id: "obstetrics-gynecology",
        name: "Obstetrics & Gynecology",
        categoryId: "women-children",
        category: categoryNames["women-children"],
        icon: "fa-person-pregnant",
        description:
            "Our sample team provides pregnancy-related consultations " +
            "and gynecological health assessments across different life stages.",
        specialties: [
            "Pregnancy and prenatal care",
            "General gynecology",
            "Menopause care"
        ]
    },
    {
        id: "oncology",
        name: "Oncology",
        categoryId: "medical",
        category: categoryNames.medical,
        icon: "fa-ribbon",
        description:
            "This sample department introduces medical oncology, " +
            "treatment coordination and follow-up services.",
        specialties: [
            "General medical oncology",
            "Breast medical oncology",
            "Gastrointestinal medical oncology"
        ]
    },
    {
        id: "ophthalmology",
        name: "Ophthalmology",
        categoryId: "surgical",
        category: categoryNames.surgical,
        icon: "fa-eye",
        description:
            "Our sample eye care department offers consultations " +
            "for vision concerns and a range of eye conditions.",
        specialties: [
            "General eye care",
            "Cataract care",
            "Retinal conditions"
        ]
    },
    {
        id: "orthopedics",
        name: "Orthopedics",
        categoryId: "surgical",
        category: categoryNames.surgical,
        icon: "fa-bone",
        description:
            "Explore sample services for bone, joint and musculoskeletal " +
            "concerns, including injury assessment and follow-up.",
        specialties: [
            "Knee and hip conditions",
            "Sports injuries",
            "Shoulder and upper limb conditions"
        ]
    },
    {
        id: "pediatrics",
        name: "Pediatrics",
        categoryId: "women-children",
        category: categoryNames["women-children"],
        icon: "fa-baby",
        description:
            "Our sample pediatric department provides child health " +
            "consultations, growth monitoring and follow-up care.",
        specialties: [
            "General pediatrics",
            "Growth and development",
            "Pediatric respiratory care"
        ]
    },
    {
        id: "psychiatry",
        name: "Psychiatry",
        categoryId: "skin-mental-rehab",
        category: categoryNames["skin-mental-rehab"],
        icon: "fa-comments",
        description:
            "This sample department introduces mental health assessments " +
            "and ongoing psychiatric consultations.",
        specialties: [
            "General adult psychiatry",
            "Mood and anxiety disorders",
            "Older adult psychiatry"
        ]
    },
    {
        id: "pulmonology",
        name: "Pulmonology",
        categoryId: "medical",
        category: categoryNames.medical,
        icon: "fa-lungs",
        description:
            "Our sample pulmonology team focuses on lung health " +
            "and respiratory conditions through outpatient consultations.",
        specialties: [
            "Asthma care",
            "Chronic lung conditions",
            "Respiratory diagnostic assessment"
        ]
    },
    {
        id: "rehabilitation-medicine",
        name: "Rehabilitation Medicine",
        categoryId: "skin-mental-rehab",
        category: categoryNames["skin-mental-rehab"],
        icon: "fa-person-walking",
        description:
            "Explore sample rehabilitation services supporting movement, " +
            "daily function and recovery after illness or injury.",
        specialties: [
            "Musculoskeletal rehabilitation",
            "Neurological rehabilitation",
            "Functional recovery assessments"
        ]
    },
    {
        id: "urology",
        name: "Urology",
        categoryId: "surgical",
        category: categoryNames.surgical,
        icon: "fa-droplet",
        description:
            "Our sample urology department provides consultations " +
            "for urinary tract conditions and related surgical assessments.",
        specialties: [
            "General urology",
            "Urinary stone care",
            "Bladder health"
        ]
    }
];


// ===== 3. Fictional doctor names =====
// Names are linked by department ID, not department array position.

const doctorNamesByDepartment = {
    cardiology: [
        "Arjun Mehta",
        "Camila Santos",
        "Daniel Mensah"
    ],

    dermatology: [
        "Miguel Reyes",
        "Karim Haddad",
        "Sofia Rossi"
    ],

    "emergency-medicine": [
        "Jiwoo Kim",
        "Samuel Bekele",
        "Emma Wilson"
    ],

    endocrinology: [
        "Anjali Perera",
        "Zofia Kowalska",
        "Haruto Tanaka"
    ],

    ent: [
        "Valeria Garcia",
        "Youssef Amrani",
        "Min Thant"
    ],

    "family-medicine": [
        "Naomi Campbell-Brown",
        "Wei Chen",
        "Oliver Anderson"
    ],

    gastroenterology: [
        "Ayesha Khan",
        "Claire Laurent",
        "Minjun Lee"
    ],

    "general-surgery": [
        "Priya Sharma",
        "Kwame Asante",
        "Minh Nguyen"
    ],

    "internal-medicine": [
        "Rafael Costa",
        "Layla Mansour",
        "Hana Tesfaye"
    ],

    nephrology: [
        "Isabel Cruz",
        "Kaito Sato",
        "Lucia Hernandez"
    ],

    neurology: [
        "Marco Bianchi",
        "Dinesh Fernando",
        "Aung Myat"
    ],

    "obstetrics-gynecology": [
        "Salma Idrissi",
        "Jun Liu",
        "Quang Tran"
    ],

    oncology: [
        "Simone Williams",
        "Sara Malik",
        "Elise Moreau"
    ],

    ophthalmology: [
        "Kofi Boateng",
        "Anna Nowak",
        "Ingrid Hansen"
    ],

    orthopedics: [
        "Omar Khalil",
        "Adrian Santos",
        "Vikram Rao"
    ],

    pediatrics: [
        "Beatriz Oliveira",
        "Nisha Jayasinghe",
        "Seoyeon Park"
    ],

    psychiatry: [
        "Giulia Romano",
        "Dawit Alemu",
        "Ren Nakamura"
    ],

    pulmonology: [
        "Diego Martinez",
        "Andre Thompson",
        "Nadia El Amrani"
    ],

    "rehabilitation-medicine": [
        "Linh Pham",
        "May Thu",
        "Mei Zhang"
    ],

    urology: [
        "Hassan Ali",
        "Piotr Zielinski",
        "Julien Dubois"
    ]
};


// ===== 4. Sample schedule patterns =====

const schedulePatterns = [
    [
        { day: "Monday", time: "09:00–12:00" },
        { day: "Thursday", time: "14:00–17:00" }
    ],
    [
        { day: "Tuesday", time: "10:00–13:00" },
        { day: "Friday", time: "14:00–17:00" }
    ],
    [
        { day: "Wednesday", time: "09:00–12:00" },
        { day: "Saturday", time: "09:00–12:00" }
    ],
    [
        { day: "Monday", time: "14:00–17:00" },
        { day: "Wednesday", time: "10:00–13:00" }
    ],
    [
        { day: "Tuesday", time: "09:00–12:00" },
        { day: "Thursday", time: "10:00–13:00" }
    ],
    [
        { day: "Wednesday", time: "14:00–17:00" },
        { day: "Friday", time: "09:00–12:00" }
    ]
];


// ===== 5. Create sample biography text =====

function createDoctorAbout(name, specialty, departmentName, index) {
    const biographies = [
        `Dr. ${name} is a fictional member of the ${departmentName} ` +
        `team with a sample focus on ${specialty.toLowerCase()}. ` +
        `This demo profile emphasizes clear explanations and follow-up planning.`,

        `Dr. ${name} is a fictional clinician in our ${departmentName} ` +
        `department. The sample clinical interest is ${specialty.toLowerCase()}, ` +
        `with an emphasis on discussing concerns and coordinating ongoing care.`,

        `Dr. ${name} is a fictional doctor whose sample area of interest is ` +
        `${specialty.toLowerCase()}. This ${departmentName} profile illustrates ` +
        `assessment, care discussions and scheduled follow-up visits.`
    ];

    return biographies[index];
}


// ===== 6. Generate 60 sample doctor objects =====

const doctors = [];

departments.forEach(function (department, departmentIndex) {
    const names = doctorNamesByDepartment[department.id];

    names.forEach(function (name, doctorIndex) {
        const specialty = department.specialties[doctorIndex];

        const doctorId = name
            .toLowerCase()
            .replaceAll(" ", "-");

        const initials = name
            .split(" ")
            .map(function (part) {
                return part[0];
            })
            .join("");

        const patternIndex =
            (departmentIndex + doctorIndex) % schedulePatterns.length;

        // Create separate schedule objects for each doctor.
        const schedule = schedulePatterns[patternIndex].map(
            function (session) {
                return {
                    day: session.day,
                    time: session.time
                };
            }
        );

        doctors.push({
            id: doctorId,
            image : `/static/images/doctors/${doctorId}.png`,
            departmentId: department.id,
            name: "Dr. " + name,
            initials: initials,
            specialty: specialty,

            about: createDoctorAbout(
                name,
                specialty,
                department.name,
                doctorIndex
            ),

            status: "active",
            schedule: schedule
        });
    });
});


// ===== 7. Shared data for hospital-service.js =====
// Shared data used by the hospital service

const hospitalData = {
    departments: departments,
    doctors: doctors
};