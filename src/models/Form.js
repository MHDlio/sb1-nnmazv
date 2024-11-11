import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fields: [{
    id: String,
    label: String,
    type: String,
  }],
});

const Form = mongoose.model('Form', formSchema);

export default Form;