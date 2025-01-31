import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();

  if (contacts.length === 0) {
    res.status(404).json({
      status: 404,
      message: 'Not found',
      error: 'No contacts found',
    });
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found all contacts',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    res.status(404).json({
      status: 404,
      message: 'Contact not found',
      error: `Contact with id ${contactId} not found`,
    });
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
