export const reqWheater = (city: string): Promise<{ dayPictureUrl: any; weather: any }> => {
  return new Promise((resolve, reject) => {
    fetch(`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`)
      .then((data) => {
        console.log(data);
        resolve(data as unknown as { dayPictureUrl: any; weather: any });
      })
      .catch((err) => reject(err));

    // 	(err, data: any) => {
    // 		if (!err && data.status === 'success') {
    // 			const { dayPictureUrl, weather } = data.results[0].weather_data[0];
    // 			resolve({ dayPictureUrl, weather });
    // 		} else {
    // 			message.error('获取天气信息失败!');
    // 		}
    // 	}
    // );
  });
};
