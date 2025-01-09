<template>
    <el-container>
        <el-main>
            <h4 class="title">录入图书</h4>
            <div class="main">
                <el-form ref="queryFormRef" :model="queryForm" >
                    <el-row :gutter="0">
                    <el-col :span="5">
                        <el-form-item label="图书名称:" prop="bookName">
                            <el-input placeholder="请输入书名" v-model="queryForm.bookName" style="width: 200px" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="作者:" prop="bookAuthor">
                            <el-input placeholder="请输入作者" v-model="queryForm.bookAuthor" style="width: 200px"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="出版社:" prop="bookPress">
                            <el-input placeholder="请输入出版社" v-model="queryForm.bookPress" style="width: 200px"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="出版日期:" prop="publishTime">
                            <el-date-picker
                                v-model="time"
                                type="datetime"
                                placeholder="选择日期时间"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label="库存量:" prop="bookNumber">
                            <el-input placeholder="请输入库存量" v-model="queryForm.bookNumber" style="width: 150px"/>
                        </el-form-item>
                    </el-col>
                    </el-row>
                    <div class="button">
                        <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button type="warning" @click="resetForm(queryFormRef)">重置</el-button>
                    </div>  
                </el-form>
            </div>
            <h4 class="title">批量录入</h4>
            <div class="main">
                <el-upload
                    class="upload-demo"
                    drag
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    multiple
                    accept=".csv,.xls"
                >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                    拖拽文件到此处或 <em>点击上传</em>
                    </div>
                    <template #tip>
                    <div class="el-upload__tip">
                        csv/xls files
                    </div>
                    </template>
                </el-upload>
            </div>
        </el-main>
    </el-container>
</template>

<script setup>
import { ref ,onMounted ,getCurrentInstance, watchEffect  } from 'vue'
import { useRouter } from 'vue-router'
import { UploadFilled } from '@element-plus/icons-vue'

const router = useRouter()
const { $http } = getCurrentInstance().appContext.config.globalProperties
const queryFormRef = ref()
const time = ref('')
const queryForm = ref({
    bookName: '',
    bookAuthor: '',
    bookPress: '',
    publishTime: '',
    bookNumber: ''
})

function resetForm() {
    queryFormRef.value.resetFields()
    time.value = ''
}

watchEffect(() => {
    queryForm.publicTime = time.value
}
)

</script>

<style scoped>
.main{
    margin-left: 20px;
}
.title {
    margin-bottom: 10px;
}
.button{
    text-align: center;
}
</style>