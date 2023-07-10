export const tentHTTP = {
    type: "object",
    properties: {
      player: { type: 'string' },
      character: {type: 'string'},
      initiative: {type: 'string'},
      spell_dc: {type: 'string'},
      passive_perception: {type: 'string'},
      ac: {type: 'number'},
      notes: {type: 'string'}
    },
    required: ['player','character','initiative']
  }