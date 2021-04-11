import * as fs from 'fs';
import { parseFiles } from '../utils/parser';
import { TreeDataProvider } from '../workSpaceTreeDataProvider';
import { TreeItem } from '../workspaceTreeItem';

// Prompts the user for a new folder name and then creates it.
export const editFiles = async (context: TreeItem, treeDataProvider: TreeDataProvider) => {

  let basePath = context ? context.path : undefined;
  
  if (basePath && context.cppFile) {
    try {
      const hFile = fs.readFileSync(basePath,'utf8');
      const cppFile = fs.readFileSync(context.cppFile,'utf8');
      console.log(parseFiles(cppFile, hFile));
    } catch(e) {
      console.log(e);
    }
   
    
  }
  
  // Refresh Tree
  treeDataProvider.refresh();

};