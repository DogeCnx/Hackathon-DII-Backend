'use strict'
const History = use('App/Models/History')

class HistoryController {
  async index() {
    return History.query().fetch().then(response => response.toJSON())
  }
  async show({ request }) {
    const { id } = request.params
    const data = await History.query().where({number_personal: id, status : 'รับยาแล้ว'}).fetch().then(response => response.toJSON())
    if(data){
      return {status : 200, data : data }
    }
    else{
      return {status : 201 , data : undefined}
    }
  }
  async store({ request }) {
    const {number_personal} = await History.create(request.body)
    return History.query().where({number_personal: number_personal }).fetch().then(response => response.toJSON())
  }
  async update ( {request} ) {
    const { id } = request.params
    let dataBefore = await History.findBy({number_personal: id})
    if(!dataBefore){
      return {status : 500 ,error : `Not Found ${ id }` , data : undefined};
    }
    dataBefore.merge(request.body)
    await dataBefore.save();
    return History.query().where({number_personal: id}).fetch().then(response => response.toJSON())

  }
}

module.exports = HistoryController
