import { h, type VNode } from "vue";
import * as Icons from "@element-plus/icons-vue";
import {ElIcon} from 'element-plus';
const dynamicIcon = (props:any) => {
    // nodeMap为type字符串和Icons下实例对应VNode的映射
    const nodeMap:Map<String,VNode> = new Map([
        ['star',h(Icons.Star)],
        ['mic',h(Icons.Mic)],
        ['collection',h(Icons.Collection)],
        ['clock',h(Icons.Clock)]
    ]);
    // iconNode为undefined时表示传入的图标未定义
    const iconNode:VNode|undefined = nodeMap.get(props.type);
    const vnode:VNode = h(ElIcon,null,[iconNode]);
    return vnode;
};

dynamicIcon.props = ["type"];

export default dynamicIcon;

/*
用h函数生成对应的图标标签，以应用到其他template中
组件参数
参数名      类型     注释
type    string   用于表示对应的element-plus图标标签
*/