import React, { PureComponent } from 'react';
import FieldContext from './FieldContext';

export default class Field extends PureComponent{
  static contextType = FieldContext;

  componentDidMount() {
    this.unregister = this.context.setFieldEntities(this);    
  }
  componentWillUnmount() {
    if(this.unregister) {
      this.unregister();
    }
  }
  
  onStoreChange = () => {
    this.forceUpdate();  
  }

  /**
   * 将组件变成受控组件
   */
  getControlled = () => {
    const {name} = this.props;
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      value: getFieldValue(name), // store get(name)
      onChange: (e) => {
        const newValue = e.target.value;  
        // store set(name)
        setFieldsValue({[name]: newValue});
        console.log('newValue: ', newValue);
      }
    }
  };

  render() {
    const {children} = this.props;

    const returnHandledChild = React.cloneElement(children, this.getControlled());
    return (
      <div>
        {returnHandledChild}
      </div>
    )
  }
}
