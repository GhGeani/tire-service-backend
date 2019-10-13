class infoController {
  constructor(model) {
    this.info = model;
  }
  async getAll() {
    // const result = await this.info.find({});
    const result = await this.info.aggregate([
      { $match: {  } },
      { $sort: { priority: -1 } },
    ]);
    if(result) return result;
    throw new Error;
  }

  async get(_id) {
    const result = await this.info.findById(_id);
    if(result) return result;
    throw new Error;
  }
  
  async create(info) {
    const result = await new this.info(info).save();
    if(result) 
      return result;
    throw new Error('This information can be saved');
  }
  async update(_id, info){
    const result = await this.info.findOneAndUpdate(
      { _id }, 
      info,
      { new: true }
      );
    if(result) return result;
    throw new Error;
  }
  async delete(_id){
    const info = await this.info.findOneAndDelete({ _id });
    if (info) {
      info.remove();
      return true;
    }
    throw new Error;
  }
  async changePriority(_id, priority) {
    const result = await this.info.findOneAndUpdate(
      { _id }, 
      { priority: priority },
      { new: true }
      );
    if(result) return { msg: 'Priority modified' };
    throw new Error(`Couldn't modify inexistent info ${_id}`)
  }
  async changeAvailability(_id) {
    const found = await this.get(_id);
    found.data.avalible = !found.data.avalible;
    await found.data.save();
    return { msg: `Info avalible set to ${found.data.avalible}` };
  }
}

module.exports = infoController;

