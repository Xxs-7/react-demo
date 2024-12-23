// 构建表单
// 构建动态表单
// RSC（React Server Components）的表单

// form 库
// formik, react-hook-form, final-form
// 表单验证 yup 或 joi,validatejs

// 非 HTML 标准的表单校验，如检查密码强度和对用户手机号进行格式化。

import React, { useState } from "react";

function FormDemo() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    // ... 可能会有更多的值
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className='grid grid-cols-2 '>
      <label>First Name:</label>
      <input type='text' name='firstName' value={formData.firstName} onChange={handleChange} />
      <label>Last Name:</label>
      <input type='text' name='lastName' value={formData.lastName} onChange={handleChange} />
      <label>Email:</label>
      <input type='email' name='email' value={formData.email} onChange={handleChange} />
      <label>Address:</label>
      <input type='text' name='address' value={formData.address} onChange={handleChange} />
      {/* ... 可能会有更多的字段 */}
    </div>
  );
}

export default FormDemo;
