import React, { FC, useEffect } from 'react';
import { Modal, Result, Button, Form, Input } from 'antd';
import { TableListData } from '../data.d';
import styles from '../style.less';

interface OperationModalProps {
  done: boolean;
  visible: boolean;
  current: Partial<TableListData> | undefined;
  onDone: () => void;
  onSubmit: (values: TableListData) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const OperationModal: FC<OperationModalProps> = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;

  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);

  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values: { [key: string]: any }) => {
    if (onSubmit) {
      onSubmit(values as TableListData);
    }
  };

  const modalFooter = done
    ? { footer: null, onCancel: onDone }
    : { okText: '保存', onOk: handleSubmit, onCancel };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          subTitle="密码更新成功。"
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
        <Form.Item
          name="password"
          label="新密码"
          rules={[{ required: true, message: '请输入新的密码' }]}
        >
          <Input placeholder="请输入新的密码" type="password" />
        </Form.Item>
        <Form.Item
          name="repassword"
          label="确认密码"
          rules={[{ required: true, message: '请输入确认密码' }]}
        >
          <Input placeholder="请输入确认密码" type="password" />
        </Form.Item>
      
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `用户${current ? '编辑' : '添加'}`}
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
