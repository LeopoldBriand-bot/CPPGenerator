import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { TreeDataProvider } from '../workSpaceTreeDataProvider';
import { TreeItem } from '../workspaceTreeItem';
import { getTemplated, DataType } from "../utils/templates";

// Prompts the user for a new folder name and then creates it.
export const createFiles = async (context: TreeItem, treeDataProvider: TreeDataProvider) => {
  const inputName = await vscode.window.showInputBox(
    {
      prompt: 'Enter a name for the Files.',
      validateInput: (value) => {
        if (/[/\\:?*"<>|]/.test(value)) {
          return 'Files name may not contain /\\:?*"<>|';
        }
        return '';
      },

    },
  );

  const inputType = await vscode.window.showQuickPick(['Class', 'Singleton']);

  // Skip if nothing is entered.
  if (!inputName || !inputType) {
    return;
  }

  let basePath = context ? context.path : undefined;
  if (basePath === undefined) {
    basePath = vscode.workspace.rootPath;
  }
  if (basePath) {
    const data : DataType = formatEmptyData(inputName);
    const templates = getTemplated(inputType, data);
    fs.writeFile(path.join(basePath, inputName + '.h'), templates.header,(err) => {
      if (err) {
          return console.error(err);
      }
      console.log('Header created successfully!');
    });
    fs.writeFile(path.join(basePath, inputName + '.cpp'), templates.cpp, (err) => {
      if (err) {
          return console.error(err);
      }
      console.log('Cpp created successfully!');
    });
  }
  
  // Refresh Tree
  treeDataProvider.refresh();

};

function formatEmptyData(name: String) {
    return {
        fileDescription: '',
        className: name,
        classDefinitionName: `DEF_${name.toUpperCase()}`, 
        version: '0.1.0', 
        date: Date.now().toString(),
        includes: {
            header: {
                libs: [],
                locale: []
            },
            cpp: {
                libs: [],
                locale: []
            }
        },
        namespaces: [],
        variables: [],
        methods: []
    };
}