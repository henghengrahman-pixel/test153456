import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const server=fs.readFileSync(new URL('../src/server.js',import.meta.url),'utf8');
const app=fs.readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
const html=fs.readFileSync(new URL('../public/index.html',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../public/style.css',import.meta.url),'utf8');

test('manual send auto-takes over before sending',()=>{assert.match(server,/dashboard_manual_reply/);assert.match(server,/await setHumanTakeover[\s\S]*await lc\.sendMessage/);assert.match(server,/mode:'HUMAN'/)});
test('manual send rejects closed conversations',()=>{assert.match(server,/CONVERSATION_CLOSED/)});
test('composer is enabled whenever a chat is selected',()=>{assert.match(app,/\$\('#manualText'\)\.disabled=!hasChat/);assert.doesNotMatch(app,/HUMAN_TAKEOVER_REQUIRED/)});
test('composer remains inside fixed conversation viewport',()=>{assert.match(css,/100dvh/);assert.match(css,/\.composerbar\{flex:0 0 auto/);assert.match(css,/\.messages\{flex:1 1 auto;min-height:0;overflow-y:auto/)});
test('takeover controls are in conversation header and assets are cache-busted',()=>{assert.match(html,/convtools[\s\S]*takeoverBtn[\s\S]*enableAiBtn[\s\S]*endChatBtn/);assert.match(html,/style\.css\?v=1\.19\.1/);assert.match(html,/app\.js\?v=1\.19\.1/);assert.match(server,/Cache-Control','no-store/)});
