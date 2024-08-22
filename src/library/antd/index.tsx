import React from "react";
import BreadcrumbDemo from "./components/navigate/breadcrumb";
import Uploader from "./components/uploader";
import ButtonDemo from "./components/button";
import FormDemo from "./components/form/form";
import InputDemo from "./components/form/input";
import { ConfigProvider } from "antd";
import { customsTheme } from "@/utils/theme";
import LayoutDemo from "./components/layout";
import AnchorDemo from "./components/navigate/anchor";
import SwitchDemo from "./components/form/switch";
import MenuDemo from "./components/navigate/menu";
import DatePickerDemo from "./components/datePicker";

export default function AntdComponents() {
  return (
    <ConfigProvider theme={customsTheme}>
      <div className='*:m-4 *:p-4 *:border *:rounded-md'>
        {/* Layout */}
        {/* <LayoutDemo /> */}
        {/*   <Uploader />
      <ButtonDemo /> */}

        {/* navigate */}
        <AnchorDemo />
        <BreadcrumbDemo />
        <MenuDemo />

        {/* form */}
        <FormDemo />
        <InputDemo />
        <SwitchDemo />

        {/* other */}
        <DatePickerDemo />
      </div>
    </ConfigProvider>
  );
}
