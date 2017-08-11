export const development = {
  messages: {
    errors: {
      empty_username: 'Username cannot be blank',
      empty_password: 'Password cannot be blank',
      username_already_in_use: 'The specified username is already in use.',
      username_not_registered: 'This username is not registered.',
      invalid_password: 'Invalid password',
      unauthorized: 'Unauthorized',
      invalid_token: 'Invalid token',
      no_permission: 'No permission to access',
    },
  },
  secret: 'This is a secret',
  enableSimpleAuth: true,
  defaultRoles: ['user', 'admin', 'super'],
};

export const production = {
  messages: {
    errors: {
      empty_username: 'Username cannot be blank',
      empty_password: 'Password cannot be blank',
      username_already_in_use: 'The specified username is already in use.',
      invalid_password: 'Invalid password',
      unauthorized: 'Unauthorized',
      invalid_token: 'Invalid token',
      no_permission: 'No permission to access',
    },
  },
  secret: 'This is a secret',
  defaultRoles: ['user', 'admin', 'super'],
};
