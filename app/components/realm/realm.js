var Realm = require('realm');

const UserSchema = {
  name: 'User',
  properties: {name: 'string', fbID: 'string', favorites: {type: 'list', objectType: 'Favorite'}}
};

const FavoriteSchema = {
 name: 'Favorite',
 properties: {name: 'string', image: 'string', listeners: 'int', url: 'string'}
};

export default new Realm({schema: [UserSchema, FavoriteSchema]});
