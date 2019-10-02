import {
    getDirection
} from './tools';
import './style.css';

class Slide3D {
    constructor(selector, innerDom = '', clsName = '') {
        this.selector = selector || document.body;
        this.innerDom = innerDom;
        this.clsName = clsName;
        this.childrenCount = this.getChildrenCount();
        this.currentIndex = 0;//正面是哪一个
        this.roundFlag = 0;//转圈记录
        document.querySelector(this.selector).innerHTML = this.getHtml();
        this.list = document.querySelector(this.selector).querySelector('.slide-3d-list');
        this.children = [...this.list.children];
        this.setStyle();
        this._addEvent();
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
        let startX, startY;
        this.list.addEventListener('touchstart', (e) => {
            startX = e.targetTouches[0].pageX;
            startY = e.targetTouches[0].pageY;
        }, false);
        this.list.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const curX = e.targetTouches[0].pageX;
            // const curY = e.targetTouches[0].pageY;
            const angX = curX - startX;
            const deg = this.theta * (angX / this.cellSize) * -1;
            // this.list.style.transform = `translate3d(0px, 0px, ${-this.radius}px) rotate3d(0, 1, 0, ${this.theta * this.roundFlag * -1}deg)`;

        }, false);
        this.list.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].pageX;
            const endY = e.changedTouches[0].pageY;
            const direction = getDirection(endX - startX, endY - startY);
            switch (direction) {
                case 0:
                    console.log("未滑动！");
                    break;
                case 1:
                    console.log("向上！");
                    break;
                case 2:
                    console.log("向下！");
                    break;
                case 3:
                    this.currentIndex = this.currentIndex + 1
                    if (this.currentIndex === this.childrenCount) {
                        this.currentIndex = 0;
                    }
                    this.roundFlag = this.roundFlag + 1;
                    this.list.style.transform = `translate3d(0px, 0px, ${-this.radius}px) rotate3d(0, 1, 0, ${this.theta * this.roundFlag * -1}deg)`;
                    console.log("向左！");
                    break;
                case 4:
                    this.currentIndex = this.currentIndex - 1
                    if (this.currentIndex === -1) {
                        this.currentIndex = this.childrenCount - 1;
                    }
                    this.roundFlag = this.roundFlag - 1;
                    this.list.style.transform = `translate3d(0px, 0px, ${-this.radius}px) rotate3d(0, 1, 0, ${this.theta * this.roundFlag * -1}deg)`;
                    console.log("向右！");
                    break;
                default:
            }
        }, false);
    }
}

export default Slide3D;