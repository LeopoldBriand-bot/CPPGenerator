import * as vscode from 'vscode';
import * as path from 'path';

export class TreeItem extends vscode.TreeItem {
    children: TreeItem[] | undefined;
    type:string;
    path:string;
    cppFile:string | undefined;
    className: string | null = null;

    constructor(label: string, type: string, path: string, cppFile: string | undefined, children?: (TreeItem|undefined)[]) {
        super(
            label,
            children === undefined ? vscode.TreeItemCollapsibleState.None :
                                    vscode.TreeItemCollapsibleState.Expanded);
        const filteredArray: TreeItem[] = children ? children.filter(notEmpty) : [];
        this.children = filteredArray;
        this.type = type;
        this.path = path;
        this.cppFile = cppFile;
        this.iconPath = this.getIcon();
        this.contextValue = type;
    }

    setChildrens(children: (TreeItem|undefined)[]) {
        const filteredArray: TreeItem[] = children ? children.filter(notEmpty) : [];
        this.children = filteredArray;
    }
    getIcon() {
        if (this.type === "folder") {
            return {
                light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'folder.svg'),
                dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'folder.svg'),
            };
        } else {
            return {
                light: path.join(__filename, '..', '..', 'resources', 'icons', 'light', 'document.svg'),
                dark: path.join(__filename, '..', '..', 'resources', 'icons', 'dark', 'document.svg'),
            };
        }
    }
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}