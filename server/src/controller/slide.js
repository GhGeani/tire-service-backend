const storage = require('../utils/storage');

class slideController {
  constructor(model) {
    this.slide = model;
  }

  async getAll() {
    const result = await this.slide
    .find({})
    .sort([['_id', -1]])
    return result;
  }

  async create(item) {
    const result = await new this.slide(item).save();
    if(result) return result;
  }

  async delete(_id){
    const slide = await this.slide.findById(_id);
    if (slide) {
      storage.remove(slide.img);
      await slide.remove();
      return { msg: 'Item deleted' };
    }
    throw new Error(`Couldn't delete inexistent item ${_id}`);
  }
}

module.exports = slideController;