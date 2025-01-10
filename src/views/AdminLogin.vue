<template>
   
  <div class="container">
    <!-- <el-header>
      <Header />
    </el-header> -->
    <el-main>
        
    
    <h2>登录</h2>

    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="FormData"
      status-icon
      :rules="rules"
      label-width="auto"
    >
        <el-form-item label="用户名:" prop="userName" >
            <el-input v-model="FormData.adminName" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码:" prop="userPassword" >
            <el-input v-model="FormData.adminPassword" type="password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="验证码:" prop="sidentifyMode" >
            <el-input v-model="FormData.sidentifyMode" type="text" autocomplete="off" style="width: 80px"/>
            <div class="code" @click="refreshCode">
                <SIdentify :identifyCode="identifyCode"></SIdentify>
            </div>
        </el-form-item>
        <router-link to="/userLogin">
            <el-link>用户？前往登录</el-link>
        </router-link>
        <el-form-item>
            <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary"  @click="submitForm(ruleFormRef)">登录</el-button>
             <el-button @click="resetForm(ruleFormRef)" >重置</el-button>
        </el-form-item>
    </el-form>
    </el-main>
  </div>
</template>

<script lang="js" setup>
 import {ref,onMounted ,getCurrentInstance } from 'vue'
 import {useRouter} from 'vue-router'
 import { ElMessage } from 'element-plus'
//  import axios from 'axios'
//  import Header from '@/components/Header.vue';
 import SIdentify from '@/components/Sidentify'
//  import md5 from 'js-md5';

const fullscreenLoading = ref(false)

let sidentifyMode = ref('') //输入框验证码
let identifyCode = ref('') //图形验证码
let identifyCodes = ref('1234567890abcdefjhijklinopqrsduvwxyz')

//组件挂载
onMounted(() => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
})
 
// 生成随机数
const randomNum = (min, max) => {
  max = max + 1
  return Math.floor(Math.random() * (max - min) + min)
}
// 随机生成验证码字符串
const makeCode = (o, l) => {
  for (let i = 0; i < l; i++) {
    identifyCode.value += o[randomNum(0, o.length)]
  }
}
// 更新验证码
const refreshCode = () => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
}
const router = useRouter()
const ruleFormRef = ref()
const FormData = ref({
    adminName:'',
    adminPassword:'',
    sidentifyMode:''
})
const rules = ref({
    adminName: [
        { required: true, message: '用户名不能为空！',trigger: 'blur'},
        { min: 4, max: 20, message: '用户名长度必须在4到20个字符',trigger: 'blur'}
    ],
    adminPassword:[
        { required: true, message: '密码不能为空！', trigger: 'blur'},
        { min: 5, message: '密码最少5个字符', trigger: 'blur'}
    ],
    sidentifyMode:[
        {required: true, message: '验证码不能为空！', trigger: 'blur'},
        { min: 4, max: 4, message: '验证码长度为4个字符', trigger: 'blur'}
    ]
})

const instance = getCurrentInstance()
const {$http} = instance.appContext.config.globalProperties
//定义登录函数
function submitForm(){
    ruleFormRef.value.validate(valid=>{
        if(valid){
            
            if(FormData.value.sidentifyMode === identifyCode.value){
                fullscreenLoading.value = true
                // FormData.value.userPassword = md5(FormData.value.userPassword)
                $http({
                    method: 'post',
                    url: 'http://localhost:8888/admin/login',
                    params: FormData.value
                }).then((result) => {
                    console.log(result);
                    if(result.data.code == 200){
                        fullscreenLoading.value = false
                        // console.log(result);
                        ElMessage.success('登录成功！')
                        router.replace('./adminMain/userList') 
                        localStorage.setItem("adminName",result.data.data.adminName)
                        localStorage.setItem("token",result.data.data.token)
                    }
                    else{
                        fullscreenLoading.value = false
                        ElMessage.error("登录失败！账号或密码错误")
                    }
                }).catch((err) => {
                    fullscreenLoading.value = false
                    ElMessage.error(err)
                });
            }
            else{
                ElMessage.error('验证码错误')
            }
        }
        else{
            ElMessage.error('输入的用户名和密码不符合规则，请重新输入')
        }
    })
}
//定义表单重置函数
function resetForm(){
    ruleFormRef.value.resetFields()
}

</script>

<style scoped>
html, body {
    height: 100%; /* 设置整个页面的高度为100% */
    margin: 0; /* 去掉默认的外边距 */
    overflow: hidden; /* 禁止页面产生滚动条 */
}

.container {
    height: 100vh; /* vh: view height */
    background: url('../assets/bg.jpg') no-repeat center;
    overflow: hidden;
    background-size: 100% 100%;
    background-color: #171a21;
}

 .el-form {
    width: 450px;
    margin: 350px auto;
    padding: 30px 50px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background: rgba(255, 255, 255, 0.8);
}
h2 {
    text-align: center;
    color: white;
}
.el-link {
    text-align: right;
    line-height: 100%;
}

.el-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>