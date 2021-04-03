import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { TreeDataProvider } from '../workSpaceTreeDataProvider';
import { TreeItem } from '../workspaceTreeItem';

// Prompts the user for a new folder name and then creates it.
export const addFolder = async (context: TreeItem, treeDataProvider: TreeDataProvider) => {
  const inputResults = await vscode.window.showInputBox(
    {
      prompt: 'Enter a name for the folder.',
      validateInput: (value) => {
        if (/[/\\:?*"<>|]/.test(value)) {
          return 'Folder name may not contain /\\:?*"<>|';
        }
        return '';
      },

    },
  );

  // Skip if nothing is entered.
  if (!inputResults) {
    return;
  }

  let basePath = context ? context.path : undefined;
  if (basePath === undefined) {
    basePath = vscode.workspace.rootPath;
  }
  if (basePath) {
    await fs.mkdir(path.join(basePath, inputResults), (err) => {
      if (err) {
          return console.error(err);
      }
      console.log('Directory created successfully!');
    });
  }
  
  // Refresh Tree
  treeDataProvider.refresh();

};