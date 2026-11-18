//All information below is fictional demo data. 

//FICTIONAL DEMO DATA — not real doctors or clinic hours


// Read the department and optional doctor IDs from the URL.
//current URL --> department-detail.html?department=cardiology&doctor=dr-john-doe
//window.location.search က --> ?department=cardiology&doctor=dr-john-doe ဆိုတဲ့ စာကို return လုပ်ပေးတယ်
//URLSearchParams က --> ?department=cardiology&doctor=dr-john-doe ဆိုတဲ့ စာကို key-value pair အဖြစ် ပြန်ပေးတယ်
//like department=cardiology, doctor=dr-john-doe
//params.get("department") က --> cardilogy ကို return လုပ်ပေးတယ်
//params.get("doctor") က --> dr-john-doe ကို return လုပ်ပေးတယ်
//URL မှာ doctor မပါဘူးဆိုရင် params.get("doctor") က null ကို return လုပ်ပေးတယ်
const params = new URLSearchParams(window.location.search);

const departmentId = params.get("department");
const doctorId = params.get("doctor");

// Select page elements.
//department-detail.html ထဲက element တွေကို select လုပ်တာ
//html ထဲက id="department-title" ဆိုတဲ့ element ကို select လုပ်ပြီး departmentTitle variable ထဲသိမ်းထားတာ
//နောက်မှာ departmentTitle.textContent = department.name ဆိုရင် department-detail.html ထဲက id="department-title" ဆိုတဲ့ element ရဲ့ textContent ကို department.name နဲ့ပြောင်းပေးတာ
const departmentTitle = document.querySelector("#department-title");
const departmentCategory = document.querySelector("#department-category");
const departmentDescription =
    document.querySelector("#department-description");
const departmentIcon = document.querySelector("#department-icon");
const departmentError = document.querySelector("#department-error");

const doctorsSection = document.querySelector("#doctors-section");
const doctorsTitle = document.querySelector("#doctors-title");
const doctorList = document.querySelector("#doctor-list");
const doctorCount = document.querySelector("#doctor-count");
const doctorEmpty = document.querySelector("#doctor-empty");

const doctorProfile = document.querySelector("#doctor-profile");
const closeProfileButton = document.querySelector("#close-profile");

// Find the selected department.
//.find() method က array ထဲက object တွေကို loop လုပ်ပြီး condition ကို satisfy လုပ်တဲ့ object ကို return လုပ်ပေးတယ်
//.find() က first match ကို return လုပ်ပေးတယ်, မတွေ့ရင် undefined return လုပ်ပေးတယ် ==> department === undefined 
//departmentID === "cardiology" ဆိုရင် departments array ထဲက department တစ်ခုချင်းစီကို စစ် --> item.id === "cardiology" ဆိုရင် true return --> .find() က မှန်တဲ့ ပထမဆုံး department object ကို return
//const department = departments.find(function (item) {
  //  return item.id === departmentId;
//});

// Assigned after the service returns the department
let department = null; 

// ဒီ function က department-detail.html ထဲ html element အသစ် တစ်ခု ဖန်တီးပြီး return လုပ်ပေးတယ်
// eg. const name = createElement("h3", "", "Dr. John Doe") ဆိုရင် <h3>Dr. John Doe</h3> ဆိုတဲ့ element ကို return လုပ်ပေးတယ်
//"" ဆိုရင် className မထည့်ဘူးဆိုတာ, className ထည့်ချင်ရင် "class-name" ဆိုပြီး string ထည့်ရမယ်
// Create an element with safe text content.
function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}

// Display a doctor's profile and schedule. 
// doctor object ကို parameter အနေနဲ့ လက်ခံပြီး doctor profile ကို ပြသပေးတယ်

