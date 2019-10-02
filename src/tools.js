// 获取角度
export function getAngle(angX, angY) {
    return Math.atan2(angY, angX) * 180 / Math.PI;
}

//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
export function getDirection(angX, angY) {
    let result = 0;

    //如果滑动距离太短
    if (Math.abs(angX) < 2 && Math.abs(angY) < 2) {
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