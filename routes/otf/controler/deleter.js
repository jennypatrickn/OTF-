/*
 * GET / POST deleter
 * Il s'agit ici d'un Bean générique qui en fonction des données dans
 * l'annuaire otf json est capable de faire un insert et d'insérer un
 * ou des objets json dans le model passé dans l'annuaire.
 */
var logger = require('log4js').getLogger('css');
var mongoose = require('mongoose');
var genericModel = require(__dirname +'/../../../ressources/models/mongooseGeneric');

/*
 * SET users datas into MongoDB.
 */

exports.deleter = {
  oneById: function (params, path, model, schema, room, cb) {
    //@TODO not safety
    logger.debug('room   : ', room);
    logger.debug('model  : ' + model);
    logger.debug('params  : ' , params);
    //-- Accounts Model
    //var modele = mongoose.model(model);
    // Test Emit WebSocket Event
    logger.debug(" One User emmit call");
    sio.sockets.in(room).emit('user', {room: room, comment: ' One User\n\t Your Filter is :'});
    try {
      document = new genericModel.mongooseGeneric(path, schema, model);
      document.deleteDocument({_id: params._id}, function (err, nb_deleted) {
        logger.debug('suppression utilisateur :', nb_deleted);
        return cb(null, {data: nb_deleted, room: room});
      });
    } catch (err) { // si existe pas alors exception et on l'intègre via mongooseGeneric
      modele = global.db.model(path);
      // requete ici si model existe dejà dans mongoose
      modele.remove({_id : params._id}, function (err, nb_deleted) {
        logger.debug('Utilisateur sélectionné : ', nb_deleted);
        return cb(null, {data: nb_deleted, room: room});
      });
    }
  },

  list: function(params, path, model, schema, room, cb) {
    // ici params est un tableau d'objet à insérer
    /* TODO écrire l'insertion générique d'une liste d'objets avec mongoDB, via mongoose. */

  }
};