function showDoctorProfile(doctor) {
    //document.querySelector("#profile-avatar").textContent = doctor.initials;

    const profileAvatar = document.querySelector("#profile-avatar");
    //if there is no image
    profileAvatar.textContent = doctor.initials; 

    if (doctor.image) {
        const photo = document.createElement("img");
        photo.alt = "";

        photo.addEventListener("error", function() {
            //တခြား doctor ကို ရွေးပြီးသားဆိုရင် profile ကို မပြောင်းဘူး။
            if (photo.parentElement === profileAvatar){
                profileAvatar.textContent = doctor.initials;
            }
        });

        profileAvatar.replaceChildren(photo);
        photo.src = doctor.image;
    }

    document.querySelector("#profile-name").textContent =
        doctor.name;

    document.querySelector("#profile-department").textContent =
        department.name;

    document.querySelector("#profile-specialty").textContent =
        doctor.specialty;

    document.querySelector("#profile-about").textContent =
        doctor.about;

    const scheduleBody = document.querySelector("#schedule-body");

    // Clear the previous doctor's schedule.
    //replaceChildren() ကို argument မပါပဲခေါ်ဆိုရင် scheduleBody ထဲက children element တွေကို ဖျက်ပစ်ပေးတယ်
    // မရှင်းရင် doctor အသစ်ရွေးတိုင်း အရင် doctor ရဲ့ schedule အောက်မှာ အသစ်တွေထပ်ပေါင်းနေမယ် 
    scheduleBody.replaceChildren();

    // Schedule တစ်ခုချင်းစီကို table row အဖြစ် ဖန်တီးပြီး scheduleBody ထဲထည့်ပေးတယ်
    // create 1 tr and 2 td for each schedule item
    doctor.schedule.forEach(function (session) {
        const row = document.createElement("tr");

        const dayCell = createElement("td", "", session.day);
        const timeCell = createElement("td", "", session.time);


        row.append(dayCell, timeCell);
        scheduleBody.append(row);
    });

    //ဖျောက်ထားတဲ့ doctor profile session ကို ပြသပေးတာ
    doctorProfile.hidden = false;

    // Scroll the profile into view.
    // profile section ကို မြင်ရတဲ့ နေရာဆီ scroll လုပ်ပေးတယ်
    // block : "start" ဆိုရင် profile section ရဲ့ အပေါ်ဆုံးကို မြင်ရတဲ့နေရာရဲ့ အပေါ်ဆုံးနဲ့ alignment လုပ်ပေးတယ်
    doctorProfile.scrollIntoView({
        behavior: "auto",
        block: "start"
    });
}

// Build one doctor card.
// <article class="doctor-card"></article> ဆိုပြီး card အလွတ် လုပ်ထားတဲ့ element ကို return လုပ်ပေးတယ်

function createDoctorCard(doctor) {
    const card = createElement("article", "doctor-card");

    const avatar = createElement(
        "div",
        "doctor-avatar",
        doctor.initials
    );

    //avatar.setAttribute("aria-hidden", "true") ဆိုရင် screen reader က avatar element ကို ignore လုပ်ပေးတယ်
    //avatar element ထဲမှာ initials text ရှိပေမယ့် screen reader က ignore လုပ်ပေးမယ်
    avatar.setAttribute("aria-hidden", "true");
    if(doctor.image){
        const photo= document.createElement("img");
        photo.alt = ""; 
        photo.src = doctor.image;

        photo.addEventListener("load", function() {
            avatar.replaceChildren(photo);
        });
    }

    const name = createElement("h3", "", doctor.name);

    const departmentName = createElement(
        "p",
        "doctor-department",
        department.name
    );

    const specialty = createElement("p", "", doctor.specialty);

    // Create a string of working days from the doctor's schedule.
    //.map() method က array ထဲက object တစ်ခုချင်းစီကို loop လုပ်ပြီး function ထဲမှာ return လုပ်တဲ့ value တွေကို array အသစ် အဖြစ် ပြန်ပေးတယ်
    const workingDays = doctor.schedule.map(function (session) {
        return session.day;
    });

    const availability = createElement(
        "p",
        "",
        "Clinic days: " + workingDays.join(", ")
        //join(", ") က array ထဲက string တွေကို comma နဲ့ ခွဲပြီး string တစ်ခုအဖြစ် ပြန်ပေးတယ်
    );

    const detailsButton = createElement(
        "button",
        "view-doctor-button",
        "View Details & Schedule"
    );

    detailsButton.type = "button";

    detailsButton.setAttribute(
        "aria-label",
        "View details and schedule for " + doctor.name
    );

    //Button ကို click လုပ်ရင် showDoctorProfile() function ကို ခေါ်ပြီး doctor profile ကို ပြတယ်
    detailsButton.addEventListener("click", function () {
        showDoctorProfile(doctor);
    });

    // Append the elements to the card and return it.
    // တည်ဆောက်ထားတဲ့ element တွေကို card element ထဲထည့်
    // အခုထိ card ကို page ပေါ်မှာ မထည့်ရသေးဘူး 
    card.append(
        avatar,
        name,
        departmentName,
        specialty,
        availability,
        detailsButton
    );

    return card;
}

