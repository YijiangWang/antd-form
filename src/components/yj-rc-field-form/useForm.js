import React from "react";
// store 状态管理库
class FormStore {
  constructor() {
    // 开辟一个空间存储我的状态 {} store
    this.store = {};

    // 开辟一个空间存储 Fields 实例
    this.fieldEntities = [];

    // 开辟一个空间存储 callbacks
    this.callbacks = {};
  }
  
  /**
   * 设置 callbacks
   */
  setCallbacks = (newCallbacks) => {
    this.callbacks = {...this.callbacks, ...newCallbacks};
  }

  // 设置 实例
  // 监听、取消监听，订阅、取消订阅一般情况下都要成对出现
  setFieldEntities = (entity) => {
    this.fieldEntities.push(entity);

    return () => {
      this.fieldEntities = this.fieldEntities.filter(item=> item !== entity);
      delete this.store[entity.props.name];
    }
  }

  /**
   * store get all values
   */
  getFieldsValue = () => {
    return {...this.store}
  }
  /**
   * store get one value
   */
  getFieldValue = (name) => {
    return this.store[name]
  }

  /**
   * set
   */
  setFieldsValue = (newStore) => {
    // 1、更新 store
    this.store = {...this.store, ...newStore};
    console.log('store: ', this.store);

    // 2、更新组件，每次只更新修改的组件
    this.fieldEntities.filter(entity => {
      return Object.keys(newStore).includes(entity.props.name);
    }).forEach(entity => {
      entity.onStoreChange();
    })
  }

  /**
   * 校验
   */
  validate = () => {
    // 存储错误信息
    let err = [];

    // 校验
    this.fieldEntities.forEach(entity => {
      const {name, rules} = entity.props;
      let rule = rules?.[0];
      let value = this.getFieldValue(name);
      if(rule && rule.required && (value === undefined || value.trim() === '')) {
        err.push({
          [name]: rule.message,
          value
        });
      }
    })
    return err;
  }

  /**
   * 提交
   */
  submit = () => {
    let err = this.validate()
    const {onFinish, onFinishFailed} = this.callbacks;
    if(err.length > 0) {
      // 出错了
      onFinishFailed(err, this.getFieldsValue());
    } else {
      // 通过校验
      onFinish(this.getFieldsValue());
    }
  }
  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      setFieldEntities: this.setFieldEntities,
      setCallbacks : this.setCallbacks,
      submit: this.submit,
    }
  }
}

export default function useForm(form) {
  // 我需要一个值，这个值在组件的整个生命周期中会被存储下来
  const formRef = React.useRef()
  if(!formRef.current) {
    if(form) {      
      formRef.current = form;
    } else {
      const formStore = new FormStore()
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}