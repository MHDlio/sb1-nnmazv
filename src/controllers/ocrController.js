import Tesseract from 'tesseract.js';
import Form from '../models/Form.js';

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

function extractField(text, fieldName) {
  const regex = new RegExp(`${fieldName}\\s*(.+)`);
  const match = text.match(regex);
  return match ? match[1].trim() : '';
}