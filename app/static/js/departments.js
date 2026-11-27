async function initializeDepartmentSearch() {
    const filterButtons =
        document.querySelectorAll(".filter-button");

    const departmentCards =
        document.querySelectorAll(".department-card");

    const searchInput =
        document.querySelector("#doctor-search");

    const resultsTitle =
        document.querySelector("#department-results-title");

    const departmentCount =
        document.querySelector("#department-count");

    const departmentEmpty =
        document.querySelector("#department-empty");

    const doctorResults =
        document.querySelector("#doctor-search-results");

    const doctorList =
        document.querySelector("#doctor-search-list");

    const doctorCount =
        document.querySelector("#doctor-search-count");

    const doctorEmpty =
        document.querySelector("#doctor-search-empty");

    const searchError =
        document.querySelector("#search-error");

    let selectedCategory = "all";

    // Prevent searching before the shared data is ready.
    searchInput.disabled = true;

    filterButtons.forEach(function (button) {
        button.disabled = true;
    });

    try {
        // Load shared data once.
        const [allDepartments, allDoctors] = await Promise.all([
            hospitalService.getDepartments(),
            hospitalService.getDoctors()
        ]);

        // Quickly find a department using its ID.
        const departmentById = new Map();

        allDepartments.forEach(function (department) {
            departmentById.set(department.id, department);
        });

        function updateSelectedButton() {
            filterButtons.forEach(function (button) {
                const isSelected =
                    button.dataset.category === selectedCategory;

                button.setAttribute(
                    "aria-pressed",
                    String(isSelected)
                );
            });
        }

        // Create one clickable doctor search result.
        function createDoctorResult(doctor) {
            const department =
                departmentById.get(doctor.departmentId);

            const card = document.createElement("a");

            card.className = "doctor-result-card";

            card.href =
                "/department-detail?department=" +
                encodeURIComponent(doctor.departmentId) +
                "&doctor=" +
                encodeURIComponent(doctor.id);

            const avatar = document.createElement("div");
            avatar.className = "doctor-result-avatar";
            avatar.textContent = doctor.initials;
            avatar.setAttribute("aria-hidden", "true");

            if (doctor.image) {
                const photo = document.createElement("img");
                photo.alt = "";

                photo.addEventListener("load", function () {
                    avatar.replaceChildren(photo);
                });

                photo.src = doctor.image;
            }
            const name = document.createElement("h3");
            name.textContent = doctor.name;

            const departmentName = document.createElement("p");
            departmentName.className = "doctor-result-department";
            departmentName.textContent = department.name;

            const specialty = document.createElement("p");
            specialty.textContent = doctor.specialty;

            const action = document.createElement("span");
            action.className = "doctor-result-action";
            action.textContent = "View Profile & Schedule →";

            card.append(
                avatar,
                name,
                departmentName,
                specialty,
                action
            );

            return card;
        }

        function updateResults() {
            const keyword =
                searchInput.value.trim().toLowerCase();

            let visibleDepartments = 0;

            // Track departments matching the current search.
            const matchingDepartmentIds = new Set();

            departmentCards.forEach(function (card) {
                const departmentName =
                    card.querySelector("h3")
                        .textContent
                        .toLowerCase();

                const matchesCategory =
                    selectedCategory === "all" ||
                    card.dataset.category === selectedCategory;

                const matchesKeyword =
                    departmentName.includes(keyword);

                const shouldShow =
                    matchesCategory && matchesKeyword;

                card.hidden = !shouldShow;

                if (shouldShow) {
                    visibleDepartments++;

                    matchingDepartmentIds.add(
                        card.dataset.department
                    );
                }
            });

            departmentCount.textContent =
                visibleDepartments +
                (visibleDepartments === 1
                    ? " department"
                    : " departments");

            departmentEmpty.hidden = visibleDepartments !== 0;

            if (keyword !== "") {
                resultsTitle.textContent =
                    "Matching Departments";
            } else if (selectedCategory === "all") {
                resultsTitle.textContent =
                    "All Departments";
            } else {
                const selectedButton = document.querySelector(
                    '.filter-button[aria-pressed="true"]'
                );

                resultsTitle.textContent =
                    selectedButton.textContent.trim();
            }

            // Clear old doctor search results.
            doctorList.replaceChildren();

            // No keyword: display departments only.
            if (keyword === "") {
                doctorResults.hidden = true;
                doctorCount.textContent = "";
                doctorEmpty.hidden = true;

                return;
            }

            // Match either the doctor's name or their department.
            const matchingDoctors = allDoctors.filter(
                function (doctor) {
                    // Skip doctors whose department is missing.
                    if (!departmentById.has(doctor.departmentId)) {
                        return false;
                    }

                    const matchesName =
                        doctor.name.toLowerCase().includes(keyword);

                    const matchesDepartment =
                        matchingDepartmentIds.has(
                            doctor.departmentId
                        );

                    return matchesName || matchesDepartment;
                }
            );

            matchingDoctors.forEach(function (doctor) {
                doctorList.append(
                    createDoctorResult(doctor)
                );
            });

            doctorCount.textContent =
                matchingDoctors.length +
                (matchingDoctors.length === 1
                    ? " doctor"
                    : " doctors");

            doctorEmpty.hidden = matchingDoctors.length !== 0;
            doctorResults.hidden = false;
        }

        // Category selection clears the previous search.
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                selectedCategory = button.dataset.category;
                searchInput.value = "";

                updateSelectedButton();
                updateResults();
            });
        });

        // Searching always searches across every category.
        searchInput.addEventListener("input", function () {
            selectedCategory = "all";

            updateSelectedButton();
            updateResults();
        });

        searchInput.disabled = false;

        filterButtons.forEach(function (button) {
            button.disabled = false;
        });

        updateSelectedButton();
        updateResults();

    } catch (error) {
        console.error("Search initialization failed:", error);

        searchError.textContent =
            "Search is currently unavailable. " +
            "Please refresh the page and try again.";

        searchError.hidden = false;
    }
}

