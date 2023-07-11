export const encounterHTTP = {
    type: "object",
    properties: {
      _campaign_id: {type: 'string'},
      name: {type: 'string'}
    },
    required: ['name'],
    npcs: {
      "type": "array",
      "items": {"$ref": "#/definitions/npc"}
    },
    definitions: {
      "npc": {
        type: "object",
        properties: {
          name: {type: 'string'},
          initiative: {type: 'number'},
          ac: {type: 'number'},
          notes: {type: 'string'},
          roll_method: {type: 'string'}
        },
        required: ['name','initiative']
      }
    }
  }