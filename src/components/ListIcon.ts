import { h } from "vue";
import * as Icons from "@element-plus/icons-vue";
import {ElIcon} from 'element-plus';
const dynamicIcon = (props:any) => {
    
    const nodeMap = new Map([
        ['star',h(Icons.Star)],
        ['mic',h(Icons.Mic)],
        ['collection',h(Icons.Collection)],
        ['clock',h(Icons.Clock)]
    ]);
    const iconNode = nodeMap.get(props.type);
    const vnode = h(ElIcon,null,[iconNode]);
    return vnode;
};

dynamicIcon.props = ["type"];

export default dynamicIcon;