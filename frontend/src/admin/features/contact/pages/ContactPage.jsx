import ContactForm from "../components/ContactForm";

const ContactPage = () => {
  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">Contact Us</h3>

          <p className="text-muted mb-0">
            Manage website contact information, working hours, Google Map and
            social media links.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
};

export default ContactPage;
