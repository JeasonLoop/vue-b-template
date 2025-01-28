<template>
  <a-modal title="用户信息" :visible="visible" @ok="handleOk" @cancel="handleCancel" :width="600">
    <a-form :model="formState" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" ref="formRef">
      <!-- 用户名 -->
      <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
        <a-input v-model:value="formState.username" placeholder="请输入用户名" />
      </a-form-item>

      <!-- 昵称 -->
      <a-form-item label="昵称" name="nickname" :rules="[{ required: true, message: '请输入昵称' }]">
        <a-input v-model:value="formState.nickname" placeholder="请输入昵称" />
      </a-form-item>

      <!-- 头像 -->
      <a-form-item label="头像" name="avatar" :rules="[{ required: true, message: '请上传头像' }]">
        <a-upload v-model:file-list="fileList" list-type="picture-card" :before-upload="beforeUpload"
          @change="handleUploadChange" :show-upload-list="false">
          <img v-if="formState.avatar" :src="formState.avatar" alt="avatar"
            style="width: 100%; height: 100%; object-fit: cover" />
          <div v-else>
            <plus-outlined />
            <div class="ant-upload-text">上传头像</div>
          </div>
        </a-upload>
      </a-form-item>

      <!-- 角色 -->
      <a-form-item label="角色" name="role" :rules="[{ required: true, message: '请选择角色' }]">
        <a-select v-model:value="formState.role" placeholder="请选择角色" :options="roleOptions" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
  import { ref, reactive, toRaw } from 'vue'
  import { PlusOutlined } from '@ant-design/icons-vue'
  import { userApi } from './services/user.services.js'

  const emit = defineEmits(['submit'])
  const visible = ref(false)
  const formRef = ref()
  const roleOptions = ref([
    { label: '管理员', value: 'admin' },
    { label: '编辑', value: 'editor' },
    { label: '用户', value: 'user' }
  ])

  // 表单状态
  const formState = reactive({
    username: '',
    nickname: '',
    avatar: '',
    role: undefined
  })

  // 文件列表
  const fileList = ref([])

  // 打开弹窗
  const show = (record) => {
    visible.value = true
    if (record) {
      Object.assign(formState, record)
    } else {
      formRef.value?.resetFields()
    }
  }

  // 关闭弹窗
  const handleCancel = () => {
    visible.value = false
    formRef.value?.resetFields()
  }

  // 提交处理
  const handleOk = async () => {
    try {
      await formRef.value.validate()
      emit('submit', formState)
      visible.value = false
    } catch (error) {
      console.log('表单验证失败:', error)
    }
  }

  // 上传前验证
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('只能上传图片文件!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过2MB!')
    }
    return isImage && isLt2M
  }

  // 处理上传变化
  const handleUploadChange = (info) => {
    if (info.file.status === 'done') {
      // 这里实际需要处理上传逻辑，这里模拟返回URL
      formState.avatar = URL.createObjectURL(info.file.originFileObj)
    }
  }

  defineExpose({ show })
</script>