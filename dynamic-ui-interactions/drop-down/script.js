// Dropdown Function
const dropDownMenu = (elem) => {
    // const tabs = elements.querySelectorAll();
    const sectionNav = Array.from(elem); // Get all navigation on page
    for (const nav of sectionNav) {
        const tabs = Array.from(nav.children); // Assign each direct nav > child as tabs
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                if (this.classList.contains('active')) {
                    this.classList.remove('active')
                } else {
                    tabs.forEach(function (tab) { tab.classList.remove('active') });
                    this.classList.add('active')
                }
            });
        });
    }

};

const elemDropDown = document.querySelectorAll('.drop-down'); // Assign dom element
dropDownMenu(elemDropDown); // Call function with elemDropDown as val