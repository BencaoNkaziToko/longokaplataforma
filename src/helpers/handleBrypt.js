const bcrypt = require('bcryptjs')

const encrypt = async (textpPlain) => {
    const hash = await bcrypt.hash(textpPlain, 10)
    return hash
}



module.exports = {encrypt, compare}