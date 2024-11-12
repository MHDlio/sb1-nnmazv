import Tesseract from 'tesseract.js';
import Form from '../models/Form.js';

/**
 * Processes an OCR request by extracting text from an uploaded image file,
 * parsing specific fields, and suggesting relevant forms.
 * @param {Object} req - The Express request object containing the uploaded file.
 * @param {Object} res - The Express response object used to send the API response.
 * @returns {Promise<void>} Sends a JSON response with extracted fields and suggested forms,
 *                          or an error message if processing fails.
 * @throws {Error} If there's an issue with file processing or database operations.
 */
export const processOCR = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { path } = req.file;

    const { data: { text } } = await Tesseract.recognize(path, 'eng');

    // Simple field extraction (you'd want to make this more robust)
    const extractedFields = {
      name: extractField(text, 'Name:'),
      email: extractField(text, 'Email:'),
      phone: extractField(text, 'Phone:'),
    };

    // Find matching forms (this is a simple example)
    const suggestedForms = await Form.find({
      $or: [
        { name: { $regex: 'application', $options: 'i' } },
        { description: { $regex: 'application', $options: 'i' } },
      ]
    }).limit(3);

    res.json({
      extractedFields,
      suggestedForms: suggestedForms.map(form => ({
        id: form._id,
        name: form.name,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing OCR', error: error.message });
  }
};

/**
 * Extracts the value of a specified field from a given text string.
 * @param {string} text - The input text to search for the field.
 * @param {string} fieldName - The name of the field to extract.
 * @returns {string} The extracted field value, or an empty string if not found.
 */
function extractField(text, fieldName) {
  const regex = new RegExp(`${fieldName}\\s*(.+)`);
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}