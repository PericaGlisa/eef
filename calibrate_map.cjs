
const fs = require('fs');
const path = require('path');

const jsonPath = path.join('client', 'src', 'components', 'references', 'rs-all.json');
const rawData = fs.readFileSync(jsonPath, 'utf8');
const data = JSON.parse(rawData);

let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;

const samples = []; // { name, lat, lon, avgX, avgY }

data.features.forEach(feature => {
  // Only process polygons/multipolygons
  const processRing = (ring) => {
    let sumX = 0, sumY = 0, count = 0;
    ring.forEach(pt => {
      const [x, y] = pt;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      sumX += x;
      sumY += y;
      count++;
    });
    return { sumX, sumY, count };
  };

  let totalSumX = 0, totalSumY = 0, totalCount = 0;

  if (feature.geometry.type === 'Polygon') {
    feature.geometry.coordinates.forEach(ring => {
      const { sumX, sumY, count } = processRing(ring);
      totalSumX += sumX;
      totalSumY += sumY;
      totalCount += count;
    });
  } else if (feature.geometry.type === 'MultiPolygon') {
    feature.geometry.coordinates.forEach(poly => {
      poly.forEach(ring => {
        const { sumX, sumY, count } = processRing(ring);
        totalSumX += sumX;
        totalSumY += sumY;
        totalCount += count;
      });
    });
  }

  // Collect samples for calibration
  // We want representative cities spread out
  const name = feature.properties.name;
  if (['Subotica', 'Grad Beograd', 'Novi Pazar', 'Zaječar', 'Loznica'].some(n => name.includes(n))) {
    samples.push({
      name: name,
      lat: parseFloat(feature.properties.latitude),
      lon: parseFloat(feature.properties.longitude),
      rawX: totalSumX / totalCount,
      rawY: totalSumY / totalCount
    });
  }
});

console.log('Raw Bounds:');
console.log(`MinX: ${minX}, MaxX: ${maxX}, Width: ${maxX - minX}`);
console.log(`MinY: ${minY}, MaxY: ${maxY}, Height: ${maxY - minY}`);

// Calculate Transform to fit 727 x 1042
// ViewBox: 0 0 727 1042
const targetW = 727;
const targetH = 1042;

const rawW = maxX - minX;
const rawH = maxY - minY;
const rawAspect = rawW / rawH;
const targetAspect = targetW / targetH;

console.log(`Raw Aspect: ${rawAspect}, Target Aspect: ${targetAspect}`);

let scale;
if (rawAspect > targetAspect) {
  scale = targetW / rawW;
} else {
  scale = targetH / rawH;
}

// We want to fit it nicely, maybe with a small margin?
// Let's use 95% of the space
scale = scale * 0.95;

// Center it
// Screen Center = (TargetW/2, TargetH/2)
// Raw Center (in Screen Space) = Scale * (RawX - RawCenterX) ... NO
// Raw Center (in Raw Space) = (minX + maxX)/2, (minY + maxY)/2

// Transform: translate(tx, ty) scale(s, -s)
// ScreenX = s * RawX + tx
// ScreenY = -s * RawY + ty

// We want Center of Raw to map to Center of Screen
const rawCX = (minX + maxX) / 2;
const rawCY = (minY + maxY) / 2;
const screenCX = targetW / 2;
const screenCY = targetH / 2;

// screenCX = s * rawCX + tx  => tx = screenCX - s * rawCX
// screenCY = -s * rawCY + ty => ty = screenCY + s * rawCY

const s = scale;
const tx = screenCX - s * rawCX;
const ty = screenCY + s * rawCY;

console.log('Calculated Transform for SVG:');
console.log(`scale: ${s.toFixed(5)}`);
console.log(`translate: ${tx.toFixed(1)}, ${ty.toFixed(1)}`);
console.log(`SVG transform="translate(${tx.toFixed(1)} ${ty.toFixed(1)}) scale(${s.toFixed(5)} -${s.toFixed(5)})"`);

console.log('\nSamples for Calibration:');
samples.forEach(samp => console.log(JSON.stringify(samp)));

// Linear Regression Calculation
// ScreenX = A * lon + B
// ScreenY = C * lat + D
// We have ScreenX/Y for samples via the transform above.
// ScreenX_sample = s * samp.rawX + tx
// ScreenY_sample = -s * samp.rawY + ty

const points = samples.map(samp => ({
  lat: samp.lat,
  lon: samp.lon,
  screenX: s * samp.rawX + tx,
  screenY: -s * samp.rawY + ty
}));

// Simple average of slopes?
// A = (ScreenX2 - ScreenX1) / (Lon2 - Lon1)
// Better: Least Squares for X = A*lon + B
// n*Sum(xy) - Sum(x)Sum(y) / n*Sum(x^2) - (Sum(x))^2

const n = points.length;
const sumLon = points.reduce((a, b) => a + b.lon, 0);
const sumLat = points.reduce((a, b) => a + b.lat, 0);
const sumSX = points.reduce((a, b) => a + b.screenX, 0);
const sumSY = points.reduce((a, b) => a + b.screenY, 0);
const sumLon2 = points.reduce((a, b) => a + b.lon * b.lon, 0);
const sumLat2 = points.reduce((a, b) => a + b.lat * b.lat, 0);
const sumLonSX = points.reduce((a, b) => a + b.lon * b.screenX, 0);
const sumLatSY = points.reduce((a, b) => a + b.lat * b.screenY, 0);

const A = (n * sumLonSX - sumLon * sumSX) / (n * sumLon2 - sumLon * sumLon);
const B = (sumSX - A * sumLon) / n;

const C = (n * sumLatSY - sumLat * sumSY) / (n * sumLat2 - sumLat * sumLat);
const D = (sumSY - C * sumLat) / n;

console.log('\nLinear Regression Results:');
console.log(`SVG_X = ${A.toFixed(2)} * lon + (${B.toFixed(2)})`);
console.log(`SVG_Y = ${C.toFixed(2)} * lat + (${D.toFixed(2)})`);
