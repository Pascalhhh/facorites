

Page({
  data: {
    navbar: ['分类', '文章'],
    currentTab: 1,
    currentCategory: -1,
    currentCategoryColor: '',
    currentCategoryTitle: '',

    showFloatingButtons: true,

    setCategoryInput: '',

    categories: [],
    articles: [],

  },
  onAddTap: function (e) {
    var currentIndex = this.data.articles.length
    this.setData({
      currentCategoryTitle: '历史文学',
      [`articles[${currentIndex}].title`]: '万历十五年',
      [`articles[${currentIndex}].abstract`]: '一个皇朝从兴盛走向衰颓',
      [`articles[${currentIndex}].cover`]: '/images/bookOne.jpg',
      [`articles[${currentIndex}].shareCount`]: 3,
      [`articles[${currentIndex}].tagList`]: ["王朝", "中国"]
    })
  },
  onCreateCategory: function (e) {
    var currentIndex = this.data.categories.length;
    this.setData({
      [`categories[${currentIndex}].name`]: e.detail.value,
      [`categories[${currentIndex}].num`]: 3
    })
  },
  onNavbarTap: function (ev) {
    this.setData({ currentTab: ev.currentTarget.dataset.index });
  },

  onCategoryTap: function (ev) {
    var categories = this.data.categories
    var category_id = ev.currentTarget.dataset.id
    var color = ''
    var title = ''
    var articles = []
    for (var i = 0; i < categories.length; i++) {
      if (categories[i].id == category_id) {
        color = categories[i].color
        title = categories[i].name
      }
    }

    if (category_id == -1) {
      articles = [].concat(app.globalData.articles)

    } else {
      var allArticles = app.globalData.articles
      for (var i = 0; i < allArticles.length; i++) {
        if (allArticles[i].category_id == category_id) {
          articles.push(allArticles[i])
        }
      }
    }
    this.setData({
      currentCategory: category_id,
      articles: articles,
      currentTab: 1,
      currentCategoryColor: color,
      currentCategoryTitle: title,
      showFloatingButtons: true
    })
  },
  onArticlesScroll: function (ev) {
    var deltaY = ev.detail.deltaY;
    if (deltaY > 0) {
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.bottom(40).step()
      this.setData({
        floatingButtonsAnimation: animation.export()
      })
    } else {
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease',
      })
      this.animation = animation
      animation.bottom(-80).step()
      this.setData({
        floatingButtonsAnimation: animation.export()
      })
    }
  },

  onArticlesScrollToUpper: function (ev) {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.bottom(40).step()
    this.setData({
      floatingButtonsAnimation: animation.export()
    })
  },

  onArticlesScrollToLower: function (ev) {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.bottom(-80).step()
    this.setData({
      floatingButtonsAnimation: animation.export()
    })
  },

})
