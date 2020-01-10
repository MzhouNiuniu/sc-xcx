
class PopLayer {
  constructor() {
    this.configData = null;
    this.__page = null;
  }
  init(){
    let pages = getCurrentPages()
    let curPage = pages[pages.length - 1]
    this.__page = curPage;
    this.__page.setData({
      popLayerFlag: false,
    });
    this.initData = {
      msg: '',
      showCancel: false,
      confirmTxt: '确定'
    }
    this.__page.popLayerHide = this.popLayerHide.bind(this);
    this.__page.popLayerConfirm = this.popLayerConfirm.bind(this);
  }
  popLayer(data) {
    this.init();
    this.configData = Object.assign(this.initData,data);
    try {
      if (!data) {
        this.popLayerHide()
      } else {
        this.popLayerShow()
      }
    } catch (err) {
      // fail callback
     
    } finally {
      // complete callback
    }
  }
  popLayerConfirm() {
    const that = this;
    const configData = that.configData;
    configData.success && typeof configData.success === 'function' && configData.success();
    that.popLayerHide();
  }
  popLayerShow() {
    const that = this;
    const configData = that.configData;
    this.__page.setData({
      popLayerFlag: true,
      layerConfig: configData,
    });
  }
  popLayerHide() {
    this.__page.setData({
      popLayerFlag: false,
    });
  }
}

export default new PopLayer;
  