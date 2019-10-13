class itemController {
  constructor(model, fs) {
    this.item = model;
    this.fs = fs;
    this.limit = 10;
  }

  async getAll(page) {
    // const length = await this.item
    // .countDocuments({});
    const result = await this.item
    .find({})
    .sort([['_id', -1]])
    // .skip(this.limit * (--page))
    // .limit(this.limit);
    return result
  }

  async search(page, text) {
    let vals = [];
    if (text) {
      vals = text.split(',').map(val => new RegExp(val, 'i'));
    }
    // const length = await this.item
    // .countDocuments({});
    const result = await this.item
    .find({ name : { $in: vals } })
    .sort([['_id', -1]])
    // .skip(this.limit * (--page))
    // .limit(this.limit);
    return result;
  }

  async get(_id){
    const result = await this.item.findById(_id);
    if(result) return result
    throw new Error;
  }

  async create(item) {
    const result = await new this.item(item).save();
    if(result) return result;
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
    const item = await this.item.findById(_id);
    if (item) {
      if(item.images.length > 0) {
        for(let index in item.images){
          this.fs.unlinkSync(require('path').join(__dirname , `../../../public/uploads/${item.images[index]}`));
        }
      }
      await item.remove();
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