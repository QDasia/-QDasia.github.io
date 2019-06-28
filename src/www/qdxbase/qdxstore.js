import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//获取全局状态值
Vue.prototype.xGetState = function (param,fn) {
    let vm = this;
    if(JSON.parse(_LS_.getItem(param)) !== null || JSON.stringify(eval('vm'+'.'+'$store'+'.'+'state'+'.'+param)) == "{}"){
        vm.$store.commit(fn,JSON.parse(_LS_.getItem(param)));
        return eval('vm'+'.'+'$store'+'.'+'state'+'.'+param);
    }else{
        return false;
    }
}

//插入全局状态值
Vue.prototype.xInsertState = function (fn,data) {
    if(typeof(data)=='undefined'||JSON.stringify(data) == "{}"){
        return false;
    }
    this.$store.commit(fn,data);
}

//清除全局状态值
Vue.prototype.xDelState = function (fn,key) {
    this.$store.commit(fn,key);
}

//挂载页面全局点击事件
Vue.prototype.globalClick = function (callback) {
    $(document).click(callback);
}

export default  new Vuex.Store({
    // 定义状态
    state: {
        aUserInfo:{},
    },
    mutations: {
        addUserInfo(state,aData) {
            state.aUserInfo = aData;
            _LS_.aUserInfo = JSON.stringify(aData);
        },
        delUserInfo(state,key){
            state.aUserInfo = {};
            _LS_.removeItem(key);
        }
    }
})