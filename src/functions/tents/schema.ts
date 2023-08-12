export const tentHTTP = {
    type: "object",
    properties: {
      player: { type: 'string' },
      character: {type: 'string'},
      initiative: {type: 'number'},
      spell_dc: {type: 'number'},
      passive_perception: {type: 'number'},
      ac: {type: 'number'},
      notes: {type: 'string'}
    },
    required: ['player','character','initiative']
  }