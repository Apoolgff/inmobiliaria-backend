const bcrypt = require('bcrypt')

exports.createHash = async password => await bcrypt.hash(password, await bcrypt.genSalt(10))

exports.isValidPassword = async (password, userPasswordHash) => await bcrypt.compare(password, userPasswordHash);