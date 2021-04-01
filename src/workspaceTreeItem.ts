import * as vscode from 'vscode';

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
    }

    setChildrens(children: (TreeItem|undefined)[]) {
        const filteredArray: TreeItem[] = children ? children.filter(notEmpty) : [];
        this.children = filteredArray;
    }
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}