import Images from "../styles/Images";

export const default_avatar_url = 'https://cdn.discordapp.com/attachments/679790637868253199/749465959651082382/avatar.png';

export const mockBloodTypes = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-'
];

export const mockUser = {
  id: 0,
  fullName: 'Alberta John',
  email: 'albertajohn@gmail.com',
  phoneNumber: '+134838222',
  gender: 'Female',
  accountType: 'User',
  bloodType: 'O+ve',
  street: '',
  city: '',
  country: '',
  language: 'English',
  avatarUrl: 'https://cdn.discordapp.com/attachments/679790637868253199/749216226508800071/alberta.png',
  createdAt: '2020-09-04T01:31:22.968Z',
};

export const mockNotifications = [
  {
    type: 'pill',
    content: 'Omega 3 - 500mg',
  },
  {
    type: 'schedule',
    content: '4 weeks ago'
  },
  {
    type: 'announcement',
    content: 'More than a 100 new physicians have been listed in your area. Check out new listings now!'
  },
  {
    type: 'pill',
    content: 'Omega 3 - 500mg',
  },
  {
    type: 'schedule',
    content: '4 weeks ago'
  },
  {
    type: 'announcement',
    content: 'More than a 100 new physicians have been listed in your area. Check out new listings now!'
  },
];

export const mockMedicines = [
  {
    id: 0,
    medicineName: 'Omega 3',
    dosage: '500mg',
    frequency: 1,
    timeToTake: '6 PM'
  },
  {
    id: 1,
    medicineName: 'Aspirin',
    dosage: '500mg',
    frequency: 1,
    timeToTake: '1 PM'
  },
  {
    id: 0,
    medicineName: 'Vitamin D',
    dosage: '500mg',
    frequency: 1,
    timeToTake: '6 PM'
  }
];

export const mockSpecialities = [
  'gynecologist',
  'skin_specialist',
  'child_specialist',
  'orthopedic_surgeon',
  'ent_specialist',
  'diagnostics',
  'diabetes_specialist',
  'eye_specialist'
];

export const SPECIALITIES = {
  gynecologist: 'gynecologist',
  skin_specialist: 'skin_specialist',
  child_specialist: 'child_specialist',
  orthopedic_surgeon: 'orthopedic_surgeon',
  ent_specialist: 'ent_specialist',
  diagnostics: 'diagnostics',
  diabetes_specialist: 'diabetes_specialist',
  eye_specialist: 'eye_specialist',
};


export const mockDoctors = [
  {
    id: 0,
    fullName: 'John Doe',
    speciality: 'General Physician',
    reviews: [
      {
        author: {
          fullName: 'Thomas Lawrence',
          date: '22nd May 2020',
          avatarUrl: 'https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg'
        },
        date: '22nd May 2020',
        rating: 5.0,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inicididunt ut labore et dolore magna aliqua.'
      },
      {
        author: {
          fullName: 'Edward John',
          date: '22nd May 2020',
          avatarUrl: 'https://image.freepik.com/free-vector/profile-icon-male-avatar-hipster-man-wear-headphones_48369-8728.jpg'
        },
        date: '22nd May 2020',
        rating: 5.0,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inicididunt ut labore et dolore magna aliqua.'
      },
    ],
    street: 'Abby Road',
    city: 'New Jersey',
    country: 'USA',
    avatar: Images.placeholder.avatar_default,
    avatarUrl: 'https://cdn.discordapp.com/attachments/676196488610709504/748595432547942421/Rectangle_14.png',
    availableTime: {
      from: 10,
      to: 18
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
  {
    id: 1,
    fullName: 'John Doe',
    speciality: 'General Physician',
    reviews: [
      {
        author: {
          fullName: 'Thomas Lawrence',
          date: '22nd May 2020',
          avatarUrl: 'https://st2.depositphotos.com/1006318/5909/v/450/depositphotos_59094701-stock-illustration-businessman-profile-icon.jpg'
        },
        date: '22nd May 2020',
        rating: 5.0,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inicididunt ut labore et dolore magna aliqua.'
      },
      {
        author: {
          fullName: 'Edward John',
          date: '22nd May 2020',
          avatarUrl: 'https://image.freepik.com/free-vector/profile-icon-male-avatar-hipster-man-wear-headphones_48369-8728.jpg'
        },
        date: '22nd May 2020',
        rating: 5.0,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inicididunt ut labore et dolore magna aliqua.'
      },
    ],
    street: 'Abby Road',
    city: 'New Jersey',
    country: 'USA',
    avatar: Images.placeholder.avatar_default,
    avatarUrl: 'https://cdn.discordapp.com/attachments/676196488610709504/748595432547942421/Rectangle_14.png',
    availableTime: {
      from: 10,
      to: 18
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
