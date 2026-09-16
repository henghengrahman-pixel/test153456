import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const db=fs.readFileSync(new URL('../src/db.js',import.meta.url),'utf8');
const server=fs.readFileSync(new URL('../src/server.js',import.meta.url),'utf8');
const shell=fs.readFileSync(new URL('../public/assets/js/core/shell.js',import.meta.url),'utf8');
const page=fs.readFileSync(new URL('../public/pages/archives.html',import.meta.url),'utf8');
test('archives snapshots previous session without changing live message storage',()=>{assert.match(db,/CREATE TABLE IF NOT EXISTS conversation_archives/);assert.match(db,/archiveCurrentConversationSession\(chatId,\{excludeEventId:triggerEventId/);assert.match(db,/markConversationEnded\(chatId\)[\s\S]*archiveCurrentConversationSession/)});
test('archives routes and navigation are wired',()=>{assert.match(server,/app\.get\('\/api\/archives'/);assert.match(server,/app\.get\('\/api\/archives\/:archiveId'/);assert.match(server,/dashboardPages=new Set\(\[[^\]]*'archives'/);assert.match(shell,/\['archives','Archives'\]/);assert.match(page,/data-page="archives"/)});
