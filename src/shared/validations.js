export default {
  name: [
    {
      required: true,
      message: 'Name is required',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: 'Email is required',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
      message: 'Invalid email address',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'Password is required',
      trigger: 'blur'
    },
    {
      min: 6,
      message: 'Password should be atleast 6 characters in length',
      trigger: 'blur'
    },
    {
      pattern: /^[^\s]+$/,
      message: 'Password may not contain spaces.',
      trigger: 'blur'
    }
  ],
  website: [
    {
      required: true,
      message: 'Website is required',
      trigger: 'blur'
    }, 
    {
      pattern: /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
      message: 'Invalid website url',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: 'Phone no. is required',
      trigger: 'blur'
    }
  ],
  role: [
    {
      required: true,
      message: 'User type is required',
      trigger: 'blur'
    }
  ]
}