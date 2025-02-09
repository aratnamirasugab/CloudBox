class Authentication {
    private readonly userId;
    private readonly email;

    constructor(userId, email) {
        this.userId = userId;
        this.email = email;
    }

    public getUserId() {
        return this.userId;
    }

    public getEmail() {
        return this.email;
    }
}

export default Authentication;