class itemController {
  constructor(model) {
    this.item = model;
    this.limit = 10;
  }

  async getAll(page) {
    const result = await this.item.aggregate([
      { $match: { } },
      { $sort: { date: -1 } },
      { $skip: this.limit * page },
      { $limit: this.limit },
    ]);
    if(result)
    return { page: page, data: result };
    throw new Error('No items found');
  }

  async get(_id){
    const result = await this.item.findById(_id);
    if(result) {
      return {
        data: result 
      };
    }
    throw new Error('Item not found');
  }

  async create(item) {
    const result = await new this.item(item).save();
    if(result) {
      return{
        msg: 'Item posted successfully',
        data: result
      };
    }
    throw new Error('This item can be saved');
  }

  async update(_id, item){
    const result = await this.item.findOneAndUpdate(
      { _id }, 
      item,
      { new: true }
      );
    if(result) {
      return {
        msg: 'Item updated successfully',
        data: result
      };
    }
    throw new Error(`Couldn't update inexistent Item ${_id}`);
  }

  async delete(_id){
    const item = await this.item.findOneAndDelete({ _id });
    if (item) {
      item.remove();
      return { msg: 'Item deleted' };
    }
    throw new Error(`Couldn't delete inexistent item ${_id}`);
  }

  async changeAvailability(_id) {
    const found = await this.get(_id);
    found.data.avalible = !found.data.avalible;
    await found.data.save();
    return { msg: `Item avalible set to ${found.data.avalible}` };
  }
}

module.exports = itemController;