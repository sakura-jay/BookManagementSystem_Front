<template>
    <el-container>
        <el-main>
            <h4 class="title">用户列表</h4>
            <div class="main">
                <el-row>
                    <el-col :span="24">
                        <el-form :inline="true" :model="queryParams" class="demo-form-inline" ref="queryFormRef">
                            <el-form-item label="用户名：" prop="userName">
                                <el-input v-model="queryParams.userName" placeholder="用户名称" clearable />
                            </el-form-item>

                            <el-form-item label="手机号：" prop="phone">
                                <el-input v-model="queryParams.phone" placeholder="手机号" clearable />
                            </el-form-item>

                            <el-form-item label="注册时间：">
                                <el-date-picker
                                v-model="time"
                                type="datetimerange"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                :default-time="defaultTime1"
                                />
                            </el-form-item>
            
                            <el-form-item>
                                <el-button type="primary" @click="userList">筛选</el-button>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="warning" @click="clearForm(queryFormRef)">清空筛选条件</el-button>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="success" @click="outPut">导出</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-table :data="tableData" border stripe style="width: 100%">
                            <el-table-column prop="userId" label="用户ID" />
                            <el-table-column prop="userName" label="用户名"  />
                            <el-table-column prop="phone" label="手机号" />
                            <el-table-column prop="createTime" label="注册时间" />
                            <el-table-column prop="status" label="账号状态" >
                                <template v-slot="scope">
                                    <el-tag type="primary" v-if="scope.row.status == 0">封禁</el-tag>
                                    <el-tag type="success" v-if="scope.row.status == 1">正常</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column prop="onlineStatus" label="在线状态" >
                                <template v-slot="scope">
                                    <el-tag type="primary" v-if="scope.row.onlineStatus == 0">离线</el-tag>
                                    <el-tag type="success" v-if="scope.row.onlineStatus == 1">在线</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" prop="operation" label="操作" min-width="120">
                                <template #default="scope">
                                    <el-button type="primary" @click="isBanned(scope.row)">封禁</el-button>
                                    <el-button type="primary" @click="isActive(scope.row)">解封</el-button>
                                    <el-button type="danger" @click="offline(scope.row)">下线</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>

                <el-row >
                    <el-col :span="4" :offset=20 class="footer">
                            <el-pagination background layout="prev, pager, next" :total="total" page-size="queryParams.pageSize" @change="changePageNum"/>
                    </el-col>
                </el-row>
            </div>
        </el-main>
    </el-container>
</template>

<script setup>
import { ref ,onMounted ,getCurrentInstance, watchEffect  } from 'vue'
import { useRouter } from 'vue-router'

const { $http } = getCurrentInstance().appContext.config.globalProperties
const router = useRouter()
const total = ref(0)
const time = ref('')
const tableData = ref([])
const queryFormRef = ref()
const queryParams = ref({
    pageNum:1,
    pageSize:3,
    startTime: '',
    endTime: '',
    userName: '',
    phone: '',
})

onMounted(() => {
    userList()
})
//换页
function changePageNum(pageNum){
    queryParams.value.pageNum = pageNum
    userList()
}
//导出文件
function outPut(){
    //TODO
}

//监听日期改变
watchEffect(() => {
    queryParams.startTime = time.value[0]
    queryParams.endTime = time.value[1]
})

function clearForm() {
    queryFormRef.value.resetFields()
    userList()
}

function isBanned(row){
    
}
function isActive(row){

}
function offline(row){

}

function userList(){
    
}
</script>

<style scoped>
.main{
    margin-left: 20px;
}
.title{
    margin-bottom: 10px;
}
.footer{
    margin-top: 10px;
}
</style>