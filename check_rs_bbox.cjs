
const fs = require('fs');
const path = require('path');

const rsPath = path.join('client', 'src', 'components', 'references', 'rs-all.json');
const rsData = JSON.parse(fs.readFileSync(rsPath, 'utf8'));

let minY = Infinity, maxY = -Infinity;
let minX = Infinity, maxX = -Infinity;

const visit = (x, y) => {
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
};

rsData.features.forEach(f => {
    if (f.geometry.type === 'Polygon') f.geometry.coordinates.forEach(r => r.forEach(([x, y]) => visit(x, y)));
    else if (f.geometry.type === 'MultiPolygon') f.geometry.coordinates.forEach(p => p.forEach(r => r.forEach(([x, y]) => visit(x, y))));
});

console.log(`RS All BBox: X[${minX}, ${maxX}], Y[${minY}, ${maxY}]`);
