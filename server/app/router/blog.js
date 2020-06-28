module.exports = app => {
  const { router, controller } = app

  router.get('/blog/getArticleList', controller.blog.home.getArticleList)
  router.get('/blog/getArticleById/:id', controller.blog.home.getArticleById)
  router.get('/blog/getTypeInfo', controller.blog.home.getTypeInfo)
  router.get('/blog/getListById/:id', controller.blog.home.getListById)

}