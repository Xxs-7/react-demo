import React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectCurUser, setCurUser } from "../store/slices/user";
import LinkButton from "./linkButton";
import { selectHeaderTitle } from "../store/slices/header";
import { reqWheater } from "@/app/utils/api";

// todo
// 登出
// 天气
// 时间
// 标题
// logo

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurUser);
  const headerTitle = useAppSelector(selectHeaderTitle);

  const [currentTime, setCurrentTime] = React.useState(new Date().toLocaleTimeString());
  const [weather, setWeather] = React.useState({
    dayPictureUrl: "",
    weather: "",
  });

  async function getWeather() {
    // const { dayPictureUrl, weather } = await reqWheater("汕头");
    // setWeather({
    // 	dayPictureUrl,
    // 	weather,
    // });
  }

  React.useEffect(() => {
    getWeather();
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => {
      timer && clearInterval(timer);
    };
  }, []);
  const onLogout = () => {
    dispatch(setCurUser({ curUser: {} }));
  };

  return (
    <div className='header h-20 bg-white'>
      <div className='header-top border-b border-green-500 h-10 text-right pr-8 leading-10'>
        <span className='mr-2'>欢迎，{user.name}</span>
        <LinkButton onClick={onLogout}>退出</LinkButton>
      </div>
      <div className='header-bottom h-10 flex items-center'>
        <div className='header-bottom-left relative w-1/4 text-center'>
          {headerTitle.title}
          <div className='absolute right-1/2 transform translate-x-1/2 top-full w-0 h-0 border-t-8 border-t-white border-r-8 border-r-transparent border-l-8 border-l-transparent border-b-8 border-b-transparent'></div>
        </div>
        <div className='header-bottom-right w-3/4 text-right pr-8'>
          <span>{currentTime}</span>
          {weather.dayPictureUrl ? <img src={weather.dayPictureUrl} alt='weather' className='mx-4 w-7.5 h-5' /> : null}
          <span>{weather.weather}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
