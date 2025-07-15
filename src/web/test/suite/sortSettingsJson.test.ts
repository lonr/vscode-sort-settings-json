import * as assert from 'assert';
import * as vscode from 'vscode';
import { sortSettingsJson } from '../../sortSettingsJson';

suite('Sort Settings JSON Extension Test Suite', () => {
    vscode.window.showInformationMessage('Starting Sort Settings JSON tests.');
    
    const fixturesRelativePath = '.';
    
    async function readFixtureFile(fileName: string): Promise<string> {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            throw new Error('No workspace folder found');
        }
        const fileUri = vscode.Uri.joinPath(workspaceFolder.uri, fixturesRelativePath, fileName);
        const fileData = await vscode.workspace.fs.readFile(fileUri);
        return new TextDecoder('utf-8').decode(fileData);
    }
    
    test('sortSettingsJson - settings.json with commonlyUsed', async () => {
        const settingsJson = await readFixtureFile('settings.json');
        const sortedJson = await readFixtureFile('sorted.json');
        
        assert.strictEqual(sortSettingsJson(settingsJson, true), sortedJson);
    });
    
    test('sortSettingsJson - defaultSettings.json with commonlyUsed', async () => {
        const defaultSettingsJson = await readFixtureFile('defaultSettings.json');
        const defaultSortedJson = await readFixtureFile('defaultSorted.json');
        
        assert.strictEqual(sortSettingsJson(defaultSettingsJson, true), defaultSortedJson);
    });
    
    test('sortSettingsJson - settings.json without commonlyUsed', async () => {
        const settingsJson = await readFixtureFile('settings.json');
        const sortedJson = await readFixtureFile('sortedNoCommonlyUsed.json');
        
        assert.strictEqual(sortSettingsJson(settingsJson, false), sortedJson);
    });
    
    test('sortSettingsJson - defaultSettings.json without commonlyUsed', async () => {
        const defaultSettingsJson = await readFixtureFile('defaultSettings.json');
        const defaultSortedJson = await readFixtureFile('defaultSortedNoCommonlyUsed.json');
        
        assert.strictEqual(sortSettingsJson(defaultSettingsJson, false), defaultSortedJson);
    });
});
