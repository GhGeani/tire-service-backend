class AnnounceController {
  constructor(model) {
    this.announce = model;
    this.limit = 5;
  }

  async getAll(page) {
    const result = await this.announce
      .find({})
      .sort([['_id', -1]])
      .skip(this.limit * (--page))
      .limit(this.limit);
    return { currpage: page, data: result };
  }

  async get(_id) {
    const result = await this.announce.findById(_id);
    if(result) return { data: result }
    throw new Error;
  }
  
  async create(announce) {
    const result = await new this.announce(announce).save();
    if(result) return { msg: 'Announce created successiful', data: result };
    throw new Error;
  }

  async update(_id, updates) {
    const result = await this.announce.findOneAndUpdate(
      { _id },
      updates,
      { new: true },
      );
    if(result)
    return { msg: 'Announce updated.', data: result };
    throw new Error('Cannot update inexistent announce.');
  }

  async delete(_id) {
    const result = await this.announce.findOneAndDelete(_id);
    if(result)
    return { msg: 'Announce deleted.' };
    throw new Error('Cannot delete inexistent announce.');
  }

}

module.exports = AnnounceController;
