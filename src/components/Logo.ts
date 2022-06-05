import { h } from 'vue';
const dynamicLogo = (props:any) => {
    let path:string = props.isDark ? './assets/img/Sleepy_Logo.png' : './assets/img/Sleepy_Logo_Dark.png';
    const vnode = h('img',{src:path,draggable:'false',style:"width:133px;height:60px"});
    return vnode;
}

dynamicLogo.props = ["isDark"];

export default dynamicLogo;