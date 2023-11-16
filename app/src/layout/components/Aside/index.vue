<template>
    <div class="lro-aside" :class="{ 'has-logo': settings.hasLogo, hide }">
        <div class="lro-aside__logo">LOGO</div>
        <div class="lro-aside__menu">
            <a-menu
                v-model:openKeys="useSetting.menuSelected"
                v-model:selectedKeys="useSetting.menuSelected"
                :inline-collapsed="!useSetting.sideIsActive"
                mode="inline"
                theme="dark"
                :items="items"
            ></a-menu>
        </div>
    </div>
</template>

<script setup lang="ts">
import settings from '@/layout/settings'
import { useSettingStore } from '@/store'
import { PieChartOutlined, MailOutlined, DesktopOutlined, InboxOutlined, AppstoreOutlined } from '@ant-design/icons-vue'
const useSetting = useSettingStore()
const hide = computed(() => !useSetting.sideIsActive)

const items = reactive([
    {
        key: 'Home',
        icon: () => h(PieChartOutlined),
        label: 'Option 1',
        title: 'Option 1'
    },
    {
        key: '2',
        icon: () => h(DesktopOutlined),
        label: 'Option 2',
        title: 'Option 2'
    },
    {
        key: '3',
        icon: () => h(InboxOutlined),
        label: 'Option 3',
        title: 'Option 3'
    },
    {
        key: 'sub1',
        icon: () => h(MailOutlined),
        label: 'Navigation One',
        title: 'Navigation One',
        children: [
            {
                key: '5',
                label: 'Option 5',
                title: 'Option 5'
            },
            {
                key: '6',
                label: 'Option 6',
                title: 'Option 6'
            },
            {
                key: '7',
                label: 'Option 7',
                title: 'Option 7'
            },
            {
                key: '8',
                label: 'Option 8',
                title: 'Option 8'
            }
        ]
    },
    {
        key: 'sub2',
        icon: () => h(AppstoreOutlined),
        label: 'Navigation Two',
        title: 'Navigation Two',
        children: [
            {
                key: '9',
                label: 'Option 9',
                title: 'Option 9'
            },
            {
                key: '10',
                label: 'Option 10',
                title: 'Option 10'
            },
            {
                key: 'sub3',
                label: 'Submenu',
                title: 'Submenu',
                children: [
                    {
                        key: '11',
                        label: 'Option 11',
                        title: 'Option 11'
                    },
                    {
                        key: '12',
                        label: 'Option 12',
                        title: 'Option 12'
                    }
                ]
            }
        ]
    }
])
</script>

<style scoped lang="scss">
$sideWidth: 250px;
@include block(aside) {
    width: $sideWidth;
    height: 100%;
    background-color: #001529;
    transition-duration: 0.3s;
    @include elem(logo) {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
        color: #fff;
        background-color: #20a0ff;
        border-bottom: 1px solid #20a0ff;
    }
    @include elem(menu) {
        width: 100%;
        height: calc(100vh - 60px);
        overflow: auto;
        .ant-menu-inline-collapsed {
            transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
        }
    }

    &.hide {
        width: 80px;
        // pointer-events: none;
        transition-duration: 0.3s;
    }
}
</style>
