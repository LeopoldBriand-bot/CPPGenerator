import * as vscode from 'vscode';
import * as fs from 'fs';
import { TreeItem } from '../workspaceTreeItem';
import { TreeDataProvider } from '../workSpaceTreeDataProvider';

// Prompts the user for confirmation and then deletes class files.
export const deleteFiles = async (context: TreeItem, treeDataProvider: TreeDataProvider) => {

  const results = await vscode.window.showWarningMessage(
    `Are you sure you want to delete ${context.label} files and its contents?`,
    ...['Delete Files', 'Cancel'],
  );

  if (results === undefined || results === 'Cancel') {
    return;
  }
  if (context.path === undefined || context.cppFile === undefined) {
      console.warn('Error with files path');
    return;
  }

  
// Delete files.
  await fs.unlink(context.path, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('File header deleted successfully!');
  });

  await fs.unlink(context.cppFile, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('File cpp deleted successfully!');
  });
  
  // Refresh Tree
  treeDataProvider.refresh();
};