// Close the profile and return focus to its opening button.
// Close နှိပ်ရင် ဖွင့်ခဲ့တဲ့ button ဆီ focus ပြန်ပို့ခြင်း
// lastProfileButton variable က doctorList ထဲက button ကို သိမ်းထားတာ
// နောက်မှ ပြန်ပြောင်းသိမ်းမှာမို့ let သုံးထားတယ်
let lastProfileButton = null;

//event.target --> တကယ်နှိပ်လိုက်တဲ့ element 
//.closest(".view-doctor-button") --> အဲ့ဒီ element ကိုယ်တိုင် သို့မဟုတ် အပေါ်ဘက် ancestors တွေထဲက အနီးဆုံးကိုက်ညီတဲ့ button ကိုရှာတယ်
// Button ပေါ် click လုပ်တဲ့ event က အပြင်က doctorList ဆီပါ ဆက်ရောက်လာတာကို event bubbling လို့ခေါ်တယ်။
doctorList.addEventListener("click", function (event) {
    const button = event.target.closest(".view-doctor-button");

    //button တွေ့ရင် သိမ်းတယ်
    if (button) {
        lastProfileButton = button;
    }
});

// close နှိပ်ရင် - profile ကို ဖျောက်ပြီး ဖွင့်ခဲ့တဲ့ button ရှီရင် အဲ့တာကို keyboard focus ပြန်လုပ်ပေးတယ်
closeProfileButton.addEventListener("click", function () {
    doctorProfile.hidden = true;

    if (lastProfileButton) {
        lastProfileButton.focus();
    }
});

// Initialize the page.
// URL မှာ department မပါရင် or data ထဲမှာ မရှိတဲ့ ID ဖြစ်ရင် ဒီ If ကို လုပ်မယ်
// Department မတွေ့ရင်     department === undefined မို့ !department ==> true ဖြစ် 
/*if (!department) {
    departmentTitle.textContent = "Department Unavailable";
    departmentCategory.textContent = "";
    departmentDescription.textContent = "";

    departmentError.textContent =
        "This department's demo information is not available yet. " +
        "Please return to All Departments.";

    // Doctor section ကို ဖျောက်မယ်
    departmentError.hidden = false;
    doctorsSection.hidden = true;
}   //department တွေ့ရင် else ကိုလုပ်မယ် 
else {
    // Update the page title and department information.
    document.title = department.name + " | CareHub";

    //departmentTitle id နဲ့ချိတ်ထားလို့ departmentTitle variable ထဲမှာရှိတဲ့ element ရဲ့ textContent ကို department.name နဲ့ပြောင်းပေးတာ
    departmentTitle.textContent = department.name;
    departmentCategory.textContent = department.category;
    departmentDescription.textContent = department.description;

    departmentIcon.className = "fa-solid " + department.icon;

    doctorsTitle.textContent = "Doctors in " + department.name;

    //.filter() နဲ့ သက်ဆိုင်တဲ့ doctor ရွေးမယ် 
    // cardiology ရွေးထားရင် doctor.departmentID === "cardiology" ဖြစ်တဲ့  doctors အားလုံးကို array အသစ်နဲ့ ပြန်ပေးတယ်
    const departmentDoctors = doctors.filter(function (doctor) {
        return doctor.departmentId === department.id;
    });

    //.length means တွေ့တဲ့ doctor အရေအတွက်
    doctorCount.textContent =
        departmentDoctors.length + " doctors";

    // doctor ရှိရင် --> length != 0 --> true --> hidden is true --> empty msg ဖျောက်
    // doctor မရှိရင် --> length != 0 --> false --> hidden is false --> empty msg မဖျောက်
    doctorEmpty.hidden = departmentDoctors.length !== 0;

    //တစ်ယောက်ချင်းစီအတွက် card တည်ဆောက်ပြီး အခုမှ HTML page ပေါ်က doctorList ထဲ ထည့်တာ
    departmentDoctors.forEach(function (doctor) {
        doctorList.append(createDoctorCard(doctor));
    });

    //URL မှာ doctor ID ပါလာရင် တန်းဖွင့်
    // ဒါက  doctor name search နဲ့ ချိတ်လို့ရတယ် --> Search result က သက်ဆိုင်ရာ department ID နဲ့ doctor ID ပါတဲ့ link ကိုပေးရုံပဲ 
    // Support direct links from doctor search results.
    if (doctorId) {
        const selectedDoctor = departmentDoctors.find(function (doctor) {
            return doctor.id === doctorId;
        });

        if (selectedDoctor) {
            showDoctorProfile(selectedDoctor);
        }
    }
} */

