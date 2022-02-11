import { useCallback, useEffect } from 'react';
import Form, {Field} from '../components/yj-rc-field-form';
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
        <Field
          name='username'
          rules={[nameRules]}
        >
          <Input placeholder='please input your name' />
        </Field>
        
        <Field
          name='password'
          rules={[pwdRules]}
        >
          <Input placeholder='please input your password' />
        </Field>

        <Field>
          <button contentEditable='true'>
            Submit
          </button>
        </Field>
      </Form>
    </div>
  );
}

export default MyRCFieldForm;


