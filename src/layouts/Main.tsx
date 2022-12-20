import React, { Suspense } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Input, Layout } from "antd";
import "./layout.css";
import Logo from "@assets/images/logo.png";
import { useAppSelector } from "@hooks/useDispatch";
const { Header, Footer, Content } = Layout;

export const Main = () => {
  const { loadingSearch } = useAppSelector((state) => state.movieReducers);
  const navigate = useNavigate();
  const onSearch = (e: any) => {
    const { value } = e.target;
    navigate({
      pathname: "movies",
      search: `search=${value}`,
    });
  };
  return (
    <Layout className="min-h-[100vh] bg-[#181818]">
      <Header className="header-container">
        <div className="logo-website cursor-pointer flex justify-between">
          <Link to={"/"}>
            <img src={Logo} height="40px" width="100px" alt="logo" />
          </Link>
          <Input.Search
            size="large"
            className="w-1/6 mt-2"
            placeholder="Search movies..."
            enterButton
            onPressEnter={onSearch}
            loading={loadingSearch}
          />
        </div>
      </Header>
      <Content className="m-[25px] ">
        <Suspense fallback={"..."}>
          <div className="site-layout-background p-[24px] min-h-[360px]">
            <Outlet />
          </div>
        </Suspense>
      </Content>
      <Footer className="text-center">
        React Testing {new Date().getFullYear()} Created by Dieu Tran
      </Footer>
    </Layout>
  );
};
