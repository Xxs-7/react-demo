import React, { useEffect } from "react";
import { useAppSelector } from "../../store/store";
import { selectCurUser } from "../../store/slices/user";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import Home from "../home";
const { Footer, Sider, Content } = Layout;

export default function Admin() {
  const user = useAppSelector(selectCurUser);
  console.log("%c [ user ]-8", "font-size:13px; background:pink; color:#bf2c9f;", user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user === undefined || user.id === undefined) {
  //     navigate("/ERPApp/Login");
  //   }
  // }, [navigate, user]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>{/* <LeftNav></LeftNav> */}</Sider>
      <Layout>
        {/* <Header></Header> */}
        <Content style={{ backgroundColor: "#fff", margin: "20px" }}>
          <Routes>
            <Route path='/' element={<Navigate to='/ERPApp/home' />} />
            <Route path='/home' element={<Home />} />
            {/* <Route path='/category' element={<Category />} />
            <Route path='/product' element={<Product />} />
            <Route path='/role' element={<Role />} />
            <Route path='/user' element={<User />} />
            <Route path='/bar' element={<Bar />} />
            <Route path='/line' element={<Line />} />
            <Route path='/pie' element={<Pie />} />
            <Route path='*' element={<NotFound />} /> */}
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center", color: "#cccccc" }}>推荐使用谷歌浏览器，可以获得最佳页面操作体验</Footer>
      </Layout>
    </Layout>
  );
}
