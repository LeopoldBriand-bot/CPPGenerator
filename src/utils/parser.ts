import { DataType } from "./templates";

export function parseFiles(cppFile:string, hFile:string):DataType {
    return {
        ...getHeading(hFile),
        includes: {
            header: {
                libs: getLibsIncludes(hFile),
                locale: getLocaleIncludes(hFile),
            },
            cpp: {
                libs: getLibsIncludes(cppFile),
                locale: getLocaleIncludes(cppFile),
            },
        },
        namespaces: getNamespaces(cppFile),
        variables: getVariables(hFile),
        methods: getMethods(cppFile)
    };
}
function getHeading(file: string): {fileDescription:string, classDefinitionName:string, version:string, date:string, className:string} {
    const fileEntryRegex = /\/\*\* --File entry--\n    (.*)\n    @file ([a-zA-Z\.]*).*@version ([0-9\.]*) ([0-9]*\/[0-9]*\/[0-9]*) \n\*\//sm;
    const result = fileEntryRegex.exec(file);
    const nameregex = /[a-zA-Z0-9]*/.exec(result ? result[2] : '');
    const name = nameregex ? nameregex[0] : '';
    return {
        fileDescription: result ? result[1] : '',
        classDefinitionName: `DEF_${name.toUpperCase()}`,
        version:result ? result[3] : '',
        date:result ? result[4] : '',
        className: name
    };
}
function getLocaleIncludes(file: string): string[] {
    const localeIncludeRegex = /\#include "([a-zA-Z0-9\.]*)"/gm;
    let result:string[] = [];
    if(file.match(localeIncludeRegex)){
        file.match(localeIncludeRegex)!.forEach(el=>{
            result.push(/"([a-zA-Z0-9\.]*)"/.exec(el)![1]);
        });
    }
    return result;
}
function getLibsIncludes(file: string): string[] {
    const libsIncludeRegex = /\#include <([a-zA-Z0-9\.]*)>/gm;
    let result:string[] = [];
    if(file.match(libsIncludeRegex)){
        file.match(libsIncludeRegex)!.forEach(el=>{
            result.push(/<([a-zA-Z0-9\.]*)>/.exec(el)![1]);
        });
    }
    return result;
}
function getNamespaces(file: string): string[] {
    const namespaceRegex = /using namespace [a-zA-Z0-9.]*;/gm;
    let result:string[] = [];
    if(file.match(namespaceRegex)){
        file.match(namespaceRegex)!.forEach(el=>{
            result.push(/namespace ([a-zA-Z0-9.]*)/.exec(el)![1]);
        });
    }
    return result;
}

function getVariables(hFile: string): {name: string, type: string}[] {
    const variableRegex = /\/\*\* @name ([a-zA-Z0-9]*) @type ([a-zA-Z0-9\:]*) \*\//gm;
    let result : {name: string, type: string}[] = [];
    if(hFile.match(variableRegex)){
        hFile.match(variableRegex)!.forEach(el=>{
            const res = /@name ([a-zA-Z0-9]*) @type ([a-zA-Z0-9\:]*)/.exec(el);
            if(res) {
                result.push({
                    name: res[1],
                    type: res[2]
                });
            }
        });
    }
    return result;
}

function getMethods(cppFile: string) {
    const methodRegex = /\/\*\* --method--\n\* @name ([a-zA-Z]*).\* @type ([a-zA-z0-9:]*)\n(.+?)\*\/.+?\{(.+?)\}/msg;
    let result : { name: String, type: String, args: { name: String, type: String }[], content: string}[] = [];
    const matches = cppFile.match(methodRegex);
    if(matches) {
        matches.forEach(el=>{
            const res = /@name ([a-zA-Z]*).\* @type ([a-zA-z0-9:]*)\n(.+?)\*\/.+?\{(.+?)\}/msg.exec(el);
            if(res) {
                result.push({
                    name: res[1],
                    type: res[2],
                    args: getMethodArgs(res[3]),
                    content: res[4],
                });
            }
        });
    }
    return result;
}

function getMethodArgs(args: string) : {name:string, type:string}[] {
    const argRegex = /@param \{([a-zA-Z0-9:]*)\} ([a-zA-Z0-9]*)/msg;
    const matches = args.match(argRegex);
    let result : { name: string, type: string }[] = [];
    if(matches) {
        matches.forEach(el=>{
            const res = /@param \{([a-zA-Z0-9:]*)\} ([a-zA-Z0-9]*)/.exec(el);
            if(res) {
                result.push({
                    name: res[1],
                    type: res[2]
                });
            }
        });
    }
    return result;
}