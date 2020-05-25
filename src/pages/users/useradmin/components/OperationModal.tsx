import React, { FC, useEffect } from 'react';
import { Modal, Result, Button, Form, Input, Switch } from 'antd';
import { TableListData } from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  type: string;
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
  const { done, visible, type, values, onDone, onCancel, onSubmit } = props;
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
      const subTitle = type === 'resetPw' ? '密码重置成功。' : (type === 'setAdmin' ? '管理员设置切换成功。' : '')
      return (
        <Result
          status="success"
          title="操作成功"
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

      </Form>
    );
  };

  const modelTitle = type === 'resetPw' ? '重置密码' : (type === 'setAdmin' ? '设置管理员' : '');

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
