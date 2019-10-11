class userController {
  constructor(model) {
    this.user = model;
  }

  async login(user) {
    const result = await this.user.findOne({ username: user.username });
    if(result) {
      const passMatch = await this.user.comparePassword(user.password, result.password);
      if(passMatch) return { correct: true, user: result };
      else throw new Error('Parola este gresită');
    }
    throw new Error('Contul nu există');
  }

  async register(creds) {
    const result =  await new this.user(creds).save();
    if(result) return { msg: 'Registered user. Now you can log in.' };
    throw new Error('Cannot register new users.')
  }
}

module.exports = userController;