initializeDepartmentSearch();

/* Select HTML elements
const filterButtons = document.querySelectorAll(".filter-button");
const departmentCards = document.querySelectorAll(".department-card");

const searchInput = document.querySelector("#doctor-search");
const resultsTitle = document.querySelector("#department-results-title");
const departmentCount = document.querySelector("#department-count");
const emptyMessage = document.querySelector("#department-empty");

// Initially, show all departments
let selectedCategory = "all";

// Filter cards using the selected category and search keyword
// value --> input ထဲရိုက်ထားတဲ့စာ
// trim() --> remove spaces 
function filterDepartments(){
    const keyword = searchInput.value.trim().toLowerCase();

    let visibleCount = 0; 

    //card.dataset.category --> html ထဲက data-category="..." ကို ဖတ်တာ
    departmentCards.forEach(function (card){
        const departmentName = card.querySelector("h3").textContent.toLowerCase();
        const cardCategory = card.dataset.category; 

        const matchesCategory = 
            selectedCategory === "all" || 
            cardCategory === selectedCategory;

        const matchesSearch = departmentName.includes(keyword);

        //true when category and Serach both match. 
        const shouldShow = matchesCategory && matchesSearch;
       
        //ပြရမယ့် card ဆို shouldShow is true --> hidden must be false
        // ဖျောက်ထားရမယ့် cardဆို shouldShow is false --> hidden must be true
        card.hidden = !shouldShow;

        if(shouldShow) {
            visibleCount++;
        }
    });

    //Update result count 
    departmentCount.textContent =
        visibleCount + (visibleCount === 1 ? " department " : " departments");
    
    //Show the empty msg only when no cards match
    emptyMessage.hidden = visibleCount !== 0; 

    //Update the results heading 
    if (keyword !== ""){
        resultsTitle.textContent = "Matching Departments";
    } else if (selectedCategory === "all") {
        resultsTitle.textContent = "All Departments";
    } else {
        const selectedButton = document.querySelector(
            '.filter-button[aria-pressed="true"]'
        );
        resultsTitle.textContent = selectedButton.textContent.trim();
    }
}

//Update the selected button
function updateSelectedButton(){
    filterButtons.forEach(function (button){
        const isSelected = button.dataset.category === selectedCategory;
        button.setAttribute("aria-pressed", String(isSelected));
    });
}

//Category Selection 
filterButtons.forEach(function (button){
    button.addEventListener("click", function (){

        selectedCategory = button.dataset.category;

        //Clear the old search when choosing a category 
        searchInput.value = "";
        updateSelectedButton();
        filterDepartments();
    });
});

//Search across all departments while typing 
searchInput.addEventListener("input", function(){
    selectedCategory = "all";
    updateSelectedButton();
    filterDepartments();
});

//Set the initial State
updateSelectedButton();
filterDepartments();*/