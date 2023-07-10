export const encounterHTTP = {
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

const npc = {
  name: {type: 'string'},
  initiative: {type: 'string'},
  ac: {type: 'string'},
  notes: {type: 'string'},
  roll_method: {type: 'string'}
}