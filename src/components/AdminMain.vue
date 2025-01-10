<template>
    <div>
        <el-container>
          <el-aside>
            <div class="logo">
                <el-image :src="require('@/assets/logo.png')" :fit="cover" />
            </div>

            <el-menu
                active-text-color="#ffd04b"
                background-color="#304156"
                text-color="#fff" 
                router>
                <el-menu-item index="/adminMain/userList">
                    <el-icon><Management /></el-icon>
                    <span>用户管理</span>
                </el-menu-item>

                <el-menu-item index="/adminMain/bookList">
                    <el-icon><Management /></el-icon>
                    <span>图书管理</span>
                </el-menu-item>

                <el-menu-item index="/adminMain/entryBook">
                    <el-icon><Management /></el-icon>
                    <span>上架图书</span>
                </el-menu-item>

            </el-menu>
          </el-aside>
          <el-container>
            <el-header>
                <el-row>
                <el-col :span="12">
                    <div class="header-left">
                        <el-icon><Grid /></el-icon>
                        <span>图书管理系统</span>
                    </div>  
                </el-col>
                <el-col :span="12">
                    <div class="header-right">
                        <el-avatar :icon="UserFilled" />
                        <el-dropdown @command="commandHandler">
                            <span class="el-dropdown-link">欢迎,{{admin}}</span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>  
                </el-col>
                </el-row>
            </el-header>
            <el-main>
                <RouterView/>
            </el-main>
          </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { UserFilled } from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
const router = useRouter()
const admin = localStorage.getItem('adminName')
function commandHandler(val){
    if(val='logout'){
        router.replace('/adminLogin')
    }
}
</script>

<style>
/* .el-container {
    height: 100vh;
} */
.el-aside {
    width: 150px !important;
    background-color: #304156;
    height: 100vh;
}
.logo {
    display: flex;
    height: 60px;
    /* align-items: center; */
    margin-left: 35px;
}
.el-header {
    height: 60px;
    box-shadow: 3px 3px 4px #304156;
}
.header-left{
    line-height: 60px;
}
.header-right{
    text-align: right;
    line-height: 60px;
}
.el-dropdown{
    line-height: 60px;
}
</style>