import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import {TreeItem} from './workspaceTreeItem';

export class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
    onDidChangeTreeData?: vscode.Event<TreeItem|null|undefined>|undefined;
  
    data: TreeItem[];
  
    constructor(private workspaceRoot: string | undefined) {
        if(this.workspaceRoot) {
            this.data = this.getFilesData(this.workspaceRoot);
            let toto = "0";
        } else {
            this.data = [];
        }
    }
  
    getTreeItem(element: TreeItem): vscode.TreeItem|Thenable<vscode.TreeItem> {
      return element;
    }
  
    getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
        if (!this.workspaceRoot) {
			vscode.window.showWarningMessage('No workspace');
			return [];
		}
      if (element === undefined) {
        return this.data;
      }
      return element.children;
    }
    getFilesData(folderName: string): TreeItem[] {
        const tree = dirTree(folderName);
        return  tree ? [tree] : [];
    }
}

function dirTree(filename: string ) { 
    const stats = fs.lstatSync(filename);
    if (stats.isDirectory()) {
        const childrens = fs.readdirSync(filename).map((child) => {
            return dirTree(filename + '/' + child);
        });
        let info : TreeItem = new TreeItem(
            path.basename(filename),
            "folder",
            filename,
            undefined,
            childrens
    
        );
        return info;
    } else {
        if(filename.match(/\.h$/)) { // Match for header files
            const cppfile = filename.match(/(.*)\.[^.]+$/);
            const cppfileName = cppfile ? cppfile[1]+".cpp" : "";
            if (cppfile && fs.existsSync(cppfileName)) {
                const matches = filename.match(/^\/(.+\/)*(.+)\.(.+)$/);
                let info : TreeItem = new TreeItem(
                    path.basename(filename),
                    "file",
                    filename,
                    cppfileName,
                    undefined
                );
                info.className = matches ? matches[2] : null;
                return info;
            }
        }
        return undefined;
    }
}

