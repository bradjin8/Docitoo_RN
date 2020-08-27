import Images from "../styles/Images";

export const mockSpecialities = [
  'Gynecologist',
  'Skin Specialist',
  'Child Specialist',
  'Orthopedic Surgeon',
  'ENT Specialist',
  'Diagnostics',
  'Diabetes Specialist',
  'Eye Specialist'
];

export const mockDoctors = [
  {
    id: 0,
    fullName: 'John Doe',
    speciality: 'General Physician',
    reviews: [
      {
        author: {
          id: 0,
          fullName: 'Thomas Lawrence',
          date: '22nd May 2020'
        },
        rating: 5.0,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inicididunt ut labore et dolore magna aliqua.'
      }
    ],
    street: 'Abby Road',
    city: 'New Jersey',
    country: 'USA',
    avatar: Images.placeholder.avatarDefault,
    avatarUrl: 'https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg',
    availableTime: {
      from: '10 AM',
      to: '6 PM'
    },
    hospital: {
      name: 'Abbey Road Hospital',
      location: 'ABC City, WonderCountry',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        'https://cdn.pixabay.com/photo/2016/11/18/17/46/architecture-1836070__340.jpg',
        'https://archello.s3.eu-central-1.amazonaws.com/images/2018/10/11/Contemporary-Modern-House-Design-6.1539270983.8601.jpg',
        'https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        'https://q4g9y5a8.rocketcdn.me/wp-content/uploads/2020/02/home-banner-2020-02-min.jpg'
      ]
    }
  },

];
