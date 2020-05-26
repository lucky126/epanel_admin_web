import React, { FC, useEffect } from 'react';
import { Modal, Result, Button, Form, Input, Switch } from 'antd';
import { TableListData } from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  type: string;
  success: boolean;
  returnMsg: string;
  values: Partial<TableListData>;
  onDone: () => void;
  onSubmit: (values: TableListData, type: string) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { done, visible, type, values, success, returnMsg, onDone, onCancel, onSubmit } = props;
  const userName = values.username;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  if (values) {
    form.setFieldsValue({
      ...values,
    });
  }

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (formValues: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(formValues as TableListData, type);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: '保存', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    if (done) {

      let subTitle = returnMsg;

      return (
        <Result
          status={success ? 'success' : 'error'}
          title={success ? '操作成功' : '操作失败'}
          subTitle={subTitle}
          extra={
            <Button type="primary" onClick={onDone}>
              知道了
            </Button>
          }
          className={styles.formResult}
        />
      );
    }
    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="id"
        >
          <Input type="hidden" />
        </Form.Item>
        {type === 'resetPw' && (
          <Form.Item
            name="password"
            label="新密码"
            rules={[{ required: true, message: '请输入新的密码' }]}
          >
            <Input placeholder="请输入新的密码" type="password" />
          </Form.Item>
        )}
        {type === 'resetPw' && (
          <Form.Item
            name="repassword"
            label="确认密码"
            rules={[{ required: true, message: '请输入确认密码' }]}
          >
            <Input placeholder="请输入确认密码" type="password" />
          </Form.Item>
        )}
        {type === 'setAdmin' && (
          <Form.Item
            name="isAdmin"
            label="是否管理员"
            valuePropName="defaultChecked"
          >
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        )}
        {type === 'setInner' && (
          <Form.Item
            name="isInnerAccount"
            label="是否内部用户"
            valuePropName="defaultChecked"
          >
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        )}
        {type === 'setEnabled' && (
          <Form.Item
            name="isEnabled"
            label="状态"
            valuePropName="defaultChecked"
          >
            <Switch checkedChildren="启用" unCheckedChildren="停用" />
          </Form.Item>
        )}

      </Form>
    );
  };

  let modelTitle = '';

  switch (type) {
    case 'resetPw':
      modelTitle = '重置密码';
      break;
    case 'setAdmin':
      modelTitle = '设置管理员';
      break;
    case 'setInner':
      modelTitle = '设置内部用户(包含离线下载权限)';
      break;
    case 'setEnabled':
      modelTitle = '停启用账户';
      break;
    default:
      break;
  }

  return (
    <Modal
      title={`${userName}--${modelTitle}`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
