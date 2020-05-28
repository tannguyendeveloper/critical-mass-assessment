
import NavigationUl from './NavigationUl.js';
import NavSectionIndicator from './NavSectionIndicator.js';
import AppleWatch from './AppleWatch.js';

const Navigation = async function () {

    const cities = await fetchCities();
    const navEl = document.getElementById('nav');

    const navCreator = new NavigationUl(cities.cities);
    const navUl = navCreator.create();

    const navSectionIndicator = new NavSectionIndicator('nav');
    const navSectionIndicatorEl = navSectionIndicator.create();
    
    navEl.append(navUl, navSectionIndicatorEl);

    // Set the watch to display Cupertino on onstruct
    const appleWatch = new AppleWatch('cupertino');
    const cupertinoNavLink = document.querySelector('a[data-city="cupertino"]');
    setNavLinkActive(cupertinoNavLink);

    const navLinks = document.querySelectorAll('nav#nav a');
    for (let a of navLinks) {
        a.addEventListener('click', handleNavItemClick);
    }

    const menuBtn =  document.querySelector('ul li#menu-btn-container');
    menuBtn.addEventListener('click', handleMenuBtnClick)

    window.addEventListener('resize', handleWindowResize);

    async function fetchCities() {
        try {
            const response = await fetch('./js/navigation.json');
            return response ? response.json() : false;
        } catch (e) {
            throw new Error(e);
        }
    }

    function setNavLinkActive(navLink) {
        navLink.classList.add('active');
        navLink.parentNode.classList.add('active');
        navSectionIndicator.setIndicatorPosition(navLink.getBoundingClientRect());
    }

    function unsetActiveNavLinks() {
        for (let a of navLinks) {
            a.classList.remove('active');
            a.parentNode.classList.remove('active');
        }
    }

    function hideMenu() {
        navUl.classList.remove('show');
    }

    function showMenu() {
        navUl.classList.add('show');
    }

    function handleMenuBtnClick(e) {
        if(navUl.classList.contains('show')) hideMenu();
        else showMenu();
    }


    function handleNavItemClick(e) {
        unsetActiveNavLinks();
        setNavLinkActive(e.target);
        updateClock(e.target.dataset.city);
        if(navUl.classList.contains('show')) hideMenu();
    }

    function handleWindowResize() {
        const activeLink = document.querySelector(`#nav a.active`);
        if (!activeLink) return false;
        navSectionIndicator.setIndicatorPosition(activeLink.getBoundingClientRect());
    }

    function updateClock(timezone) {
        appleWatch.setTimezone(timezone);
    }
}()
