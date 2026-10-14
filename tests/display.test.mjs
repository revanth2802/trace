import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {formatEvidenceValue} from '../lib/display.mjs';
const packet=JSON.parse(fs.readFileSync(new URL('../lib/packet.json',import.meta.url)));
test('real mileage evidence is a distance, not currency',()=>{
 const mileage=packet.extracted_values.find(e=>e.document_id==='D23'&&e.field==='trip1_miles');
 assert.equal(formatEvidenceValue(mileage),'118 mi');
});
test('source values retain foreign currency, percentages, and missing information',()=>{
 assert.match(formatEvidenceValue(packet.extracted_values.find(e=>e.id==='ev-0960')),/^SEK\s18,450\.00$/);
 assert.equal(formatEvidenceValue(packet.extracted_values.find(e=>e.field==='ownership'&&e.value===.2)),'20%');
 assert.equal(formatEvidenceValue(packet.extracted_values.find(e=>e.id==='ev-0919')),'Not provided');
 const wage=packet.extracted_values.find(e=>e.document_id==='D08'&&e.field==='box1');
 assert.equal(formatEvidenceValue(wage),'$104,600.00');
});
