
class Users {

    constructor() {
        this.users= [];
    }

    addUser(id, name, room) {
        room= room.trim().toLowerCase();
        var user= { id, name, room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user= this.getUser(id);
        if(user) {
            this.users= this.users.filter(u => u.id != user.id);
        }
        return user;
    }

    getUser(id) {
        return this.users.filter(user=> user.id == id)[0];
    }


    getUserList(room) {
        room= room.trim().toLowerCase();
        var allUsers= this.users.filter(user => user.room == room);
        var names= allUsers.map(user => user.name);
        return names;
    }

}


module.exports = {Users};