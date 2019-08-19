class AnnounceController {
  constructor(model) {
    this.announce = model;
    this.limit = 5;
  }

  async getAll(page) {
    const length = await this.announce
      .countDocuments({});
    const result = await this.announce
      .find({})
      .sort([['_id', -1]])
      .skip(this.limit * (--page))
      .limit(this.limit);
    return { length, result };
  }

  async get(_id) {
    const result = await this.announce.findById(_id);
    if(result) return result
    throw new Error;
  }
  
  async create(announce) {
    const result = await new this.announce(announce).save();
    if(result) return result;
    throw new Error;
  }

  async update(_id, updates) {
    const result = await this.announce.findOneAndUpdate(
      { _id },
      updates,
      { new: true },
      );
    if(result) return result;
    throw new Error;
  }

  async delete(_id) {
    const result = await this.announce.findOneAndDelete(_id);
    if(result) return true;
    throw new Error;
  }

}

module.exports = AnnounceController;
