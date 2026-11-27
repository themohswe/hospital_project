/*() => { ... } က နာမည်မပေးထားတဲ့ arrow function တစ်ခု
အပြင်က ( ... ) က အဲဒီ function ကို အုပ်ထားတာ။
အဆုံးက () က function ကို ချက်ချင်းခေါ်တာ။ ဒါကြောင့် script run တဲ့အခါ အထဲက code တန်းအလုပ်လုပ်တယ်
*/
(() => {
    "use strict";

    // ===== 1. Notice data =====
    const categoryLabels = {
        clinic: "Clinic Updates",
        hospital: "Hospital News",
        health: "Health Tips"
    };

    // Notice တစ်ခုစီရဲ့ အစဉ်: id, category, date, title, summary, details
    const notices = [
        ["holiday", "clinic", "2026-11-09",
            "Holiday Clinic Hours",
            "Outpatient hours will change during the holiday period.",
            "From Nov 24 to Nov 28, outpatient clinics will open from 9:00 AM to 1:00 PM. Emergency services will remain open 24/7."],

        ["pediatric", "hospital", "2026-11-07",
            "New Pediatric Clinic",
            "Our new clinic welcomes children and teens.",
            "The clinic is on the second floor. Visit the Departments page for doctor profiles and schedules."],

        ["flu", "health", "2026-11-05",
            "Flu Vaccination Notice",
            "Seasonal flu vaccinations are available at CareHub.",
            "Contact the information desk for clinic hours and appointment availability."],

        ["parking", "hospital", "2026-11-03",
            "Parking Area Maintenance",
            "Some visitor parking spaces will be temporarily closed.",
            "From Nov 10 to Nov 14, use the visitor parking area near the East Entrance and follow the posted signs."],

        ["hand-hygiene", "health", "2026-11-02",
            "Hand Hygiene in the Hospital",
            "Find hand-cleaning stations before entering patient areas.",
            "Look for sanitizer stations near entrances and waiting areas. Ask the information desk if you cannot find one."],

        ["medicine-list", "health", "2026-11-01",
            "Bring a Medication List",
            "Prepare a list of what you take before your appointment.",
            "Write down the names and doses of your medicines, vitamins, and supplements to review with your care team."],

        ["appointment-questions", "health", "2026-10-30",
            "Prepare Questions for Your Visit",
            "Make a short checklist of what you want to ask.",
            "Put your most important question first and check that you understand any next steps before leaving."],

        ["symptom-notes", "health", "2026-10-29",
            "Keep Notes About Your Symptoms",
            "A few notes can help you explain what has changed.",
            "Note when your symptoms started and anything that seems to make them better or worse."],

        ["sleep-diary", "health", "2026-10-28",
            "Start a Simple Sleep Diary",
            "Keep track of your sleep habits before discussing them at a visit.",
            "Record your bedtime, wake time, naps, and how rested you feel."],

        ["activity-journal", "health", "2026-10-27",
            "Track Your Daily Movement",
            "Use an activity log to see what fits your routine.",
            "Write down activities you already do and how you feel afterward."],

        ["food-labels", "health", "2026-10-26",
            "How to Compare Food Labels",
            "Start with serving size when comparing packaged foods.",
            "Check whether nutrition is listed per serving or per 100 grams, then compare using the same amount."],

        ["allergy-notes", "health", "2026-10-25",
            "Keep Your Allergy Information Handy",
            "Have your known allergies ready to share with your care team.",
            "Write down known allergies and what happened when you were exposed. Share the list during check-in."],

        ["follow-up-reminders", "health", "2026-10-24",
            "Set a Follow-Up Reminder",
            "Keep your next visit and preparation instructions together.",
            "Save the appointment date, time, and location in your calendar, along with any instructions from your care team."],

        ["checkup-records", "health", "2026-10-23",
            "Organize Your Checkup Records",
            "Keep previous checkup dates and reports easy to find.",
            "Store your reports together and bring relevant copies if your care team asks for them."],

        ["saturday-clinic", "clinic", "2026-10-22",
            "Saturday Clinic Hours",
            "Selected outpatient clinics will offer Saturday appointments.",
            "Selected clinics offer Saturday appointments from 9:00 AM to noon. Check your department's schedule before visiting."],

        ["lab-check-in", "clinic", "2026-10-21",
            "Laboratory Check-In Update",
            "Lab appointments now check in at a separate counter.",
            "For a scheduled lab visit, check in at Counter 2 on the first floor with your appointment confirmation."],

        ["rehab-room-change", "clinic", "2026-10-20",
            "Rehabilitation Clinic Room Change",
            "Rehabilitation visits will temporarily move to Room 204.",
            "Follow the signs to Room 204 on the second floor. Existing appointment times will stay the same."],

        ["information-desk", "hospital", "2026-10-19",
            "New Visitor Information Desk",
            "A new help desk is available in the main lobby.",
            "Stop by for directions, department locations, or help finding your check-in counter."],

        ["accessible-drop-off", "hospital", "2026-10-18",
            "Accessible Drop-Off Area",
            "A designated drop-off zone is available near the East Entrance.",
            "Follow the marked signs to the drop-off zone, then move your vehicle to the visitor parking area."],

        ["waiting-area", "hospital", "2026-10-17",
            "Family Waiting Area Reopened",
            "The family waiting area on the second floor is open again.",
            "The waiting area is beside the elevators. Ask the information desk if you need directions."]
    ].map(([id, category, date, title, summary, details]) => ({
        id, category, date, title, summary, details
    })).sort((a, b) => b.date.localeCompare(a.date));

    // ===== 2. HTML elements and current state =====
    const searchInput = document.querySelector("#announcement-search");
    const filterButtons = document.querySelectorAll(".announcement-filter");
    const list = document.querySelector("#announcement-list");
    const template = document.querySelector("#announcement-template");
    const emptyMessage = document.querySelector("#announcement-empty");
    const pagination = document.querySelector("#announcement-pagination");

    const noticesPerPage = 5;
    let selectedCategory = "all";
    let currentPage = 1;

    const dateFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
    });

    // ===== 3. Notice တစ်ခုကို HTML template နဲ့ ဆောက်မယ် =====
    function createNoticeRows(notice) {
        const rows = template.content.cloneNode(true);
        const row = rows.querySelector(".announcement-row");
        const detailsRow = rows.querySelector(".announcement-details");
        const toggle = row.querySelector(".announcement-toggle");
        const time = row.querySelector("time");

        row.dataset.category = notice.category;
        row.querySelector("strong").textContent = notice.title;
        row.querySelector(".announcement-title p").textContent = notice.summary;
        row.querySelector(".announcement-badge").textContent =
            categoryLabels[notice.category];

        time.dateTime = notice.date;
        time.textContent = dateFormatter.format(new Date(notice.date));

        detailsRow.id = `notice-${notice.id}`;
        const detailsText = detailsRow.querySelector("p");
        detailsText.textContent = notice.details;

        if (notice.id === "pediatric") {
            detailsText.textContent = "The clinic is on the second floor. Visit the ";
            const link = document.createElement("a");
            link.href = "departments.html";
            link.textContent = "Departments page";
            detailsText.append(link, " for doctor profiles and schedules.");
        }

        toggle.setAttribute("aria-controls", detailsRow.id);
        toggle.setAttribute("aria-label", `Toggle details for ${notice.title}`);

        toggle.addEventListener("click", () => {
            const willOpen = detailsRow.hidden;
            detailsRow.hidden = !willOpen;
            toggle.setAttribute("aria-expanded", String(willOpen));
        });

        return rows;
    }

    // ===== 4. Filter အရင်လုပ်ပြီး လက်ရှိ page ရဲ့ ၅ ခုကို ပြမယ် =====
    function renderAnnouncements() {
        const keyword = searchInput.value.trim().toLowerCase();

        const matches = notices.filter((notice) => {
            const matchesCategory =
                selectedCategory === "all" || notice.category === selectedCategory;

            const searchText = [
                notice.title,
                notice.summary,
                notice.details,
                categoryLabels[notice.category]
            ].join(" ").toLowerCase();

            return matchesCategory && searchText.includes(keyword);
        });

        const totalPages = Math.ceil(matches.length / noticesPerPage);
        currentPage = Math.min(currentPage, Math.max(1, totalPages));

        const start = (currentPage - 1) * noticesPerPage;
        const visibleNotices = matches.slice(start, start + noticesPerPage);

        list.replaceChildren(...visibleNotices.map(createNoticeRows));
        emptyMessage.hidden = matches.length > 0;
        renderPagination(totalPages);
    }

    // ===== 5. First / Previous / Page numbers / Next / Last =====
    function renderPagination(totalPages) {
        pagination.replaceChildren();
        pagination.hidden = totalPages <= 1;
        if (pagination.hidden) return;

        function addButton(text, label, targetPage, options = {}) {
            const button = document.createElement("button");
            button.type = "button";
            button.textContent = text;
            button.setAttribute("aria-label", label);
            button.disabled = Boolean(options.disabled);

            if (options.current) {
                button.setAttribute("aria-current", "page");
            }

            button.addEventListener("click", () => {
                if (currentPage === targetPage) return;

                currentPage = targetPage;
                renderAnnouncements();
                pagination.querySelector('[aria-current="page"]')?.focus();
            });

            pagination.append(button);
        }

        const isFirst = currentPage === 1;
        const isLast = currentPage === totalPages;

        addButton("«", "First page", 1, { disabled: isFirst });
        addButton("‹", "Previous page", currentPage - 1, { disabled: isFirst });

        for (let page = 1; page <= totalPages; page++) {
            addButton(String(page), `Page ${page}`, page, {
                current: page === currentPage
            });
        }

        addButton("›", "Next page", currentPage + 1, { disabled: isLast });
        addButton("»", "Last page", totalPages, { disabled: isLast });
    }

    // ===== 6. Search / category ပြောင်းတိုင်း page 1 ကို ပြန်သွားမယ် =====
    searchInput.addEventListener("input", () => {
        currentPage = 1;
        renderAnnouncements();
    });

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.category;
            currentPage = 1;

            filterButtons.forEach((filterButton) => {
                filterButton.setAttribute("aria-pressed", String(filterButton === button));
            });

            renderAnnouncements();
        });
    });

    renderAnnouncements();
})();