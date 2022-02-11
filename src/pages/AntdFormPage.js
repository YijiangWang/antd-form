import { useCallback, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
const { Item } = Form;

const nameRules = {required: true, message: 'Please input your username!'};
const pwdRules = {required: true, message: 'Please input your password!'}

function AntdFormPage() {
  const [form] = Form.useForm();
  
  const finishHandle = useCallback((values) => {
    console.log('Success: ', values);
  });
  const finishFailHandle = useCallback((errorInfo) => {
    console.log('Failed: ', errorInfo);
  })

  useEffect(() => {
    form.setFieldsValue({username: 'default'});
  },[])

  return (
    <div className="App">
      <p>antd4.0</p>
      <Form
        onFinish={finishHandle}
        onFinishFailed={finishFailHandle}
        form={form}
      >
        <Item
          name='username'
          rules={[nameRules]}
        >
          <Input />
        </Item>
        
        <Item
          name='password'
          rules={[pwdRules]}
        >
          <Input.Password />
        </Item>

        <Item>
          <Button>
            Submit
          </Button>
        </Item>
      </Form>
    </div>
  );
}

export default AntdFormPage;
