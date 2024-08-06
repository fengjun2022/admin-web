import { computed } from 'vue'
import { layoutRouterSetting } from '@/store/settings/layoutRouterSetting.ts'


export const useTheme = () => {
    const settingsStore = layoutRouterSetting()
    const themeConfig = computed(() => settingsStore.themeConfig)

    // 切换暗黑模式
    const switchDark = () => {
        const body = document.documentElement as HTMLElement
        if (themeConfig.value.isDark) body.setAttribute('class', 'dark')
        else body.setAttribute('class', '')

    }

    // 修改主题颜色

    // 初始化主题
    const initTheme = () => {
        switchDark()
        // changePrimary(themeConfig.value.primary)
    }
    return {
        initTheme,
        switchDark,
    }
}
