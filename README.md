### 手写实现 antd 4.0 中 Form 表单

### 核心思想：状态处理
1. 开辟一个空间 {} 存储我的状态，比如 store；
2. store：提供 get/set 方法；

##### 与 redux 区别：
- redux 只是存储状态，而这里还需要有具体某一个组件的更新功能;

##### 其它
1. input 的值其实可以通过自己所在组件 state 来进行控制，但是弊端是兄弟组件访问不到这里的值了；
2. antd 3.0 是把所有的表单状态存储到父组件，这样导致每次修改一个表单状态，会更新所有表单内容；

### 项目结构
```
|- public：资源文件 index.html
|- src：
    |- index.js：入口文件
    |- pages：Form 表单组件
        |- AntdFormPage：antd Form 表单的使用
        |- MyRcFieldForm：自定义 Form 表单的使用（放一起是为了比较，使得使用方式完全一致）
    |- components：组件
        |- Input：可以根据需要进行封装
        |- yj-rc-field-form：自定义 Form 表单
            |- FieldContext：React 高级使用 ——> Context
            |- Form：自定义 form 表单
            |- Field：这里主要实现受控组件
            |- useForm：store 状态管理库，这里提供实现 Form 表单功能需要的状态存储 store 以及对应的方法
```            

### 使用 context 步骤
1. 创建 context 对象 createContext
2. 使用 Provider 传递 value
3. Provider 子组件接收 value，有三种方法：
    - contextType：只能用在类组件中，且只能订阅单一 context 来源；
    - useContext：只能用在函数组件和自定义 hook 中；
    - Consumer：无限制，只是格式有点复杂。