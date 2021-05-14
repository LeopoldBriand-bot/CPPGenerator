import Vue from "vue";
import App from "../pages/App.vue";

export function getWebviewHTML(): string {
    try {
        const res = Vue.compile(App.toString());
        const vm = new Vue({
            el: '#app',
            render: res.render,
            staticRenderFns: res.staticRenderFns
        });
    } catch(e) {
        console.warn(e);
    }
    return '<div>Wait</div>';
}