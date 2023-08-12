export const campaignHTTP = {
    type: "object",
    properties: {
      _user_id: {type: 'string'},
      name: {type: 'string'},
      description: {type: 'string'}
    },
    required: ['name'],
  }