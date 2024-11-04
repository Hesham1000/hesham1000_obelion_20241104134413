module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('posts', [
    {
      title: 'First Post Title',
      content: 'First Post Content',
      image: 'first-image.jpg'
    },
    {
      title: 'Second Post Title',
      content: 'Second Post Content',
      image: 'second-image.jpg'
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('posts', null, {})
};
