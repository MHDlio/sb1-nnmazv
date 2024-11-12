import Form from '../models/Form.js';

/**
 * Fetches a list of forms from the database
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends a JSON response with an array of form objects or an error message
 */
export const getForms = async (req, res) => {
  try {
    const forms = await Form.find({}, 'name description fileUrl');
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
};

/**
 * Retrieves a form by its ID from the database
 * @param {Object} req - Express request object containing the form ID in params
 * @param {Object} res - Express response object used to send the response
 * @returns {Object} JSON response with the form data or error message
 * @throws {Error} If there's an issue fetching the form from the database
 */
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

/**
 * Handles form submission for a specific form identified by its ID.
 * @param {Object} req - Express request object containing form data and parameters.
 * @param {Object} res - Express response object used to send the API response.
 * @returns {Promise<void>} Sends a JSON response indicating success or failure.
 * @throws {Error} If there's an error during form submission processing.
 */
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