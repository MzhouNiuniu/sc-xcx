const baseUrl = 'http://localhost:8090';
// const baseUrl = 'http://192.168.9.105:8088';

exports.api={
  user:{
    getOpenId:`${baseUrl}/client/getOpenId`,
    wxLogin:`${baseUrl}/client/user/wxLogin`,
    publish:`${baseUrl}/client/user/publish`,
    changeInFo:`${baseUrl}/client/user/changeInFo`
  },
  home:{
      index: `${baseUrl}/client/index`,
      getList: `${baseUrl}/client/getList`

  },
  order: {
    list: `${baseUrl}/getOrderList`,
    export: `${baseUrl}/exportData`,
  }
};
