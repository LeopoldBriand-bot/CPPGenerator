// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {TreeDataProvider} from './workSpaceTreeDataProvider';
import {addFolder} from './actions/addFolder.action';
import { deleteFolder } from './actions/deleteFolder.action';
import { createFiles } from './actions/createFiles.action';
import { deleteFiles } from './actions/deleteFiles.action';
import { editFiles } from './actions/editFiles.action';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const treeDataProvider =  new TreeDataProvider(vscode.workspace.rootPath);
	vscode.window.registerTreeDataProvider('cppgenerator', treeDataProvider);
	vscode.commands.registerCommand(
		'cppgenerator.refresh', 
		async () => {
			treeDataProvider.refresh();
		}
	);
	

	// Register Add sub-folder Command.
    vscode.commands.registerCommand(
		'cppgenerator.addFolder',
		async (context) => {
		  try {
			await addFolder(context, treeDataProvider);
		  } catch (err) {
			vscode.window.showErrorMessage(err);
		  }
		},
	  );

	// Register delete Sub-folder Command.
	vscode.commands.registerCommand(
		'cppgenerator.deleteFolder',
		async (context) => {
			try {
			await deleteFolder(context, treeDataProvider);
			} catch (err) {
			vscode.window.showErrorMessage(err);
			}
		},
	);

	// Register Create files Command.
	vscode.commands.registerCommand(
		'cppgenerator.createFiles',
		async (context) => {
			try {
			await createFiles(context, treeDataProvider);
			} catch (err) {
			vscode.window.showErrorMessage(err);
			}
		},
	);

	// Register Delete files Command.
	vscode.commands.registerCommand(
		'cppgenerator.deleteFiles',
		async (context) => {
			try {
			await deleteFiles(context, treeDataProvider);
			} catch (err) {
			vscode.window.showErrorMessage(err);
			}
		},
	);

	// Register edit files Command.
	vscode.commands.registerCommand(
		'cppgenerator.editFiles',
		async (context) => {
			try {
			await editFiles(context, treeDataProvider);
			} catch (err) {
			vscode.window.showErrorMessage(err);
			}
		},
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
