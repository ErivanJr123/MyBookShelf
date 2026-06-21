import User from '../models/userModel.js';

const userRepository = {
    async create(data){
        const newUser = new User({
            _id: data.id,
            nome: data.nome,
            email: data.email,
            login: data.login,
            senha: data.senha,
            estante: data.estante || []
        })
        await newUser.save();
        return newUser;
    },
    async getAll(){
        return await User.find();
    },
    async findByID(ID){
        return await User.findById(ID);
    },
    async findUser(data){
        const { login, email } = data;
        const filter = email?
            {$or: [{login:login, email:email}]}:
            {login: login};
        return await User.findOne(filter);
    },
    async userUpdate(id, update){
        return await User.findOneAndUpdate(id,{$set: update}, {returnDocument: 'after'});
    },
    async deleteById(ID){
        return await User.findByIdAndDelete(ID)
    },
    async findShelf(ID){
        const user = await User.findById(ID).lean();
        return user.estante || null;
    },
    async pushToshelf(userID, bookData){
        return await User.findByIdAndUpdate(userID,{$push: {estante: bookData}});
    },
    async saveBookStatus(userID, update){
        return await User.updateOne({_id: userID, "estante.id": update.id},{$set: {"estante.$":update}})
    },
    async pullfromShelf(userID,bookID){
        return await User.findByIdAndUpdate(userID,{ $pull:{estante:{ id: bookID }}});
    }
}
export default userRepository;