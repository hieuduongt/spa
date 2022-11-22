const onItemClick = (event) => {
    document.querySelector(".side-bar > .side-bar-item.active").classList.remove("active")
    event.currentTarget.classList.add("active")
    const idView = event.currentTarget.getAttribute("viewId");
    switchView(idView);
}

const toggleMenu = () => {
    const sideList = document.getElementById("side-bar-menu");
    sideList.classList.toggle("close");
    sideList.classList.toggle("open");
    const menuTitle = sideList.querySelector(".side-bar-title-text")
    menuTitle.classList.toggle("hidden")
    const items = sideList.querySelectorAll(".side-bar-item > .side-bar-item-text");
    items.forEach(it => {
        it.classList.toggle("hidden");
    })
    const arIcon = document.querySelectorAll(".side-bar-menu-button > div");
    arIcon.forEach(ico => ico.classList.toggle("hidden"))
}

const switchView = async (viewName) => {
    const viewNamePath = `../pages/${viewName}.html`;
    let res = await fetch(viewNamePath).then(data => data.text());
    const el = document.getElementById("main-content");
    el.innerHTML = res;
}

const isSidebarOpened = () => {
    const sideBarStatus = document.getElementById("side-bar-menu");
    const className = sideBarStatus.className;
    if(className.includes("open")) {
        return true;
    } else {
        return false;
    }
}

const checkLayout = () => {
    if(window.innerWidth < 640) {
        if(isSidebarOpened()) {
            toggleMenu()
        }
    }
}

document.addEventListener("DOMContentLoaded", () => checkLayout())

window.addEventListener("resize", (size) => {
    if(window.innerWidth < 640) {
        if(isSidebarOpened()) {
            toggleMenu();
        }
    }
});

switchView("dash-board");

