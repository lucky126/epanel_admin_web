import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import OperationModal from './components/OperationModal';
import { UserListItem, } from './data.d';
import { queryList, updateRule, addRule, removeRule } from '../../../services/user';
import { TableListData } from '@/pages/ListTableList/data';

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
  const [done, setDone] = useState<boolean>(false);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [resetPwVisible, setUpdateResetPwVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<TableListData> | undefined>(undefined);
  const actionRef = useRef<ActionType>();

  /**
   * 显示重置密码面板
   * @param item 数据
   */
  const showResetPwModal = (item: TableListData) => {
    setUpdateResetPwVisible(true);
    setCurrent(item);
    console.log(item)
  };

  /**
   * 用户数据操作
   * @param key 操作类型
   * @param currentItem 操作记录
   */
  const recordAction = (key: string, currentItem: TableListData) => {
    if (key === 'resetPw') showResetPwModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除用户',
        content: '确定删除该用户吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {},
      });
    }
  };

  const MoreBtn: React.FC<{
    record: TableListData;
  }> = ({ record }) => (
    <Dropdown
      overlay={
        <Menu onClick={({key})=> recordAction(key, record)}>
          <Menu.Item key="resetPw">重置密码</Menu.Item>
          <Menu.Item key="setAdmin">设置管理员</Menu.Item>
          <Menu.Item key="setInner">设置内部账户</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  
  const handleDone = () => {
    setDone(false);
    setUpdateResetPwVisible(false);
  };

  const handleCancel = () => {
    setUpdateResetPwVisible(false);
  };

  const handleSubmit = (values: TableListData) => {
    const id = current ? current.id : '';
console.log(values)
    setDone(true);
    // dispatch({
    //   type: 'listAndbasicList/submit',
    //   payload: { id, ...values },
    // });
  };

  const columns: ProColumns<UserListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '状态',
      dataIndex: 'isEnabled',
      valueEnum: {
        false: { text: '关闭', status: 'Error' },
        true: { text: '正常', status: 'Success' },
      },
    },
    {
      title: '激活',
      dataIndex: 'activeStatus',
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
              
            }}
          >
            修改
          </a>
          <Divider type="vertical" />
          <MoreBtn key="more" record={record} />
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
                  <Menu.Item key="remove">批量停用</Menu.Item>
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
     <OperationModal
        done={done}
        current={current}
        visible={resetPwVisible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
