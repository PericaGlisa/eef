
const fs = require('fs');
const path = require('path');

const rsPath = path.join('client', 'src', 'components', 'references', 'rs-all.json');
const kvPath = 'kv-all.json';

const rsData = JSON.parse(fs.readFileSync(rsPath, 'utf8'));
const kvData = JSON.parse(fs.readFileSync(kvPath, 'utf8'));

// Find Raska
const raska = rsData.features.find(f => f.properties.name.includes('Raska') || f.properties['woe-name'].includes('Raska') || f.properties.name === 'Raški');
// Find Leposavic
const leposavic = kvData.features.find(f => f.properties.name.includes('Leposavic') || f.properties['woe-name'].includes('Leposavic'));

if (raska && leposavic) {
    // Find point with Min Y in Raska
    let raskaMinY = Infinity;
    let raskaXatMinY = 0;
    
    const visitRs = (x, y) => {
        if (y < raskaMinY) {
            raskaMinY = y;
            raskaXatMinY = x;
        }
    };
    
    if (raska.geometry.type === 'Polygon') raska.geometry.coordinates.forEach(r => r.forEach(([x, y]) => visitRs(x, y)));
    else if (raska.geometry.type === 'MultiPolygon') raska.geometry.coordinates.forEach(p => p.forEach(r => r.forEach(([x, y]) => visitRs(x, y))));

    // Find point with Max Y in Leposavic
    let lepoMaxY = -Infinity;
    let lepoXatMaxY = 0;
    
    const visitKv = (x, y) => {
        if (y > lepoMaxY) {
            lepoMaxY = y;
            lepoXatMaxY = x;
        }
    };

    if (leposavic.geometry.type === 'Polygon') leposavic.geometry.coordinates.forEach(r => r.forEach(([x, y]) => visitKv(x, y)));
    else if (leposavic.geometry.type === 'MultiPolygon') leposavic.geometry.coordinates.forEach(p => p.forEach(r => r.forEach(([x, y]) => visitKv(x, y))));

    console.log(`Raska Min Y Point: (${raskaXatMinY}, ${raskaMinY})`);
    console.log(`Leposavic Max Y Point: (${lepoXatMaxY}, ${lepoMaxY})`);
    
    // Calculate Params assuming they are the same point
    // X_rs = X_kv * R + Dx
    // Y_rs = Y_kv * R + Dy
    // We assume R = S_rs / S_kv (ratio of precisions) OR S_kv / S_rs
    // S_rs = 0.00159754921225
    // S_kv = 0.00444321943149
    // Ratio1 = 0.359547 (S_rs / S_kv)
    // Ratio2 = 2.78127 (S_kv / S_rs)
    
    const R1 = 0.00159754921225 / 0.00444321943149;
    const R2 = 0.00444321943149 / 0.00159754921225;
    
    console.log('Ratio1 (S_rs/S_kv):', R1);
    console.log('Ratio2 (S_kv/S_rs):', R2);
    
    // Calculate offsets for both R scenarios
    const Dx1 = raskaXatMinY - (lepoXatMaxY * R1);
    const Dy1 = raskaMinY - (lepoMaxY * R1);
    
    console.log('Scenario 1 (R ~ 0.36):');
    console.log('Dx:', Dx1);
    console.log('Dy:', Dy1);
    
    const Dx2 = raskaXatMinY - (lepoXatMaxY * R2);
    const Dy2 = raskaMinY - (lepoMaxY * R2);
    
    console.log('Scenario 2 (R ~ 2.78):');
    console.log('Dx:', Dx2);
    console.log('Dy:', Dy2);
}
