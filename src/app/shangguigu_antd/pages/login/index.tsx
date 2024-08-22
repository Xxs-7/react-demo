import React from "react";
import "./login.less";
// import logo from "@/assets/images/react.svg";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { RuleObject } from "antd/lib/form";
import { StoreValue } from "antd/lib/form/interface";
// import { Redirect, RouteComponentProps, withRouter } from 'react-router';
import { useNavigate } from "react-router-dom";
import { reqLogin } from "@/app/utils/api/user";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectCurUser, setCurUser } from "../../store/slices/user";

// import { connect } from 'react-redux';
// import { RootState } from 'typesafe-actions';
// import { login } from '../../redux/actions';
// import { bindActionCreators } from 'redux';
// import { LoginUser } from '../../utils/StorageUtils';

const login = async (username: string, password: string) => {
  const result = await reqLogin(username, password);
  // if (result.status === 0) {
  // 	const user = result.data;
  // 	if (user) {
  // 		const role = await reqRoleById(user.roleId ?? '');
  // StorageUtils.saveUser({
  // 	id: user.id ?? -1,
  // 	name: user.name ?? '',
  // 	menus: role.menus?.split(',') ?? [],
  // 	roleId: role.id?.toString() ?? '',
  // });
  // 		dispatch(receiveUser({ id: user.id, name: user.name, roleId: user.roleId, menus: role.menus?.split(',') }));
  // 	} else {
  // 		dispatch(showErrorMsg({errorMsg:'用户名或密码错误'}));
  // 	}
  // } else {
  // 	dispatch(showErrorMsg({errorMsg:'用户名或密码错误'}));
  // }
  return result;
};

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectCurUser);
  console.log("%c [ user ]-46", "font-size:13px; background:pink; color:#bf2c9f;", user);

  // const user = {
  //   id: undefined,
  //   errorMsg: "",
  // };

  const validatePwd = (rule: RuleObject, value: StoreValue) => {
    // console.log("%c [ value ]-27", "font-size:13px; background:pink; color:#bf2c9f;", value);
    // 在这里添加密码验证逻辑
    console.log(rule);
    if (!value) {
      return Promise.reject("密码必须输入");
    } else if (value.length < 3 || value.length > 12) {
      return Promise.reject("密码长度不能小于4位或大于12位");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject("密码必须是英文，数字和下划线组成");
    } else {
      return Promise.resolve();
    }
  };

  const onFinish = async (values: { name: string; password: string }) => {
    // dispatch(login(values.name, values.password));
    const data = await login(values.name, values.password);
    console.log("%c [ data ]-72", "font-size:13px; background:pink; color:#bf2c9f;", data);

    message.info("ok");
    setTimeout(() => {
      dispatch(setCurUser({ curUser: data }));
    }, 2000);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("错了", errorInfo);
  };

  console.log("%c [ user ]-81", "font-size:13px; background:pink; color:#bf2c9f;", user);
  if (user && user.id) {
    console.log("already login");
    navigate("/ERPApp");
    return null;
  }

  return (
    <div className='login'>
      <header className='login-header'>
        {/* <img src={logo} alt='logo' /> */}
        <h1>React项目:后台管理系统</h1>
      </header>
      <section className='login-content'>
        <div className={user.errorMsg ? "error-msg show" : "error-msg"}>{user.errorMsg}</div>
        <h2>用户登录</h2>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
        >
          <Form.Item
            name='name'
            rules={[
              { required: true, whitespace: true, message: "请输入您的用户名" },
              { max: 12, message: "用户名最多十二位" },
              { min: 3, message: "用户名至少三位" },
              { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是英文,数字和下划线组成" },
            ]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
          </Form.Item>
          <Form.Item name='password' rules={[{ validator: validatePwd }]}>
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
};

export default Login;
