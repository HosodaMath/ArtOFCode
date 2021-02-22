class Color {
}
/**
 * set rgb color
 * @param {number} r - red
 * @param {number} g - green
 * @param {number} b - blue
 */
Color.rgb = (r, g, b) => {
    return `rbg(${r}, ${g}, ${b})`;
};
/**
 * set rgba color
 * @param {number} r - red
 * @param {number} g - green
 * @param {number} b - blue
 * @param {number} alpha - alpha value default 1.0
 */
Color.rgba = (r, g, b, alpha = 1.0) => {
    return `rbga(${r}, ${g}, ${b}, ${alpha})`;
};
export { Color };
