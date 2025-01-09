<template>
    <el-container>
        <el-main>
            <h4 class="title">图书列表</h4>
            <el-row class="main">
                <el-col :span="24">
                    <el-form :inline="true" :model="queryParams" ref="queryFormRef">
                        <el-form-item label="图书标题：" prop="bookName">
                            <el-input v-model="queryParams.bookName" placeholder="书名" clearable />
                        </el-form-item>

                        <el-form-item label="作者：" prop="bookAuthor">
                            <el-input v-model="queryParams.bookAuthor" placeholder="作者" clearable />
                        </el-form-item>

                        <el-form-item label="出版社：" prop="bookPress">
                            <el-input v-model="queryParams.bookPress" placeholder="出版社" clearable />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="bookList">筛选</el-button>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="warning" @click="clearForm">清空筛选条件</el-button>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="success" @click="outPut">导出</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row class="main">
                <el-col :span="24">
                    <el-table :data="tableData" border stripe style="width: 100%">
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
                                <!-- <el-button  type="primary" @click="showBookDetail(scope.row)">详情</el-button> -->
                                <el-button  type="primary" @click="showEditDialog(scope.row)">编辑</el-button>
                                <el-button  type="primary" @click="deleteBook(scope.row.bookId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>

            <el-row class="main">
                <el-col :span="4" :offset=20 class="footer">
                    <el-pagination background layout="prev, pager, next" :total="total" page-size="queryParams.pageSize" @change="changePageNum" />
                </el-col>
            </el-row>

            <el-dialog v-model="centerDialogVisible" title="编辑图书信息" width="500">
                <el-form :model="dialogForm">
                    <el-form-item label="书名：" :label-width="formLabelWidth">
                        <el-input v-model="dialogForm.bookName" style="width: 240px" />
                    </el-form-item>
                    <el-form-item label="作者：" :label-width="formLabelWidth">
                        <el-input v-model="dialogForm.bookAuthor" style="width: 240px" />
                    </el-form-item>
                    <el-form-item label="出版社：" :label-width="formLabelWidth">
                        <el-input v-model="dialogForm.bookPress" style="width: 240px" />
                    </el-form-item>
                    <el-form-item label="出版时间：" :label-width="formLabelWidth">
                        <el-date-picker
                            v-model="time"
                            type="datetime"
                            placeholder="Select date and time"
                        />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div>
                        <el-button @click="centerDialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="updateBookInfo">确认</el-button>
                    </div>
                </template>
            </el-dialog>
        </el-main>
    </el-container>
</template>

<script setup>
import { reactive,ref, onMounted, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const { $http } = getCurrentInstance().appContext.config.globalProperties

const centerDialogVisible = ref(false)//对话框
const formLabelWidth = '100px'
const time = ref([])//时间选择器
const total = ref(0)//总条数
const router = useRouter()//路由
const tableData = ref([])//表格数据
const queryParams = ref({
    pageNum: 1,
    pageSize: 3,
    bookName: '',
    bookAuthor: '',
    bookPress: '',
})
const dialogForm = ref({
    bookName: '',
    bookAuthor: '',
    bookPress: '',
    publishTime: '',
})

// function showBookDetail(row) {
//     router.push({ name: 'bookDetail', query: row })
// }

const queryFormRef = ref()
function clearForm() {
    queryFormRef.value.resetFields()
    bookList()
}

function showEditDialog(row) {
    dialogForm.value.storeId = row
    centerDialogVisible.value = true
}

function deleteBook(bookId) {

}

function updateBookInfo() {

}

function changePageNum(pageNum) {
    queryParams.value.pageNum = pageNum
    bookList()
}

function outPut() {
    //TODO
}
function bookList() {
    //TODO
}

onMounted(() => {
    bookList()
})

</script>

<style scoped>
.main{
    margin-left: 20px;
}
.title {
    margin-bottom: 10px;
}
</style>