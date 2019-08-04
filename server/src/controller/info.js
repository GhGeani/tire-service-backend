  class infoController {
    constructor(model) {
      this.info = model;
    }
    async getAll() {
      const result = await this.info.find({});
      if(result.length > 0) 
      return {
        no: result.length,
        data: result 
      };
      throw new Error('No infos avalible yet');
    }

    async get(id) {
      const result = await this.info.findById(id);
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
      const result = await this.info.findOneAndUpdate({ _id }, info);
      if(result) {
        return {
          msg: 'Info updated successfully',
          data: result
        };
      }
      throw new Error(`Couldn't update inexistent tutorial ${_id}`);
    }
    async delete(_id){
      const info = await this.info.findOneAndDelete({ _id });
      if (info) {
        info.remove();
        return {
          msg: 'Info deleted'
        }
      }
      throw new Error(`Couldn't delete inexistent user ${_id}`);
    }
  }

  module.exports = infoController;

