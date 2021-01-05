// page/one/index.js
Page({
  data: {
    page: 0,
    newMark: 0,
    startMark: 0,
    endMark: 0,
    windowWidth: wx.getSystemInfoSync().windowWidth,
    translate: '',
    pageShow: '',
  },
  setting: function (e) {
    if (this.data.page == 0) {
      this.setData({
        translate: 'transform: translateX(' + this.data.windowWidth * 0.75 + 'px)',
        pageShow: 'visibility:hidden'
      })
      this.data.page = 2;
    } else {
      this.backPage();
    }
  },
  backPage: function () {
    if (!this.data.page == 0) {
      this.setData({
        translate: 'transform: translateX(0px)',
      })
      this.data.page = 0;
    }
  },

  chart: function (e) {
    if (this.data.page == 0) {
      this.setData({
        translate: 'transform: translateX(-' + this.data.windowWidth + 'px)',
        pageShow: 'visibility:visible'
      })
      this.data.page = 1;
    } else {
      this.setData({
        translate: 'transform: translateX(0px)'
      })
      this.data.page = 0;
    }
  },


  tap_start: function (e) {
    this.data.newMark = this.data.startMark = e.touches[0].pageX
  },

  tap_drag: function (e) {
    this.data.newMark = e.touches[0].pageX;

    //左往右划 👉
    if (this.data.newMark > this.data.startMark) {
      if (this.data.page == 0 && (this.data.newMark - this.data.startMark < this.data.windowWidth * 0.75)) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.newMark - this.data.startMark) + 'px)',
          pageShow: 'visibility:hidden'
        })
      } else if (this.data.page == 1) {
        this.setData({
          translate: 'transform: translateX(' + (-this.data.windowWidth + (this.data.newMark - this.data.startMark)) + 'px)',
          pageShow: 'visibility:visible'
        })
      }
    }

    //右往左划 👈
    if (this.data.newMark < this.data.startMark) {
      if (this.data.page == 2 && this.data.startMark - this.data.newMark < this.data.windowWidth * 0.75) {
        this.setData({
          translate: 'transform: translateX(' + (this.data.windowWidth * 0.75 - (this.data.startMark - this.data.newMark)) + 'px)',
          pageShow: 'visibility:hidden'
        })
      } else if (this.data.page == 0) {
        this.setData({
          translate: 'transform: translateX(' + -(this.data.startMark - this.data.newMark) + 'px)',
          pageShow: 'visibility:visible'
        })
      }
    }
  },



  tap_end: function (e) {
    if (Math.abs(this.data.newMark - this.data.startMark) < (this.data.windowWidth * 0.2)) {
      if (this.data.page == 0) {
        this.setData({
          translate: 'transform: translateX(0px)'
        })
        this.data.page = 0;
      } else if (this.data.page == 1) {
        this.setData({
          translate: 'transform: translateX(-' + this.data.windowWidth + 'px)',
        })
        this.data.page = 1;
      } else {
        this.setData({
          translate: 'transform: translateX(' + this.data.windowWidth * 0.75 + 'px)'
        })
        this.data.page = 2;
      }
    }
    
    
    else {
      //移动距离大于屏幕的0.2
      // 向右划动 👉
      if (this.data.newMark > this.data.startMark) {
        if (this.data.page == 0) {
          this.setData({
            translate: 'transform: translateX(' + this.data.windowWidth * 0.75 + 'px)'
          })
          this.data.page = 2;
        } else if (this.data.page == 1) {
          this.setData({
            translate: 'transform: translateX(0px)'
          })
          this.data.page = 0;
        }
      } else if (this.data.newMark < this.data.startMark) {
        //向左划动👈
        if (this.data.page == 0) {
          this.setData({
            translate: 'transform: translateX(-' + this.data.windowWidth + 'px)',
          })
          this.data.page = 1;

        } else if (this.data.page == 2) {
          this.setData({
            translate: 'transform: translateX(0px)'
          })
          this.data.page = 0;
        }
      }
    }
  }

})