// Load data and initialize the page
async function initializeDepartmentPage() {
    // Initial loading state
    departmentTitle.textContent = "Loading department…";
    departmentCategory.textContent = "";
    departmentDescription.textContent = "";

    departmentError.hidden = true;
    doctorsSection.hidden = true;
    doctorProfile.hidden = true;

    doctorList.replaceChildren();
    doctorCount.textContent = "";
    doctorEmpty.hidden = true;

    try {
        // Ask the service for the selected department
        department = await hospitalService.getDepartmentById(
            departmentId
        );

        if (!department) {
            departmentTitle.textContent = "Department Unavailable";

            departmentError.textContent =
                "This department could not be found. " +
                "Please return to All Departments.";

            departmentError.hidden = false;

            return;
        }

        // Fill department introduction
        document.title = department.name + " | CareHub";

        departmentTitle.textContent = department.name;
        departmentCategory.textContent = department.category;
        departmentDescription.textContent = department.description;

        departmentIcon.className =
            "fa-solid " + department.icon;

        // Ask the service for this department's doctors
        const departmentDoctors =
            await hospitalService.getDoctorsByDepartment(
                department.id
            );

        doctorsTitle.textContent =
            "Doctors in " + department.name;

        doctorCount.textContent =
            departmentDoctors.length +
            (departmentDoctors.length === 1 ? " doctor" : " doctors");

        doctorEmpty.hidden = departmentDoctors.length !== 0;

        departmentDoctors.forEach(function (doctor) {
            doctorList.append(createDoctorCard(doctor));
        });

        doctorsSection.hidden = false;

        // Open a doctor profile if the URL includes its ID
        if (doctorId) {
            const selectedDoctor = departmentDoctors.find(
                function (doctor) {
                    return doctor.id === doctorId;
                }
            );

            if (selectedDoctor) {
                showDoctorProfile(selectedDoctor);
            }
        }
    } catch (error) {
        // Used when loading data fails
        console.error("Department loading failed:", error);

        departmentTitle.textContent = "Unable to Load";

        departmentError.textContent =
            "We could not load the department information. " +
            "Please refresh the page and try again.";

        departmentError.hidden = false;
        doctorsSection.hidden = true;
        doctorProfile.hidden = true;
    }
}

// Start loading when this script runs
initializeDepartmentPage();

//.find()   --> return first match item , မတွေ့ရင် return undefined
//.filter() --> return all match items as a array, else return [] 
//.map()    --> 	Item တစ်ခုချင်းကို ပြောင်းပြီးရလာတဲ့ array အသစ်
//.forEach() -->    Item တစ်ခုချင်းအတွက် အလုပ်လုပ်ပေးတယ်။ ရလဒ် array အသစ် မပေးဘူး