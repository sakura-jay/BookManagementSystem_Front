<template>
    <el-container>
      <el-container>
        <el-header>
            <el-row>
            <el-col :span="12">
                <div class="header-left">
                    <el-icon><Grid /></el-icon>
                    <span>图书查询系统</span>
                </div>  
            </el-col>
            <el-col :span="12">
                <div class="header-right">
                    <el-avatar :icon="UserFilled" />
                    <el-dropdown @command="commandHandler">
                        <span class="el-dropdown-link">欢迎,admin</span>
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
            <h1 class="title">用户查询页</h1>
            <div class="main">
                <el-row>
                    <el-col :span="24">
                    <el-form :inline="true" ref="queryFormRef" :model="queryForm">
                        <el-form-item label="图书标题：" prop="bookName">
                            <el-input v-model="queryForm.bookName" placeholder="书名" clearable />
                        </el-form-item>

                        <el-form-item label="作者：" prop="bookAuthor">
                            <el-input v-model="queryForm.bookAuthor" placeholder="作者" clearable />
                        </el-form-item>

                        <el-form-item label="出版社：" prop="bookPress">
                            <el-input v-model="queryForm.bookPress" placeholder="出版社" clearable />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="bookList">筛选</el-button>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="warning" @click="clearForm">清空筛选条件</el-button>
                        </el-form-item>
                    </el-form>
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-table :data="tableData" border stripe style="width: 55%;align-text:center;margin: 0 auto;">
                        <el-table-column prop="storeName" label="图书标题" />
                        <el-table-column prop="storeAddress" label="出版社"  />
                        <el-table-column prop="header" label="作者"  />
                        <el-table-column prop="publishTime" label="出版时间"  />
                        <el-table-column prop="status" label="剩余数量" >
                            <template v-slot="scope">
                                <span v-if="scope.row.number > 0">{{scope.row.number}}</span>
                                <el-tag type="primary" v-if="scope.row.number == 0">无库存</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" prop="operations" label="操作" min-width="120">
                            <template v-slot="scope">
                                <el-button  type="primary" @click="borrowBook(scope.row)">借阅</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
                <el-row >
                    <el-col :span="4" :offset=17 class="footer">
                            <el-pagination background layout="prev, pager, next" :total="total" page-size="queryForm.pageSize" @change="changePageNum"/>
                    </el-col>
                </el-row>
            </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<script setup>
import { reactive,ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const queryFormRef = ref('')
const queryForm = ref({
    pageNum: 1,
    pageSize: 3,
    bookName: '',
    bookAuthor: '',
    bookPress: '',
})
const total = ref(0)

const tableData = ref([])

function clearForm() {
    queryFormRef.value.resetFields()
    bookList()
}
function changePageNum(pageNum) {
    queryForm.value.pageNum = pageNum
    bookList()
}
function commandHandler(val){
    if(val='logout'){
        router.replace('/userLogin')
    }
}
function bookList() {
    
}
</script>

<style>
.el-container {
    height: 100vh;
}
.el-header {
    height: 60px;
    background-color: #304156;
    box-shadow: 3px 3px 4px #304156;
}
 .header-left{
    line-height: 60px;
    color: white;
}
.header-right{
    text-align: right;
    line-height: 60px;
}
.el-dropdown-link{
    color: white;
}
.el-dropdown{
    line-height: 60px;
}
.el-avatar{
    margin-top: 10px;
}

.title {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 10px;
}
.main{ 
    text-align: center;
}
.footer{
    margin-top: 10px;
}
</style>
