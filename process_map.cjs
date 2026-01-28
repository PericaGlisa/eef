
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'client/src/components/references/rs-all.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
let paths = [];

data.features.forEach(feature => {
    const geometry = feature.geometry;
    if (geometry.type === 'Polygon') {
        geometry.coordinates.forEach(ring => {
            let pathStr = "M";
            ring.forEach((coord, index) => {
                const [x, y] = coord;
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
                pathStr += ` ${x} ${y}`;
                if (index === 0) pathStr += " L";
            });
            pathStr += " Z";
            paths.push(pathStr);
        });
    } else if (geometry.type === 'MultiPolygon') {
        geometry.coordinates.forEach(polygon => {
            polygon.forEach(ring => {
                let pathStr = "M";
                ring.forEach((coord, index) => {
                    const [x, y] = coord;
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                    pathStr += ` ${x} ${y}`;
                    if (index === 0) pathStr += " L";
                });
                pathStr += " Z";
                paths.push(pathStr);
            });
        });
    }
});

// Add some padding to viewBox
const padding = 100;
const width = maxX - minX + (padding * 2);
const height = maxY - minY + (padding * 2);
const viewBox = `${minX - padding} ${minY - padding} ${width} ${height}`;

// Invert Y axis? SVG usually has Y going down. 
// GeoJSON usually has Y (latitude) going up, but this file has coordinates like 7103, 8000.
// If it's projected, Y might increase upwards.
// Let's assume standard SVG behavior first. If map is upside down, we can flip it.
// Looking at the coords: 7103 to 8747.
// If these are "projected" coordinates where Y increases upwards (North), then in SVG (Y increases downwards) it will look upside down.
// We can use transform="scale(1, -1)" and adjust translate.
// But let's first output the raw paths and viewBox.

console.log(`ViewBox: ${viewBox}`);
console.log(`MinX: ${minX}, MinY: ${minY}, MaxX: ${maxX}, MaxY: ${maxY}`);
console.log(`Path Count: ${paths.length}`);
// Output first few paths to check
// console.log(paths.join('\n'));

// Generate a React component snippet
const svgContent = paths.map((d, i) => `<path key={${i}} d="${d}" fill="currentColor" className="text-white/10" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />`).join('\n');

console.log('--- SVG CONTENT START ---');
console.log(svgContent);
console.log('--- SVG CONTENT END ---');
