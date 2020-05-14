module.exports = (req, res) => {
  res.send([
    { id: 0, title: '1Q84', author: 'Haruki Murakami' },
    {
      id: 1,
      title: 'The Adventures of Huckleberry Finn',
      author: 'Mark Twain',
    },
    {
      id: 2,
      title: 'Corduroy',
      author: 'Don Freeman',
    },
    {
      id: 3,
      title: 'Hatchet',
      author: 'Gary Paulsen',
    },
  ]);
};
