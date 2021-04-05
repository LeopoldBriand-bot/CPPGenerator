import * as vscode from 'vscode';
import * as fs from 'fs';
import { TreeItem } from '../workspaceTreeItem';
import { TreeDataProvider } from '../workSpaceTreeDataProvider';

// Prompts the user for confirmation and then deletes a folder.
export const deleteFolder = async (context: TreeItem, treeDataProvider: TreeDataProvider) => {

  const results = await vscode.window.showWarningMessage(
    `Are you sure you want to delete ${context.label} folder and its contents?`,
    ...['Delete Folder', 'Cancel'],
  );

  if (results === undefined || results === 'Cancel') {
    return;
  }

  let basePath = context ? context.path : undefined;
  if (basePath === undefined) {
    basePath = vscode.workspace.rootPath;
  }
  if (basePath) {
    // Delete workspace file.
  await fs.rmdir(basePath, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory deleted successfully!');
  });
  }
  
  // Refresh Tree
  treeDataProvider.refresh();
};
