const Contact = require("../../models/Contact");

class ContactRepository {
  /**
   * Get Contact Details
   */
  async getContact() {
    return await Contact.findOne({});
  }

  /**
   * Get Active Contact
   */
  async getActiveContact() {
    return await Contact.findOne({
      isActive: true,
    });
  }

  /**
   * Find By Id
   */
  async findById(id) {
    return await Contact.findById(id);
  }

  /**
   * Create Contact
   */
  async create(data) {
    const contact = new Contact(data);
    return await contact.save();
  }

  /**
   * Update Contact
   */
  async update(id, data) {
    return await Contact.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  /**
   * Delete Contact
   */
  async delete(id) {
    return await Contact.findByIdAndDelete(id);
  }

  /**
   * Count Records
   */
  async count() {
    return await Contact.countDocuments();
  }

  /**
   * Create / Update Singleton Contact
   */
  async upsert(data) {
    return await Contact.findOneAndUpdate(
      {},
      {
        $set: data,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );
  }
}

module.exports = new ContactRepository();
