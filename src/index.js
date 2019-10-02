import './style.css';

class Slide3D {
    constructor(selector, innerDom = '', clsName = '') {
        this.selector = selector || document.body;
        this.innerDom = innerDom;
        this.clsName = clsName;
        this.childrenCount = this.getChildrenCount();
        this.currentIndex = 0;
        document.querySelector(this.selector).innerHTML = this.getHtml();
        this.list = document.querySelector(this.selector).querySelector('.slide-3d-list');
        this.children = [...this.list.children];
        this.setStyle();
    }
    getChildrenCount() {
        const div = document.createElement('div');
        div.innerHTML = this.innerDom;
        return div.children.length;
    }
    getHtml() {
        let pageDom = '';
        for (const i = 0; i < this.childrenCount.length; i++) {
            pageDom += `<div index="${i}" class="slide-dot ${this.currentIndex === i ? 'active' : ''}"></div>`;
        }
        return `
            <div class="slide-3d-wrapper ${this.clsName}">
                <div class="slide-3d-list">
                    ${this.innerDom}
                </div>
                <div class="slide-pagination">${pageDom}</div>
            </div>
        `;
    }
    setStyle() {
        this.theta = 360 / this.childrenCount;
        this.cellSize = this.children[0].offsetWidth;
        this.radius = Math.round(this.cellSize / 2 / Math.tan(Math.PI / this.childrenCount));
        this.list.style.transform = `translate3d(0px, 0px, ${-this.radius}px) rotate3d(0, 1, 0, ${this.theta * this.currentIndex * -1}deg)`;
        this.children.forEach((element, _index) => {
            element.style.backfaceVisibility = 'hidden';
            element.style.position = 'absolute';
            element.style.zIndex = '1';
            element.style.opacity = '1';
            element.style.transform = `rotate3d(0, 1, 0, ${this.theta * _index}deg) translate3d(0px, 0px, ${this.radius}px)`;
        });
    }
    _addEvent() {

    }
}

export default Slide3D