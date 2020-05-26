import React, { FC } from 'react';
import { Modal, Card, Descriptions, Divider, Badge } from 'antd';
import { TableListData } from '../data.d';

import styles from '../style.less';

interface ReadModalProps {
  visible: boolean;
  values: Partial<TableListData>;
  onCancel: () => void;
}

const ReadModal: FC<ReadModalProps> = (props) => {
  const { visible, values, onCancel } = props;
  const userName = values.username;

  const modalFooter = { okText: '确定', onOk: onCancel, onCancel };

  const getModalContent = () => {

    return (
      <Card bordered={false}>
        <Descriptions title="基本信息" style={{ marginBottom: 10 }}>
          <Descriptions.Item label="用户名">{values.username}</Descriptions.Item>
          <Descriptions.Item label="昵称">{values.nickName}</Descriptions.Item>
          <Descriptions.Item label="注册类型">{values.registerType === 1 ? '自主注册' : '邀请注册'}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{values.email}</Descriptions.Item>
          <Descriptions.Item label="手机号">{values.mobileNumber}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{values.email}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 10 }} />
        <Descriptions title="权限信息" style={{ marginBottom: 10 }}>
          <Descriptions.Item label="状态">{values.isEnabled ? (
            <Badge status="success" text="正常" />
          ) : (
              <Badge status="error" text="关闭" />
            )}</Descriptions.Item>
          <Descriptions.Item label="管理员">{values.isAdmin ? (
            <Badge status="success" text="是" />
          ) : (
              <Badge status="error" text="否" />
            )}</Descriptions.Item>
          <Descriptions.Item label="内部账户">{values.isInnerAccount ? (
            <Badge status="success" text="是" />
          ) : (
              <Badge status="error" text="否" />
            )}</Descriptions.Item>
          <Descriptions.Item label="企业账户">{values.isCompanyAccount ? (
            <Badge status="success" text="是" />
          ) : (
              <Badge status="error" text="否" />
            )}</Descriptions.Item>
          <Descriptions.Item label="主账户">{values.isPrimaryAccount ? (
            <Badge status="success" text="是" />
          ) : (
              <Badge status="error" text="否" />
            )}</Descriptions.Item>
          <Descriptions.Item label="激活">{values.activeStatus ? (
            <Badge status="success" text="已激活" />
          ) : (
              <Badge status="error" text="未激活" />
            )}</Descriptions.Item>
        </Descriptions>
      </Card>
    );
  };

  return (
    <Modal
      title={`${userName}--用户信息`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={{ padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default ReadModal;