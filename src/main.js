import Vue from 'vue';
import App from './main.vue';
import router from './router/index.js';
// import store from './www/qdxbase/qdxstore.js';

//加载公共CSS样式及字体图标
import './base/base.css';

Vue.config.debug = true;//开启错误提示

window.__VueRoot__ = new Vue({
        el: '#qiudanxia',
        router,
        // store,
        template: '<App/>',
        components: {App}
});