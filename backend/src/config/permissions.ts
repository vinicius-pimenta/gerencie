export default {
  Manager: {
    Sessions: {
      'create:any': ['*'],
    },
    Users: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
    Tasks: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
  Employee: {
    Sessions: {
      'create:any': ['*'],
    },
  },
};
