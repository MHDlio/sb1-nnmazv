import Form from '../models/Form.js';

export const getForms = async (req, res) => {
  try {
    const forms = await Form.find({}, 'name description fileUrl');
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
};

export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching form', error: error.message });
  }
};

export const submitForm = async (req, res) => {
  try {
    const { id } = req.params;
    const formData = req.body;
    
    // Here you would typically process the form data
    // For example, save it to a database, send emails, etc.
    
    res.json({ message: 'Form submitted successfully', formId: id });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
};