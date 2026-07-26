class WhatsappService {
  async send({ to, message }) {
    /*
    -------------------------------------------------
    Provider Integration
    -------------------------------------------------

    Meta Cloud API

    Twilio

    WATI

    Interakt

    Gupshup

    -------------------------------------------------
    */

    console.log("WhatsApp");

    console.log(to);

    console.log(message);

    return true;
  }
}

module.exports = new WhatsappService();
