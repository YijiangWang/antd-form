import { useCallback, useEffect } from 'react';
import Form from '../components/yj-rc-field-form';
import Input from '../components/Input';

const nameRules = {required: true, message: 'Please input your username!'};
const pwdRules = {required: true, message: 'Please input your password!'}

function MyRCFieldForm() {
  const [form] = Form.useForm();
  
  const finishHandle = useCallback((values) => {
    console.log('Success: ', values);
  });
  const finishFailHandle = useCallback((errorInfo) => {
    console.log('Failed: ', errorInfo);
  })

  useEffect(() => {
    console.log('form: ', form);
    form.setFieldsValue({username: 'default'});
  },[])

  return (
    <div className="App">
      <p>YJRCFieldForm</p>
      <Form
        onFinish={finishHandle}
        onFinishFailed={finishFailHandle}
        form={form}  
      >
        <Form.Item
          name='username'
          rules={[nameRules]}
        >
          <Input placeholder='please input your name' />
        </Form.Item>
        
        <Form.Item
          name='password'
          rules={[pwdRules]}
        >
          <Input placeholder='please input your password' />
        </Form.Item>

        <Form.Item>
          <button contentEditable='true'>
            Submit
          </button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default MyRCFieldForm;


