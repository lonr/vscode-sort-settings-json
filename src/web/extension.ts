// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { sortSettingsJson } from './sortSettingsJson';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, extension "sort-settings-json" is now active in the web extension host!',
  );

  const command = (noCommonlyUsed: boolean) => () => {
    // The code you place here will be executed every time your command is executed
    const editor = vscode.window.activeTextEditor;

    if (!editor || !editor.document.fileName.endsWith('settings.json')) {
      vscode.window.showInformationMessage(
        'Please open settings.json and try again.',
      );
      return;
    }

    // Get the current settings
    const settings = editor.document.getText();

    // Sort the settings
    const sortedSettings = sortSettingsJson(settings, noCommonlyUsed);

    // Replace the current document with the sorted settings
    editor.edit((editBuilder) => {
      const all = new vscode.Range(
        editor.document.positionAt(0),
        editor.document.lineAt(editor.document.lineCount - 1).range.end,
      );
      editBuilder.replace(all, sortedSettings);
    });

    // Display a message box to the user
    vscode.window.showInformationMessage(
      `settings.json sorted.${noCommonlyUsed ? '(No Commonly Used)' : ''}`,
    );
  };

  const disposables = [
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json

    vscode.commands.registerCommand(
      'sort-settings-json.sortSettingsJson',
      command(false),
    ),

    vscode.commands.registerCommand(
      'sort-settings-json.sortSettingsJsonNoCommonlyUsed',
      command(true),
    ),
  ];

  context.subscriptions.push(...disposables);
}

// This method is called when your extension is deactivated
export function deactivate() {}
