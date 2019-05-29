var mongoose = require('../../db'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: {type: String}
})
UserSchema.statics = {
    async findOrCreateUserByName(name) {
        let user = await this.findOne({name}).exec().catch(e => null)
        if (!user) {
            user = await User.create({name})
        }
        return user
    }
}


export const User = mongoose.model('User', UserSchema)