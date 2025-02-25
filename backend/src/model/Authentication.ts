class Authentication {
    public userId: number;
    public email: string;

    constructor(userId, email) {
        this.userId = userId;
        this.email = email;
    }
}

export default Authentication;