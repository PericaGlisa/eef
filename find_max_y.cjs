
const fs = require('fs');
const path = require('path');

const rsPath = path.join('client', 'src', 'components', 'references', 'rs-all.json');
const rsData = JSON.parse(fs.readFileSync(rsPath, 'utf8'));

let maxFeature = null;
let maxY = -Infinity;

rsData.features.forEach(f => {
    let localMaxY = -Infinity;
    const visit = (x, y) => { if (y > localMaxY) localMaxY = y; };
    
    if (f.geometry.type === 'Polygon') f.geometry.coordinates.forEach(r => r.forEach(([x, y]) => visit(x, y)));
    else if (f.geometry.type === 'MultiPolygon') f.geometry.coordinates.forEach(p => p.forEach(r => r.forEach(([x, y]) => visit(x, y))));
    
    if (localMaxY > maxY) {
        maxY = localMaxY;
        maxFeature = f.properties.name;
    }
});

console.log(`Feature with Max Y (${maxY}): ${maxFeature}`);
