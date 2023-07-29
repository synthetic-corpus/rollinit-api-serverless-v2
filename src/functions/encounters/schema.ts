export const encounterHTTP = {
    type: "object",
    properties: {
      _campaign_id: {type: 'string'},
      name: {type: 'string'},
      npcs: {
        type: "array",
        items: {"$ref": "#/definitions/npc"}
      }
    },
    required: ['name'],
    definitions: {
      npc: {
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