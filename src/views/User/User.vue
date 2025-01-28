<template>
  <a-layout-content style="margin: 10px">
    <div :style="{ padding: '10px', background: '#fff', minHeight: '360px' }">
      <a-flex align="center" justify="space-between">
        <h1>用户管理</h1>

        <!-- 操作按钮 -->
        <a-button type="primary" @click="handleAddUser">
          添加用户
        </a-button>
      </a-flex>

      <!-- 用户表格 -->
      <a-table :columns="columns" :data-source="userList" row-key="id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'avatar'">
            <a-avatar :src="record.avatar" />
          </template>
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="handleEditUser(record)">编辑</a-button>
            <a-button type="link" danger @click="handleDeleteUser(record)">删除</a-button>
          </template>
        </template>
      </a-table>

      <!-- 添加/编辑用户弹窗 -->
      <UserFormModal @submit="handleSubmit" ref="modalRef" />
    </div>
  </a-layout-content>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { Modal } from 'ant-design-vue';
  import { userApi } from './services/user.services.js'
  import UserFormModal from './UserFormModal.vue';

  // 用户数据
  const userList = ref([]);
  const loading = ref(false)
  // 弹窗相关状态
  const modalRef = ref(null);

  // 获取用户列表示例
  const fetchUsers = async () => {
    loading.value = true
    const res = await userApi.getUsers({
      page: 1,
      pageSize: 10
    })
    userList.value = res.data
  }

  // 获取用户详情
  const fetchCurUser = async (id) => {
    const res = await userApi.getUserById(id)
    if (modalRef.value) {
      modalRef.value.show({ ...res.data })
    }
  }

  onMounted(() => {
    fetchUsers()
  })

  // 表格列配置
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      align: 'center'
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center'
    },
    {
      title: '头像',
      key: 'avatar',
      align: 'center'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      align: 'center'
    },
  ];

  // 添加用户
  const handleAddUser = () => {
    currentUser.value = null;
    modalVisible.value = true;
  };

  // 编辑用户
  const handleEditUser = (record) => {
    fetchCurUser(record.id)
  };

  // 删除用户
  const handleDeleteUser = (record) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除用户 ${record.username} 吗？`,
      onOk: () => {
        userList.value = userList.value.filter((user) => user.id !== record.id);
      },
    });
  };

  // 提交表单
  const handleSubmit = (formData) => {
    if (formData.id) {
      // 编辑用户
      const index = userList.value.findIndex((user) => user.id === formData.id);
      userList.value.splice(index, 1, formData);
    } else {
      // 添加用户
      formData.id = userList.value.length + 1;
      userList.value.push(formData);
    }
    modalVisible.value = false;
  };
</script>

<style scoped>
  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }
</style>