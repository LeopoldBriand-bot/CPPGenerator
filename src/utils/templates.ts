import { template } from 'lodash';
import fileh from "../templates/class.h.template";
import filecpp from "../templates/class.cpp.template";

export type DataType = {
    fileDescription: String,
    classDefinitionName: String,
    version: String,
    date: String,
    className: String,
    includes: {
        header: {
            libs: String[],
            locale: String[]
        },
        cpp: {
            libs: String[],
            locale: String[]
        }
    },
    namespaces: String[],
    variables: { name: String, type: String }[],
    methods: { name: String, type: String, args: { name: String, type: String }[]}[]
};

export function getTemplated(classType: String, data:DataType) {
    try{
        switch (classType) {
            case 'Class':
                const compiledh = template(fileh);
                const compiledcpp = template(filecpp);
                const header = compiledh(data);
                const cpp = compiledcpp(data);
                return {header, cpp };
        
            default:
                return {header: '', cpp: ''};
        }
    } catch(e) {
        console.log(e);
        return {header: '', cpp: ''};
    };
}