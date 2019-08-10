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
    if(result.length > 0) 
    return {
      no: result.length,
      data: result 
    };
    throw new Error('No info avalible yet');
  }

  async get(_id) {
    const result = await this.info.findById(_id);
    if(result) {
      return {
        data: result 
      };
    }
    throw new Error('Information not found');
  }
  
  async create(info) {
    const result = await new this.info(info).save();
    if(result) {
      return{
        msg: 'Info created successfully',
        data: result
      };
    }
    throw new Error('This information can be saved');
  }
  async update(_id, info){
    const result = await this.info.findOneAndUpdate(
      { _id }, 
      info,
      { new: true }
      );
    if(result) {
      return {
        msg: 'Info updated successfully',
        data: result
      };
    }
    throw new Error(`Couldn't update inexistent info ${_id}`);
  }
  async delete(_id){
    const info = await this.info.findOneAndDelete({ _id });
    if (info) {
      info.remove();
      return { msg: 'Info deleted' };
    }
    throw new Error(`Couldn't delete inexistent info ${_id}`);
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

