import { h, type VNode } from 'vue';
const dynamicLogo = (props:any) => {
    const path:string = props.isDark ? './assets/img/Sleepy_Logo.png' : './assets/img/Sleepy_Logo_Dark.png';
    const vnode:VNode = h('img',{src:path,draggable:'false',style:"width:133px;height:60px"});
    return vnode;
}

dynamicLogo.props = ["isDark"];

export default dynamicLogo;

/*
用h函数生成对应的图标标签，以应用到其他template中
组件参数
参数名      类型     注释
isDark    string   用于区别夜间/非夜间展示的图标
*/