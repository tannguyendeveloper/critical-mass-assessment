export default class NavigationUl {
    constructor(items) {
        this.items = items;
    }
    renderMenuBtn() {
        let menuLi = document.createElement('li');
        menuLi.id = 'menu-btn-container';
        menuLi.innerHTML = '<i class="fas fa-bars"></i>';
        return menuLi;
    }
    renderItem(item) {
        let itemLi = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.dataset.city = item.section;
        anchor.href = `#${item.section}`;
        anchor.innerText = item.label;
        itemLi.append(anchor)
        return itemLi;
    }
    create() {
        const nav = document.createElement('ul');
        nav.append(this.renderMenuBtn());
        for (let item of this.items) {
            nav.append(this.renderItem(item));
        }
        return nav;
    }
}
