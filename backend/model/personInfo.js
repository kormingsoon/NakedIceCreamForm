class PersonInfo {
    name;
    phoneNum;
    age;
    first;
    second;
    third;
    goal;

    constructor(body) {
        this.name = body.name;
        this.phoneNum = body.phoneNum;
        this.age = body.age;
        this.first = body.first;
        this.second = body.second;
        this.third = body.third;
        this.goal = body.goal;
    }
}
module.exports = PersonInfo;
