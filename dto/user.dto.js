module.exports = class UserDto {
  email;
  name;
  phone;
  id;
  constructor(model) {
    this.email = model.email;
    this.name = model.name;
    this.phone = model.phone;
    this.id = model._id;
  }
};
