export const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const VENUE_TYPES = [
  'Bar',
  'Restaurant',
  'Pub',
  'Brewery',
  'Winery',
  'Cocktail Bar',
  'Sports Bar',
  'Lounge',
  'Taproom',
  'Gastropub',
];

export const SPECIAL_TYPES = [
  'Beer',
  'Wine',
  'Cocktails',
  'Spirits',
  'Food',
  'Appetizers',
];

export const DISTANCE_OPTIONS = [
  { label: '1 mile', value: 1 },
  { label: '5 miles', value: 5 },
  { label: '10 miles', value: 10 },
  { label: '25 miles', value: 25 },
];

export const DUMMY_VENUES = [
  {
    id: '1',
    name: 'The Tipsy Tavern',
    address: '123 Main St',
    fullAddress: '123 Main St, San Francisco, CA 94105',
    venueType: ['Bar', 'Restaurant'],
    happyHours: [
      {
        day: 'Monday',
        startTime: '16:00',
        endTime: '19:00',
        foodSpecials: ['Half-price appetizers', '$5 wings'],
        drinkSpecials: ['$5 draft beers', '$7 house wines'],
      },
      {
        day: 'Tuesday',
        startTime: '16:00',
        endTime: '19:00',
        foodSpecials: ['Half-price appetizers', '$5 wings'],
        drinkSpecials: ['$5 draft beers', '$7 house wines'],
      },
    ],
    rating: 4.5,
    numRatings: 127,
    image: 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'Hoppy Hour',
    address: '456 Market St',
    fullAddress: '456 Market St, San Francisco, CA 94105',
    venueType: ['Brewery', 'Pub'],
    happyHours: [
      {
        day: 'Wednesday',
        startTime: '15:00',
        endTime: '18:00',
        foodSpecials: ['$6 burgers', '$4 fries'],
        drinkSpecials: ['$4 house beers', '$6 craft beers'],
      },
      {
        day: 'Thursday',
        startTime: '15:00',
        endTime: '18:00',
        foodSpecials: ['$6 burgers', '$4 fries'],
        drinkSpecials: ['$4 house beers', '$6 craft beers'],
      },
    ],
    rating: 4.2,
    numRatings: 86,
    image: 'https://images.pexels.com/photos/1267696/pexels-photo-1267696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    name: 'Wine Down',
    address: '789 Pine St',
    fullAddress: '789 Pine St, San Francisco, CA 94105',
    venueType: ['Winery', 'Lounge'],
    happyHours: [
      {
        day: 'Friday',
        startTime: '17:00',
        endTime: '20:00',
        foodSpecials: ['Cheese plate $10', 'Flatbread $8'],
        drinkSpecials: ['$8 wine flights', '$6 glass of house wine'],
      },
    ],
    rating: 4.7,
    numRatings: 152,
    image: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '4',
    name: 'The Cocktail Corner',
    address: '101 Broadway',
    fullAddress: '101 Broadway, San Francisco, CA 94105',
    venueType: ['Cocktail Bar', 'Lounge'],
    happyHours: [
      {
        day: 'Monday',
        startTime: '18:00',
        endTime: '21:00',
        foodSpecials: ['Small plates $7', 'Sliders $5'],
        drinkSpecials: ['$9 signature cocktails', '$6 well drinks'],
      },
      {
        day: 'Tuesday',
        startTime: '18:00',
        endTime: '21:00',
        foodSpecials: ['Small plates $7', 'Sliders $5'],
        drinkSpecials: ['$9 signature cocktails', '$6 well drinks'],
      },
    ],
    rating: 4.8,
    numRatings: 212,
    image: 'https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];