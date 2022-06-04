import { createI18n } from "vue-i18n";

const i18n = createI18n({
    locale:'zh-CN',
    messages:{
        'zh-CN':require('./zh-CN'),
        'en-US':require('./en-US')
    }
})

export default i18n;