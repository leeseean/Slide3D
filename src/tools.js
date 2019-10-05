// 获取角度
export function getAngle(angX, angY) {
    return Math.atan2(angY, angX) * 180 / Math.PI;
}

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
export function getDirection(angX, angY, flagDistance) {
    let result = 0;

    //如果滑动距离太短
    if (Math.abs(angX) < flagDistance && Math.abs(angY) < flagDistance) {
        return result;
    }

    const angle = getAngle(angX, angY);
    if (angle >= -135 && angle <= -45) {
        result = 1;
    } else if (angle > 45 && angle < 135) {
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    } else if (angle >= -45 && angle <= 45) {
        result = 4;
    }

    return result;
}

export const isSupportTouch = 'ontouchend' in document ? true : false;

export function getEvents() {
    let startEvt, moveEvt, endEvt;
    if (isSupportTouch) {
        startEvt = 'touchstart';
        moveEvt = 'touchmove';
        endEvt = 'touchend';
    } else {
        startEvt = 'mousedown';
        moveEvt = 'mousemove';
        endEvt = 'mouseup';
    }
    return {
        startEvt,
        moveEvt,
        endEvt
    };
}

export function getPageXY(e, isEndEvt = false) {
    if (isSupportTouch) {
        return {
            X: isEndEvt ? e.changedTouches[0].pageX : e.targetTouches[0].pageX,
            Y: isEndEvt ? e.changedTouches[0].pageY : e.targetTouches[0].pageY,
        };
    }
    return {
        X: e.clientX,
        Y: e.clientY
    };
}