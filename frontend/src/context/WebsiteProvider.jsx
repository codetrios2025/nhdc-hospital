import { useEffect, useState } from "react";

import WebsiteContext from "./WebsiteContext";

import { getContactData } from "../services/routes.services";

const WebsiteProvider = ({ children }) => {
  const [contact, setContact] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadContact = async () => {
 
    try {
      setLoading(true);

      const response = await getContactData();

      setContact(response.data.data);
    } catch (error) {
      console.error("Unable to load contact details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContact();
  }, []);

  return (
    <WebsiteContext.Provider
      value={{
        contact,
        loading,
        refreshContact: loadContact,
      }}
    >
      {children}
    </WebsiteContext.Provider>
  );
};

export default WebsiteProvider;
