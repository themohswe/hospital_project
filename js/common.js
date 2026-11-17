// Select the Menu button and navigation
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

// Run only when both elements exist
if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
        // Check whether the menu is currently open
        const isExpanded =
            menuButton.getAttribute("aria-expanded") === "true";

        // Update the accessibility state
        menuButton.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        // Add or remove the class that displays the menu
        navigation.classList.toggle("is-open", !isExpanded);
    });
}

const translations = {
    en: {
        nav_home: "Home",
        nav_dept: "Departments",
        nav_records: "Patient Records",
        nav_news: "Announcements",
        welcome_title: "Welcome to CareHub",
        search_placeholder: "Search doctor or department...",
        /* first-slide's Text */
        first: "Welcome to CareHub Hospital.Your Health, Our Priority. Exceptional care with professional medical staff.",
        second: "Advanced Medical Technology.Equipped with state-of-the-art facilities for accurate diagnosis and treatment.",
        third: "24/7 Emergency Care Services.Always here for you and your family whenever emergencies strike."

    },
    mm: {
        nav_home: "ပင်မ",
        nav_dept: "ဌာနများ/ဆရာဝန်များ",
        nav_records: "လူနာ မှတ်တမ်း",
        nav_news: "ကြေညာချက်များ",
        welcome_title: "CareHub မှ ကြိုဆိုပါတယ်",
        search_placeholder: "ဆရာဝန် သို့မဟုတ် ဌာနကို ရှာရန်...",
        
        /* first-slide's Text */
        first: "CareHub ဆေးရုံမှ နွေးထွေးစွာ ကြိုဆိုပါသည်။ သင့်ကျန်းမာရေးသည် ကျွန်ုပ်တို့၏ ပထမဦးစားပေးဖြစ်ပါသည်။",
        second: "အဆင့်မြင့် ဆေးနည်းပညာဖြင့် တိကျမှန်ကန်စွာ စမ်းသပ်ကုသပေးပါသည်။",
        third: "၂၄ နာရီ အရေးပေါ် ပြုစုကုသမှု ဝန်ဆောင်မှု။အရေးပေါ်အခြေအနေတိုင်းအတွက် သင့်မိသားစုအနား အမြဲရှိနေပါသည်။"
      }
}

function toggleLangMenu() {
    document.getElementById("langMenu").classList.toggle("show");
}

function setLanguage(lang, label) {
    localStorage.setItem("preferredLang", lang);
    localStorage.setItem("preferredLangLabel", label);
    applyLanguage(lang);
    updateButtonText(label);

    document.getElementById("langMenu").classList.remove("show");

}

function updateButtonText(label) {
    const langText = document.getElementById("currentLangText");
    if (langText) {
        langText.innerHTML = label;
    }
}

function applyLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]){
            if (element.tagName === "INPUT") {
                element.placeholder = translations[lang][key];
            }else {
                element.innerText = translations[lang][key];
            }
        }
    });
}

window.addEventListener("click", function(event) {
    if (!event.target.closest('.lang-dropdown')) {
        const menu = document.getElementById("langMenu");
        if (menu && menu.classList.contains("show")) {
            menu.classList.remove("show");
        }
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("preferredLang") || "en";
    const savedLabel = localStorage.getItem("preferredLangLabel")|| "ENG";

    applyLanguage(savedLang);
    updateButtonText(savedLabel);
})


