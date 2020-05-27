import React, { FC } from 'react';
import { Modal, Card, Descriptions, Divider, Badge } from 'antd';
import { UserListItem, AccountItem } from '../data.d';

import styles from '../style.less';

interface ReadModalProps {
  visible: boolean;
  values: Partial<UserListItem>;
  accountValues: Partial<AccountItem>;
  hasAccount: boolean;
  onCancel: () => void;
}

const ReadModal: FC<ReadModalProps> = (props) => {
  const { visible, values, accountValues, hasAccount, onCancel } = props;
  const userName = values.username;

  const modalFooter = { okText: '确定', onOk: onCancel, onCancel };

  const loginInfo = values.email !== '' ? values.email : values.mobileNumber
  const loginInfoStatus = values.email !== '' ? (values.emailStatus == 0 ? '未验证' : values.emailStatus == 1 ? '已验证' : '禁用') : (values.mobileNumberStatus == 0 ? '未验证' : values.mobileNumberStatus == 1 ? '已验证' : '禁用')

  const getModalContent = () => {

    return (
      <Card bordered={false}>
        <Descriptions title="基本信息" style={{ marginBottom: 10 }}>
          <Descriptions.Item label="用户名">{values.username}</Descriptions.Item>
          <Descriptions.Item label="昵称">{values.nickName}</Descriptions.Item>
          <Descriptions.Item label="注册类型">{values.registerType === 1 ? '自主注册' : '邀请注册'}</Descriptions.Item>
          <Descriptions.Item label="邮箱/手机">{loginInfo}({loginInfoStatus})</Descriptions.Item>
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
        <Divider style={{ marginBottom: 10 }} />
        <Descriptions title="第三方账户绑定信息" style={{ marginBottom: 10 }}>
          <Descriptions.Item label="QQ">{values.isBindQq ? (
            <Badge status="success" text="已绑定" />
          ) : (
              <Badge status="error" text="未绑定" />
            )}</Descriptions.Item>
          <Descriptions.Item label="微信">{values.isBindWechat ? (
            <Badge status="success" text="已绑定" />
          ) : (
              <Badge status="error" text="未绑定" />
            )}</Descriptions.Item>
          <Descriptions.Item label="微博">{values.isBindWeibo ? (
            <Badge status="success" text="已绑定" />
          ) : (
              <Badge status="error" text="未绑定" />
            )}</Descriptions.Item>
          <Descriptions.Item label="钉钉">{values.isBindDingtalk ? (
            <Badge status="success" text="已绑定" />
          ) : (
              <Badge status="error" text="未绑定" />
            )}</Descriptions.Item>
        </Descriptions>
        <Divider style={{ marginBottom: 10 }} />
        <Descriptions title={`个人账户信息 ${hasAccount ? "" : "（未设置）"}`} style={{ marginBottom: 10 }}>
          <Descriptions.Item label="账户余额">{hasAccount ? accountValues.cashBalance : "-"} 元</Descriptions.Item>
          <Descriptions.Item label="邮件剩余条数">{hasAccount ? accountValues.mailBalance : "-"} 封</Descriptions.Item>
          <Descriptions.Item label="短信剩余条数">{hasAccount ? accountValues.smsBalance : "-"} 条</Descriptions.Item>
        </Descriptions>
      </Card>
    );
  };

  return (
    <Modal
      title={`${userName}--用户信息`}
      className={styles.standardListForm}
      width={800}
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
