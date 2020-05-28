export default class NavSectionIndicator {
    constructor(parentId) {
        this.parentId = parentId;
    }
    /**
     * Uses DOMRect object to set offset and width of the position indicator
     */
    setIndicatorPosition(DOMRect) {
        this.setIndicatorOffsetX(DOMRect.left);
        this.setIndicatorWidth(DOMRect.width);
    }
    setIndicatorOffsetX(offset) {
        const sectionIndicator = document.querySelector(`#${this.parentId} span.section-indicator`);
        sectionIndicator.style.left = `${offset}px`;
    }
    setIndicatorWidth(width) {
        const sectionIndicator = document.querySelector(`#${this.parentId} span.section-indicator`);
        sectionIndicator.style.width = `${width}px`;
    }
    create() {
        const sectionIndicatorContainer = document.createElement('span');
        const sectionIndicator = document.createElement('span');
        sectionIndicatorContainer.classList.add('section-indicator-container');
        sectionIndicator.classList.add('section-indicator');
        sectionIndicatorContainer.append(sectionIndicator);
        return sectionIndicatorContainer
    }
}