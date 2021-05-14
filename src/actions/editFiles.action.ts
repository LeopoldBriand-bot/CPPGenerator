import * as fs from 'fs';
import { window, ViewColumn } from 'vscode';
import { parseFiles } from '../utils/parser';
import { TreeDataProvider } from '../workSpaceTreeDataProvider';
import { TreeItem } from '../workspaceTreeItem';
import {getWebviewHTML} from '../utils/pages';

// Prompts the user for a new folder name and then creates it.
export const editFiles = async (context: TreeItem, treeDataProvider: TreeDataProvider) => {

  let basePath = context ? context.path : undefined;
  
  if (basePath && context.cppFile) {
    try {
      const hFile = fs.readFileSync(basePath,'utf8');
      const cppFile = fs.readFileSync(context.cppFile,'utf8');
      //console.log(parseFiles(cppFile, hFile));
    } catch(e) {
      console.log(e);
    }
   
    
  }
  const panel = window.createWebviewPanel(
    'editor',
    'CPP Editor',
    ViewColumn.One,
    {}
  );

  // And set its HTML content
  panel.webview.html = getWebviewHTML();

};