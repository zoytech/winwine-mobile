const posts = [
  {
    id: '1',
    name: 'name 1',
    body: 'Lorem ipsum . . .',
    comments: [{id: '11', comment: 'Lorem comment . . .'}],
    author: 'Joe Doe',
    data: '2020-10-20',
  },
  {
    id: '2',
    name: 'name 2',
    body: 'Lorem ipsum . . .',
    comments: [
      {id: '12', comment: 'Lorem comment . . .'},
      {id: '13', comment: 'Lorem comment . . .'},
      {id: '14', comment: 'Lorem comment . . .'},
    ],
    author: 'Marry Doe',
    data: '2020-10-20',
  },
  {
    id: '3',
    name: 'name 3',
    body: 'Lorem ipsum . . .',
    comments: [
      {id: '15', comment: 'Lorem comment . . .'},
      {id: '16', comment: 'Lorem comment . . .'},
    ],
    author: 'Anna Doe',
    data: '2020-10-20',
  },
  {
    id: '4',
    name: 'name 4',
    body: 'Lorem ipsum . . .',
    comments: [{id: '17', comment: 'Lorem comment . . .'}],
    author: 'Jim Doe',
    data: '2020-10-20',
  },
];

export default function normalizedBy(key) {
  return (data, item) => {
    data[item[key]] = item;
    return data;
  };
}

function TestArray(array) {
  const normalizedSortedData = array
    .map(item => ({...item}))
    .reduce(normalizedBy('cardDeckId'), {});

  console.log('nomalizedComments: ', normalizedSortedData);
}
