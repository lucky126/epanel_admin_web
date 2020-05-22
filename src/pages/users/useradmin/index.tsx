import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { UserListItem } from './data.d';
import { queryList, updateRule, addRule, removeRule } from '../../../services/user';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({
      nickname: fields.nickname,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      username: fields.username,
      nickname: fields.nickname,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: UserListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<UserListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      sorter: true,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      sorter: true,
    },
    {
      title: '状态',
      dataIndex: 'isEnabled',
      sorter: true,
      valueEnum: {
        false: { text: '关闭', status: 'Error' },
        true: { text: '正常', status: 'Success' },
      },
    },
    {
      title: '激活',
      dataIndex: 'activeStatus',
      sorter: true,
      valueEnum: {
        0: { text: '未激活', status: 'Error' },
        1: { text: '已激活', status: 'Success' },
      },
    },
    {
      title: '管理员',
      dataIndex: 'isAdmin',
      valueEnum: {
        false: { text: '否', status: 'Error' },
        true: { text: '是', status: 'Success' },
      },
    },
    {
      title: '内部账号',
      dataIndex: 'isInnerAccount',
      valueEnum: {
        false: { text: '否', status: 'Error' },
        true: { text: '是', status: 'Success' },
      },
    },
    {
      title: '主账号',
      dataIndex: 'isPrimaryAccount',
      valueEnum: {
        false: { text: '否', status: 'Error' },
        true: { text: '是', status: 'Success' },
      },
    },
    {
      title: '企业账号',
      dataIndex: 'isCompanyAccount',
      valueEnum: {
        false: { text: '否', status: 'Error' },
        true: { text: '是', status: 'Success' },
      },
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            配置
          </a>
          <Divider type="vertical" />
          <a href="">操作</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<UserListItem>
        headerTitle="用户列表"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
          </div>
        )}
        request={(params) => queryList(params)}
        columns={columns}
        rowSelection={{}}
        pagination={{
          pageSize: 10
        }}
      />
      <CreateForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
