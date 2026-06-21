import db from '../config/database.js';

const userRepository = {
    async create(data){
        await db.read();
        db.data.users.push(data);
        await db.write();
        return data;
    },
    async getAll(){
        await db.read();
        return db.data.users;
    },
    async findByID(ID){
        await db.read();
        return db.data.users.find((U) => U.id === ID) || null;
    },
    async findUser(data){
        await db.read();
        const { login, email } = data;
        return db.data.users?.find( u => email ? (u.login === login || u.email === email) :u.login === login ) || null;
    },
    async userUpdate(id, update){
        await db.read();
        const index = db.data.users.findIndex(U => U.id === id);
        if(index === -1){
            return null;
        }
        db.data.users[index] = {...db.data.users[index], ...update}
        await db.write();
        return db.data.users[index];
    },
    async deleteById(ID){
        await db.read();
        const user = db.data.users.find(U => U.id === ID);
        if(!user){return null}
        db.data.users = db.data.users.filter(U => U.id !== ID)
        await db.write();
        return user;
    },
    async findShelf(ID){
        await db.read();
        const user = db.data.users.find(U => U.id === ID);
        return user.estante || null;
    },
    async pushToshelf(userID, bookData){
        await db.read();
        const user = db.data.users.find(U => U.id === userID);
        user.estante.push(bookData);  
        await db.write();
    },
    async saveBookStatus(userID, update){
        await db.read();
        const user = db.data.users.find(U => U.id === userID);
        const index = user.estante.findIndex(B => B.id === update.id);
        user.estante[index] = update;
        await db.write();
        return update;
    },
    async pullfromShelf(userID,bookID){
        await db.read();
        const user = db.data.users.find(U => U.id === userID);
        if(!user) return null;
        user.estante = user.estante.filter(B => B.id !== bookID);
        await db.write();
        return true;
    }
}
export default userRepository;