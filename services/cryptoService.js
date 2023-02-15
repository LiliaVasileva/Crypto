const Crypto = require('../models/Crypto');



exports.getAll = () => Crypto.find({}).lean();

exports.getOne = (cryptoId) => Crypto.findById(cryptoId).lean();

exports.buy = async (userId, cryptoId) => {

    // TODO: check if user has already bought the crypto

    // Second easy way to do it with two queries to the DB
    const crypto = await Crypto.findById(cryptoId);
    crypto.buyers.push(userId);
    return crypto.save();

    // One way to do it with only one query to the DB
    // Crypto.findByIdAndUpdate(cryptoId,{$push: {buyers: userId}});

}

exports.create = (ownerId,{name, image, price, description, payment }) => Crypto.create({name, image, price, description, payment, owner: ownerId });


exports. edit = (cryptoId, {name, image, price, description, payment}) => Crypto.findByIdAndUpdate(cryptoId, {name, image, price, description, payment});

exports.delete = (cryptoId) => Crypto.findByIdAndDelete(cryptoId);